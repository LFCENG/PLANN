'use strict'

define(['app'], function (app){
    var injectParams = ['$resource'];
    var fields = [];
    var waitingResponse = false;
    var fieldsService = function ($resource) {
        
        var serverResource = $resource('/fields/:id', {id: '@_id'}, {
            update: { method: 'PUT' },
            query: {method: 'GET', isArray: true, cache: true }
        });
        
        return {
            create: function () {
                return new  serverResource;
            },
            get: function () {
                if (fields.length === 0 && !waitingResponse) {
                    waitingResponse = true;
                    return serverResource.query(function (data, status, headers, config) {
                        fields = data;
                        waitingResponse = false;
                    });
                } else {
                    return fields;
                }
            },
            delete: function (fieldId, callback) {
                return serverResource.delete({id: fieldId}, function(data, status, headers, config) {
                    callback(data);
                });
            }
        }
    };
    fieldsService.$inject = injectParams;
    app.service('Fields', fieldsService);
    
});
