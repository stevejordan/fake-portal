define([
    'underscore', 'backbone', 'collections/abstract'
], function( _, Backbone, AbstractCollection ) {

    var Calendar = AbstractCollection.extend({

        //where to find the calendar
        url: '/portal-poc/remote-services/moodle-api?request=calendar',

        model: CalendarItem,
        view: 'CalendarView',
        $el: $('#calendar'),
        parse: function (response) {

            var parsed;

            //ns.Helpers.debug('response from calendar query');

            parsed = ns.Helpers.parseIcal(response.main.calendar.ical);
            //ns.Helpers.debug(parsed);

            //render any messages
            if (response.messages) {
                ns.FakePortal.trigger('message', response.messages);
            }

            return parsed;

        }
    });

    return Calendar;

});
