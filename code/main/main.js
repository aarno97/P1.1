// var fetch = require('node-fetch');

// full screen size for apps is going to be 850 x 350

//GLOBALS
//!newsapi key is 'a520cc4f10344f78a98d2371e6af098d'
var state;  //(str) current state of mirror ("inactive", "home", or name of application in fullscreen);
var current_weather_data;  //json of local weather data
var weekly_weather_data;
var newsfeed_data;
var c;  //for video capture
var din; //!font for header (DO NOT USE WITH CHROME)

//buttons
var button_home_weather;
var button_weather_back;
var button_home_clock;
var button_clock_back;
var button_home_map;
var button_map_back;
var button_home_newsfeed;
var button_newsfeed_back;
var button_home_back;
var button_home_health;
var button_health_back;
var button_initial_home;

let button_home_music;
let button_home_calendar;
let button_back;

let HealthState = 'Exercise';
let Exercise;
let Move;
let Sleep;
let Stand;
let Step;
let ExerButton;
let MovButton;
let SleeButton;
let StanButton;
let SteButton;

var buttons;

//clock parameters
var cx;
var cy;
var secondsRadius;
var minutesRadius;
var hoursRadius;
var clockDiameter;
var clockButton = true;
var timerButton = false;
var stopwatchButton = false;
var startTimer = false;
var startStopWatch = false;
var timer;
var timerHour;
var timerMinute;
var timerSecond;
var stopwatch;
var stopwatchTenthSecond;
var stopwatchSecond;
var stopwatchMinute;

//map parameters
var default_map_img;
var school_map_img;
var work_map_img;
var default_map = false;
var school_map = false;
var work_map = false;

//weather icons
var icon_sunnny;
var icon_partlycloudy;
var icon_cloudy;
var icon_rainy;

async function preload() {
    //!din = loadFont('fonts/D-DIN.otf')
}


async function setup() {
    createCanvas(1000, 500);

    //camera functions
    c = createCapture(VIDEO);
    c.size(1000,500);
    c.hide();  //prevents duplicate feed

    //get data from external sources
    newsfeed_data = await get_newsfeed_data();
    current_weather_data = await get_current_weather_data(5525577);
    weekly_weather_data = await get_weekly_weather_data(5525577);

    icon_sunnny = loadImage("icon_sunny.png");
    icon_partlycloudy = loadImage("icon_partlycloudy.png");
    icon_cloudy = loadImage("icon_cloudy.png");
    icon_rainy = loadImage("icon_rainy.png");

    icon_sunnny.resize(100, 0);
    icon_partlycloudy.resize(100,0);
    icon_rainy.resize(100,0);
    icon_cloudy.resize(100,0);

    //Possible implementation point is to remove all 'back' icons (as they are repeated multiple times), and keep one
    //button setup
    button_home_weather = createImg('icon_weather.png', 'alt');
    button_home_weather.size(50,50);
    button_home_weather.position(100, 437.5);
    button_home_weather.mousePressed(button_home_weather_handler);

    button_weather_back = createImg('icon_back_circle.png', 'alt');
    button_weather_back.size(50, 50);
    button_weather_back.position(475, 437.5);
    button_weather_back.mousePressed(button_weather_back_handler);

    button_home_clock = createImg('icon_clock.png', 'alt');
    button_home_clock.size(50,50)
    button_home_clock.position(200, 437.5);
    button_home_clock.mousePressed(button_home_clock_handler);

    button_clock_back = createImg('icon_back_circle.png', 'alt');
    button_clock_back.size(50, 50);
    button_clock_back.position(475, 437.5);
    button_clock_back.mousePressed(button_clock_back_handler);

    button_home_map = createImg('icon_map.png', 'alt');
    button_home_map.size(50,50);
    button_home_map.position(300, 437.5);
    button_home_map.mousePressed(button_home_map_handler);

    button_map_back = createImg('icon_back_circle.png', 'alt');
    button_map_back.size(50, 50);
    button_map_back.position(475, 437.5);
    button_map_back.mousePressed(button_map_back_handler);

    button_home_newsfeed = createImg('icon_newsfeed.png', 'alt');
    button_home_newsfeed.position(400, 437.5);
    button_home_newsfeed.size(50,50);
    button_home_newsfeed.mousePressed(button_home_newsfeed_handler);

    button_newsfeed_back = createImg('icon_back_circle.png', 'alt');
    button_newsfeed_back.size(50, 50);
    button_newsfeed_back.position(475, 437.5);
    button_newsfeed_back.mousePressed(button_newsfeed_back_handler);

    button_home_health = createImg('icon_health.png', 'alt');
    button_home_health.position(500, 437.5);
    button_home_health.size(50,50);
    button_home_health.mousePressed(button_home_health_handler);

    button_health_back = createImg('icon_back_circle.png', 'alt');
    button_health_back.size(50, 50);
    button_health_back.position(475, 437.5);
    button_health_back.mousePressed(button_health_back_handler);

    button_initial_home = createImg('icon_home.png', 'alt');
    button_initial_home.size(50,50);
    button_initial_home.position(875, 375);
    button_initial_home.mousePressed(button_initial_home_handler);

    button_home_back = createImg('icon_back_circle.png', 'alt');
    button_home_back.size(50, 50);
    button_home_back.position(857.14, 437.5);
    button_home_back.mousePressed(button_home_back_handler);

    /* we are expected by Apple to use their images but I've already changed it more than they like so if someone
    wants to make an image that will match the style of the rest of the images that's fine :D
     */
    button_home_music = createImg('icon_music.png', 'alt');
    button_home_music.size(50, 50);
    button_home_music.position(600, 437.5);
    button_home_music.mousePressed(button_home_music_handler);

    button_back = createImg('icon_back_circle.png', 'alt');
    button_back.size(50, 50);
    button_back.position(475, 437.5);
    button_back.mousePressed(button_music_back_handler);

    button_home_calendar = createImg('icon_calendar.png', 'alt');
    button_home_calendar.size(50, 50);
    button_home_calendar.position(700, 437.5);
    button_home_calendar.mousePressed(button_home_calendar_handler);

    buttons = [];
    buttons.push(
        button_home_weather,
        button_weather_back,
        button_home_clock,
        button_clock_back,
        button_home_map,
        button_map_back,
        button_home_newsfeed,
        button_newsfeed_back,
        button_home_health,
        button_health_back,
        button_home_back,
        button_initial_home,
        button_home_music,
        button_home_calendar,
        button_back
    );

    console.log(buttons.length);

    hide_all_buttons();
    state = "initial";
    button_initial_home.show();

    //clock setup
    var radius = min(850, 350) / 2;
    secondsRadius = radius * 0.72;
    minutesRadius = radius * 0.60;
    hoursRadius = radius * 0.50;
    clockDiameter = radius * 1.8;

    cx = width / 2;
    cy = height / 2;

    timer = 0;
    stopwatch = 0;

    //map setup
    default_map_img = loadImage('default_map.png');
    school_map_img = loadImage('school_map.png');
    work_map_img = loadImage('work_map.png');
    default_map = true;

    //Aaron Code

    Exercise = loadImage('Exercise Goal.png');
    Move = loadImage('Move Goal.png');
    Sleep = loadImage('Sleep Goal.png');
    Stand = loadImage('Stand Goal.png');
    Step = loadImage('Step Goal.png');

    createHealth();
    // buttonMaker();
    hideHealth();
    hideAll();
    // hideOther();
}


function draw() {
    background(63);
    noStroke();
    switch(state) {
        case "initial":
            hideAll();
            draw_initial();
            break;
        case "home":
            hideAll();
            clockButton = true;
            timerButton = false;
            startButton = false;
            timer = 60;
            timerButton = false;
            startStopWatch = false;
            startTimer = false;
            startStopWatch = false;
            timer = 0;
            stopwatch = 0;
            draw_home();
            break;
        case "weather":
            hideAll();
            draw_weather_fullscreen();
            break;
        case "clock":
            hideAll();
            draw_clock_app();
            break;
        case "map":
            hideAll();
            draw_map();
            break;
        case "newsfeed":
            hideAll();
            draw_newsfeed();
            break;
        case "health":
            hideAll();
            showHealth();
            if(HealthState === 'Exercise') {
                image(Exercise, 75, 75, 850, 350);
            } else if(HealthState === 'Move') {
                image(Move, 75, 75, 850, 350);
            } else if(HealthState === 'Sleep') {
                image(Sleep, 75, 75, 850, 350);
            } else if(HealthState === 'Stand') {
                image(Stand, 75, 75, 850, 350);
            } else if(HealthState === 'Step') {
                image(Step, 75, 75, 850, 350);
            }
            break;
        case "Music":
            hideAll();
            select('#music', HTMLElement).position(75, 75);
            select('#music', HTMLElement).show();
            break;
        case "Calendar":
            hideAll();
            select('#calendar', HTMLElement).position(75,75);
            select('#calendar', HTMLElement).show();
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

function draw_clock_app() {
    // full screen background
    fill(1, 14, 36);
    noStroke();
    rect(75, 75, 850, 350);

    // clock button
    if ((mouseX >= 365 && mouseX <= 635) && (mouseY >= 100 && mouseY <= 150) && mouseIsPressed) {
        clockButton = true;
        timerButton = false;
        stopwatchButton = false;
        startTimer = false;
        startStopWatch = false;
        timer = 0;
        stopwatch = 0;
    }

    // timer button
    else if ((mouseX >= 645 && mouseX <= 915) && (mouseY >= 100 && mouseY <= 150) && mouseIsPressed) {
        clockButton = false;
        timerButton = true;
        stopwatchButton = false;
        startStopWatch = false;
        stopwatch = 0;
    }

    // stopwatch button
    else if ((mouseX >= 85 && mouseX <= 355) && (mouseY >= 100 && mouseY <= 150) && mouseIsPressed) {
        clockButton = false;
        timerButton = false;
        stopwatchButton = true;
        startTimer = false;
        timer = 0;
    }

    if (clockButton) {
        draw_clock();

        fill(127);
        rect(85, 100, 270, 50);

        fill(255);
        textAlign(CENTER, CENTER);
        textFont('Courier New');
        textSize(50);
        text('STOPWATCH', 220, 127.5);

        fill(127);
        rect(645, 100, 270, 50);

        fill(255);
        textAlign(CENTER, CENTER);
        textFont('Courier New');
        textSize(75);
        text('TIMER', 780, 127.5);
    }

    else if (timerButton) {
        draw_timer();

        fill(127);
        rect(85, 100, 270, 50);

        fill(255);
        textAlign(CENTER, CENTER);
        textFont('Courier New');
        textSize(50);
        text('STOPWATCH', 220, 127.5);

        fill(127);
        rect(365, 100, 270, 50);

        fill(255);
        textAlign(CENTER, CENTER);
        textFont('Courier New');
        textSize(75);
        text('CLOCK', 500, 127.5);
    }

    else if (stopwatchButton) {
        draw_stopwatch();

        fill(127);
        rect(365, 100, 270, 50);

        fill(255);
        textAlign(CENTER, CENTER);
        textFont('Courier New');
        textSize(75);
        text('CLOCK', 500, 127.5);

        fill(127);
        rect(645, 100, 270, 50);

        fill(255);
        textAlign(CENTER, CENTER);
        textFont('Courier New');
        textSize(75);
        text('TIMER', 780, 127.5);
    }

    draw_header();
}

function draw_clock() {
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

    noStroke();
}

function draw_timer() {
    fill(255);
    textAlign(CENTER, CENTER);
    textFont('Courier New');
    textSize(200);

    if ((mouseX >= 125 && mouseX <= 375) && (mouseY >= 350 && mouseY <= 400) && mouseIsPressed && (!startTimer)) {
        timer++;
    }

    else if ((mouseX >= 625 && mouseX <= 875) && (mouseY >= 350 && mouseY <= 400) && mouseIsPressed && (!startTimer)) {
        if (timer > 0) {
            timer--;
        }
    }

    if ((mouseX >= 425 && mouseX <= 575) && (mouseY >= 350 && mouseY <= 400) && mouseIsPressed) {
        startTimer = true;
    }

    if (((frameCount % 60) === 0) && (timer > 0) && (startTimer)) {
        timer --;
    }

    timerHour = floor(timer / 3600);
    timerMinute = floor((timer % 3600) / 60);
    timerSecond = (timer % 3600) % 60;

    if (timerMinute < 10) {
        if (timerSecond < 10) {
            text(timerHour + ":" + "0" + timerMinute + ":" + "0" + timerSecond, 500, 250);
        }
        else {
            text(timerHour + ":" + "0" + timerMinute + ":" + timerSecond, 500, 250);
        }

    }
    else {
        if (timerSecond < 10) {
            text(timerHour + ":" + timerMinute + ":" + "0" + timerSecond, 500, 250);
        }
        else {
            text(timerHour + ":" + timerMinute + ":" + timerSecond, 500, 250);
        }
    }

    // start button
    fill(127);
    rect(425, 350, 150, 50);

    fill(0, 0, 255);
    textSize(50);
    text("START", 500, 375);

    // increase time
    fill(127);
    rect(125, 350, 250, 50);

    fill(0, 255, 0);
    textSize(30);
    text("Increase Time", 250, 375)

    // decrease time
    fill(127);
    rect(625, 350, 250, 50);

    fill(255, 0, 0);
    textSize(30);
    text("Decrease Time", 750, 375)
}

function draw_stopwatch() {
    fill(1, 14, 36);
    noStroke();
    rect(75, 75, 850, 350);

    fill(255);
    textAlign(CENTER, CENTER);
    textFont('Courier New');
    textSize(200);

    if ((mouseX >= 250 && mouseX <= 400) && (mouseY >= 350 && mouseY <= 400) && mouseIsPressed) {
        startStopWatch = true;
    }

    if ((mouseX >= 600 && mouseX <= 750) && (mouseY >= 350 && mouseY <= 400) && mouseIsPressed) {
        startStopWatch = false;
    }

    if (((frameCount % 6) == 0) && startStopWatch) {
        stopwatch++;
    }

    stopwatchMinute = floor(stopwatch / 600);//floor(timer / 3600);
    stopwatchSecond = floor(stopwatch / 10);//floor((timer % 3600) / 60);
    stopwatchTenthSecond = stopwatch % 10;//(timer % 3600) % 60;

    if (stopwatchSecond < 10) {
        text(stopwatchMinute + ":" + "0" + stopwatchSecond + "." + stopwatchTenthSecond, 500, 250);
    }
    else {
        text(stopwatchMinute + ":" + stopwatchSecond + "." + stopwatchTenthSecond, 500, 250);
    }

    // start button
    fill(127);
    rect(250, 350, 150, 50);

    fill(0, 255, 0);
    textSize(50);
    text("START", 325, 375);


    // stop button
    fill(127);
    rect(600, 350, 150, 50);

    fill(255, 0, 0);
    textSize(50);
    text("STOP", 675, 375);
}

//========== MAP FUNCTIONS ==========

function draw_map() {

    hideAll();
    select('#map', HTMLElement).position(75,75);
    select('#map', HTMLElement).show();

    /*Commenting out previous code to work with new code */
    // if ((mouseX >= 485 && mouseX <= 585) && (mouseY >= 370 && mouseY <= 420) && mouseIsPressed) {
    //     default_map = false;
    //     school_map = true;
    //     work_map = false;
    // }
    // else if ((mouseX >= 635 && mouseX <= 735) && (mouseY >= 370 && mouseY <= 420) && mouseIsPressed) {
    //     default_map = false;
    //     school_map = false;
    //     work_map = true;
    // }
    //
    // if (default_map) {
    //     image(default_map_img, 75, 75, 850, 350);
    // }
    // else if (school_map) {
    //     image(school_map_img, 75, 75, 850, 350);
    // }
    // else if (work_map) {
    //     image(work_map_img, 75, 75, 850, 350);
    // }
    //
    // fill(0);
    // noStroke();
    // rect(485, 370, 100, 50);
    // rect(635, 370, 100, 50);
    //
    // fill(255);
    // textAlign(CENTER, CENTER);
    // textSize(25);
    // textFont('Courier New');
    // text('SCHOOL', 535, 395);
    // text('WORK', 685, 395);

    draw_header();
}

//========== WEATHER FUNCTIONS ==========

function draw_weather_fullscreen() {
    noStroke();
    //background(33,33,33);

    fill(1, 14, 36);
    rect(75, 75, 850, 350, 15);

    //divide into 5 sections for forecast
    stroke(255,255,255);
    line(245, 75, 245, 425);
    line(415, 75, 415, 425);
    line(585, 75, 585, 425);
    line(755, 75, 755, 425);

    //draw dates


    if ((weekly_weather_data != null) && (current_weather_data != null)) {
        draw_weather_fullscreen_data();
    }

    fill(77,77,77);
    //ellipse(875, 462.5, 50, 50);
    draw_header();
}


function draw_weather_fullscreen_data() {
    //objects for next 5 day
    var day1 = current_weather_data;
    var day2 = weekly_weather_data.list[5];
    var day3 = weekly_weather_data.list[13];
    var day4 = weekly_weather_data.list[21];
    var day5 = weekly_weather_data.list[29];

    imageMode(CENTER)
    draw_weather_window(day1, 160, 150);
    draw_weather_window(day2, 330, 150);
    draw_weather_window(day3, 500, 150);
    draw_weather_window(day4, 670, 150);
    draw_weather_window(day5, 840, 150);
    imageMode(CORNER)

    draw_weather_dates();
}

function draw_weather_window(data, x, y) {
    noStroke();
    fill(255,255,255);
    textSize(30);
    textFont('Georgia');
    textAlign(CENTER);

    let fmax = to_fahrenheit(data.main.temp_max);
    let fmin = to_fahrenheit(data.main.temp_min);
    let max_degrees = fmax + '\xB0'
    let min_degrees = fmin + '\xB0'

    let icon = get_weather_icon(data.weather[4], x, y);
    image(icon, x, y+40);

    text(max_degrees, x, y+130);
}

function get_weather_icon(icon) {
    switch(icon) {
        case "01d": //sunny
            return icon_sunnny;
        case "02d": //partlycloudy
            return icon_partlycloudy;
        case "03d": //cloudy
            return icon_cloudy;
        case "09d" : //rainy
            return icon_rainy;
        case "10d":
            return icon_rainy;
        case "11d":
            return icon_rainy;
        default:
            return icon_sunnny;
    }
}

function draw_weather_dates() {
    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    var date1  = new Date();
    var date2 = new Date(date1.getTime() + (24 * 60 * 60 * 1000));
    var date3 = new Date(date1.getTime() + (48 * 60 * 60 * 1000));
    var date4 = new Date(date1.getTime() + (72 * 60 * 60 * 1000));
    var date5 = new Date(date1.getTime() + (96 * 60 * 60 * 1000));

    t1 = date1.toLocaleDateString("en-US", options);
    t2 = date2.toLocaleDateString("en-US", options);
    t3 = date3.toLocaleDateString("en-US", options);
    t4 = date4.toLocaleDateString("en-US", options);
    t5 = date5.toLocaleDateString("en-US", options);

    noStroke();
    fill(255,255,255);
    textSize(16)
    textFont('Georgia');
    textAlign(CENTER,TOP);

    text(t1,160,90);
    text(t2,330,90);
    text(t3,500,90);
    text(t4,670,90);
    text(t5,840,90);
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
        textAlign(RIGHT, TOP);
        text(degrees, 985, 10);
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
    text(date, 500, 10);
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
    if (hour === 0) {
        hour += 12;
    }

    if (minute < 10) {
        zero = '0';
    }

    fill(255,255,255);
    textSize(30);
    textFont('Georgia');
    textAlign(LEFT, TOP);
    text(hour + ':' + zero + minute + timeDay, 15, 10);
}

// ========== NEWSFEED FUNCTIONS ==========

function get_newsfeed_data() {
    let key = 'a520cc4f10344f78a98d2371e6af098d';
    return fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + key).then(result => result.json());
}

function draw_newsfeed() {
    noStroke();
    data = newsfeed_data;

    fill(1, 14, 36);
    rect(75, 75, 850, 350);

    //divide into image and title section
    stroke(255,255,255);
    //line(270, 75, 270, 425);
    line (75, 191.66, 925, 191.66);
    line(75, 308.33, 925, 308.33);

    if (newsfeed_data != null) {
        draw_news_stories(data);
    }

    draw_header();
}

function draw_news_stories(data) {
    var story1 = data.articles[0];
    var story2 = data.articles[1];
    var story3 = data.articles[2];

    draw_story(story1, 95, 90);
    draw_story(story2, 95, 206.66)
    draw_story(story3, 95, 323.33)
}

function draw_story(story, titlex, titley) {
    noStroke();
    //let xbound = titlex + 715
    //let ybound = titley + 20

    fill(255,255,255);
    textSize(20);
    //textStyle(BOLD);
    textFont('Georgia');
    textAlign(CENTER, TOP);
    text(story.title, titlex, titley, titlex + 715, 20);

    //textStyle(ITALIC);
    textFont('Georgia')
    textSize(12);
    text(story.description, titlex, titley+65, titlex + 715, 20);

    textStyle(NORMAL);
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

function button_home_music_handler() {
    hide_all_buttons();
    console.log('going to fullscreen music');
    state = "Music";
    button_back.show();
}

function button_home_calendar_handler() {
    hide_all_buttons();
    console.log('going to fullscreen calendar');
    state = "Calendar";
    button_back.show();
}

function button_music_back_handler() {
    hide_all_buttons();
    state = "home";
    show_home_buttons();
}

function show_home_buttons() {
    button_home_weather.show();
    button_home_clock.show();
    button_home_map.show();
    button_home_newsfeed.show();
    button_home_health.show();
    button_home_back.show();
    button_home_music.show();
    button_home_calendar.show();
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
    show_home_buttons();
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
    show_home_buttons();
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
    show_home_buttons();
}

function button_home_newsfeed_handler() {
    hide_all_buttons();
    console.log('going to fullscreen newsfeed');
    state = "newsfeed";
    button_newsfeed_back.show();
}

function button_newsfeed_back_handler() {
    hide_all_buttons();
    state = "home";
    show_home_buttons();
}

function button_home_health_handler() {
    hide_all_buttons();
    console.log('going to fullscreen health');
    state = "health";
    button_health_back.show();
}

function button_health_back_handler() {
    hide_all_buttons();
    hideHealth();
    state = "home";
    show_home_buttons();
}

function button_home_back_handler() {
    hide_all_buttons();
    state = "initial";
    button_initial_home.show();
}

function button_initial_home_handler() {
    hide_all_buttons();
    state = "home"
    show_home_buttons();
}

function createHealth() {
    ExerButton = createButton('Exercise Results');
    ExerButton.position(200,50);
    ExerButton.mousePressed(ExerciseButton);
    MovButton = createButton('Move Results');
    MovButton.position(325, 50);
    MovButton.mousePressed(MoveButton);
    SleeButton = createButton('Sleep Results');
    SleeButton.position(450, 50);
    SleeButton.mousePressed(SleepButton);
    StanButton = createButton('Stand Results');
    StanButton.position(575, 50);
    StanButton.mousePressed(StandButton);
    SteButton = createButton('Step Results');
    SteButton.position(700, 50);
    SteButton.mousePressed(StepButton);
}

function showHealth() {
    ExerButton.show();
    MovButton.show();
    SleeButton.show();
    SteButton.show();
    StanButton.show();
    // backButton.show();
    // healButton.hide();
}

function hideHealth() {
    ExerButton.hide();
    MovButton.hide();
    SleeButton.hide();
    SteButton.hide();
    StanButton.hide();
    // backButton.hide();
    // healButton.show();
}

function hideAll() {
    select('#map', HTMLElement).hide();
    select('#calendar', HTMLElement).hide();
    select('#music', HTMLElement).hide();
}

// function MapResults() {
//     state = 'Map';
// }
//
// function MusicButton() {
//     state = 'Music';
// }
//
// function CalendarButton() {
//     State = 'Calendar';
// }

function ExerciseButton() {
    HealthState = 'Exercise';
}

function MoveButton() {
    HealthState = 'Move';
}

function SleepButton() {
    HealthState = 'Sleep';
}

function StandButton() {
    HealthState = 'Stand';
}

function StepButton() {
    HealthState = 'Step';
}
