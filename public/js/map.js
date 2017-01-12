// Allows only one marker to be added at a time
var markerFlag = false;
var marker;

function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.935283, lng: -74.921360},
          zoom: 15,
          scrollwheel: true,
          zoomControl: true,
          mapTypeId: 'terrain',
        });
    
    // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
          addMarker(event.latLng, map);
        });
    
    // This event listener will grab the new location of a dragged marker
        //google.maps.event.addListener(marker, 'dragend', function(event) {
            //userAlert('warning', 'Dragged marker coordinates are currently not being saved.  This functionality has not been developed yet.');
        //});
        
    var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

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
            reportObj.position = [lat, lng];
            console.log(reportObj.position);
        } else {
            userAlert('warning', "You can only add one marker per report.  You can drag it to a new location.");
        }
      }
    // type can be any Bootstrap alert class (warning, success, etc)
    // 
    function userAlert(type, message) {
      //remove existing classes
      $('#userAlert').removeClass();
      $('#userAlert').addClass('alert-' + type + ' alert');
      $('#userAlert').text(message);
      $('#userAlert').fadeIn('slow');
    }

    // Get position of marker and save to object
    /*function getLocation(event) {
        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();
        // Save position to reportObj
        reportObj.position = [lat, lng];
        console.log(reportObj.position);
    }*/
