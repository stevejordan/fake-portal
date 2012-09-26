define([
    'underscore', 'backbone', 'collections/library'
], function( _, Backbone, LibraryCollection ) {

    var FinesCollection = LibraryCollection.extend({
        model: Fine,
        view: 'FineView',
        requestString: 'fines',
        $el: $('#fines'),
    });

    return FinesCollection;

});
