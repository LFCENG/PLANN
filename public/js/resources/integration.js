'use strict'
define(['app'], function (app) {
    var injectParams = ['$resource'];
    var integrationFactory = function ($resource) {
        return $resource('/integration/:id', {}, {
            update: {
                method: 'PUT'
            }
        });
    };
    
    integrationFactory.$inject = injectParams;
    app.factory('Integration', integrationFactory);
});
