define([
    'jquery', 'collections/library', 'models/book', 'views/book'
], function( $, LibraryCollection, Book, BookView ) {

    var BooksCollection = LibraryCollection.extend({
        model: Book,
        view: 'BookView',
        requestString: 'checked_out_items',
        $el: $('#books'),
    });

    return BooksCollection;

});
