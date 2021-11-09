let map;


function getLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(_coords_read);
  } else { 
    alert("Sorry, but we cannot access your geolocation. Please try again later");
  }
}

function _coords_read(position){
    lat_long = {
      "lat":position.coords.latitude,
      "long":position.coords.longitude
    }
    return lat_long;
}

function display_usr_loc(location, zoom_num, map_container){
  map = new google.maps.Map(map_container, {
    center: { lat: location.lat, lng: location.long },
    zoom: zoom_num,
  });
}
// TEST
var current_location = getLocation();
var map_div = document.getElementById("maps");
display_usr_loc(current_location, 8, map_div);
// TEST