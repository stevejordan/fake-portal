define([
    'jquery',
    'backbone',
    'collections/courses',
    'collections/books',
    'collections/fines',
    'collections/holds',
    'collections/calendar',
    'collections/computerRooms',
    'models/person',
    'namespace',
    'helpers'
], function ( $, Backbone, CoursesCollection, BooksCollection, 
              FinesCollection, HoldsCollection, Calendar, 
              ComputerRoomCollection, Person, ns, Helpers ) {
           
    var FakePortalView = Backbone.View.extend({

        //spelling !
        initialize: function () {

            var ajaxOpts = {};

            Helpers.debug('kick off!');

            //hook up some events
            this.on('message', this.showMessages, this);

            //create any DOM elements we need
            this.$m_container = $('<pre />', {
                id: 'messages_container', 
                style: 'white-space: normal; border-top: 1px solid blue'})
            .appendTo('#content');

            $('#content').removeClass('standard').addClass('wide');

            //hide tables unless debug
            if (!ns.debugging) {
                $('table[id$="table"]').hide();
            }

            //any edit buttons
            $('.edit').bind('click', function () {

                //find which widget
                var widget = $(this).parentsUntil('.widget').filter('.widget');

            });

            //instantiate the collections
            ns.courses = new CoursesCollection();
            ns.books = new BooksCollection();
            ns.fines = new FinesCollection();
            ns.holds = new HoldsCollection();
            ns.calendar = new Calendar();
            ns.computerRooms = new ComputerRoomCollection();

            //while on localhost, we make CORS requests and need
            //withCredentials to be set
            if (/localhost|webapps/.test(document.location.host)) {
                ns.ajaxOpts = {
                    xhrFields: {
                        withCredentials: true
                    }
                };
            }

            //load up the data
            ns.courses.fetch(ns.ajaxOpts);
            ns.books.fetch(ns.ajaxOpts);
            ns.fines.fetch(ns.ajaxOpts);
            ns.holds.fetch(ns.ajaxOpts);
            ns.computerRooms.fetch();
            ns.person = new Person();
            ns.calendar.fetch(ns.ajaxOpts);

        },

        showMessages: function (m) {

            if (ns.debugging) {
                this.$m_container.append(m.messages);
            }

        }

    });

    return FakePortalView;

});
