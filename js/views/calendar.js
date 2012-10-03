define([
    'jquery', 'underscore', 'backbone', 'namespace', 'helpers'
], function ( $, _, Backbone, ns, Helpers) {
           
    var CalendarView = Backbone.View.extend({

        tagName: 'li',

        template: _.template($('#calendar-template').html()),

        initialize: function () {
            this.render();
        },

        render: function () {

            /*
                BEGIN: "VEVENT"
            CATEGORIES: "betty"
                CLASS: "PUBLIC"
            DESCRIPTION: "<div class="no-overflow"><p>hghghghg</p></div>"
                DTSTAMP: Thu Jul 19 2012 13:03:00 GMT+0100 (BST)
            DTSTART: Thu Sep 22 2011 15:30:00 GMT+0100 (BST)
            LAST-MODIFIED: "20110915T153352Z"
            SUMMARY: "Testing bulk download with groups"
                UID: "2@moodle2dev.city.ac.uk"
            day: "Thursday"
                start_date: "22/09/2011"
            start_time: "15:30"
             */

            Helpers.debug('rendering a calendar item...');

            this
                .$el.html(this.template(this.model.toJSON()))
                .appendTo(ns.calendar.$el);

            //if debug also append to table
            Helpers.showTableView('calendar', this.model);

            return this;

        }

    });

    ns.CalendarView = CalendarView;

    return CalendarView;

});