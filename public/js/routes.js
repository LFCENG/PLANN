define([], function() {
    function routes ($routeProvider, routeResolverProvider){
        var route = routeResolverProvider.route;
        $routeProvider
            .when('/dashboard', route.resolve('Dashboard', 'dashboard/'))
            .when('/projects', route.resolve('Projects', 'projects/'))
            .when('/settings', route.resolve('Settings', 'settings/'))
            .otherwise({ redirectTo: '/dashboard' });
    }
    
    routes.$inject = ['$routeProvider', 'routeResolverProvider'];
    return routes;
});
