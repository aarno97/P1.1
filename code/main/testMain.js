let capture;
var clockAppButton = false;
var clockButton = false;
var timerButton = false;
var cx; 
var cy;
var secondsRadius;
var minutesRadius;
var hoursRadius;
var clockDiameter;

function setup() {
    createCanvas(1000, 500);
    capture = createCapture(VIDEO);
    capture.size(1000, 500);
    capture.hide();  //prevents duplicate feed


    var radius = min(850, 350) / 2;
    secondsRadius = radius * 0.72;
    minutesRadius = radius * 0.60;
    hoursRadius = radius * 0.50;
    clockDiameter = radius * 1.8;
    
    cx = width / 2;
    cy = height / 2;
  }

function draw() {
    background(223);

    if ((mouseX >= 450 && mouseX <= 550) && (mouseY >= 437.5 && mouseY <= 487.5) && mouseIsPressed) {
        if (clockAppButton == false) {
            clockAppButton = true;
        }
        else {
            clockAppButton = false;
        }
    }
    
    //draw mirrored webcam feed as background
    if (clockAppButton) {
        clockButton = true;
        draw_clock_app();
    }

    else {
        mirror_camera();
    }
    fill(0);
    rect(450, 437.5, 100, 50);
}

function mirror_camera() {
    translate(capture.width, 0);
    scale(-1, 1);
    image(capture, 0, 0, 1000, 500);
    translate(capture.width, 0);
    scale(-1, 1);
}

function draw_clock_app() {
    fill(0);
    rect(75, 75, 850, 350);

    if (clockButton) {
        timerButton = false;
        draw_clock();
    }

    else if (timerButton) {
        clockButton = false;
        draw_timer();
    }
}

function draw_timer() {
    var zeroH1 = '0';
    var zeroH2 = '0';
    var zeroM1 = '0';
    var zeroM2 = '0';
    var zeroS1 = '0';
    var zeroS2 = '0';
    fill(0, 255, 0);
    textAlign(CENTER);
    textSize(100);
    textFont('Courier New');
    
    text(zeroH1 + zeroH2 + ':' + zeroM1 + zeroM2 + ':' + zeroS1 + zeroS2, 500, 250);    
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
}

/*
function draw_clock() {
    fill(0);
    rect(75, 75, 850, 350);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var zeroH = '';
    var zeroM = '';
    var zeroS = '';
    var timeDay = ' a.m.';

    if (hour >= 12 && hour < 24) {
        timeDay = ' p.m.';
    }

    hour %= 12;
    if (hour == 0) {
        hour += 12;
    }

    if (hour < 10) {
        zeroH = '0';
    }

    if (minute < 10) {
        zeroM = '0';
    }

    if (second < 10) {
        zeroS = '0';
    }

    fill(0, 255, 0);
    textSize(100);
    textFont('Courier New');
    text(zeroH + hour + ':' + zeroM + minute + ':' + zeroS + second + timeDay, 100, 250);
}
*/

/*
function draw_clock() {
    background(223);
    fill(63);
    rect(75, 75, 850, 350);
    fill(0);
    circle(500, 250, 350);
    fill(255);
    circle(500, 250, 325);
    draw_numbers();
    draw_time();

    stroke('red');
    strokeWeight(4);
    line(500, 0, 500, 500);
    line(625, 33.5, 375, 466.5);
    line(716.5, 125, 283.5, 375);
    line(250, 250, 750, 250);
    line(375, 33.5, 625, 466.5);
    line(283.5, 125, 716.5, 375);

}

function draw_numbers() {
    fill(0);
    textSize(50);
    textFont('Georgia');
    text('12', 475, 125);
    text('1', 558, 144);
    text('2', 604, 191);
    text('3', 625, 260);
    text('4', 603, 327);
    text('5', 556, 376);
    text('6', 486, 403);
    text('7', 425, 375);
    text('8', 367, 333);
    text('9', 348, 260);
    text('10', 365, 198);
    text('11', 414, 147);
}

function draw_time() {
    fill(0);

    line(500, 250, 500, 100);
    line(500, 250, 500, 50);
}
*/

/*
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
*/