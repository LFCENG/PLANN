'use strict'
define(['app'], function (app) {
    app.register.controller('IntegrationsCreateController', ['$scope','$routeParams', 'Integration',  function ($scope, $routeParams, Integration) {
        $scope.integration = new Integration({integration: $routeParams.integration});
        $scope.updateIntegration = function (integration) {
            
            $scope.errors = null;
            $scope.updating = true;
            integration.$save().catch(function(integrationData) {
                $scope.errors = [integrationData.data.error];
            }).finally(function() {
                $scope.updating = false;
            });
        };        
    }]);
});
