define([
    'jquery', 'collections/abstract', 'models/calendarItem', 'views/fakeportal', 'helpers'
], function( $, AbstractCollection, CalendarItem, FakePortal, Helpers ) {

    var Calendar = AbstractCollection.extend({

        //where to find the calendar
        url: '/portal-poc/remote-services/moodle-api?request=calendar',

        model: CalendarItem,
        view: 'CalendarView',
        $el: $('#calendar'),
        parse: function (response) {

            var parsed;

            //ns.Helpers.debug('response from calendar query');

            parsed = Helpers.parseIcal(response.main.calendar.ical);
            //ns.Helpers.debug(parsed);

            //render any messages
            if (response.messages) {
                FakePortal.trigger('message', response.messages);
            }

            return parsed;

        }
    });

    return Calendar;

});
