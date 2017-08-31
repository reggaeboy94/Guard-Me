
//funkcja sprawdzająca czy urządzenie jest gotowe i zwracająca wartość do konsoli
document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log("navigator.geolocation works well");
    }

//zmienna przechowująca mapę
var map;

//event listenery dla przycisków na stronie głównej
document.getElementById("mapButton").addEventListener("click", initMap);
document.getElementById("homeButton").addEventListener("click", initMap2);            

// funkcja tworząca mapę ze znacznikami okolicznych szpitali - funkcjonalność emergency points			
function initMap() {
	navigator.geolocation.getCurrentPosition(function(position) {
		var myLocation = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
	setPos(myLocation);
	});
}
             
            
// funkcja rysująca mapę i centrująca ją na pobranych koordynatach
function setPos(myLocation) {
	map = new google.maps.Map(document.getElementById('map'), {
		center: myLocation,
		zoom: 11
	});
	var service = new google.maps.places.PlacesService(map);
		service.nearbySearch({
                location: myLocation,
                radius: 4000,
                types: ['hospital']
        }, processResults);
}

//funkcja sprawdzająca czy biblioteka places dziala poprawnie
function processResults(results, status, pagination) {
	if (status !== google.maps.places.PlacesServiceStatus.OK) {
		return;
	} else {
		createMarkers(results);
	}
}

// funkcja tworząca markery
function createMarkers(places) {
	var bounds = new google.maps.LatLngBounds();
	var placesList = document.getElementById('places');

		for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

			var marker = new google.maps.Marker({
				map: map,
				icon: image,
				title: place.name,
				animation: google.maps.Animation.DROP,
				position: place.geometry.location
			});

			bounds.extend(place.geometry.location);
        }
    map.fitBounds(bounds);
}

// wersja robocza funkcji 
function initMap2() {
	var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map2'), {
          zoom: 14,
          center: {lat:  50.0646501, lng: 19.9449799}
        });
        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: {lat:  50.0646501, lng: 19.9449799},  
          destination: {lat:  50.0646501, lng: 19.9449799},  
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Error: ' + status);
          }
        });
      }
			
			
			