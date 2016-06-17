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
        
        
        
        
        $scope.updateProject = function (project) {
            $scope.errors = null;
            $scope.updating = true;
            project.$save().catch(function(projectData) {
                $scope.errors = [projectData.data.error];
            }).finally(function() {
                $scope.updating = false;
            });
        };        
    }]);
});
