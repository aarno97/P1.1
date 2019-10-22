const fetch = require("node-fetch");

// full screen size for apps is going to be 850 x 350

//GLOBALS
//OpenWeather lubbock code = 5525577
var state;  //(str) current state of mirror ("inactive", "home", or name of application in fullscreen);
var weather_data;  //json of local weather data
let capture;


function setup() {
    createCanvas(1000, 500);
    capture = createCapture(VIDEO);
    capture.size(1000, 500);
    capture.hide();  //prevents duplicate feed

    get_weather_data(5525577);
}


function draw() {
    //draw mirrored webcam feed as background
    //mirror_camera();

    //TODO: switch statement over state global to determine what to draw
    //draw_home();
    draw_weather();
}


function draw_header () {}


function draw_clock() {}


function draw_weather() {
    var f = Math.round(((parseFloat(weather_data.main.temp)-273.15)*1.8)+32);
    textSize(32);
    text(f, 50, 40);
}


function get_weather_data(cityID) {
    var key = '{c716233d515c9bd6c5a36ad3cf719885}';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
    weather_data = data;
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
    translate(capture.width, 0);
    scale(-1, 1);
    image(capture, 0, 0, 1000, 500);
    translate(capture.width, 0);
    scale(-1, 1);
}


function zoom() {}


function detect_motion() {}


//INITIALIZE OBJECTS
get_weather_data(5525577);