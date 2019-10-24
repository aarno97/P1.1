class App {
    constructor(name, icon, pos) {
        this.name = name;
        this.icon = icon;
        this.pos = pos;
    }
    draw_app_icon() {};
    draw_app_fullscreen() {};
}

function setup() {
    createCanvas(1000, 500);
    capture = createCapture(VIDEO);
    capture.size(1000, 500);
    capture.hide();  //prevents duplicate feed
}

function draw() {
    ellipse(100, 100, 250, 250);
    // document.addEventListener('DOMContentLoaded', function() {
    //     let calendarEl = document.getElementById('calendar');
    //
    //     let calendar = new FullCalendar.Calendar(calendarEl, {
    //         height: 500,
    //         plugins: [ 'dayGrid', 'list', 'googleCalendar' ],
    //         header: {
    //             left: 'prev,next today',
    //             center: 'title',
    //             right: 'dayGridMonth,listYear'
    //         },
    //
    //         displayEventTime: false, // don't show the time column in list view
    //
    //         //This is confidential
    //         googleCalendarApiKey: 'AIzaSyA2NJZvTatDvC8SVJnfZ4wXwH3sdjac9so',
    //
    //         //allows us to pull data from multiple calendars: regular calendar and US Holidays
    //         eventSources: [
    //             {
    //                 googleCalendarId: 'mfjsnor8bvj6c4a0vshb24g7sk@group.calendar.google.com'
    //             },
    //             {
    //                 googleCalendarId: 'en.usa#holiday@group.v.calendar.google.com',
    //             }
    //         ],
    //     });
    //     calendar.render();
    // });
}