define([], function() {
    function routes ($routeProvider, routeResolverProvider){
        var route = routeResolverProvider.route;
        $routeProvider
            .when('/dashboard', route.resolve('Dashboard', 'dashboard/'))
            .when('/projects', route.resolve('Projects', 'projects/', 'projectsCtrl'))
            .when('/projects/new', route.resolve('ProjectsCreate', 'projects/', 'projectsCreateCtrl'))
            .when('/settings', route.resolve('Settings', 'settings/'))
            .when('/integrations', route.resolve('Integrations', 'integrations/'))
            .when('/integrations/new/:integration', route.resolve('IntegrationsCreate', 'integrations/'))
            .otherwise({ redirectTo: '/dashboard' });
    }
    
    routes.$inject = ['$routeProvider', 'routeResolverProvider'];
    return routes;
});
