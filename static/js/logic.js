function createMap(fireLayer) {

// tile layer
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox://styles/drusbury/ck5g5nug90ajz1jqmzcvyxix1",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the fire layer
  var overlayMaps = {
   "Fires": fireLayer
  };

  var map = L.map("map-id", {
    center: [-35.8177,137.05305],
    zoom: 10,
    layers: [lightmap, fireLayer]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

};


function createFireMarkers(data) {
  var firePoints = [];

  //var coords = data.latitude

  for (var i = 0; i < data.length; i++){
    var lat = data[i].latitude;
    var lon = data[i].longitude;
    var brightness = data[i].bright_ti4;

    var firePoint = L.marker([lat, lon]);
    //console.log(data[i].latitude)
    //console.log(data[i].longitude)
    firePoints.push(firePoint);
    
  };
  createMap(L.layerGroup(firePoints));
};


d3.csv(dataPath, function(data) {
  data.forEach(function(d) {
    d.latitude = +d.latitude;
    d.longitude = +d.longitude;
    d.bright_ti4 = +d.bright_ti4
    d.scan = +d.scan
    d.track = +d.track
    d.acq_date = +d.acq_date
    d.acq_time = +d.acq_time
    d.bright_ti5 = +d.bright_ti5
    d.frp = +d.frp

  });
  createFireMarkers(data);
});