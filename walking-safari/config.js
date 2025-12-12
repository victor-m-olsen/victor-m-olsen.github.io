var config = {
    style: 'mapbox://styles/mapbox/standard-satellite',
    accessToken: 'pk.eyJ1Ijoidm9sc2VuIiwiYSI6ImNtajJ4aGtpMDB0MDkzZXI3dHc4bDF1MTcifQ.ZkgWXRiz52AsLYF7DUSBrA',
    showMarkers: true,
    markerColor: '#e07020',
    inset: true,
    insetOptions: {
        markerColor: '#ff8c42'
    },
    insetPosition: 'bottom-right',
    theme: 'safari',
    use3dTerrain: true,
    auto: false,
    title: 'Mobile Walking Safari',
    subtitle: 'The Ultimate Wilderness Experience in South Luangwa',
    byline: 'Robin Pope Safaris',
    footer: '',
    chapters: [
        {
            id: 'intro-zambia',
            alignment: 'center',
            hidden: false,
            title: 'South Luangwa National Park',
            image: '',
            description: '<span style="font-size: 18px; font-weight: bold; color: #5c3d2e;">Zambia, Africa</span><br><br>Welcome to one of the greatest wildlife sanctuaries in Africa. South Luangwa National Park is renowned as one of the finest walking safari destinations in the world.<br><br>Over the next seven days, you will journey through 9,050 km² of pristine wilderness, walking in the footsteps of the legendary safari pioneers.<br><br><em>Scroll to begin your adventure...</em>',
            location: {
                center: [31.65, -12.85],
                zoom: 8,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-1-nkwali',
            alignment: 'left',
            hidden: false,
            title: 'Day 1: Arrival at Nkwali Camp',
            image: './assets/day1-nkwali.png',
            description: '<span class="journey-badge">📍 Starting Point</span><br><br>Your adventure begins at Mfuwe International Airport where a Robin Pope Safaris guide will meet you. The one-hour drive to Nkwali Camp takes you through colourful villages and bush landscapes.<br><br>Nkwali Camp offers stunning views of the Luangwa River from Robin\'s private land overlooking the South Luangwa National Park. Six rooms with open-air bathrooms look out over the river. Enjoy lunch by the lagoon, afternoon tea, and your first game drive as the African sun sets.',
            location: {
                center: [31.738418, -13.117044],
                zoom: 13,
                pitch: 50,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-2-mupamadzi',
            alignment: 'right',
            hidden: false,
            title: 'Day 2: Journey to the Mupamadzi River',
            image: './assets/day2-mupamadzi.png',
            description: '<span class="journey-badge">🚙 90 km drive • ~3 hours</span><br><br>After an early breakfast, head north on a 90km bush road through remote parts of the park to the Mupamadzi River. Your mobile camp awaits with walk-in tents, an outdoor shower under a tree, and a rustic long-drop toilet.<br><br>This is THE wilderness experience of the South Luangwa. After lunch and a relaxing siesta, take an afternoon walk around camp, returning for sundowners and dinner under the stars.',
            location: {
                center: [31.482663, -12.591518],
                zoom: 13,
                pitch: 55,
                bearing: 30
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-3-mobile',
            alignment: 'left',
            hidden: false,
            title: 'Day 3: Walking the Wild',
            image: './assets/day3-mobile.png',
            description: '<span class="journey-badge">🚶 8 km walk • ~4 hours</span><br><br>Rise at sunrise for your first proper bush walk. The area is remote and wild, with varied terrain and shy wildlife unused to humans. From ants to buffalo, bird nests to lion tracks, you\'ll learn the many facets of the bush.<br><br>While you walk, the mobile camp moves to your next location. Arrive late morning to find lunch ready, followed by siesta and another afternoon walk.',
            location: {
                center: [31.458322, -12.657003],
                zoom: 13,
                pitch: 55,
                bearing: -20
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-4-explore',
            alignment: 'right',
            hidden: false,
            title: 'Day 4: Deeper into the Wilderness',
            image: './assets/day4-wilderness.png',
            description: '<span class="journey-badge">🚶 10 km walk • ~5 hours</span><br><br>Spend the day exploring the area on foot, immersing yourself in the sights, sounds, and smells of the African bush. Walking through the wilderness is completely different from driving - all your senses are alert.<br><br>Every sound, every movement acquires significance: the flap of a bird\'s wing, a tail swishing through tall grass. Return to the same campsite to enjoy another evening under the African sky.',
            location: {
                center: [31.374153, -12.655173],
                zoom: 13,
                pitch: 50,
                bearing: 45
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-5-6-river',
            alignment: 'left',
            hidden: false,
            title: 'Days 5 & 6: Along the Mupamadzi',
            image: './assets/day5-walking.png',
            description: '<span class="journey-badge">🚶 15 km total • 2 days walking</span><br><br>The camp moves again as you walk further down the Mupamadzi River, a major tributary of the Luangwa. All walks are led by an experienced naturalist and accompanied by an armed game scout.<br><br>As one of our guests said after walking for five days along the river, it is like reading an engrossing book, compared to watching a film. Your expert guide will teach you to hone your senses and spot the clues hidden in the bush.',
            location: {
                center: [31.442464, -12.747271],
                zoom: 12.5,
                pitch: 50,
                bearing: -30
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-7-tenatena',
            alignment: 'fully',
            hidden: false,
            title: 'Day 7: Tena Tena Camp',
            image: './assets/day7-tenatena.png',
            description: '<span class="journey-badge">🚙 75 km transfer • Boat crossing</span><br><br>After an early breakfast, a 4-5 hour transfer brings you to the Luangwa River crossing. Tena Tena staff will boat you across to this remote camp on a sweeping bend of the river.<br><br>Most meals are taken under a huge Mahogany tree. After a well-deserved siesta, enjoy an afternoon and evening game drive - time to rest those weary legs! This intimate camp offers exceptional service and stunning views as the perfect finale to your walking adventure.',
            location: {
                center: [31.903812, -12.995409],
                zoom: 13,
                pitch: 45,
                bearing: 15
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'journey-complete',
            alignment: 'center',
            hidden: false,
            title: 'Your Journey Awaits',
            image: '',
            description: '',
            location: {
                center: [31.65, -12.85],
                zoom: 9,
                pitch: 45,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};
