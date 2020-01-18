var myMap = L.map("map", {
  center: [-35.5, 137.2],
  zoom: 9.2
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://api.gbif.org/v2/map/occurrence/density/0/0/0@1x.png?taxonKey=212&bin=hex&hexPerTile=30&style=classic-noborder.poly"

console.log(url)

d3.json(url, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(map);
});


