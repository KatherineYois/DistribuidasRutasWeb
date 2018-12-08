var markers = [];
function initMap() {
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  //Instituto del Sur
  center: {lat: -16.417396887282578, lng: -71.51412963867188 }
});

var infowindow = new google.maps.InfoWindow();
var contentString = '<div id="content">'+'Hola'+ '</div>';

map.addListener('click', function(e) {
  placeMarkerAndPanTo(e.latLng, map);
});
}
 
var marker;
function placeMarkerAndPanTo(latLng, map) {
  marker = new google.maps.Marker({
  position: latLng,
  map: map,
  icon: 'images/pin.png'
});
map.panTo(latLng);
markers.push(marker);
}

for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i][0], markers[i][1]);
    bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0]
    });
    
    // Add info window to marker    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);
        }
    })(marker, i));
}


function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(map);
	  //console.log(markers[i].position.lat(),markers[i].position.lng());
	}
}
function clearMarkers() {

	setMapOnAll(null);
}
function eliminarMarkers() {

	clearMarkers();
	markers = [];
}

function markersEnvio(){
	return markers;
}