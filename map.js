mapboxgl.accessToken = 'pk.eyJ1IjoiZjM1MDM5OTA3OSIsImEiOiJja3Y2eTlzenE5ZWFzMnBtbnk4Ymx1dXZpIn0.6V3aDmDv2ZCfW13BihQxtQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/f350399079/ckv6ywqct0rbs14mqrp7m6xx4',
    center: [108.355, 27.145],
    zoom: 3,
    Pitch: 0
});

const chapters = {
  'Production': {
    duration: 6000,
    bearing: 27,
    center: [120.0968282, 28.844722],
    zoom: 12,
    pitch: 0
  },
  'Distribution': {
    duration: 6000,
    center: [-121.234956, 44.0312565],
    zoom: 10,
    pitch: 0
  },
  'Australia': {
    bearing: 90,
    center: [114.5345777, -25.9444959],
    zoom: 5,
    speed: 0.6,

  },
  'South Africa': {
    bearing: 90,
    center: [24.8984908, -28.8135976],
    zoom:5
  },
  'South Africa1': {
    bearing: 90,
    center: [21.2792919, -29.9066269],
    zoom:5,
  },
};


let data = [
    {
        location: [117.98,25.2267353],
        content: 'Vaccum Bottle Suppliers'
    },
    {
        location: [120.11,29.11],
        content: 'Vaccum Bottle Suppliers'
    },
    {
        location: [119.06,36.488],
        content: 'Vaccum Bottle Suppliers'
    },
    {
        location: [120.23,33.38],
        content: 'Vaccum Bottle Suppliers'
    },
    {
        location: [112.0990742,37.7340484],
        content: 'Vaccum Bottle Suppliers'
    },
    {
        location: [117.211,30.60194],
        content: 'Vaccum Bottle Suppliers'
    },
    {
        location: [117.22185,39.12665],
        content: 'Vaccum Bottle Suppliers'
    },
    {
        location: [115.49198,38.85630],
        content: 'Vaccum Bottle Suppliers'
    },
    {
        location: [113.37663,33.70101],
        content: 'Vaccum Bottle Suppliers'
    },
    {
        location: [112.24954,30.96755],
        content: 'Vaccum Bottle Suppliers'
    },
    {
        location: [111.55135,27.28985],
        content: 'Vaccum Bottle Suppliers'
    },



    {
        location: [135.4472232,34.6973939],
        content: 'Zojirushi Production Japan'
    },
    {
        location: [135.5204108,34.6901865],
        content: 'Zojirushi Distribution Japan'
    },
    {
        location: [100.711675,13.8015388],
        content: 'Zojirushi Production Thailand'
    },
    {
        location: [100.6026579,13.7001134],
        content: 'Zojirushi Distribution Thailand'
    },
    {
        location: [-118.2946642,33.8558465],
        content: 'Zojirushi Distribution America'
    },


    {
        location: [121.1347803,31.146247],
        content: 'Kingstar Factory Location'
    },

    {
    location: [120.0968282, 28.844722],
    content: 'HydroFlask Production'
    },
    {
    location: [-121.234956, 44.0312565],
    content: 'HydroFlask Distribution'
    },
    {
    location: [114.5345777, -25.9444959],
    content: 'Iron Extraction<img src="https://www.orissapost.com/wp-content/uploads/2019/10/LEAD.jpg" />'
    },
    {
    location: [24.8984908, -28.8135976],
    content: 'Chromium Extraction<img src="https://sc04.alicdn.com/kf/UTB862S6DarFXKJk43Ovq6ybnpXaH.jpg" />'
    },
    {
    location: [21.2792919, -29.9066269],
    content: 'Nickle Extraction<img src="https://eurasia-news-online.com/wp-content/uploads/2021/03/Indonesia-nickel-production-electric_vehicles-eurasia-news-online.jpg" />'
    },




    ]


data.forEach(function(d) {

    let marker = new mapboxgl.Marker()
    marker.setLngLat(d.location)
    marker.addTo(map)

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})




















let activeChapterName = 'baker';
function setActiveChapter(chapterName) {
  if (chapterName === activeChapterName) return;

  map.flyTo(chapters[chapterName]);

  document.getElementById(chapterName).classList.add('active');
  document.getElementById(activeChapterName).classList.remove('active');

  activeChapterName = chapterName;
}

function isElementOnScreen(id) {
  const element = document.getElementById(id);
  const bounds = element.getBoundingClientRect();
  return bounds.top < window.innerHeight && bounds.bottom > 0;
}

// On every scroll event, check which element is on screen
window.onscroll = () => {
  for (const chapterName in chapters) {
    if (isElementOnScreen(chapterName)) {
      setActiveChapter(chapterName);
      break;
    }
  }
};

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
  showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
  maxWidth: 80,
  unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserLocation: true,
  fitBoundsOptions: {
  }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {
  // console.log(event.coords)

  // create new variables to store the attributes we're interested in from the event
  let lng = event.coords.longitude
  let lat = event.coords.latitude

  // debug
  console.log('geolocated:', lng, lat)

  // format lng lat values and display them on our 'info' element
  document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

map.on('click', function(event) {

  let lng = event.lngLat.lng
  let lat = event.lngLat.lat

  console.log("clicked:", lng, lat)

  document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})
