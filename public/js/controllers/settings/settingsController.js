'use strict'
define(['app'], function (app) {
    app.register.controller('SettingsController', ['Account', 'Fields', '$scope', function (Account, Fields, $scope) {
        $scope.$watch(function () {
            return Fields.get();
        }, function (fields) {
            $scope.fields = fields;
        });
        
        $scope.$watch(function () {
            return Account.get();
        }, function (account) {
            $scope.account = account;
        });
        $scope.companyTypes = ['ARCHITECTURE', 'ENGINEERING', 'CAD_DESIGN', 'BIM_DESIGN', '3D_MODELLING'];
        $scope.roles = ['PROJECT_MANAGER', 'ARCHITECT', 'ENGINEER', 'CAD_DESIGNER', 'BIM_DESIGNER', '3D_DESIGNER'];
        $scope.languages = ['PORTUGUESE', 'ENGLISH_UK', 'ENGLISH_US'];
        $scope.currentNavItem = 'account';
        $scope.fieldTypes = ["string", "date", "number", "time", "currency"];
        $scope.delete = function (field, index) {
            Fields.delete(field._id, function (success) {
                if (success) {
                    $scope.fields.splice(index, 1); 
                };
            });
        };
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

