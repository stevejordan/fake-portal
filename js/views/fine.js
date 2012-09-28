define([
    'jquery', 'underscore', 'backbone', 'namespace'
], function ( $, _, Backbone, ns) {
           
    var FineView = Backbone.View.extend({

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

    return FineView;

});