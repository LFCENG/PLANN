'use strict'
define(['app'], function (app) {
    app.controller('ProjectsCreateController', ['Project','$scope', '$timeout', '$mdSidenav', '$log', function (Project, $scope, $timeout, $mdSidenav, $log) {
        $scope.project = Project.create();
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
        
        $scope.deleteProject = function (project) {
            $scope.errors = null;
            $scope.updating = true;
            project.$delete(project).catch(function (projectData) {
                $scope.errors = [projectData.data.error];
            }).finally(function () {
                $scope.updating = false;
                $scope.projects.splice(project.$index, 1);
                $scope.hide();
            });
        };
        
        $scope.updateProject = function (project) {
            $scope.errors = null;
            $scope.updating = true;
            project.$update(project).catch(function (projectData) {
                $scope.errors = [projectData.data.error];
            }).finally(function () {
                $scope.updating = false;
                $scope.hide();
            });
        };

        /*
        $scope.updateProject = function (project) {
            $scope.errors = null;
            $scope.updating = true;
            project.$save().catch(function(projectData) {
                $scope.errors = [projectData.data.error];
            }).finally(function() {
                $scope.updating = false;
            });
            };
        */
    }]);
});
