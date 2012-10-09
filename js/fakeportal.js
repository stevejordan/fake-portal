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
        },
        'foundation': {
            deps: [ 
                'jquery', 
                'vendor/foundation/modernizr.foundation',
                'vendor/foundation/jquery.placeholder'
            ]
        }
    },
    paths: {
        jquery: 'lib/jquery.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        foundation: 'vendor/foundation/app',
    }
});

require([
    'views/fakeportal', 'namespace', 'foundation'
], function ( FakePortal, ns ) {

    //global jquery ajax error handler
     $("#working").bind("ajaxSend", function(){
         $(this).show();
     }).bind("ajaxComplete", function(){
         $(this).hide();
     });

     $("#error").bind("ajaxError", function(e, error){
         $(this)
             .html('problem with ajax request for : ' + error.status + ' ' + error.statusText +
                  (error.status === 403 ? '<br/>need to sign into <a href="https://www.dev.city.ac.uk/portal-poc/remote-services" target="new">www.dev</a>?' : ''))
             .show()
             .click(function () {$(this).hide();});
         
     });

    // this is the main view that kicks it all off
    var main = new FakePortal();

    ns.FakePortal = main;

});
