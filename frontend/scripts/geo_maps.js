let load_map;
let map;
let marker;
let circle;
exampleMaps = {
  "timestamp": 1421093714138,
  "coords":
    {
      "speed": null,
      "heading": null,
      "altitudeAccuracy": null,
      "accuracy": 20,
      "altitude": null,
      "longitude": -122.4091036,
      "latitude": 37.7837543
    }
}
//////////////THIS IS AN IMPORTANT FUNCTION TO ACCESS CHATS THROUGH GOOGLE MAPS
var addListenerToMarker = function(myMarker){
          myMarker.addListener('click', function() {
             console.log(myMarker.data);
}); 
}
///VERY IMPORTANT

function initMap() {
  console.log("Starting up Google Maps")
  getLocation();
}

function getLocation() {
  try{
    navigator.geolocation.getCurrentPosition(function(position){
      console.log(position.coords);
      var map_div = document.getElementById("map");
      display_map_loc(position.coords, 15, map_div);
      var user_main_marker = create_marker(map_div, position.coords, "You", null);
      add_radius_marker(user_main_marker, 1000, '#AA0000');
      return position;
    });
  }
  catch{
    alert("Sorry, but we had an error getting your geolocation. Please try again later");
    return {"coords":{
      "lat":undefined,
      "lng":undefined
    }};
  }
  
}

function display_map_loc(location, zoom_num, map_container, pic, title_marker){
  map = new google.maps.Map(map_container, {
    center: { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)},
    zoom: zoom_num,
  });
}   

function add_radius_marker(map, radius, color, point){
  circle = new google.maps.Circle({
    map: map,
    radius: radius,
    fillColor: color
  });
circle.bindTo('center', point, 'position');
}

function create_marker(map, pos, title_marker, pic){
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(pos.lat, pos.lng),
    title: title_marker,
    icon:pic
  });
  marker.setMap(map);
  return marker;
}

function bind_circle_radius(to_bind, _radius_m, _color){
  var circle = new google.maps.Circle({
    map: to_bind.map,
    radius: _radius_m,
    fillColor: _color
  });
  circle.bindTo('center', to_bind, 'position');
}

function get_usrs_inrange(list_of_users, user, _radius_m){
  var return_array = [];
  var coords_usr = user.location.lat+","+user.location.long;
  for(let i = 0; i<list_of_users.length; i++){
    var coords_ext = list_of_users[i].location.lat+","+list_of_users[i].location.long

    var from_radius = google.maps.geometry.spherical.computeDistanceBetween(coords_usr, coords_ext);
    if(from_radius <= _radius_m){
      return_array.push(list_of_users[i]);
    }
  }
  return return_array;
}

function show_near_users(list_of_users, user, _radius_m, map){
  var list = get_usrs_inrange(list_of_users, user, _radius_m);
  for(var i=0;i<list.length;i++){
    create_marker(map, list[i].location, list[i].usr_name+", ID: "+list[i].id, list[i].profile_pic);
  }
} 

// TEST for example user


// TEST end