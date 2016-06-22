'use strict'
define(['app'], function (app) {
    app.register.filter('picker', ['$filter', function ($filter) {
        return function () {
            var filterName = [].splice.call(arguments, 1, 1)[0];
            if (filterName) {
                return $filter(filterName).apply(null, arguments);
            } else {
                return $filter();
            }
        };
    }]);
    app.register.controller('ProjectsController', ['Project', '$scope','$http', '$timeout', '$mdSidenav', '$log',  function (Project, $scope, $http, $timeout, $mdSidenav, $log) {
        $scope.$watch(function () {
            return Project.query();
        }, function (projects) {
            $scope.projects = projects;      
        });
        $scope.tableColumns = [
            {title:'Reference' , key: 'reference', filter: null},
            {title: 'Title', key: 'title', filter: null},
            {title: 'Client', key: 'client', filter: null},
            {title: 'Description', key: 'description', filter: null},
            {title: 'Status', key: 'status', filter: null},
            {title: 'Deadline', key: 'deadline', filter: null},
            {title: 'Finished Date', key: 'finishedDate', filter: null},
            {title: 'Total Time Spent', key: 'time', filter: null},
            {title: 'Price', key: 'price', filter: null}, 
            {title: 'Created', key: 'created', filter: 'date', filterValue: 'dd MMMM yyyy'}
        ];
        $scope.startDateSearch = new Date();
        $scope.endDateSearch = new Date();
        $scope.activeProject = {};        
        
        $scope.toggleRight = function (project) {
            if (project) {
                $scope.editTitle = "Edit Project";
                $scope.activeProject = project;
            } else {
                $scope.editTitle = "New Project";
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
