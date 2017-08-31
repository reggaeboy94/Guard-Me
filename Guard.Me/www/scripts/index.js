document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log("navigator.geolocation works well");
    }


var map;

document.getElementById("mapButton").addEventListener("click", initMap);
document.getElementById("homeButton").addEventListener("click", initMap2);            
			
function initMap() {
	navigator.geolocation.getCurrentPosition(function(position) {
		var myLocation = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
	setPos(myLocation);
	});
}
             
            

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

function processResults(results, status, pagination) {
	if (status !== google.maps.places.PlacesServiceStatus.OK) {
		return;
	} else {
		createMarkers(results);
	}
}

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

function initMap2() {
	navigator.geolocation.getCurrentPosition(function(position) {
		var myLocation = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
		};
		
		map = new google.maps.Map(document.getElementById('map'), {
		center: myLocation,
		zoom: 11
		
});
	
	
	});
	
}
			
			
			