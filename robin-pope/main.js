// ===== Initialize when DOM is ready =====
document.addEventListener('DOMContentLoaded', function() {
  initMap();
  initCollapsibles();
  initDownloadButton();
  setCurrentYear();
});

// Store markers for bidirectional interaction
const waypointMarkers = {};

// ===== Map Initialization =====
function initMap() {
  // Create map centered on route midpoint
  const map = L.map('map', {
    scrollWheelZoom: false
  }).setView([-13.5, 32.5], 9);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Load route and waypoints
  loadGeoJSONRoute(map);
  loadWaypoints(map);
}

function loadGeoJSONRoute(map) {
  fetch('assets/route.geojson')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load GeoJSON file');
      return response.json();
    })
    .then(geojson => {
      // Add GeoJSON layer with styling (Robin Pope brand color)
      const routeLayer = L.geoJSON(geojson, {
        style: {
          color: '#4E453C',
          weight: 4,
          opacity: 0.85
        }
      }).addTo(map);
      
      // Fit map to route bounds
      map.fitBounds(routeLayer.getBounds(), {
        padding: [30, 30]
      });
      
      // Fix grey areas by recalculating map size after bounds change
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    })
    .catch(error => {
      console.error('Error loading GeoJSON:', error);
    });
}

function loadWaypoints(map) {
  fetch('assets/waypoints.geojson')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load waypoints file');
      return response.json();
    })
    .then(geojson => {
      const timeline = document.getElementById('timeline');
      const timelineScroll = document.getElementById('timeline-scroll');
      
      // Sort features by id
      const features = geojson.features.sort((a, b) => a.properties.id - b.properties.id);
      
      features.forEach((feature, index) => {
        const props = feature.properties;
        const coords = feature.geometry.coordinates;
        const waypointId = props.id;
        
        // Create timeline item with numbered marker matching the map
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.id = 'waypoint-' + waypointId;
        timelineItem.setAttribute('data-testid', 'timeline-item-' + waypointId);
        timelineItem.setAttribute('data-waypoint-id', waypointId);
        timelineItem.innerHTML = `
          <div class="timeline-number">${waypointId}</div>
          <div class="timeline-content">
            <h4>${props.label}</h4>
            <p>${props.directions}</p>
          </div>
        `;
        timeline.appendChild(timelineItem);
        
        // Create custom marker icon with number
        const markerIcon = L.divIcon({
          className: 'waypoint-marker',
          html: `<div class="marker-circle" id="marker-circle-${waypointId}">${waypointId}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });
        
        // Add marker to map (GeoJSON coords are [lon, lat])
        const marker = L.marker([coords[1], coords[0]], {
          icon: markerIcon
        }).addTo(map);
        
        // Store marker reference for bidirectional interaction
        waypointMarkers[waypointId] = marker;
        
        // Add tooltip with label
        marker.bindTooltip(props.label, {
          permanent: false,
          direction: 'top',
          offset: [0, -10]
        });
        
        // Map marker click -> highlight timeline item
        marker.on('click', function() {
          highlightTimelineItem(waypointId, timelineScroll);
        });
        
        // Timeline item click -> highlight map marker
        timelineItem.addEventListener('click', function() {
          highlightMapMarker(waypointId, map);
        });
      });
    })
    .catch(error => {
      console.error('Error loading waypoints:', error);
    });
}

// Highlight timeline item when map marker is clicked
function highlightTimelineItem(waypointId, timelineScroll) {
  const element = document.getElementById('waypoint-' + waypointId);
  if (element && timelineScroll) {
    // Remove previous highlights
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.classList.remove('highlighted');
    });
    element.classList.add('highlighted');
    
    // Scroll within the timeline container only
    const containerTop = timelineScroll.getBoundingClientRect().top;
    const elementTop = element.getBoundingClientRect().top;
    const scrollOffset = timelineScroll.scrollTop + (elementTop - containerTop);
    
    timelineScroll.scrollTo({
      top: scrollOffset,
      behavior: 'smooth'
    });
  }
}

// Highlight map marker when timeline item is clicked
function highlightMapMarker(waypointId, map) {
  // Remove previous marker highlights
  document.querySelectorAll('.marker-circle').forEach(circle => {
    circle.classList.remove('marker-highlighted');
  });
  
  // Add highlight to clicked marker
  const markerCircle = document.getElementById('marker-circle-' + waypointId);
  if (markerCircle) {
    markerCircle.classList.add('marker-highlighted');
    
    // Remove highlight after animation
    setTimeout(() => {
      markerCircle.classList.remove('marker-highlighted');
    }, 1500);
  }
  
  // Also highlight the timeline item
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.classList.remove('highlighted');
  });
  const timelineItem = document.getElementById('waypoint-' + waypointId);
  if (timelineItem) {
    timelineItem.classList.add('highlighted');
  }
  
  // Pan map to the marker
  const marker = waypointMarkers[waypointId];
  if (marker) {
    map.panTo(marker.getLatLng(), { animate: true });
  }
}

// ===== Collapsible Sections =====
function initCollapsibles() {
  const triggers = document.querySelectorAll('.collapsible-trigger');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const content = document.getElementById(targetId);
      
      // Toggle open state
      this.classList.toggle('open');
      content.classList.toggle('open');
    });
  });
}

// ===== Download Button =====
function initDownloadButton() {
  const downloadBtn = document.getElementById('downloadBtn');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  
  downloadBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'assets/route.gpx';
    link.download = 'Lilongwe-RobinsHouse.gpx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  downloadPdfBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'assets/route-directions.pdf';
    link.download = 'RPS-Route-Directions-Lilongwe-to-South-Luangwa.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// ===== Set Current Year in Footer =====
function setCurrentYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}
