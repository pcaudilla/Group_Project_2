var heatArray = []
var malleeArray = []

d3.csv(firePath, function (data) {

    for (var i = 0; i < data.length; i++) {

        var lat = +data[i].latitude;
        var lng = +data[i].longitude;

        var latlng = L.latLng([lat, lng]);
        heatArray.push(latlng);
    }

});

d3.csv(malleeObs, function (data) {

    for (var i = 0; i < data.length; i++) {
        console.log(data.length);
        var lat = +data[i].Latitude;
        var lng = +data[i].Longitude;

        var latlng = L.latLng([lat, lng]);
        malleeArray.push(latlng);
    }

});


var layers = {
    layer1: {
        layer: L.tileLayer(MAPBOX_URL, {
            attribution: ATTRIBUTION,
            id: "mapbox.streets",
            accessToken: API_KEY
        })
    },
};

var overlayLayers = {
    heatLayer: {

        layer: L.heatLayer(heatArray, {
            radius: 8,
            blur: 10,
            minOpacity: 2,
            maxZoom: 20,
            gradient: {
                0.8: 'orange',
                1.0: 'red'
            }
        })
    },
    malleeLayer: {
        layer: L.heatLayer(malleeArray, {
            radius: 3,
            blur: 3,
            minOpacity: 100,
            maxZoom: 20,
            gradient: {
                0.0: 'black',
                1.0: 'black'
            }
        })
    },
};


var scenes = {
    scene1: { lat: -25.274398, lng: 133.775136, zoom: 4.5, layers: [layers.layer1], name: "Australia" },
    scene2: { lat: -35.8177, lng: 137.05305, zoom: 8, layers: [layers.layer1], name: "Southern Australia" },
    scene3: { lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer1, layers.layer1], name: "Kangaroo Island" },
    scene4: { lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer], name: "Wildfires" },
    scene5: { lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer, overlayLayers.malleeLayer], name: "Mallee" },
    scene6: { lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer], name: "scene 6" },
    scene7: { lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer], name: "scene 7" },
    scene8: { lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer], name: "scene 7" },
    scene9: { lat: -35.8177, lng: 137, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer], name: "scene 7" }
};

$('#storymap').storymap({
    scenes: scenes,
    baselayer: layers.layer3,
    legend: true,
    loader: true,
    flyto: true,
    credits: "Build with <i class='material-icons' style='color: red; font-size: 10px;'>favorite</i> from Bo Zhao",
    scalebar: true,
    scrolldown: true,
    progressline: true,
    navwidget: true,
    createMap: function () {
        var map = L.map($(".storymap-map")[0], { zoomControl: false }).setView([44, -120], 7);
        basemap = this.baselayer.layer.addTo(map);
        return map;
    }
});