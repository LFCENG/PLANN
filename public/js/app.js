'use strict';
define(['routes', 'moment'], function (routes, moment) {
    var app = angular.module('plann', ['ngCookies', 'pascalprecht.translate', 'ngAnimate', 'ngSanitize', 'ngMaterial', 'ngRoute', 'ngResource', 'routeResolverServices', 'Gravatar']);
    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('yellow')
            .accentPalette('blue-grey');
    });
    app.config(['$translateProvider', function ($translateProvider) {
        $translateProvider
            .useStaticFilesLoader({
                prefix: '/translations/',
                suffix: '.json'
            })
            .preferredLanguage('en')
            .useLocalStorage()
            .useMissingTranslationHandlerLog()
            .useSanitizeValueStrategy('escape');
    }]);
    app.run(['$rootScope', function($rootScope) {
        $rootScope.lang = 'en';
        
    }]);
    app.config(function  ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        $mdDateLocaleProvider.formatDate = function(date) {
            moment.locale('pt');
            moment().locale();
            if (date == null) {
                return null;
            }
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
