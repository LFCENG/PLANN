'use strict'
define(['app'], function (app) {
    app.controller('UploadController', ['$scope','$mdDialog','$mdMedia', 'FileUpload',function ( $scope, $mdDialog, $mdMedia, fileUpload) {
        $scope.uploadFile = function(){
            var file = $scope.projectsFile;
            
            console.log('file is ' );
            console.dir(file);
            
            var uploadUrl = "/project/fileUpload";
            fileUpload.uploadFileToUrl(file, uploadUrl);
        };
        
        $scope.showBulkUploadPrompt = function (evt) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController,
                template: dialogTemplate,
                parent: angular.element(document.body),
                targetEvent: evt,
                clickOutsideToClose:true,
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
        }
        function DialogController($scope, $mdDialog) {
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
        var dialogTemplate = 
            '<div ng-controller="UploadController">' + 
            '<md-dialog aria-label="List dialog">' +
            '  <md-dialog-content>'+
            '    <input type = "file" file-model="projectsFile"/>' + 
            '  </md-dialog-content>' +
            '  <md-dialog-actions>' +
            '    <md-button ng-click="closeDialog()" class="md-primary">' +
            '      Close Dialog' +
            '    </md-button>' +
            '  </md-dialog-actions>' +
            '  <md-dialog-actions>' +
            '    <md-button ng-click="uploadFile()" class="md-primary">' +
            '      Upload File' +
            '    </md-button>' +
            '  </md-dialog-actions>' +
            '</md-dialog>' + 
            '</div>';
    }]);
});
