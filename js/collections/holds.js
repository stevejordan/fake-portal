define([
    'jquery', 'collections/library', 'models/hold', 'views/hold'
], function(_$, LibraryCollection, Hold, HoldView ) {

    var HoldsCollection = LibraryCollection.extend({
        model: Hold,
        view: 'HoldView',
        requestString: 'holds',
        $el: $('#holds'),
    });

    return HoldsCollection;

});
