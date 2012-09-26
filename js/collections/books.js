define([
    'underscore', 'backbone', 'collections/library'
], function( _, Backbone, LibraryCollection ) {

    var BooksCollection = LibraryCollection.extend({
        model: Book,
        view: 'BookView',
        requestString: 'checked_out_items',
        $el: $('#books'),
    });

    return BooksCollection;

});
