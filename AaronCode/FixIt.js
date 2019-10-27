let Calendar;
let Exercise;
let Move;
let Sleep;
let Stand;
let Step;
let State = 'Calendar';
let ExerButton;
let MovButton;
let SleeButton;
let StanButton;
let SteButton;

function setup() {
    createCanvas(1000,500);
    background(228,229,240);
    Calendar = loadImage('Calendar.png');
    Exercise = loadImage('Exercise Goal.png');
    Move = loadImage('Move Goal.png');
    Sleep = loadImage('Sleep Goal.png');
    Stand = loadImage('Stand Goal.png');
    Step = loadImage('Step Goal.png');
    ExerButton = createButton('Exercise Results');
    ExerButton.position(75,50);
    ExerButton.mousePressed(ExerciseButton);
    MovButton = createButton('Move Results');
    MovButton.position(225, 50);
    MovButton.mousePressed(MoveButton);
    SleeButton = createButton('Sleep Results');
    SleeButton.position(425, 50);
    SleeButton.mousePressed(SleepButton);
    StanButton = createButton('Stand Results');
    StanButton.position(700, 50);
    StanButton.mousePressed(StandButton);
    SteButton = createButton('Step Results');
    SteButton.position(850, 50);
    SteButton.mousePressed(StepButton)
}

function draw() {
    background(228, 229, 240);
    let i = State;
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

function ExerciseButton() {
    State = 'Exercise';
}

function MoveButton() {
    State = 'Move';
}

function SleepButton() {
    State = 'Sleep';
}

function StandButton() {
    State = 'Stand';
}

function StepButton() {
    State = 'Step';
}
