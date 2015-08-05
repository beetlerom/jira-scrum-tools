'use strict';

angular.module('jiraScrumTools.header.header-directive', [])

.directive('headerDirective', [
        function() {
            return {
                restrict: 'E',
                templateUrl: 'components/header/header.html',
                link: function(scope, element, attr) {

                }
            }
        }
    ]
);
