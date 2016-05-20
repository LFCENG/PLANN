require.config({
    baseUrl: 'js',
    
    paths: {
        jquery: 'libs/jquery.min',
        toolkit: 'libs/toolkit.min',
        angular: 'libs/angular.min',
        angularRoute: 'libs/angular-route.min',
        angularResource: 'libs/angular-resource.min'
    },
    
    shim: {
        angular: {'exports': 'angular'},
        angularRoute: ['angular'],
        angularResource: ['angular'],
        toolkit: ['jquery'],
        
        app: ['angular', 'angularRoute','angularResource',  'toolkit']
    },
});

require([
    'app',
    'services/routeResolver',
    'services/gravatar'
], function () {
    'use strict';
    angular.bootstrap(document, ['plann']);
});
