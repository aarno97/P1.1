const fetch = require('node-fetch');

// full screen size for apps is going to be 850 x 350

//GLOBALS
//OpenWeather lubbock code = 5525577
var state;  //(str) current state of mirror ("inactive", "home", or name of application in fullscreen);
var weather_data;  //json of local weather data
let c;

//buton globals


async function setup() {
    createCanvas(1000, 500);
    c = createCapture(VIDEO);
    c.size(1000,500);
    //capture.size(1000, 500);
    c.hide();  //prevents duplicate feed
}


function draw() {
    background(255)
    mirror_camera();
    get_weather_data();
}


function draw_header () {}


function draw_clock() {}



function draw_weather(data) {
    fill(255,255,255);
    textSize(50);
    textFont('Georgia');
    text(data, 900, 65);
}


async function get_weather_data(cityID) {
    /*
    var key = 'c716233d515c9bd6c5a36ad3cf719885';
    fetch('http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(data => weather_data = data)
    .catch(function() {
      // catch any errors
      console.log('error caught');
    });*/

    var key = 'c716233d515c9bd6c5a36ad3cf719885';
    var resp = await fetch('http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key);
    return resp.json();
  }


function draw_date() {}


function draw_home() {
    fill(255, 255, 255);
    ellipse(125, 435, 75, 75);
    ellipse(250, 435, 75, 75);
    ellipse(375, 435, 75, 75);
    ellipse(500, 435, 75, 75);
    ellipse(625, 435, 75, 75);
    ellipse(750, 435, 75, 75);

    fill(77,77,77);
    ellipse(875, 435, 75, 75);
}


function draw_initial() {
    ellipse(960,460,50,50);
}


//CAMERA FUNCTIONS

//Flips camera feed horizontally to mimic real mirror
function mirror_camera() {
    translate(c.width, 0);
    scale(-1, 1);
    image(c, 0, 0, 1000, 500);
    translate(c.width, 0);
    scale(-1, 1);
}


function zoom() {}


function detect_motion() {}


//INITIALIZE OBJECTS
get_weather_data(5525577).then(function(resp) {weather_data = resp});
