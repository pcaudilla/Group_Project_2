var heatMapLayer;

d3.csv(firePath, function (data) {

    var heatArray = []

    for (var i = 0; i < data.length; i++) {
      console.log(data.length);
      var lat = +data[i].latitude;
      var lng = +data[i].longitude;

      var latlng = L.latLng([lat, lng]);
      heatArray.push(latlng);
      
    };

    heatMapLayer = L.heatLayer(heatArray, {
      radius: 8,
      blur: 10,
      minOpacity: 2,
      maxZoom: 20,
      gradient: {
        0.8: 'orange',
        1.0: 'red'
      }


    });

});

var layers = {
    layer1: {
        layer: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGNhdWRpbGxhIiwiYSI6ImNrNHp3cDRiejBmeHcza281ZTF5ZG5nMGkifQ.4Q3FJDweXD21tj5DkS2TyQ'),
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        id: "mapbox://styles/drusbury/ck5g5nug90ajz1jqmzcvyxix1",
        legend: '<i style="background: black; opacity: 0.5"></i><p><b>legend 1</b></p>'
    },
    layer2: {
        layer: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGNhdWRpbGxhIiwiYSI6ImNrNHp3cDRiejBmeHcza281ZTF5ZG5nMGkifQ.4Q3FJDweXD21tj5DkS2TyQ'),
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        id: "mapbox://styles/drusbury/ck5g5nug90ajz1jqmzcvyxix1",
        legend: '<i style="background: orange; opacity: 0.5"></i><p><b>legend 2</b></p>'
    },
    layer3: {
        layer: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGNhdWRpbGxhIiwiYSI6ImNrNHp3cDRiejBmeHcza281ZTF5ZG5nMGkifQ.4Q3FJDweXD21tj5DkS2TyQ'),
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        id: "mapbox://styles/drusbury/ck5g5nug90ajz1jqmzcvyxix1",
        legend: '<i style="background: black; opacity: 0.5"></i><p><b>legend 1</b></p>'
    },

};



var scenes = {
    scene1: {lat: -25.274398, lng: 133.775136, zoom: 4.5, layers: [layers.layer3], name: "Australia"},
    scene2: {lat: -35.8177, lng: 137.05305, zoom: 8, layers: [layers.layer2], name: "Southern Australia"},
    scene3: {lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer1, layers.layer2], name: "Kangaroo Island"},
    scene4: {lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer2, heatMapLayer], name: "scene 4"},
    scene5: {lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer2], name: "scene 5"},
    scene6: {lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer2], name: "scene 6"},
    scene7: {lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer2], name: "scene 7"},
    scene8: {lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer2], name: "scene 8"},
    scene9: {lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer2], name: "scene 9"}
};

$('#storymap').storymap({
    scenes: scenes,
    baselayer: layers.layer3,
    legend: true,
    loader: true,
    flyto: true,
    credits:  "Build with <i class='material-icons' style='color: red; font-size: 10px;'>favorite</i> from Bo Zhao",
    scalebar: true,
    scrolldown: true,
    progressline: true,
    navwidget: true,
    createMap: function () {
        var map = L.map($(".storymap-map")[0], {zoomControl: false}).setView([44, -120], 7);
        basemap = this.baselayer.layer.addTo(map);
        return map;
    }
});