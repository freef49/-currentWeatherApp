//Get user latitude and longitude

var myLongitude = 0;
var myLatitude = 0;

function gotLocation(loc){
    myLongitude = loc.coords.longitude;
    myLatitude = loc.coords.latitude;

    if (myLatitude !== 0 && myLongitude !== 0){
        getWeatherJSON(function (data) {
            getWeather(data);
            // Google Maps Scripts
            var map = null;
        // Create our google map below
            google.maps.event.addDomListener(window, 'load', init);
            google.maps.event.addDomListener(window, 'resize', function() {
                map.setCenter(new google.maps.LatLng(myLatitude, myLongitude));
            });
            function init() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 15,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(myLatitude, myLongitude), // New York

                    // Disables the default Google Maps UI components
                    disableDefaultUI: true,
                    scrollwheel: false,
                    draggable: false,

                    // How you would like to style the map.
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#000000"
                        }, {
                            "lightness": 17
                        }]
                    }, {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#000000"
                        }, {
                            "lightness": 20
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#000000"
                        }, {
                            "lightness": 17
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [{
                            "color": "#000000"
                        }, {
                            "lightness": 29
                        }, {
                            "weight": 0.2
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#000000"
                        }, {
                            "lightness": 18
                        }]
                    }, {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#000000"
                        }, {
                            "lightness": 16
                        }]
                    }, {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#000000"
                        }, {
                            "lightness": 21
                        }]
                    }, {
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "visibility": "on"
                        }, {
                            "color": "#000000"
                        }, {
                            "lightness": 16
                        }]
                    }, {
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "saturation": 36
                        }, {
                            "color": "#000000"
                        }, {
                            "lightness": 40
                        }]
                    }, {
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#000000"
                        }, {
                            "lightness": 19
                        }]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#000000"
                        }, {
                            "lightness": 20
                        }]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [{
                            "color": "#000000"
                        }, {
                            "lightness": 17
                        }, {
                            "weight": 1.2
                        }]
                    }]
                };

                // Get the HTML DOM element that will contain your map
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using out element and options defined above
                map = new google.maps.Map(mapElement, mapOptions);

                // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
                var image = 'img/map-marker.png';
                var myLatLng = new google.maps.LatLng(myLatitude, myLongitude);
                var beachMarker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: image
                });
            }
        });
    }


}

function failedToGetLocation(message) {
    console.log("fail");
}



//Weather JSON call

function getWeatherJSON(dataPassed) {

    var forecaseIoKey = "bb81f8ffe386f2380d9c827715f05b09";
    var JSONurl = "https://api.forecast.io/forecast/"+ forecaseIoKey +"/" + myLatitude + "," + myLongitude + "?units=si";

    $.ajax({
        dataType: "jsonp",
        url: JSONurl,
        success: dataPassed
    });

    console.log(JSONurl);
}
function getWeather(data) {
    var weather_html;

    weather_html = "<h1 class=\"summary\">" + data.currently.summary + "</h1>";
    weather_html += "<img class=\"weatherImage\" src=\"img/" + data.currently.icon + ".png\">"
    weather_html += "<h2 class=\"currentTemp\">" + data.currently.temperature + "&deg;C</h2>";
    document.getElementById('weather').innerHTML = weather_html;
};

//wait for the Lat and Long to be grabbed

//spin js plugin
var opts = {
    lines: 13 // The number of lines to draw
    , length: 45 // The length of each line
    , width: 14 // The line thickness
    , radius: 50 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#FFF' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: true // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
}

var spinner = new Spinner(opts).spin()
document.getElementById("weather").appendChild(spinner.el);


navigator.geolocation.getCurrentPosition(gotLocation, failedToGetLocation);


//Google Maps



