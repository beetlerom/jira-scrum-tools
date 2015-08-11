'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('jiraScrumTools', [
    'ngRoute',
    'ngResource',
    'jiraScrumTools.dashboard',
    'jiraScrumTools.header',
    'jiraScrumTools.jira',
    'jiraScrumTools.error-handler',
    'ui.bootstrap',
    'ngAudio'
]);

/**
 * Just add your USERNAME and PASSWORD
 */
app.constant('CONFIG', {
    'BASE_URL': 'https://jira.globalorange.nl/jira/',
    'USERNAME': 'daniel.ionescu',
    'PASSWORD': 'fanica419'
});

app.config([
    '$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {

        $routeProvider.otherwise({
            redirectTo: '/dashboard'
        });

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

        $httpProvider.interceptors.push('auth');

    }
]);

app.run([
    'CONFIG', 'ErrorHandlerService',
    function(CONFIG, ErrorHandlerService) {
        if (!CONFIG.USERNAME || !CONFIG.PASSWORD) {
            ErrorHandlerService.addAlert({
                type: 'warning',
                msg: 'Please make sure username and password are configured in app.js.'
            });
        }
    }
]);
