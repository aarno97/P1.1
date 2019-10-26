var Calendar;

function setup() {
    createCanvas(1000, 500);
    background(228, 229, 240);
    Calendar = loadImage("Calendar.png");

}

function draw() {
    rect(75, 75, 850, 350);
    image(Calendar, 75,75, 850,350);
}
