define([
    'backbone',
    'collections/abstract',
    'views/person',
    'namespace',
    'helpers'
], function( Backbone, AbstractCollection, PersonView, ns, Helpers ) {

    var Person = Backbone.Model.extend({

        //we are using this without a collection, so we need this:
        url: function () {
            Helpers.debug('don\'t worry about the next initializing undefined...');
            return (new AbstractCollection).url() + 'remote-services/user-details';
        },

        initialize: function () {
            this.fetch(_.extend({
                success: function (m, r) {
                    new PersonView({model: m});
                }},
                ns.ajaxOpts
            ));
        }

    });

    return Person;

});