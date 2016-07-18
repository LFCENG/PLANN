'use strict'
define(['app'], function (app) {
    app.controller('LanguageController', ['$rootScope','$scope', '$translate','$timeout',   function ( $rootScope, $scope, $translate, $timeout) {
         var self = this;
        self.hidden = false;
        self.isOpen = false;
        self.hover = false;
        $scope.$watch('lang.isOpen', function(isOpen) {
            if (isOpen) {
                $timeout(function() {
                    $scope.tooltipVisible = self.isOpen;
                }, 600);
            } else {
                $scope.tooltipVisible = self.isOpen;
            }
        });
        
        $scope.defaultLanguage = $rootScope.lang;
        
        $scope.languages = {
            en: {name: "BUTTON_LANG_EN",img: "<img src='/img/flags/24x24/GB.png' aria-label: {{item.name | translate }}>", langKey: "en"},
            us: {name: "BUTTON_LANG_EN",img: "<img src='/img/flags/24x24/US.png' aria-label: {{item.name | translate }}>", langKey: "en"},
            pt: {name: "BUTTON_LANG_PT",img: "<img src='/img/flags/24x24/PT.png' aria-label: {{item.name | translate }}>", langKey: "pt"}
        };
        $scope.changeLanguage = function(langKey) {
            $translate.use(langKey);
        };
        $rootScope.$on('$translateChangeSuccess', function(event, data) {
            var language = data.language;
            $rootScope.lang = language;
            $scope.defaultLanguage = language;
            $("[data-sort=table]").tablesorter();
        });
    }]);
});
