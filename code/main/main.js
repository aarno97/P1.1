var fetch = require('node-fetch');

// full screen size for apps is going to be 850 x 350

//GLOBALS
//OpenWeather lubbock code = 5525577
var state;  //(str) current state of mirror ("inactive", "home", or name of application in fullscreen);
var weather_data;  //json of local weather data
var c;  //for video capture
var din; //!font for header (DO NOT USE WITH CHROME)


async function preload() {
    weather_data = await get_weather_data(5525577);
    //din = loadFont('fonts/D-DIN.otf')
}


async function setup() {
    createCanvas(1000, 500);
    c = createCapture(VIDEO);
    c.size(1000,500);
    c.hide();  //prevents duplicate feed

}


function draw() {
    background(255)
    mirror_camera();
    draw_header();
}


function draw_header () {
    //textFont(din);

    draw_weather();
    draw_date();
}


function draw_clock() {}


function draw_weather() {
    data = weather_data;
    if (data != null) {  //workaround for javascript's fucking async bullshit
        let f = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);  //calculate fahrenheit
        let degrees = f + '\xB0'  //unicode symbol for degree

        fill(255,255,255);
        textSize(30);
        textFont('Georgia');
        textAlign(RIGHT);
        text(degrees, 985, 35);
    }
}


function get_weather_data(cityID) {
    var key = 'c716233d515c9bd6c5a36ad3cf719885';
    return fetch('http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key).then(response => response.json());
  }


function draw_date() {
    let date = get_date();

    fill(255,255,255);
    textSize(30);
    textFont('Georgia');
    textAlign(CENTER);
    text(date, 500, 35);
}


function get_date() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();

    return today.toLocaleDateString("en-US", options);  //nicely formatted date
}


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
