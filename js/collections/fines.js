define([
    'jquery', 'collections/library', 'models/fine', 'views/fine'
], function( $, LibraryCollection, Fine, FineView ) {

    var FinesCollection = LibraryCollection.extend({
        model: Fine,
        view: 'FineView',
        requestString: 'fines',
        $el: $('#fines'),
    });

    return FinesCollection;

});
