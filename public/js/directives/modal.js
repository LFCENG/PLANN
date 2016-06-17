'use strict'
define(['app'], function (app) {
    var injectParams = ['$sce'];
    
    var modalDirective = function ($sce) {
        return {
            replace: true,
            restrict: "E",
            transclude: true,
            scope: {
                visible: '=',
                data: '=',
                onShow: '&',
                onHide: '&',
                submit1:'=',
                submit2:'=',
                updating: '='
            },
            templateUrl: "templates/directives/modal.html",
            link: function postLink(scope, element, attrs) {
                $(element).modal({
                    show: false,
                    keyboard: attrs.keyboard, 
                    backdrop: attrs.backdrop
                });
                scope.$watch(function(){return scope.visible;}, function(value){
                    if(value == true){
                        $(element).modal('show');
                    }else{
                        $(element).modal('hide');
                    }
                });
                
                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });
                
                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.onShow({});
                    });
                });
                
                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                    });
                });
                
                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.onHide({});
                    });
                });
            }
        };
    };
    modalDirective.$inject = injectParams;
    app.directive('modal', modalDirective);
});
