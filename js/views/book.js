define([
    'jquery', 'underscore', 'backbone', 'namespace'
], function ( $, _, Backbone, ns) {
           
    var BookView = Backbone.View.extend({

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

    return BookView;

});