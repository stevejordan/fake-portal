define([], function () {
           
    //setup app namespace
    var FP = {};

    //debug flag
    FP.debugging = location.search.match('debug') ? true : false;

    return FP;

});
