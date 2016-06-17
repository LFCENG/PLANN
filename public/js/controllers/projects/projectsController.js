'use strict'
define(['app'], function (app) {
    app.register.controller('ProjectsController', ['Project', '$scope','$http', '$timeout', '$mdSidenav', '$log',  function (Project, $scope, $http, $timeout, $mdSidenav, $log) {
        $scope.$watch(function () {
            return Project.query();
        }, function (projects) {
            $scope.projects = projects;      
        });
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }        
        function buildDelayedToggler(navID) {
            return debounce(function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
         function buildToggler(navID) {
             return function() {
                 // Component lookup should always be available since we are not using `ng-if`
                 $mdSidenav(navID)
                     .toggle()
                     .then(function () {
                         $log.debug("toggle " + navID + " is done");
                     });
             }
         }
        $scope.startDate = new Date();
        
        $scope.deleteProject = function (project) {
            $scope.errors = null;
            $scope.updating = true;
            project.$delete(project).catch(function (projectData) {
                $scope.errors = [projectData.data.error];
            }).finally(function () {
                $scope.updating = false;
                $scope.projects.splice(project.$index, 1);
                $scope.hide();
            });
        };
        $scope.updateProject = function (project) {
            $scope.errors = null;
            $scope.updating = true;
            project.$update(project).catch(function (projectData) {
                $scope.errors = [projectData.data.error];
            }).finally(function () {
                $scope.updating = false;
                $scope.hide();
            });
        };
        $scope.activeProject = {};        
        $scope.showModal = false;
        $scope.hide = function(){
            $scope.showModal = false;
        }

        $scope.showProject = function (project) {
            $scope.activeProject = project;
            $scope.showModal = true;
        }
        $scope.modalShow = function(){
            console.log('model shown');
        }
        $scope.modalHide = function(){
            console.log('model hidden');
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
