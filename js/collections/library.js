define([
    'collections/abstract', 'namespace', 'helpers'
], function( AbstractCollection, ns, Helpers ) {

    var LibraryCollection = AbstractCollection.extend({

        urlfragment: function () {
            return 'remote-services/millenium-api?request=' + this.requestString;
        },

        parse: function (response) {

            //error checking
            if (!response.main || response.main.status !== 'success') {
                Helpers.debug('error: ' + (response.main.message || 'unknown problem'));
                return {};
            }

            return response.main.items;
        }

    });

    return LibraryCollection;

});
