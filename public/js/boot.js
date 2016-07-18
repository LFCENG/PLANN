require.config({
    waitSeconds: 30,
    baseUrl: 'js',
    
    paths: {
        jquery: 'libs/jquery.min',
        toolkit: 'libs/toolkit.min',
        markdown: 'libs/markdown',
        chart: 'libs/Chart.min',
        angular: 'libs/angular.min',
        angularRoute: 'libs/angular-route.min',
        angularResource: 'libs/angular-resource.min',
        angularMaterial: 'libs/angular-material.min',
        angularAnimate: 'libs/angular-animate.min',
        angularAria: 'libs/angular-aria.min',
        angularMessages: 'libs/angular-messages.min',
        angularTranslate: 'libs/angular-translate.min',
        angularTranslateLog: 'libs/angular-translate-handler-log.min',
        angularTranslateStaticFiles: 'libs/angular-translate-loader-static-files.min',
        angularTranslateStorageLocal: 'libs/angular-translate-storage-local.min',
        angularTranslateStorageCookie: 'libs/angular-translate-storage-cookie.min',
        angularCookies: 'libs/angular-cookies.min',
        angularSanitize: 'libs/angular-sanitize.min',
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
        angularTranslate: ['angular'],
        angularSanitize: ['angular'],
        angularTranslateLog: ['angular', 'angularTranslate'],
        angularTranslateStaticFiles: ['angular', 'angularTranslate'],
        angularTranslateStorageLocal: ['angular', 'angularTranslate'],
        angularTranslateStorageCookie: ['angular', 'angularTranslate'],
        angularCookies: ['angular'],
        toolkit: ['jquery'],
        tablesorter: ['jquery'],
        navbar: ['tablesorter'],
        moment: {'exports': 'moment'},
        app: ['angular', 'angularRoute','angularResource',  'toolkit', 'markdown', 'navbar', 'angularMaterial', 'moment', 'angularTranslate', 'angularTranslateLog', 'angularTranslateStaticFiles', 'angularSanitize', 'angularCookies', 'chart']
    },
});

require([
    'app',
    'moment',
    'angularTranslate',
    'angularTranslateLog',
    'angularTranslateStorageLocal',
    'angularTranslateStorageCookie',
    'services/routeResolver',
    'services/gravatar',
    'services/project',
    'services/fileUpload',
    // 'resources/project',
    'resources/integration',
    'directives/project',
    'directives/modal',
    'directives/integration',
    'directives/on-finish-render',
    'directives/formattedDate',
    'directives/fileModel',
    'filters/pickerFilter',
    'controllers/projects/projectsCreateController',
    'controllers/navigation/languageController',
    'controllers/file/uploadController'
], function () {
    'use strict';
    angular.bootstrap(document, ['plann']);
});
