define([
    'jquery', 'underscore', 'backbone', 'namespace', 'helpers'
], function ( $, _, Backbone, ns, Helpers) {
           
    var BookView = Backbone.View.extend({

        tagName: 'li',

        template: _.template($('#book-template').html()),

        initialize: function () {
            this.render();
        },

        render: function () {

            Helpers.debug('rendering a book...');
            //Helpers.debug(this.model.toJSON());

            this.$el
                .html(this.template(this.model.toJSON()))
                .appendTo(ns.books.$el);

            //if debug also append to table
            Helpers.showTableView('book', this.model);

            return this;

        }
    });

    //also store in namespace
    ns.BookView = BookView;

    return BookView;

});