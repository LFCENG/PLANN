'use strict'
define(['app'], function (app) {
    app.register.controller('SettingsController', ['Account', '$scope', function (Account, $scope) {
        $scope.$watch(function () {
            return Account.get();
        }, function (account) {
            $scope.account = account;
        });
        $scope.companyTypes = ['ARCHITECTURE', 'ENGINEERING', 'CAD_DESIGN', 'BIM_DESIGN', '3D_MODELLING'];
        $scope.roles = ['PROJECT_MANAGER', 'ARCHITECT', 'ENGINEER', 'CAD_DESIGNER', 'BIM_DESIGNER', '3D_DESIGNER'];
        $scope.languages = ['PORTUGUESE', 'ENGLISH_UK', 'ENGLISH_US'];
        $scope.currentNavItem = 'account';
        $scope.fields = [
            {name : "reference", type: "string", required: true},
            {name : "title", type: "string", required: true}

        ];
        $scope.updateAccount = function (account) {
            $scope.errors = null;
            $scope.updating = true;
            Account.update(account).catch(function(accountData) {
                $scope.errors = [accountData.data.error];
            }).finally(function () {
                $scope.updating = false;
            });
        };
    }]);
});

