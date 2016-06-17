'use strict'
define(['app'], function (app) {
    var injectParams = ['$sce'];
    
    var projectDirective = function ($sce) {
        return {
            replace: true,
            restrict: "E",
            transclude: true,
            scope: {
                project: "=",
                updating: "="
            },
            templateUrl: "templates/directives/project.html",
            
            link: function(scope, element) {
                if(scope.body){
                    scope.body = $sce.trustAsHtml(markdown.toHTML(scope.body.toString()));
                }
            }
        };
    };
    projectDirective.$inject = injectParams;
    app.directive('project', projectDirective);
});
