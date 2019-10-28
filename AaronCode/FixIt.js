let Calendar;
let Exercise;
let Move;
let Sleep;
let Stand;
let Step;
let State = 'Map';
let ExerButton;
let MovButton;
let SleeButton;
let StanButton;
let SteButton;
let calButton;
let musButton;
let mapButton;
let healButton;

function setup() {
    createCanvas(1000,500);
    background(228,229,240);
    Calendar = loadImage('Calendar.png');
    Exercise = loadImage('Exercise Goal.png');
    Move = loadImage('Move Goal.png');
    Sleep = loadImage('Sleep Goal.png');
    Stand = loadImage('Stand Goal.png');
    Step = loadImage('Step Goal.png');
    createHealth();
    healButton = createButton('Health');
    healButton.position(650, 75);

    calButton = createButton('Calendar');
    calButton.position(75, 75);
    calButton.mousePressed(CalendarButton);
    musButton = createButton('Music');
    musButton.position( 275, 75);
    musButton.mousePressed(MusicButton);
    mapButton = createButton('Map');
    mapButton.position(450, 75);
    mapButton.mousePressed(MapResults);
}

function draw() {
    background(228, 229, 240);
    let i = State;
    if(i === 'Map') {
        hideHealth();
        hideAll();
        select('#map', HTMLElement).position(75,75);
        select('#map', HTMLElement).show();
    } else if(i === 'Music') {
        hideHealth();
        hideAll();
        select('#music', HTMLElement).position(75, 75);
        select('#music', HTMLElement).show();
    } else if(i === 'Calendar') {
        hideHealth();
        hideAll();
        select('#calendar', HTMLElement).position(75,75);
        select('#calendar', HTMLElement).show();
    } else if(i === 'Health') {

    }
}

function createHealth() {
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
}

function showHealth() {
    ExerButton.show();
    MovButton.show();
    SleeButton.show();
    SteButton.show();
    StanButton.show();
}

function hideHealth() {
    ExerButton.hide();
    MovButton.hide();
    SleeButton.hide();
    SteButton.hide();
    StanButton.hide();
}

function hideAll() {
    select('#map', HTMLElement).hide();
    select('#calendar', HTMLElement).hide();
    select('#music', HTMLElement).hide();
}

function MapResults() {
    State = 'Map';
}

function MusicButton() {
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
