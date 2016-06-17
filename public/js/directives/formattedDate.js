'use strict'
define(['app'], function (app) {
    var injectParams = ['dateFilter'];
    
    var formattedDateDirective = function (dateFilter) {
        return {
            require: 'ngModel',
            //replace: true,
            //restrict: "A",
            scope: {
                formatFilter: '@'
            },
            link: function(scope, element, attrs, ngModelController) {
                ngModelController.$parsers.push(function(data) {
                    //convert data from view format to model format
                    return dateFilter(data, scope.formatFilter); //converted
                });
                
                ngModelController.$formatters.push(function(data) {
                    //convert data from model format to view format
                    return dateFilter(data, scope.formatFilter); //converted
                });
            }
        };
    };
    formattedDateDirective.$inject = injectParams;
    app.directive('formattedDate', formattedDateDirective);
});
