define([
    'jquery', 'collections/library', 'models/fine'
], function( $, LibraryCollection, Fine ) {

    var FinesCollection = LibraryCollection.extend({
        model: Fine,
        view: 'FineView',
        requestString: 'fines',
        $el: $('#fines'),
    });

    return FinesCollection;

});
