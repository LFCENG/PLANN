'use strict'

define(['app'], function (app){
    var injectParams = ['$resource'];
    var account = false;
    var waitingResponse = false;
    var accountService = function ($resource) {
        
        var serverResource = $resource('/account/:id', {id: '@_id'}, {
            update: { method: 'PUT' },
            get: {method: 'GET', isArray: false, cache: true }
        });
        
        return {
            create: function () {
                return new  serverResource;
            },
            get: function () {
                if (!account && !waitingResponse) {
                    waitingResponse = true;
                    return serverResource.get(function (data, status, headers, config) {
                        account = data;
                        waitingResponse = false;
                    });
                } else {
                    return account;
                }
            },
            update: function (data) {
                return serverResource.update(data, function (data, status, headers, config) {
                    account = data;
                });
            }
        }
    };
    accountService.$inject = injectParams;
    app.service('Account', accountService);
    
});
