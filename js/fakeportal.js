/*jslint
 evil: true, browser: true, nomen: true, plusplus: true
*/

/*global
 jQuery, $, Backbone, _
*/

//setup app namespace
window.FP = window.FP || {};

//debug flag
window.FP.debugging = location.search.match('debug') ? true : false;

!(function (w, d, ns, undefined) {

    'use strict';

    //wait for domready
    jQuery(d).ready(function () {

        var
            //models
            Person, Course, Book, Hold, Fine, CalendarItem,

            //collections
            CoursesCollection, BooksCollection, HoldsCollection,
            FinesCollection, AbstractCollection, LibraryCollection,
            Calendar,

            //views
            FakePortalView, PersonView, CourseView, BookView,
            HoldView, FineView, CalendarView;

        //flesh out models
        Person = Backbone.Model.extend({  });
        Course = Backbone.Model.extend({  });
        Book   = Backbone.Model.extend({  });
        Hold   = Backbone.Model.extend({  });
        Fine   = Backbone.Model.extend({  });
        CalendarItem = Backbone.Model.extend({  });

        //flesh out collections
        AbstractCollection = Backbone.Collection.extend({

            initialize: function () {
                ns.Helpers.debug('initializing ' + this.view + ' collection');
                //hook up events
                this.on('add', this.addOne);
            },

            reset: function (models) {
                ns.Helpers.debug('resetting ' + this.view + ' collection');
                ns.Helpers.debug('from ' + this.length);
                this.add(models);
                ns.Helpers.debug('to ' + this.length);
            },

            addOne: function (model) {
                ns.Helpers.debug('adding a ' + this.view.replace('View', ''));
                //all views need to be stored in the namespace for this to work
                new ns[this.view]({'model': model});
            }

        });

        CoursesCollection = AbstractCollection.extend({

            //tie into the Course model
            model: Course,

            //which view handles the models in this collection (as string)
            view: 'CourseView',

            //where to find the courses
            url: '/portal-poc/remote-services/moodle-api?request=courses',

            //where to put the model elements
            $el: $('#courses'),

            //how to parse the response
            parse: function (response) {

                //error checking here?

                //render any messages
                if (response.messages) {
                    ns.FakePortal.trigger('message', response.messages);
                }

                return response.main.courses.other;

            },

        });

        //common library functionality
        LibraryCollection = AbstractCollection.extend({
            url: function () {
                return '/portal-poc/remote-services/millenium-api?request=' + this.requestString;
            },
            parse: function (response) {

                //error checking
                if (!response.main || response.main.status !== 'success') {
                    ns.Helpers.debug('error: ' + (response.main.message || 'unknown problem'));
                    return {};
                }

                return response.main.items;
            }
        });

        BooksCollection = LibraryCollection.extend({
            model: Book,
            view: 'BookView',
            requestString: 'checked_out_items',
            $el: $('#books'),
        });

        FinesCollection = LibraryCollection.extend({
            model: Fine,
            view: 'FineView',
            requestString: 'fines',
            $el: $('#fines'),
        });

        HoldsCollection = LibraryCollection.extend({
            model: Hold,
            view: 'HoldView',
            requestString: 'holds',
            $el: $('#holds'),
        });

        Calendar = AbstractCollection.extend({

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

        //flesh out views
        // this is the main view that kicks it all off
        FakePortalView = Backbone.View.extend({

            //spelling !
            initialize: function () {

                ns.Helpers.debug('kick off!');

                //hook up some events
                this.on('message', this.showMessages, this);

                //create any DOM elemnts we need
                this.$m_container = $('<pre />', {id: 'messages_container', style: 'white-space: normal; border-top: 1px solid blue'}).appendTo('#content');

                $('#content').removeClass('standard').addClass('wide');

                //hide tables unless debug
                if (!ns.debugging) {
                    $('table[id$="table"]').hide();
                }

                //instantiate the collections
                ns.courses = new CoursesCollection();
                ns.books = new BooksCollection();
                ns.fines = new FinesCollection();
                ns.holds = new HoldsCollection();
                ns.calendar = new Calendar();

                //load up the data
                ns.courses.fetch();
                ns.books.fetch();
                ns.fines.fetch();
                ns.holds.fetch();

                //pull in calendar
                ns.calendar.fetch();

            },

            showMessages: function (m) {

                if (ns.debugging) {
                    this.$m_container.append(m.messages);
                }

            }

        });

        /* not in use yet
        ns.PersonView = Backbone.View.extend({

            //hook into section#about
            id: 'about',

            events: {
                'click .image': 'openface'
            },

            initialize: function () {
                this.render();
            },

            render: function() {
                ns.Helpers.debug(this.$e);
                this.$e.html(_.template('<h1 class="face"><%= name %></h1>', this.model.toJSON()));
            },

            openface: function() {
                ns.Helpers.debug('click on face!');
            }

        });
         */

        ns.CourseView = Backbone.View.extend({
            tagName: 'li',
            template: _.template($('#course-template').html()),
            initialize: function () {
                this.render();
            },
            render: function () {

                ns.Helpers.debug('rendering a course...');
                //ns.Helpers.debug(this.model.toJSON());

                this.$el
                    .html(this.template(this.model.toJSON()))
                    .appendTo(ns.courses.$el);

                //if debug also append to table
                ns.Helpers.showTableView('course', this.model);

                return this;
            }

        });

        ns.BookView = Backbone.View.extend({
            tagName: 'li',
            template: _.template($('#book-template').html()),
            initialize: function () {
                this.render();
            },
            render: function () {

                ns.Helpers.debug('rendering a book...');
                //ns.Helpers.debug(this.model.toJSON());

                this.$el
                    .html(this.template(this.model.toJSON()))
                    .appendTo(ns.books.$el);

                //if debug also append to table
                ns.Helpers.showTableView('book', this.model);

                return this;

            }
        });

        ns.FineView = Backbone.View.extend({
            tagName: 'li',
            template: _.template($('#fine-template').html()),
            initialize: function () {
                this.render();
            },
            render: function () {

                ns.Helpers.debug('rendering a fine...');
                //ns.Helpers.debug(this.model.toJSON());

                this.$el
                    .html(this.template(this.model.toJSON()))
                    .appendTo(ns.fines.$el);

                //if debug also append to table
                ns.Helpers.showTableView('fine', this.model);

                return this;

            }
        });

        ns.HoldView = Backbone.View.extend({
            tagName: 'li',
            template: _.template($('#hold-template').html()),
            initialize: function () {
                this.render();
            },
            render: function () {

                ns.Helpers.debug('rendering a hold...');
                //ns.Helpers.debug(this.model.toJSON());

                this.$el
                    .html(this.template(this.model.toJSON()))
                    .appendTo(ns.holds.$el);

                //if debug also append to table
                ns.Helpers.showTableView('hold', this.model);

                return this;

            }
        });

        ns.CalendarView = Backbone.View.extend({
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

                ns.Helpers.debug('rendering a calendar item...');

                this
                    .$el.html(this.template(this.model.toJSON()))
                    .appendTo(ns.calendar.$el);

                //if debug also append to table
                ns.Helpers.showTableView('calendar', this.model);

                return this;

            }
        });

        //helpers
        ns.Helpers = {
            atomDateParser : function (datestr) {

                if (!datestr) { return false; }

                //borrowed from http://stackoverflow.com/questions/1416296
                var yy   = parseInt(datestr.substring(0, 4), 10),
                    mo   = parseInt(datestr.substring(5, 7), 10),
                    dd   = parseInt(datestr.substring(8, 10), 10),
                    hh   = parseInt(datestr.substring(11, 13), 10),
                    mi   = parseInt(datestr.substring(14, 16), 10),
                    ss   = parseInt(datestr.substring(17, 19), 10),
                    //tzs  = parseInt(datestr.substring(19,20), 10),
                    //tzhh = parseInt(datestr.substring(20,22), 10),
                    //tzmi = parseInt(datestr.substring(23,25), 10),
                    myutc = Date.UTC(yy, mo - 1, dd, hh, mi, ss);
                    //tzos = (tzs+(tzhh * 60 + tzmi * 1)) * 60000;

                return (new Date(myutc)).toLocaleDateString();

            },

            debug: function (message) {
                if (ns.debugging) { console.log(message); }
            },

            parseIcal: function (icalData) {

                //'borrowed' from github.com/thybag/JavaScript-Ical-Parser

                if (!icalData) { return false; }

                //Clean string and split the file so we can handle it (line by line)
                //var cal_array = icalData.replace(new RegExp("\\r", "g"), "").split("\n"),
                var cal_array = icalData.replace(/\r/g, "").split("\n"),

                    //Keep track of when we are activly parsing an event
                    in_event = false,

                    //Use as a holder for the current event being proccessed.
                    cur_event = null,

                    //store the events
                    events = [],

                    makeDate = function (ical_date) {

                        //break date apart
                        var dt =  {
                            year: ical_date.substr(0, 4),
                            month: ical_date.substr(4, 2),
                            day: ical_date.substr(6, 2),
                            hour: ical_date.substr(9, 2),
                            minute: ical_date.substr(11, 2)
                        };

                        //Create JS date (months start at 0 in JS - don't ask)
                        dt.date = new Date(dt.year, (dt.month - 1), dt.day, dt.hour, dt.minute);

                        //Get the full name of the given day
                        dt.dayname = [
                            "Sunday", "Monday", "Tuesday", "Wednesday",
                            "Thursday", "Friday", "Saturday"
                        ][dt.date.getDay()];

                        return dt;

                    },

                    lines = cal_array.length,

                    //following are small loop vars
                    i,
                    ln,
                    idx,
                    type,
                    val,
                    dt;

                for (i = 0; i < lines; i++) {

                    ln = cal_array[i];

                    //If we encounted a new Event, create a blank event 
                    //object + set in event options.
                    if (!in_event && ln === 'BEGIN:VEVENT') {
                        in_event = true;
                        cur_event = {};
                    }

                    //If we encounter end event, complete the object and 
                    //add it to our events array then clear it for reuse.
                    if (in_event && ln === 'END:VEVENT') {
                        in_event = false;
                        events.push(cur_event);
                        cur_event = null;
                    }

                    //If we are in an event
                    if (in_event) {

                        //Split the item based on the first ":"
                        idx = ln.indexOf(':');

                        //Apply trimming to values to reduce risks of badly 
                        //formatted ical files.
                        type = ln.substr(0, idx)
                                   .replace(/^\s\s*/, '')
                                   .replace(/\s\s*$/, '');

                        val = ln.substr(idx + 1, ln.length - (idx + 1))
                                  .replace(/^\s\s*/, '')
                                  .replace(/\s\s*$/, '');

                        //If the type is a start date, proccess it and store details
                        if (type === 'DTSTART') {
                            dt = makeDate(val);
                            val = dt.date;
                            //These are helpful for display
                            cur_event.start_time = dt.hour + ':' + dt.minute;
                            cur_event.start_date = dt.day+'/'+dt.month+'/'+dt.year;
                            cur_event.day = dt.dayname;
                        }
                        //If the type is an end date, do the same as above
                        if (type === 'DTEND') {
                            dt = makeDate(val);
                            val = dt.date;
                            //These are helpful for display
                            cur_event.end_time = dt.hour + ':' + dt.minute;
                            cur_event.end_date = dt.day+'/'+dt.month+'/'+dt.year;
                            cur_event.day = dt.dayname;
                        }
                        //Convert timestamp
                        if (type === 'DTSTAMP') { val = makeDate(val).date; }

                        //Add the value to our event object.
                        cur_event[type] = val;

                    }
                } //end for

                return events;

            }, //end parseIcal

            //in debug mode it's useful to show the raw data in a table
            showTableView: function (modelName, model) {

                if (ns.debugging) {
                    $('<tr />', { html: _.template($('#' + modelName + '-table-template').html(), model.toJSON()) })
                        .appendTo($('#' + modelName + '-table tbody'));
                }

            }

        };

        //test it out
        ns.FakePortal = new FakePortalView();

    });

}(window, document, window.FP, undefined));
