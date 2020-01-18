function createMap(speciesLayer) {

// tile layer
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox://styles/drusbury/ck5g5nug90ajz1jqmzcvyxix1",
    accessToken: API_KEY
  });

  var cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": 2,
    "maxOpacity": .8,
    // scales the radius based on map zoom
    "scaleRadius": true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": true,
    // which field name in your data represents the latitude - default "lat"
    latField: 'Latitude',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'Longitude',
    // which field name in your data represents the data value - default "value"
    valueField: 'count'
  };

  var heatMapLayer = HeatmapOverlay(cfg);

  d3.csv(firePath, function(data) {
    data.forEach(function(d) {
      d.latitude = +d.latitude;
      d.longitude = +d.longitude;
    });
    heatMapLayer.setData(data)
  });
  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the species layer
  var overlayMaps = {
   "Species": speciesLayer,
   "Fires": heatMapLayer
  };


  var map = L.map("map-id", {
    center: [-35.8177,137.05305],
    zoom: 10,
    layers: [lightmap, heatMapLayer, speciesLayer]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

};


function createSpeciesLayer(data) {
  var obsPoints = [];

  for (var i = 0; i < data.length; i++){
    var lat = data[i].Latitude;
    var lon = data[i].Longitude;
    var point = L.marker([lat, lon]);
    obsPoints.push(point);
  };

  createMap(L.layerGroup(obsPoints));

};


d3.csv(speciesPath, function(data) {
  data.forEach(function(d) {
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