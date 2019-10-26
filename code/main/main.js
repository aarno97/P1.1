var fetch = require('node-fetch');

// full screen size for apps is going to be 850 x 350

//GLOBALS
//!newsapi key is 'a520cc4f10344f78a98d2371e6af098d'
var state;  //(str) current state of mirror ("inactive", "home", or name of application in fullscreen);
var current_weather_data;  //json of local weather data
var weekly_weather_data
var c;  //for video capture
var din; //!font for header (DO NOT USE WITH CHROME)

//buttons
var button_home_weather;
var button_weather_back;
var button_home_clock;
var button_clock_back;
var button_home_map;
var button_map_back;

var buttons;

//clock parameters
var cx; 
var cy;
var secondsRadius;
var minutesRadius;
var hoursRadius;
var clockDiameter;


//map parameters
var default_map_img;
var school_map_img;
var work_map_img;
var default_map = false;
var school_map = false;
var work_map = false;

async function preload() {
    current_weather_data = await get_current_weather_data(5525577);
    weekly_weather_data = await get_weekly_weather_data(5525577);

    //!din = loadFont('fonts/D-DIN.otf')
}


async function setup() {
    createCanvas(1000, 500);

    //camera functions
    c = createCapture(VIDEO);
    c.size(1000,500);
    c.hide();  //prevents duplicate feed

    button_home_weather = createImg('icon_circle_red.png', 'alt');
    button_home_weather.size(50,50);
    button_home_weather.position(850, 437.5);
    button_home_weather.mousePressed(button_home_weather_handler);

    button_weather_back = createImg('icon_back_circle.png', 'alt');
    button_weather_back.size(50, 50);
    button_weather_back.position(475, 437.5);
    button_weather_back.mousePressed(button_weather_back_handler);

    button_home_clock = createImg('test_button.png', 'alt');
    button_home_clock.position(200, 437.5);
    button_home_clock.mousePressed(button_home_clock_handler);

    button_clock_back = createImg('icon_back_circle.png', 'alt');
    button_clock_back.size(50, 50);
    button_clock_back.position(475, 437.5);
    button_clock_back.mousePressed(button_clock_back_handler);

    button_home_map = createImg('test_button.png', 'alt');
    button_home_map.position(500, 437.5);
    button_home_map.mousePressed(button_home_map_handler);

    button_map_back = createImg('icon_back_circle.png', 'alt');
    button_map_back.size(50, 50);
    button_map_back.position(475, 437.5);
    button_map_back.mousePressed(button_map_back_handler);

    buttons = new Array();
    buttons.push(
        button_home_weather,
        button_weather_back,
        button_home_clock,
        button_clock_back,
        button_home_map,
        button_map_back
    );

    console.log(buttons.length)

    hide_all_buttons();
    state = "home";
    button_home_weather.show();
    button_home_clock.show();
    button_home_map.show();
    //button_home_weather = createImg('images/test_button.png', 'ok')

    //clock setup
    var radius = min(850, 350) / 2;
    secondsRadius = radius * 0.72;
    minutesRadius = radius * 0.60;
    hoursRadius = radius * 0.50;
    clockDiameter = radius * 1.8;
    
    cx = width / 2;
    cy = height / 2;

    //map setup
    default_map_img = loadImage('default_map.png');
    school_map_img = loadImage('school_map.png');
    work_map_img = loadImage('work_map.png');
    default_map = true;
}


function draw() {
    background(63);
    //mirror_camera();
    //console.log(state);

    switch(state) {
        case "initial":
            draw_initial();
            break;
        case "home":
            draw_home();
            break;
        case "weather":
            draw_weather_fullscreen();
            break;
        case "clock":
            draw_clock();
            break;
        case "map":
            draw_map();
            break;
        default:
            background(0);
    }
}


function draw_header () {
    //textFont(din);
    noStroke();
    draw_weather();
    draw_date();
    draw_time();
}

//========== CLOCK FUNCTIONS ==========

function draw_clock() {
    fill(1, 14, 36);
    rect(75, 75, 850, 350);
    // Draw the clock background
    fill(80);
    noStroke();
    ellipse(cx, cy, clockDiameter, clockDiameter);
  
    // Angles for sin() and cos() start at 3 o'clock;
    // subtract HALF_PI to make them start at the top
    var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI; 
    var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

    // Draw the hands of the clock
    stroke(255);
    strokeWeight(1);
    line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
    strokeWeight(2);
    line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
    strokeWeight(4);
    line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

    // Draw the minute ticks
    strokeWeight(2);
    beginShape(POINTS);
    for (var a = 0; a < 360; a += 6) {
    var angle = radians(a);
    var x = cx + cos(angle) * secondsRadius;
    var y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
    }
    
    endShape();

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    textFont('Courier New');
    
    text('12', 500, 110);
    text('1', 570, 125);
    text('2', 625, 180);
    text('3', 640, 250);
    text('4', 625, 320);
    text('5', 570, 375);
    text('6', 500, 395);
    text('7', 430, 375);
    text('8', 375, 320);
    text('9', 360, 250);
    text('10', 375, 180);
    text('11', 430, 125);

    draw_header();
}

//========== MAP FUNCTIONS ==========

function draw_map() {
    if ((mouseX >= 485 && mouseX <= 585) && (mouseY >= 370 && mouseY <= 420) && mouseIsPressed) {
        default_map = false;
        school_map = true;
        work_map = false;        
    }
    else if ((mouseX >= 635 && mouseX <= 735) && (mouseY >= 370 && mouseY <= 420) && mouseIsPressed) {
        default_map = false;
        school_map = false;
        work_map = true;        
    }

    if (default_map) {
        image(default_map_img, 75, 75, 850, 350);
    }
    else if (school_map) {
        image(school_map_img, 75, 75, 850, 350);
    }
    else if (work_map) {
        image(work_map_img, 75, 75, 850, 350);
    }

    fill(0);
    noStroke();
    rect(485, 370, 100, 50);
    rect(635, 370, 100, 50);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    textFont('Courier New');    
    text('SCHOOL', 535, 395);
    text('WORK', 685, 395);

    draw_header();
}

//========== WEATHER FUNCTIONS ==========

function draw_weather_fullscreen() {
    //background(33,33,33);

    fill(1, 14, 36);
    rect(75, 75, 850, 350);

    //divide into 5 sections for forecast
    stroke(255,255,255);
    line(245, 75, 245, 425);
    line(415, 75, 415, 425);
    line(585, 75, 585, 425);
    line(755, 75, 755, 425);

    if ((weekly_weather_data != null) && (current_weather_data != null)) {
        draw_weather_fullscreen_data();
    }

    fill(77,77,77);
    //ellipse(875, 462.5, 50, 50);
    draw_header();
}


function draw_weather_fullscreen_data() {
    //objects for next 5 days
    var day1 = current_weather_data;
    var day2 = weekly_weather_data.list[5];
    var day3 = weekly_weather_data.list[13];
    var day4 = weekly_weather_data.list[21];
    var day5 = weekly_weather_data.list[29];

    draw_weather_window(day1, 160, 150);
    draw_weather_window(day2, 330, 150);
    draw_weather_window(day3, 500, 150);
    draw_weather_window(day4, 670, 150);
    draw_weather_window(day5, 840, 150);
}


function draw_weather_window(data, x, y) {
    fill(255,255,255);
    textSize(30);
    textFont('Georgia');
    textAlign(CENTER);

    let f = to_fahrenheit(data.main.temp);
    let degrees = f + '\xB0'

    text(degrees, x, y);
}


function get_weekly_weather_data(cityID) {
    var key = 'c716233d515c9bd6c5a36ad3cf719885';
    return fetch('http://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&appid=' + key).then(response => response.json())
}


function draw_weather() {
    data = current_weather_data;
    if (data != null) {  //workaround for javascript's fucking async bullshit
        let f = to_fahrenheit(data.main.temp);  //calculate fahrenheit
        let degrees = f + '\xB0'  //unicode symbol for degree

        fill(255,255,255);
        textSize(30);
        textFont('Georgia');
        textAlign(RIGHT);
        text(degrees, 985, 35);
    }
}


function to_fahrenheit(k) {
    return Math.round(((parseFloat(k)-273.15)*1.8)+32);
}


function get_current_weather_data(cityID) {
    var key = 'c716233d515c9bd6c5a36ad3cf719885';
    return fetch('http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key).then(response => response.json());
  }


// ========== DATE FUNCTIONS ==========

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

// ========== TIME FUNCTIONS ==========

function draw_time() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var timeDay = ' a.m.';
    var zero = '';

    if (hour >= 12 && hour < 24) {
        timeDay = ' p.m.';
    }

    hour %= 12;
    if (hour == 0) {
        hour += 12;
    }

    if (minute < 10) {
        zero = '0';
    }

    fill(255,255,255);
    textSize(30);
    textFont('Georgia');
    textAlign(LEFT);
    text(hour + ':' + zero + minute + timeDay, 15, 35);
}

function draw_home() {
    mirror_camera();

    /*fill(255, 255, 255);
    ellipse(125, 435, 75, 75);
    ellipse(250, 435, 75, 75);
    ellipse(375, 435, 75, 75);
    ellipse(500, 435, 75, 75);
    ellipse(625, 435, 75, 75);
    ellipse(750, 435, 75, 75);

    fill(77,77,77);
    ellipse(875, 435, 75, 75);*/

    draw_header();
}


function draw_initial() {
    mirror_camera();
    draw_header();
}


// ========== CAMERA FUNCTIONS ==========

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


// ========== BUTTON HANDLERS ==========
function hide_all_buttons() {
    let i;
    for (i = 0; i < buttons.length; i++) {
        buttons[i].hide();
    }
}


function button_home_weather_handler() {
    hide_all_buttons();
    console.log('going to fullscreen weather');
    state = "weather";
    button_weather_back.show();
}


function button_weather_back_handler() {
    hide_all_buttons();
    state = "home";
    button_home_weather.show();
    button_home_clock.show();
    button_home_map.show();
}

function button_home_clock_handler() {
    hide_all_buttons();
    console.log('going to fullscreen clock');
    state = "clock";
    button_clock_back.show();
}

function button_clock_back_handler() {
    hide_all_buttons();
    state = "home";
    button_home_weather.show();
    button_home_clock.show();
    button_home_map.show();
}

function button_home_map_handler() {
    hide_all_buttons();
    console.log('going to fullscreen map');
    state = "map";
    button_map_back.show();
}

function button_map_back_handler() {
    hide_all_buttons();
    state = "home";
    button_home_weather.show();
    button_home_clock.show();
    button_home_map.show();
}