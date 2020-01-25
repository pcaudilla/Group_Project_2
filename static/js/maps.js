var heatArray = [];
var heatArrayAUS = [];
var malleeArray = [];
var echidnaArray = [];
var termiteArray = [];
var varanusArray = [];

d3.csv(firePathAUS, function (data) {

    for (var i = 0; i < data.length; i++) {

        var lat = +data[i].latitude;
        var lng = +data[i].longitude;

        var latlng = L.latLng([lat, lng]);
        heatArrayAUS.push(latlng);
    }
});


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
        
        var lat = +data[i].Latitude;
        var lng = +data[i].Longitude;

        var latlng = L.latLng([lat, lng]);
        malleeArray.push(latlng);
    }

});

d3.csv(termiteObs, function (data) {

    for (var i = 0; i < data.length; i++) {
        
        var lat = +data[i].Latitude;
        var lng = +data[i].Longitude;

        var latlng = L.latLng([lat, lng]);
        termiteArray.push(latlng);
    }

});


d3.csv(echidnaObs, function (data) {

    for (var i = 0; i < data.length; i++) {
        
        var lat = +data[i].Latitude;
        var lng = +data[i].Longitude;

        var latlng = L.latLng([lat, lng]);
        echidnaArray.push(latlng);
    }

});


d3.csv(varanusObs, function (data) {

    for (var i = 0; i < data.length; i++) {
        
        var lat = +data[i].Latitude;
        var lng = +data[i].Longitude;

        var latlng = L.latLng([lat, lng]);
        varanusArray.push(latlng);
    }

});



var layers = {
    layer1: {
        layer: L.tileLayer(MAPBOX_URL, {
            attribution: ATTRIBUTION,
            id: "mapbox.light",
            accessToken: API_KEY
        })
    },
    layer2: {
        layer: L. tileLayer(MAPBOX_URL, {
            attribution: ATTRIBUTION,
            id: "mapbox.light",
            accessToken: API_KEY
        })
    },
    layer3: {
        layer: L. tileLayer(MAPBOX_URL, {
            attribution: ATTRIBUTION,
            id: "mapbox.light",
            accessToken: API_KEY
        })
    }
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
        }),
        legend: '<i style="background: red; opacity: 1"></i><p><b>Fire Observations 9/1/19 to 1/13/20</b></p>'
    },
    heatLayerAUS: {

        layer: L.heatLayer(heatArrayAUS, {
            radius: 3,
            blur: 1,
            minOpacity: 2,
            //maxZoom: 20,
            gradient: {
                0.7: 'orange',
                1.0: 'red'
            }
        }),
        legend: '<i style="background: red; opacity: 1"></i><p><b>Fire Observations 9/1/19 to 1/13/20</b></p>'
    },
    malleeLayer: {
        layer: L.heatLayer(malleeArray, {
            radius: 4,
            blur: 2,
            minOpacity: 100,
            maxZoom: 20,
            gradient: {
                0.0: 'olivedrab',
                1.0: 'olivedrab'
            }
        }),
        legend: '<i style="background: olivedrab; opacity: 1"></i><p><b>Mallee Observations</b></p>'
    },

    termiteLayer: {
        layer: L.heatLayer(termiteArray, {
            radius: 15,
            blur: 2,
            minOpacity: 100,
            maxZoom: 20,
            gradient: {
                0.0: 'saddlebrown',
                1.0: 'saddlebrown'
            }
        }),
        legend: '<i style="background: saddlebrown; opacity: 1"></i><p><b>Termite Mound Observations</b></p>'
    },

    echidnaLayer: {
        layer: L.heatLayer(echidnaArray, {
            radius: 7,
            blur: 2,
            minOpacity: 100,
            maxZoom: 20,
            gradient: {
                0.0: 'black',
                1.0: 'black'
            }
        }),
        legend: '<i style="background: black; opacity: 1"></i><p><b>Echidna Observations</b></p>'
    },

    varanusLayer: {
        layer: L.heatLayer(varanusArray, {
            radius: 7,
            blur: 2,
            minOpacity: 100,
            maxZoom: 20,
            gradient: {
                0.0: 'gray',
                1.0: 'gray'
            }
        }),
        legend: '<i style="background: gray; opacity: 1"></i><p><b>Goanna Observations</b></p>'
    },
};


var scenes = {
    scene1: { lat: -27.274398, lng: 123.775136, zoom: 4.5, layers: [layers.layer1, overlayLayers.heatLayerAUS], name: "Australia" },
    scene2: { lat: -35.8177, lng: 137.05305, zoom: 8, layers: [layers.layer2], name: "Southern Australia" },
    scene3: { lat: -35.8177, lng: 136.9, zoom: 9.55, layers: [layers.layer3, layers.layer2], name: "Kangaroo Island" },
    scene4: { lat: -35.8177, lng: 136.9, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer], name: "Wildfires" },
    scene5: { lat: -35.8177, lng: 136.9, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer, overlayLayers.malleeLayer], name: "Mallee" },
    scene6: { lat: -35.8177, lng: 136.9, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer, overlayLayers.termiteLayer], name: "Termites" },
    scene7: { lat: -35.8177, lng: 136.9, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer, overlayLayers.echidnaLayer], name: "Echidna" },
    scene8: { lat: -35.8177, lng: 136.9, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer, overlayLayers.varanusLayer], name: "Goanna" },
    scene9: { lat: -35.8177, lng: 136.9, zoom: 9.55, layers: [layers.layer1, overlayLayers.heatLayer, overlayLayers.malleeLayer,overlayLayers.termiteLayer,overlayLayers.echidnaLayer,overlayLayers.varanusLayer], name: "scene 7" }

};          

$('#storymap').storymap({
    scenes: scenes,
    baselayer: layers.layer1,
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