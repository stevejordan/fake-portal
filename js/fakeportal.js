require.config({
    paths: {
        jquery: 'lib/jquery.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        foundation: 'vendor/foundation/app',
        highcharts: 'http://code.highcharts.com/highcharts'
    },
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
                'vendor/foundation/jquery.placeholder',
                'vendor/foundation/jquery.foundation.forms',
                'vendor/foundation/jquery.foundation.tabs'
            ]
        },
        'vendor/foundation/jquery.placeholder': { deps: ['jquery'] },
        'vendor/foundation/jquery.foundation.forms': { deps: ['jquery'] },
        'vendor/foundation/jquery.foundation.tabs': { deps: ['jquery'] },
        'highcharts': {
            deps: ['jquery'],
            exports: 'Highcharts'
        }
    }
});

require([
    'views/fakeportal', 'namespace', 'foundation'
], function (FakePortal, ns) {

    'use strict';

    var $windowObj = $(window),
        windowWidth,
        $navToggler = $('#global-nav-toggler'),
        $globalNav = $('#global-nav1'),
        /* resize event handlers */
        didResize = false,
        breakpoints = {
            'tabletPortrait' : 768,
            'phonePortrait' : 480
        };

    //global jquery ajax error handler
    $("#working").bind("ajaxSend", function () {
        $(this).show();
    }).bind("ajaxComplete", function () {
        $(this).hide();
    });

    $("#error").bind("ajaxError", function (e, error) {
        $(this)
             .html('problem with ajax request for : ' + error.status + ' ' + error.statusText +
                  (error.status === 403 ? '<br/>need to sign into <a href="https://www.dev.city.ac.uk/portal-poc/remote-services" target="new">www.dev</a>?' : ''))
             .show()
             .click(function () {$(this).hide(); });

    });


    function getWindowWidth() {
        var wWidth =  Math.round($windowObj.width());
        return wWidth;
    }

    function windowResized(windowWidth) {

        if (windowWidth >= breakpoints.tabletPortrait) {
            $navToggler.removeClass("active");
            //clear any inline styles
            $globalNav.removeAttr("style");
        }

    }

    function pageInit() {

        $navToggler.bind('click', function () {
            $navToggler.toggleClass('active');
            $globalNav.slideToggle('slow', function () {
                $globalNav.toggleClass('active');
            });
        });
    }//pageInit

    windowWidth = getWindowWidth();

    $windowObj.resize(function () {
        didResize = true;
    });

    setInterval(function () {
        if (didResize) {
            didResize = false;
            var newWindowWidth = getWindowWidth();

            if (newWindowWidth !== windowWidth) {
                windowWidth = newWindowWidth;
                windowResized(windowWidth);
            }
        }
    }, 250); // setInterval

    pageInit();

    // this is the main view that kicks it all off
    ns.FakePortal = new FakePortal();

});
