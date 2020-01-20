
var speciesPath = 'static/data/species_locations/kangaroo.csv';

function createMap(speciesLayer, speciesName) {
  var heatMapLayer;
  // tile layer
  var baseLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 50,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

    // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Satellite": baseLayer
  };

  // Create an overlayMaps object to hold the species layer
  var overlayMaps = {
    [speciesName]: speciesLayer//,
    //"Fires": heatMapLayer
  };

  var map = L.map("map-id", {
    center: [-35.8177, 137.05305],
    zoom: 10,
    layers: [baseLayer, speciesLayer] //add heatmap layer
  });

  d3.csv(firePath, function (data) {

    var heatArray = []

    for (var i = 0; i < data.length; i++) {

      var lat = +data[i].latitude;
      var lng = +data[i].longitude;

      var latlng = L.latLng([lat, lng]);
      heatArray.push(latlng);

    };
    

    heatMapLayer = L.heatLayer(heatArray, {
      radius: 20,
      blur: 5,
      minOpacity: 20,
      maxZoom: 20,
      gradient: {
        0.4: 'Orange',
        0.6: 'Orange',
        1.0: 'Red'
      }


    }).addTo(map);

  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

};


function createSpeciesLayer(data) {

  var speciesIcon = L.icon({
    iconUrl: '../../images/kangaroo_icon.png',
    iconSize: [48, 68],
    iconAnchor: [24, 0]
  })

  var obsPoints = [];

  for (var i = 0; i < data.length; i++) {
    var lat = data[i].Latitude;
    var lng = data[i].Longitude;
    var point = L.marker([lat, lng], {icon: speciesIcon});
    obsPoints.push(point);
  };

  var speciesName = data[0].Species;
  createMap(L.layerGroup(obsPoints), speciesName);

};


d3.csv(speciesPath, function (data) {
  data.forEach(function (d) {
    d.latitude = +d.Latitude;
    d.longitude = +d.Longitude;
    // d.bright_ti4 = +d.bright_ti4
    // d.scan = +d.scan
    // d.track = +d.track
    // d.acq_date = +d.acq_date
    // d.acq_time = +d.acq_time
    // d.bright_ti5 = +d.bright_ti5
    // d.frp = +d.frp

  });


  createSpeciesLayer(data);

});