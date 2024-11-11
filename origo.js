const x = document.getElementById("demo");
const c = document.getElementById("coords")
let pos1;
let pos2;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(printPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function printPosition(position) {
    pos1 = position.coords.latitude;
    pos2 = position.coords.longitude;
    x.innerHTML = 
        "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}


function printCoordinates() {
    let o = calculateCoordinates(pos1, pos2)
    c.innerHTML = 
        "Här kommer dina nya koordinater: " + 
        "<br>Latitude: " + o[0] +
        "<br>Longitude: " + o[1];
}


function calculateCoordinates(latitude, longitude) {
    const origo_log = 20.3168576;
    const origo_lat = 63.8191787;
    const other_side = 180 - origo_log;

    if ((latitude > 0 && longitude > 0) || (latitude < 0 && longitude > 0))
        {
            longitude = longitude - origo_log;
            latitude = latitude - origo_lat;
        } else if ((latitude > 0 && longitude < 0) || (latitude < 0 && longitude < 0)){ 
            if(((other_side * -1) > longitude && latitude < origo_lat) || ((other_side *-1) > longitude && latitude > origo_lat)){
                longitude = longitude - origo_log;
                latitude = latitude - origo_lat; 
            }
            else if((-other_side < longitude && latitude < origo_lat) || (-other_side < longitude && latitude > origo_lat)){
                longitude = (180 - ((longitude + other_side))) *-1;
                latitude = latitude - origo_lat;
            }
        } else if (latitude == 0 && longitude == 0) {
            longitude = -20.307882;
            latitude = -63.8205842;
        }
    
    return [latitude, longitude];
}
