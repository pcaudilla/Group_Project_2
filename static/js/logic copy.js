
function createMap(speciesLayer) {

  // tile layer
  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

    // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the species layer
  var overlayMaps = {
    "Species": speciesLayer//,
    //"Fires": heatMapLayer
  };


  var map = L.map("map-id", {
    center: [-35.8177, 137.05305],
    zoom: 10,
    layers: [lightmap, speciesLayer] //add heatmap layer
  });

  // d3.csv(firePath, function (data) {

  //   var heatArray = []

  //   for (var i = 0; i < data.length; i++) {

  //     var lat = +data[i].latitude;
  //     var lng = +data[i].longitude;

  //     var latlng = L.latLng([lat, lng]);
  //     heatArray.push(latlng);

  //   };
  //   console.log(heatArray)

  //   var heatMapLayer = L.heatLayer(heatArray, {
  //     radius: 20,
  //     blur: 35
  //   }).addTo(map);

  // });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

};


function createSpeciesLayer(data) {

  var obsPoints = [];

  for (var i = 0; i < data.length; i++) {
    var lat = data[i].Latitude;
    var lng = data[i].Longitude;
    var point = L.marker([lat, lng]);
    obsPoints.push(point);
  };

  createMap(L.layerGroup(obsPoints));

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