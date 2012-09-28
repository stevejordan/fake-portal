define([
    'jquery', 'collections/library', 'models/hold'
], function(_$, LibraryCollection, Hold ) {

    var HoldsCollection = LibraryCollection.extend({
        model: Hold,
        view: 'HoldView',
        requestString: 'holds',
        $el: $('#holds'),
    });

    return HoldsCollection;

});
