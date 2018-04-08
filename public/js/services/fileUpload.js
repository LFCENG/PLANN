'use strict'

define(['app'], function (app){
    var injectParams = ['$http'];
    var uploadService = function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined, 'charset': 'windows-1252'}
                
            })
            
                .success(function(res){
                    console.log(res);;
                })
            
                .error(function(){
                });
        }
    };
    uploadService.$inject = injectParams;
    app.service('FileUpload', uploadService);
    
});
