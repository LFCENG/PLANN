'use strict'

define(['app', 'moment'], function (app, moment) {
    var injectParams = ['$sce', '$filter', '$rootScope'];
    var pickerFilter = function ($sce, $filter, $rootScope) {
        return function () {
            var filterName = [].splice.call(arguments, 1, 1)[0];
            if (filterName && arguments[0]) {
                if (filterName == "time") {
                    return $sce.trustAsHtml(arguments[0] + ' h');
                } else if (filterName == 'date') {
                    moment.locale($rootScope.lang);
                    return $sce.trustAsHtml(moment(arguments[0]).format('LL'));
                } else if (filterName == "string") {
                    return $sce.trustAsHtml(arguments[0]);
                } else {
                    return $sce.trustAsHtml($filter(filterName).apply(null, arguments));
                }
            } else {
                return $sce.trustAsHtml(arguments[0]);
            };
        };
    };
    
    pickerFilter.$inject = injectParams;
    app.filter('picker', pickerFilter);
});
