require([], function () {
    angular.module('plann')
        .controller('AccountController', function ($scope, $routeParam, User, Gravatar) {
            
            $scope.gravatarUrl = function (email) {
                return Gravatar(email);
            };
            
            $scope.authenticate = function (user) {
                //$scope.user = User.get({id: $routeParams.id});
                $scope.user = User.get();
            };
            
            $scope.create = function (user) {
                $scope.errors = null;
                $scope.updating = true;
                user.$save(user)
                    .catch(function (user) {
                        $scope.errors= [user.data.error];
                    }).finnaly(function (user) {
                        $scope.updating = false;
                    });
            };
            
            $scope.remove = function (user) {
                User.$delete(user);
            };
            
            $scope.update = function (user) {
                $scope.errors = null;
                $scope.updating = true;
                user.$update()
                    .catch(function (user) {
                        $scope.errors= [user.data.error];
                    }).finnaly(function (user) {
                        $scope.updating = false;
                    });
            };
        });
});

