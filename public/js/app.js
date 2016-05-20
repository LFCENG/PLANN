'use strict';
define(['routes'], function (routes) {
    var app = angular.module('plann', ['ngRoute', 'ngResource', 'routeResolverServices', 'Gravatar'])
    app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
                function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                    app.register =
                        {
                            controller: $controllerProvider.register,
                            directive: $compileProvider.directive,
                            filter: $filterProvider.register,
                            factory: $provide.factory,
                            service: $provide.se5rvice
                        };
                }]);
    app.config(routes);
    app.config(function ($gravatarProvider) {
        $gravatarProvider.setSize(100);
    });
    return app;
});
