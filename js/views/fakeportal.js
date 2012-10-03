define([
    'jquery',
    'backbone',
    'collections/courses',
    'collections/books',
    'collections/fines',
    'collections/holds',
    'collections/calendar',
    'namespace',
    'helpers'
], function ( $, Backbone, CoursesCollection, BooksCollection, 
              FinesCollection, HoldsCollection, Calendar, ns, Helpers ) {
           
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

            //instantiate the collections
            ns.courses = new CoursesCollection();
            ns.books = new BooksCollection();
            ns.fines = new FinesCollection();
            ns.holds = new HoldsCollection();
            ns.calendar = new Calendar();

            //while on localhost, we make CORS requests and need
            //withCredentials to be set
            if (document.location.host === 'localhost') {
                ajaxOpts = {
                    xhrFields: {
                        withCredentials: true
                    }
                };
            }

            //load up the data
            ns.courses.fetch(ajaxOpts);
            ns.books.fetch(ajaxOpts);
            ns.fines.fetch(ajaxOpts);
            ns.holds.fetch(ajaxOpts);

            //pull in calendar
            ns.calendar.fetch(ajaxOpts);

        },

        showMessages: function (m) {

            if (ns.debugging) {
                this.$m_container.append(m.messages);
            }

        }

    });

    return FakePortalView;

});
