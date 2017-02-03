var yourLocation = new Object;

(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            yourLocation.position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(yourLocation.position);
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
        center: yourLocation.position,
        zoom: 12,
        scrollwheel: true,
        zoomControl: true,
        mapTypeId: 'terrain',
        streetViewControl: false,
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation. You can still use the map controls to navigate to the area of your interest.');
}