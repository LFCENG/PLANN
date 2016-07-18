'use strict'

define(['app'], function (app){
    var injectParams = ['$resource'];
    var projects = [];
    //var projects = {};
    var waitingResponse = false;
    var emptyProjects = false;
    var projectService = function ($resource) {
        
        var serverResource = $resource('/project/:id', {id: '@_id'}, {
            update: { method: 'PUT' },
            query: {method: 'GET', isArray: true, cache: true }
        });
        
        return {
            create: function () {
                return new  serverResource;
            },
            query: function () {
                //if (Object.keys(projects).length === 0 && projects.constructor === Object && !waitingResponse) {
                if (!emptyProjects && projects.length === 0 && !waitingResponse) {
                    waitingResponse = true;
                    return serverResource.query(function (data, status, headers, config) {
                        if (data.length == 0){
                            emptyProjects = true;
                        } else {
                            projects = data;
                        }
                        waitingResponse = false;
                    });
                } else {
                    return projects;
                }
            }
        }
    };
    projectService.$inject = injectParams;
    app.service('Project', projectService);
    
});
