// Sentinel-2 Oil Spill Image Viewer
// Google Earth Engine App / Code Editor JavaScript

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------
var START_DATE = '2026-06-18';
var BASELINE_DATE = '2026-06-18';
var FIRST_SHIP_DATE = '2026-06-23';
var MAX_CLOUD_PERCENT = 10;
var DISPLAY_RADIUS_METERS = 27500;

var shipLocation = ee.Geometry.Point([
  56.32116231108791,
  17.4940145918338
]);

var displayRegion = shipLocation.buffer(DISPLAY_RADIUS_METERS);

var imageVisParam = {
  opacity: 1,
  bands: ['B4', 'B3', 'B2'],
  min: 643.36,
  max: 3444.64,
  gamma: 1.2000000000000002
};

// -----------------------------------------------------------------------------
// Map
// -----------------------------------------------------------------------------
var appMap = ui.Map();
appMap.setCenter(56.337519, 17.501704, 14);
appMap.setOptions('TERRAIN');
appMap.setControlVisibility({all: true, layerList: false});

var blankLayer = ui.Map.Layer(
  ee.Image(0).selfMask(), {}, 'Sentinel-2 image', true, 1
);

var shipMarker = ee.FeatureCollection([
  ee.Feature(shipLocation, {name: 'Reported ship location'})
]).style({
  color: 'e41a1a',
  fillColor: 'e41a1a',
  pointSize: 4,
  width: 2
});

var shipLayer = ui.Map.Layer(
  shipMarker, {}, 'Reported ship location', true, 1
);

appMap.layers().reset([blankLayer, shipLayer]);

// -----------------------------------------------------------------------------
// Simple interface
// -----------------------------------------------------------------------------
var title = ui.Label('Oil Spill Image Viewer', {
  fontSize: '23px',
  fontWeight: 'bold',
  color: '#16324f',
  margin: '0 0 6px 0'
});

var explainerText = ui.Label(
  'In June 2026, the tanker Caroline Bezengi ran aground near Qibliyah ' +
  'Island off southern Oman.\n\n' +
  'The vessel appears in the imagery between 18 and 23 June. By mid-July, ' +
  'visible oil leakage can be observed, worsening significantly by ' +
  '12 August.\n\n' +
  'This app displays Copernicus Sentinel-2 images of the area from 18 June ' +
  'onward. New image acquisitions are added when available.',
  {
    whiteSpace: 'pre-wrap',
    fontSize: '12px',
    margin: '0 0 6px 0'
  }
);


var explainer = ui.Panel({
  widgets: [explainerText],
  style: {
    backgroundColor: '#ffffff',
    border: '1px solid #bfd3da',
    padding: '10px',
    margin: '0 0 14px 0',
    stretch: 'horizontal'
  }
});

var selectTitle = ui.Label('Choose an image', {
  fontWeight: 'bold',
  fontSize: '14px',
  margin: '0 0 5px 0'
});

var selectorPanel = ui.Panel([], null, {
  stretch: 'horizontal',
  margin: '0 0 14px 0'
});

var selectedDateLabel = ui.Label('Loading images...', {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#1d3557',
  margin: '2px 0 6px 0'
});

var selectedDescription = ui.Label('', {
  fontSize: '13px',
  color: '#b2182b',
  fontWeight: 'bold',
  margin: '0 0 8px 0'
});

var metadataLabel = ui.Label('', {
  fontSize: '11px',
  color: '#5d6871',
  whiteSpace: 'pre-wrap',
  margin: '0 0 12px 0'
});

var statusLabel = ui.Label('Checking the Sentinel-2 catalog...', {
  fontSize: '11px',
  color: '#68737d',
  whiteSpace: 'pre-wrap',
  margin: '0 0 8px 0'
});

var sidebar = ui.Panel({
  widgets: [
    title,
    explainer,
    selectTitle,
    selectorPanel,
    selectedDateLabel,
    selectedDescription,
    metadataLabel,
    statusLabel
  ],
  style: {
    width: '350px',
    padding: '14px'
  }
});

ui.root.clear();
ui.root.add(ui.SplitPanel({
  firstPanel: sidebar,
  secondPanel: appMap,
  orientation: 'horizontal',
  wipe: false,
  style: {stretch: 'both'}
}));

// -----------------------------------------------------------------------------
// Image-selection state
// -----------------------------------------------------------------------------
var imageList = null;
var sceneMetadata = [];
var labelToIndex = {};
var imageSelector = null;
var loading = false;

function formatDate(millis) {
  return new Date(millis).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

function getSceneDescription(dateString, isLatest) {
  var descriptions = [];

  if (dateString === BASELINE_DATE) {
    descriptions.push('No ship');
  }

  if (dateString === FIRST_SHIP_DATE) {
    descriptions.push('First image with ship');
  }

  if (isLatest) {
    descriptions.push('Most recent image');
  }

  return descriptions.join(' | ');
}

function buildSceneLabel(row, index) {
  var isLatest = index === sceneMetadata.length - 1;
  var description = getSceneDescription(row.date, isLatest);
  var label = formatDate(row.millis);

  if (description) {
    label += ' - ' + description;
  }

  // Include time only if more than one acquisition occurs on the same day.
  var sameDateCount = sceneMetadata.filter(function(other) {
    return other.date === row.date;
  }).length;

  if (sameDateCount > 1) {
    label += ' (' + row.time + ' UTC)';
  }

  return label;
}

function displayScene(index) {
  var row = sceneMetadata[index];
  var image = ee.Image(imageList.get(index));
  var isLatest = index === sceneMetadata.length - 1;
  var description = getSceneDescription(row.date, isLatest);

  appMap.layers().set(0, ui.Map.Layer(
    image.clip(displayRegion),
    imageVisParam,
    'Sentinel-2 | ' + row.date,
    true,
    1
  ));

  selectedDateLabel.setValue(formatDate(row.millis));
  selectedDescription.setValue(description || 'Sentinel-2 acquisition');
  selectedDescription.style().set(
    'color', description ? '#b2182b' : '#52616b'
  );

  metadataLabel.setValue(
    'Acquisition time: ' + row.time + ' UTC\n' +
    'Cloud coverage: ' + Number(row.cloud).toFixed(2) + '%\n' +
    'MGRS tile: ' + row.tile + '\n' +
    'Scene ID: ' + row.id
  );
}

// -----------------------------------------------------------------------------
// Live Sentinel-2 query
// -----------------------------------------------------------------------------
function loadImages() {
  if (loading) {
    return;
  }

  loading = true;
  statusLabel.setValue('Checking the Sentinel-2 catalog...');

  // Earth Engine filterDate end dates are exclusive.
  var dynamicEndDate = ee.Date(Date.now()).advance(1, 'day');

  var collection = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
    .filterBounds(shipLocation)
    .filterDate(START_DATE, dynamicEndDate)
    .filter(ee.Filter.lt(
      'CLOUDY_PIXEL_PERCENTAGE',
      MAX_CLOUD_PERCENT
    ))
    .distinct('system:time_start')
    .sort('system:time_start', true);

  collection.size().evaluate(function(count) {
    if (!count) {
      loading = false;
      selectorPanel.clear();
      selectedDateLabel.setValue('No qualifying images');
      selectedDescription.setValue('');
      metadataLabel.setValue('');
      statusLabel.setValue(
        'No Sentinel-2 images meet the date and <10% cloud filters.'
      );
      return;
    }

    var candidateList = collection.toList(count);

    var metadata = ee.List.sequence(0, count - 1).map(function(index) {
      var image = ee.Image(candidateList.get(index));

      return ee.Dictionary({
        date: image.date().format('yyyy-MM-dd'),
        time: image.date().format('HH:mm'),
        millis: image.get('system:time_start'),
        id: image.get('system:index'),
        tile: image.get('MGRS_TILE'),
        cloud: image.get('CLOUDY_PIXEL_PERCENTAGE')
      });
    });

    metadata.evaluate(function(rows) {
      loading = false;

      imageList = candidateList;
      sceneMetadata = rows;
      labelToIndex = {};

      var labels = rows.map(function(row, index) {
        var label = buildSceneLabel(row, index);
        labelToIndex[label] = index;
        return label;
      });

      selectorPanel.clear();
      imageSelector = ui.Select({
        items: labels,
        value: labels[labels.length - 1],
        onChange: function(label) {
          displayScene(labelToIndex[label]);
        },
        style: {stretch: 'horizontal'}
      });
      selectorPanel.add(imageSelector);

      statusLabel.setValue(
        rows.length + ' images available. The catalog is checked each time ' +
        'the app starts.'
      );

      displayScene(rows.length - 1);
    });
  });
}


var authorLabel = ui.Label(
  'Created by Victor Olsen | 14 August 2026',
  {
    fontSize: '12px',
    color: '#777777',
    margin: '12px 0 0 0'
  }
);

sidebar.add(authorLabel);

// Query the live catalog once whenever the app is opened or reloaded.
// Newly ingested qualifying images are therefore added without editing the app.
loadImages();
