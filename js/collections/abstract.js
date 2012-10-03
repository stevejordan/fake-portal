define([
    'backbone', 'helpers', 'namespace'
], function( Backbone, Helpers, ns ) {

    var AbstractCollection = Backbone.Collection.extend({

        initialize: function () {
            Helpers.debug('initializing ' + this.view + ' collection');
            //hook up events
            this.on('add', this.addOne);
        },

        reset: function (models) {
            Helpers.debug('resetting ' + this.view + ' collection');
            Helpers.debug('from ' + this.length);
            this.add(models);
            Helpers.debug('to ' + this.length);
        },

        addOne: function (model) {
            Helpers.debug('adding a ' + this.view.replace('View', ''));
            //all views need to be stored in the namespace for this to work
            new ns[this.view]({'model': model});
        },

        //when in development force all urls over CORS to www.dev
        url: function () {

            var prefixedUrl =
                ((document.location.host === 'localhost') ? 
                 'https://www.dev.city.ac.uk/portal-poc/' : '')
                + 
                ((typeof this.urlfragment === 'function') ?
                 this.urlfragment() : this.urlfragment);

            return prefixedUrl;

        }

    });

    return AbstractCollection;

});
