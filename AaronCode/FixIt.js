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
let calButton;
let musButton;

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
    MovButton.position(275, 50);
    MovButton.mousePressed(MoveButton);
    SleeButton = createButton('Sleep Results');
    SleeButton.position(450, 50);
    SleeButton.mousePressed(SleepButton);
    StanButton = createButton('Stand Results');
    StanButton.position(650, 50);
    StanButton.mousePressed(StandButton);
    SteButton = createButton('Step Results');
    SteButton.position(850, 50);
    SteButton.mousePressed(StepButton);
    calButton = createButton('Calendar');
    calButton.position(75, 100);
    calButton.mousePressed(CalendarButton);
    musButton = createButton('Music');
    musButton.position( 275, 75);
    musButton.mousePressed(MusicButton);
}

function draw() {
    background(228, 229, 240);
    let i = State;
    if(i === 'Calendar') {
        select('#calendar', HTMLElement).position(75, 75);
        select('#calendar', HTMLElement).show();
        select('#music', HTMLElement).hide();
    } else if(i === 'Music') {
        select('#music', HTMLElement).position(75, 75);
        select('#music', HTMLElement).show();
        select('#calendar', HTMLElement).hide();
    } else if(i === 'Exercise') {
        image(Exercise, 75, 75, 850, 350);
        select('#calendar', HTMLElement).hide();
        select('#music', HTMLElement).hide();
    } else if(i === 'Move') {
        image(Move, 75, 75, 850, 350);
        select('#calendar', HTMLElement).hide();
        select('#music', HTMLElement).hide();
    } else if(i === 'Sleep') {
        image(Sleep, 75, 75, 850, 350);
        select('#calendar', HTMLElement).hide();
        select('#music', HTMLElement).hide();
    } else if(i === 'Stand') {
        image(Stand, 75, 75, 850, 350);
        select('#calendar', HTMLElement).hide();
        select('#music', HTMLElement).hide();
    } else if(i === 'Step') {
        image(Step, 75, 75, 850, 350);
        select('#calendar', HTMLElement).hide();
        select('#music', HTMLElement).hide();
    }
}

function musicButton() {
    State = 'Music';
}

function CalendarButton() {
    State = 'Calendar';
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
