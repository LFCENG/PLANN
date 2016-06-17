'use strict'
define(['app'], function (app) {
    
    app.factory('Project', ['$resource', function ($resource) {
        return $resource('/project/:id', {cache: true}, {
            update: {
                method: 'PUT'
            }
        });
    }]);
    
});
