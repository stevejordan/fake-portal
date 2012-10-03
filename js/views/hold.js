define([
    'jquery', 'underscore', 'backbone', 'namespace', 'helpers'
], function ( $, _, Backbone, ns, Helpers) {
           
       var HoldView = Backbone.View.extend({

           tagName: 'li',

           template: _.template($('#hold-template').html()),

           initialize: function () {
               this.render();
           },

           render: function () {

               Helpers.debug('rendering a hold...');
               //Helpers.debug(this.model.toJSON());

               this.$el
                   .html(this.template(this.model.toJSON()))
                   .appendTo(ns.holds.$el);

               //if debug also append to table
               Helpers.showTableView('hold', this.model);

               return this;

           }

       });

       ns.HoldView = HoldView;

       return HoldView;

});