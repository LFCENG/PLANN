'use strict';
define(['routes', 'moment'], function (routes, moment) {
    var app = angular.module('plann', ['ngCookies', 'pascalprecht.translate', 'ngAnimate', 'ngSanitize', 'ngMaterial', 'ngRoute', 'ngResource', 'routeResolverServices', 'Gravatar']);
    // FOR LATER: Push Themes, Translate Provider and Locales to separate files
    app.config(function ($mdThemingProvider) {
        var plannYellowPalette = $mdThemingProvider.extendPalette('yellow', {'500': '#fbd721'});
        $mdThemingProvider.definePalette('plannYellow', plannYellowPalette);
        $mdThemingProvider.theme('default')
            .primaryPalette('plannYellow', {'default':'500'})
            .accentPalette('plannYellow', {'default': '500'})
            .warnPalette('deep-orange');
        
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
