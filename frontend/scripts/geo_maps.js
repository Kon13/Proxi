let load_map;
let map;

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
    navigator.geolocation.watchPosition(function(position){
      console.log(position);
      var map_div = document.getElementById("map");
      display_usr_loc(position.coords, 8, map_div, "You");
      //return position;
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

function display_usr_loc(location, zoom_num, map_container, pic, title_marker){
  map = new google.maps.Map(map_container, {
    center: { lat: 1, lng: 2},
    //center: { lat: parseFloat(location.lat), lng: parseFloat(location.lng)},
    zoom: zoom_num,
    icon: pic,
    title: title_marker
  });
}   

function add_radius_marker(map, radius, color, point){
  var circle = new google.maps.Circle({
    map: map,
    radius: 16093,    // 10 miles in metres
    fillColor: '#AA0000'
  });
circle.bindTo('center', marker, 'position');
}

function create_marker(select_map, pos, title_marker, pic){
  var marker = new google.maps.Marker({
    map: select_map,
    zoom: zoom_num,
    position: new google.maps.LatLng(pos.lat, pos.lng),
    title: title_marker
  });
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