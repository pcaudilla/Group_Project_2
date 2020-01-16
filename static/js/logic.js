//function createMap(fireLayer) {
  var map = L.map("map-id", {
    center: [-35.8177528,137.0530524],
    zoom: 10,
    //layers: [lightmap, fireLayer]
  });
// tile layer
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox://styles/drusbury/ck5g5nug90ajz1jqmzcvyxix1",
    accessToken: API_KEY
  }).addTo(map);

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the fire layer
  var overlayMaps = {
    "Fires": fireLayer
  };

  // Create the map object with options


//}



d3.read_csv()