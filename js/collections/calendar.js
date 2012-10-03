define([
    'jquery', 
    'collections/abstract', 
    'models/calendarItem', 
    'views/fakeportal', 
    'views/calendar', 
    'helpers'
], function( $, AbstractCollection, CalendarItem, FakePortal, CalendarView, Helpers ) {

    var Calendar = AbstractCollection.extend({

        //where to find the calendar
        urlfragment: 'remote-services/moodle-api?request=calendar',

        model: CalendarItem,
        view: 'CalendarView',
        $el: $('#calendar'),
        parse: function (response) {

            var parsed;

            //Helpers.debug('response from calendar query');

            parsed = Helpers.parseIcal(response.main.calendar.ical);
            //Helpers.debug(parsed);

            //render any messages
            if (response.messages) {
                FakePortal.trigger('message', response.messages);
            }

            return parsed;

        }
    });

    return Calendar;

});
