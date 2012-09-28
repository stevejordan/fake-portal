define([
    'jquery', 'collections/library', 'models/book'
], function( $, LibraryCollection, Book ) {

    var BooksCollection = LibraryCollection.extend({
        model: Book,
        view: 'BookView',
        requestString: 'checked_out_items',
        $el: $('#books'),
    });

    return BooksCollection;

});
