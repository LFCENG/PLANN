'use strict'
define(['app'], function (app) {
    var injectParams = ['$timeout'];
    var onFinishRenderDirective = function ($timeout) {
        return {
            restrict: "A",
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
    };
    onFinishRenderDirective.$inject = injectParams;
    app.directive('onFinishRender', onFinishRenderDirective);
});
