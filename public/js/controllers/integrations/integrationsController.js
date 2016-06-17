'use strict'
define(['app'], function (app) {
    app.register.controller('IntegrationsController', ['$scope','Integration',  function ($scope, Integration) {
        $scope.integrations = Integration.query();
    }]);
});
