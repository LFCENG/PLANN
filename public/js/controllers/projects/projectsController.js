'use strict'
define(['app'], function (app) {
    app.register.controller('ProjectsController', function ($scope, Project) { //['$scope', function ($scope, Project) {
        $scope.projects = Projects.query();
    });
//}]);
});
