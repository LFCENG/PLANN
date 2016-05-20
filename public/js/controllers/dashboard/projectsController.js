'use strict'
define(['app'], function (app) {
    app.register.controller('ProjectsController', ['$scope', function ($scope) {
        console.log('controller loaded');
        //Controller code goes here    
     }]);
});

/*
  require([], function () {
  angular.module('plann')
        .controller('ProjectsCreateController', function ($scope, Project, Session) {
            // redirect if a user is not logged in
            Session.authenticate();
            
            // Create a new blank note
            $scope.project = new Project();
            
            $scope.updateProject = function(project) {
                $scope.errors = null;
                $scope.updating = true;
                
                // With NgResource
                project.$save().catch(function(projectData) {
                    $scope.errors = [projectData.data.error];
                }).finally(function() {
                    $scope.updating = false;
                });
            }
        }); 
});

*/
