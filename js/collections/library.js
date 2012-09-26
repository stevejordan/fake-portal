define([
    'underscore', 'backbone', 'collections/abstract'
], function( _, Backbone, AbstractCollection ) {

    var LibraryCollection = AbstractCollection.extend({
        url: function () {
            return '/portal-poc/remote-services/millenium-api?request=' + this.requestString;
        },
        parse: function (response) {

            //error checking
            if (!response.main || response.main.status !== 'success') {
                ns.Helpers.debug('error: ' + (response.main.message || 'unknown problem'));
                return {};
            }

            return response.main.items;
        }
    });

    return LibraryCollection;

});
