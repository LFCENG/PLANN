'use strict'

define(['app'], function () {
    app.factory('Project', function ProjectFactory($resource) {
        return $resource('/projects/:id', {}, {
            update: {
                method: 'PUT'
            }
        });
    });
});
