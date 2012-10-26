define([
    'jquery', 'underscore', 'backbone', 'namespace', 'helpers'
], function ( $, _, Backbone, ns, Helpers) {

    var ServicenowMessageView = Backbone.View.extend({

        tagName: 'li',
        classes: 'it-service-desk alert',

        template: _.template($('#servicenow-template').html()),

        initialize: function () {
            this.render();
        },

        render: function () {

            Helpers.debug('rendering a service now message...');
            //Helpers.debug(this.model.toJSON());

            this.$el
                .html(this.template(this.model.toJSON()))
                .addClass(this.classes)
                .appendTo(ns.servicenowMessages.$el);

            //if debug also append to table
            Helpers.showTableView('servicenow', this.model);

            return this;
        }

    });

    //also store in namespace
    ns.ServicenowMessageView = ServicenowMessageView;

    return ServicenowMessageView;

});