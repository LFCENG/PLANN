'use strict'
define(['app'], function (app) {
    var injectParams = ['$sce'];
    
    var integrationDirective = function ($sce) {
        return {
            replace: true,
            restrict: "E",
            scope: {
                integration: "=",
                token: "="
            },
            templateUrl: "templates/directives/integration.html",
            link: function(scope, element) {
                if(scope.body){
                    scope.body = $sce.trustAsHtml(markdown.toHTML(scope.body.toString()));
                }
            }
        };
    };
    integrationDirective.$inject = injectParams;
    app.directive('integration', integrationDirective);
});
