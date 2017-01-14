// Allows only one marker to be added at a time
var markerFlag = false;
var marker;

(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            reportObj.position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(reportObj.position);
            $('.loader').hide();
            $('#mapWrapper, #mapNextBtn').fadeIn('slow');
            $('.page-header h1').text('There you are!');
            $('.page-header p').text('Now just click the map to add a marker in the desired location and click continue.');
            initMap();
        })
    }
})();

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: reportObj.position,
        zoom: 12,
        scrollwheel: true,
        zoomControl: true,
        mapTypeId: 'terrain',
        streetViewControl: false,
    });

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function (event) {
        addMarker(event.latLng, map);
    });

    // This event listener will grab the new location of a dragged marker
    //google.maps.event.addListener(marker, 'click', function(event) {
    //console.log('new location detected');
    //});


    /*var infoWindow = new google.maps.InfoWindow({
        map: map
    });*/

    // Try HTML5 geolocation.
    /*if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }*/
} // end of initMap function

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation. Please use the map controls to place a marker on the desired location and then proceed.');
}

// Adds a marker to the map.
function addMarker(location, map) {
    // Only one marker per report
    if (!markerFlag) {
        markerFlag = true;
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        marker = new google.maps.Marker({
            position: location,
            //label: 'X',
            draggable: true,
            animation: google.maps.Animation.DROP,
            map: map
        });
        //getLocation();
        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();
        // Save position to reportObj
        reportObj.position = {
            'lat': lat,
            'lng': lng
        };
        console.log(reportObj.position);
    } else {
        userAlert('warning', "You can only add one marker per report.  However, you can drag the current marker to a new location.");
    }
}
// type can be any Bootstrap alert class (warning, success, etc)
// 
function userAlert(type, message) {
    //remove existing classes
    $('#userAlert').removeClass();
    $('#userAlert').addClass('alert-' + type + ' alert');
    $('#userAlert').text(message);
    $('#userAlert').fadeIn('slow').delay(5000).fadeOut('slow');
}

// Get position of marker and save to object
/*function getLocation(event) {
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();
    // Save position to reportObj
    reportObj.position = [lat, lng];
    console.log(reportObj.position);
}*/
