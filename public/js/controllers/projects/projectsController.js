'use strict'
define(['app'], function (app) {
    app.register.controller('ProjectsController', ['Project', '$scope','$rootScope', '$http', '$timeout', '$mdSidenav', '$log','$sce','$translate',  function (Project, $scope, $rootScope, $http, $timeout, $mdSidenav, $log, $sce, $translate) {
        $scope.$watch(function () {
            return Project.query();
        }, function (projects) {
            $scope.projects = projects;      
        });
        $scope.tableColumns = [
            {key: 'reference', checked: true},
            {key: 'title', filter: null, checked: true},
            {key: 'client', filter: null, checked: true},
            {key: 'description', filter: null, checked: true},
            {key: 'status', filter: null, checked: true},
            {key: 'deadline', filter: 'date', filterValue: 'dd MMMM yyyy', checked: true},
            {key: 'finishedDate', filter: 'date', filterValue: 'dd MMMM yyyy', checked: true},
            {key: 'time', filter: 'time', filterValue: 'h', checked: true},
            {key: 'price', filter: 'currency', filterValue: '&euro; ', checked: true}, 
            {key: 'created', filter: 'date', filterValue: 'dd MMMM yyyy', checked: true}
        ];
        $scope.trustHtml = function (text) {
            return $sce.trustAsHtml(text);
        };
        $scope.searchCollapsed = false;
        $scope.toggleSearchCollapse = function () {
            $scope.searchCollapsed = $scope.searchCollapsed ? false : true;
        }
        
        $scope.startDateSearch = null;//new Date();
        $scope.endDateSearch = null;//new Date();
        $scope.activeProject = {};        
        $scope.editType = "new";
        $scope.filterStartDate = function (project) {
            if (!$scope.startDateSearch) {
                return true;
            }
            if ( project && project.deadline && project.deadline >= $scope.startDateSearch) {
                return true;
            } else {
                return false;
            }
        }
        $scope.filterEndDate = function (project) {
            if (!$scope.endDateSearch) {
                return true;
            }
            if ($scope.endDateSearch && project && project.deadline && project.deadline <= $scope.endDateSearch) {
                return true;
            } else {
                return false;
            }
        }
        $scope.toggleRight = function (project, index) {
            if (project) {
                $scope.editTitle = "EDIT_PROJECT";
                $scope.editType = "edit";
                $scope.activeProject = project;
                $scope.activeProjectIndex = index;
            } else {
                $scope.editTitle = "NEW_PROJECT";
                $scope.editType = "new";
                $scope.activeProject = Project.create();
            }
            buildToggler('right');
        };
        
        function buildToggler(navID) {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }
        
        $scope.fetchTogglTimes = function () {
            $http.get('/project/integrations/toggl').then(function (res) {
                var projects = $scope.projects;
                var togglTimes = res.data.projects;
                var togglProjects = [];
                for (let i = 0, togglProject; togglProject = togglTimes[i]; i++) {
                    togglProjects.push({name: togglProject.name, time: togglProject['actual_hours']});
                }
                
                for (let i = 0, project; project = projects[i]; i++) {
                    for (let j = 0, entry; entry = togglProjects[j]; j++) {
                        if (entry.name.indexOf(project.reference) !== -1) {
                            project.time = entry.time;
                        }
                    }
                }
                $scope.projects = projects;
            });
        };
        
        $scope.fetchInvoiceXpressPrice = function () {
            $http.get('/project/integrations/invoicexpress').then(function (res) {
                var projects = $scope.projects;
                var iX = res.data;
                var iXprojects = [];
                for (let i = 0, iXproject; iXproject = iX[i]; i++) {
                    iXprojects.push({name: iXproject.observations, price: iXproject['sum']});
                }
                
                for (let i = 0, project; project = projects[i]; i++) {
                    for (let j = 0, entry; entry = iXprojects[j]; j++) {
                        if (typeof entry.name == "string" && entry.name.indexOf(project.reference) !== -1) {
                            project.price = entry.price;
                        }
                    }
                }
                $scope.projects = projects;
            });
        };
        
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            $("[data-sort=table]").tablesorter();
        });
       
        
    }]);
});
