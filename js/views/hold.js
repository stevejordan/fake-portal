define([
    'jquery', 'underscore', 'backbone', 'namespace'
], function ( $, _, Backbone, ns) {
           
       var HoldView = Backbone.View.extend({

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

       return HoldView;

});