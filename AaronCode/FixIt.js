let Calendar;
let Exercise;
let Move;
let Sleep;
let Stand;
let Step;

function setup() {
    createCanvas(1000,500);
    background(228,229,240);
    Calendar = loadImage('Calendar.png');
    Exercise = loadImage('Exercise Goal.png');
    Move = loadImage('Move Goal.png');
    Sleep = loadImage('Sleep Goal.png');
    Stand = loadImage('Stand Goal.png');
    Step = loadImage('Step Goal.png');
}

function draw() {
    let i = 'Step';
    if(i === 'Calendar') {
        image(Calendar, 75, 75, 850, 350);
    } else if(i === 'Exercise') {
        image(Exercise, 75, 75, 850, 350);
    } else if(i === 'Move') {
        image(Move, 75, 75, 850, 350);
    } else if(i === 'Sleep') {
        image(Sleep, 75, 75, 850, 350);
    } else if(i === 'Stand') {
        image(Stand, 75, 75, 850, 350);
    } else if(i === 'Step') {
        image(Step, 75, 75, 850, 350);
    }
}

