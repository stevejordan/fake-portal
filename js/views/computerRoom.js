define([
    'jquery', 'underscore', 'backbone', 'namespace', 'helpers'
], function ( $, _, Backbone, ns, Helpers) {
           
    var ComputerRoomView = Backbone.View.extend({

        tagName: 'tr',

        template: _.template($('#computer-room-template').html()),

        initialize: function () {

            //update "updated" date
            ns.computerRooms
                .$updatedEl
                    .html('Last updated at ' + 
                          (new Date).toLocaleTimeString());

            this.render();
        },

        render: function () {

            this.$el
                .html(this.template(this.model.toJSON()))
                .appendTo(ns.computerRooms.$el);

        }

    });
    
    ns.ComputerRoomView = ComputerRoomView;

    return ComputerRoomView;

});