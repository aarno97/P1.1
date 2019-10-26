let Calendar;
let Move;
let Sleep;
let Exercise;
let Stand;
let Step;
let Image;

function preload() {

}

function setup() {
    createCanvas(1000, 500);
    background(228, 229, 240);
    Calendar = loadImage('Calendar.png');
    Move = loadImage('Move Goal.png');
    Sleep = loadImage('Stand Goal.png');
    Exercise = loadImage('Exercise Goal.png');
    Stand = loadImage('Stand Goal.png');
    Step = loadImage('Step Goal.png');
    Image = loadImage('Step Goal.png');
}

function draw() {
    let State = "Calendar";
    image(Calendar, 0, 0);
    rect(75, 75, 850, 350);
    switch (State) {
        case "Calendar":
            Image = Calendar;
            break;
        case "Move":
            Image = Move;
            break;
        case "Exercise":
            Image = Exercise;
            break;
        case "Stand":
            Image = Stand;
            break;
        case "Step":
            Image = Step;
            break;
        case "Sleep":
            Image = Sleep;
            break;
        default:
            Image = Calendar;
            break;
    }
    image(Image, 75, 75, 850, 350);
}
