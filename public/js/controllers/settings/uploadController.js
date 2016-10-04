'use strict'
define(['app'], function (app) {
    app.controller('UploadController', ['$scope','$mdDialog','$mdMedia', 'FileUpload',function ( $scope, $mdDialog, $mdMedia, fileUpload) {
        
        $scope.showBulkUploadPrompt = function (evt) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/directives/uploadDialog.html',
                parent: angular.element(document.body),
                targetEvent: evt,
                clickOutsideToClose: true,
                escapeToClose: true,
                fullscreen: useFullScreen
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };
        
        function DialogController($scope, $mdDialog) {
            $scope.validateFile = function () {};
            $scope.uploadFile = function(){
                var file = $scope.projectsFile;
                var uploadUrl = "/project/fileUpload";
                fileUpload.uploadFileToUrl(file, uploadUrl);
            };
            
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
    }]);
});
