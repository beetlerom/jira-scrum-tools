'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('jiraScrumTools', [
    'ngRoute',
    'ngResource',
    'jiraScrumTools.dashboard',
    'jiraScrumTools.version',
    'jiraScrumTools.header',
    'jiraScrumTools.jira',
    'ui.bootstrap',
    'ngAudio'
]);

app.config([
    '$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {

        $routeProvider.otherwise({
            redirectTo: '/dashboard'
        });

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

        $httpProvider.interceptors.push('auth');

    }
]);
