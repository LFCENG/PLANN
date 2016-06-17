'use strict';
define(['routes', 'moment'], function (routes, moment) {
    var app = angular.module('plann', ['ngMaterial', 'ngRoute', 'ngResource', 'routeResolverServices', 'Gravatar']);
    app.config(function ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function(date) {
            moment().locale();
            return moment(date).format('LL');
        };
    });
    app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
                function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                    app.register =
                        {
                            controller: $controllerProvider.register,
                            directive: $compileProvider.directive,
                            filter: $filterProvider.register,
                            factory: $provide.factory,
                            service: $provide.service
                        };
                }]);
    app.config(routes);
    app.config(function ($gravatarProvider) {
        $gravatarProvider.setSize(100);
    });
    return app;
});
