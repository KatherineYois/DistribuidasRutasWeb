var markers = [];
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    //Instituto del Sur
    center: {lat: -16.417396887282578, lng: -71.51412963867188 }
  });
  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });
}
 
function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
  position: latLng,
  map: map,
  icon: 'images/pin.png'
  });
  map.panTo(latLng);
  google.maps.event.addListener(marker, 'click', function(event) {
    this.setMap(null);
  });
   markers.push(marker);
}

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
};

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
