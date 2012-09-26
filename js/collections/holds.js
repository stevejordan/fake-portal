define([
    'underscore', 'backbone', 'collections/library'
], function( _, Backbone, LibraryCollection ) {

    var HoldsCollection = LibraryCollection.extend({
        model: Hold,
        view: 'HoldView',
        requestString: 'holds',
        $el: $('#holds'),
    });

    return HoldsCollection;

});
