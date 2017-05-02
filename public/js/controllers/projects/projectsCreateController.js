'use strict'
define(['app'], function (app) {
    app.controller('ProjectsCreateController', ['Project','Fields', '$scope', '$timeout', '$mdSidenav', '$log', function (Project, Fields, $scope, $timeout, $mdSidenav, $log) {
        $scope.$watch(function () {
            return Project.query();
        }, function (projects) {
            $scope.projects = projects;      
        });
        $scope.$watch(function () {
            return Fields.get();
        }, function (fields) {
            $scope.fields = fields;
        });
        $scope.collapsed = false;
        $scope.toggleCollapse = function () {
            $scope.collapsed = $scope.collapsed ? false : true;
        }
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
        
        $scope.deleteProject = function (project, index) {
            $scope.errors = null;
            $scope.updating = true;
            project.$delete(project).then(function (res) {    
                $scope.projects.splice(index, 1);
            }).catch(function (projectData) {
                $scope.errors = [projectData.data.error];
            }).finally(function () {
                $scope.updating = false;
                $scope.close();
            });
        };
        
        $scope.saveProject = function (project) {
            $scope.errors = null;
            $scope.updating = true;
            project.$save().then(function (res) {
                $scope.projects.push(res);
            }).catch(function (projectData) {
                $scope.errors = [projectData.data.error];
            }).finally(function (response) {
                $scope.updating = false;
                $scope.close();
            });
        }
        
        $scope.updateProject = function (project) {
            $scope.errors = null;
            $scope.updating = true;
            project.$update(project).catch(function (projectData) {
                $scope.errors = [projectData.data.error];
            }).finally(function () {
                $scope.updating = false;
                $scope.close();
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
