define([
    'underscore',
    'backbone'
], function( _, Backbone ) {

    var AbstractCollection = Backbone.Collection.extend({

        initialize: function () {
            ns.Helpers.debug('initializing ' + this.view + ' collection');
            //hook up events
            this.on('add', this.addOne);
        },

        reset: function (models) {
            ns.Helpers.debug('resetting ' + this.view + ' collection');
            ns.Helpers.debug('from ' + this.length);
            this.add(models);
            ns.Helpers.debug('to ' + this.length);
        },

        addOne: function (model) {
            ns.Helpers.debug('adding a ' + this.view.replace('View', ''));
            //all views need to be stored in the namespace for this to work
            new ns[this.view]({'model': model});
        }

    });

    return AbstractCollection;

});
