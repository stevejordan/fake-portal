define([
    'jquery', 'underscore', 'backbone', 'namespace', 'helpers'
], function ( $, _, Backbone, ns, Helpers) {
           
    var FineView = Backbone.View.extend({

        tagName: 'li',

        template: _.template($('#fine-template').html()),

        initialize: function () {
            this.render();
        },

        render: function () {

            Helpers.debug('rendering a fine...');
            //Helpers.debug(this.model.toJSON());

            this.$el
                .html(this.template(this.model.toJSON()))
                .appendTo(ns.fines.$el);

            //if debug also append to table
            Helpers.showTableView('fine', this.model);

            return this;

        }
    });

    ns.FineView = FineView;

    return FineView;

});