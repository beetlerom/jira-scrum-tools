'use strict';

/**
 * Directive implementing the footer tag
 * @usage: <error-message></error-message>
 */

angular.module('jiraScrumTools.error-handler.directive', [])

.directive('errorMessage',[
    'ErrorHandlerService', '$sce',
    function( ErrorHandlerService, $sce ) {
        return {
            restrict: 'E',
            scope: {
                'id': '@'
            },
            templateUrl: 'components/error-handler/error-message.html',
            link: function($scope, element, attr) {

                $scope.alerts = [];

                /**
                 * Constructor
                 */
                function init() {
                    $scope.alerts = ErrorHandlerService.getAlerts();
                    $scope.$watch(
                        function() {
                            return ErrorHandlerService.getAlerts();
                        },
                        function( newValue, oldValue ) {
                            $scope.alerts = newValue;
                        },
                        true
                    );
                }

                /**
                 * Removes the alert message with that specific index
                 * @param index - The index of the Alert message that will be removed
                 */
                $scope.closeAlert = function(index) {
                    ErrorHandlerService.removeAlert(index);
                };

                init();

            }
        };
    }
]);