require.config({
    baseUrl: 'js',
    
    paths: {
        jquery: 'libs/jquery.min',
        toolkit: 'libs/toolkit.min',
        markdown: 'libs/markdown',
        angular: 'libs/angular.min',
        angularRoute: 'libs/angular-route.min',
        angularResource: 'libs/angular-resource.min',
        angularMaterial: 'libs/angular-material.min',
        angularAnimate: 'libs/angular-animate.min',
        angularAria: 'libs/angular-aria.min',
        angularMessages: 'libs/angular-messages.min',
        moment: 'libs/moment-with-locales.min',
        navbar: 'custom/navbar',
        tablesorter: 'libs/tablesorter.min'
    },
    
    shim: {
        angular: {'exports': 'angular'},
        angularRoute: ['angular'],
        angularResource: ['angular'],
        angularAnimate: ['angular'],
        angularAria: ['angular'],
        angularMessages: ['angular'],
        angularMaterial: ['angular', 'angularAnimate', 'angularAria', 'angularMessages'],
        toolkit: ['jquery'],
        tablesorter: ['jquery'],
        navbar: ['tablesorter'],
        moment: {'exports': 'moment'},
        app: ['angular', 'angularRoute','angularResource',  'toolkit', 'markdown', 'navbar', 'angularMaterial', 'moment']
    },
});

require([
    'app',
    'moment',
    'services/routeResolver',
    'services/gravatar',
    // 'resources/project',
    'services/project',
    'resources/integration',
    'directives/project',
    'controllers/projects/projectsCreateController',
    'directives/modal',
    'directives/integration',
    'directives/on-finish-render',
    'directives/formattedDate'
], function () {
    'use strict';
    angular.bootstrap(document, ['plann']);
});
