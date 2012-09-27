/*jslint
 evil: true, browser: true, nomen: true, plusplus: true
*/

/*global
 jQuery, $, Backbone, _
*/

require.config({
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: 'lib/jquery.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
    }
});

require([
    'views/fakeportal'
], function ( FakePortal ) {

    // this is the main view that kicks it all off
    new FakePortal();

});
