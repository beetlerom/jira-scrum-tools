'use strict';

angular.module('jiraScrumTools.dashboard', ['ngRoute'])

    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        });
    }])

    .controller('dashboardCtrl', [
        '$scope', 'jiraTasks',
        function ($scope, jiraTasks) {

            $scope.task = {};

            function init() {
                jiraTasks.getSingle({id: 'SC-3003'}).then(
                    function(response) {
                        $scope.task = response;
                    }
                );
            }

            init();

        }
    ]);