'use strict';

/**
 * @ngdoc service
 * @requires $resource
 * @requires $rootScope
 * @description Service that manages error handling
 */

angular.module('jiraScrumTools.error-handler.service', [])

.factory( 'ErrorHandlerService', [
    '$rootScope',
    function($rootScope) {

        // an array that holds our errors
        var alerts = [];
        var randomAlerts = [
            {
                code: '1000',
                type: "danger",
                msg: "I am a error message."
            },
            {
                code: '1000',
                type: "success",
                msg: "I am a success message."
            },
            {
                code: '1000',
                type: "warning",
                msg: "I am a warning message."
            }
        ];

        /**
         * @ngdoc function
         * @name removeAlert
         * @description Removes the alert message from the error stack at the specified index
         * @param {number} index The index of the alert to be removed
         */
        function removeAlert(index) {
            alerts.splice(index, 1);
        }

        return {
            /**
             * @ngdoc function
             * @name addAlert
             * @description Appends an alert to the error stack
             */
            // example usage
            // alert = {
            //      type: 'danger',
            //      msg: '<p>Your message here</p><p>Supports HTML too!</p>'
            // }
            // available options for type: danger, warning, success
            addAlert: function(a, clear) {

                if (clear) {
                    this.removeAllAlerts();
                }

                // we check error code to map errors
                if (a.response) {

                    // if no type we mark it as danger
                    if (!a.type) {
                        a.type = 'danger';
                    }

                    if (a.response.status) {
                        switch (a.response.status) {
                            case 400:
                                if (!a.msg) {
                                    a.msg = 'Malformed request.'
                                }
                                if (a.response.data.message) {
                                    a.msg = a.response.data.message;
                                }
                                break;
                            case 401:
                            case 403:
                                if (!a.msg) {
                                    a.msg = '';
                                    if (a.response.data.message) {
                                        a.msg += a.response.data.message;
                                    } else {
                                        a.msg += 'No error returned from server.'
                                    }
                                }
                                $rootScope.$broadcast('logout');
                                break;
                            case 404:
                                // if no custom message we set default message
                                if (!a.msg) {
                                    a.msg = '';
                                    if (a.response.data.error) {
                                        a.msg += a.response.data.error;
                                    } else {
                                        a.msg += 'No error returned from server.'
                                    }
                                }
                                break;
                            case 500:
                                // if no custom message we set default message
                                if (!a.msg) {
                                    a.msg = 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
                                }
                                break;
                            case 501:
                                // if no custom message we set default message
                                if (!a.msg) {
                                    a.msg = 'The server does not support the facility required.'
                                }
                                break;
                            default:
                                a.msg = 'Unknown error.';
                                break;
                        }

                        a.msg +='<br/> Server returned HTTP status ' + a.response.status + ': ' + a.response.config.url;

                    } else {
                        a.msg = 'Could not contact the server.';
                    }

                }
                alerts.push(a);

            },
            /**
             * @ngdoc function
             * @name addRandomAlert
             * @description Appends one of the predefined random alerts to the error stack
             */
            addRandomAlert: function() {
                var random = Math.floor(Math.random() * randomAlerts.length);
                var randomAlert = randomAlerts[random];
                if (alerts.indexOf(randomAlert) == -1) {
                    alerts.push(randomAlert);
                }
            },
            removeAlert: removeAlert,
            /**
             * @ngdoc function
             * @name removeAlertById
             * @description Removes the alert message with the specified id from the error stack
             * @param {number} id The id of the alert to be removed
             */
            removeAlertById: function(id) {
                var arrayIndex = undefined;
                _.find(alerts, function(item, index){
                    if(item.id == id){
                        arrayIndex = index;
                        return true;
                    };
                });
                if (arrayIndex != undefined) {
                    alerts.splice(arrayIndex, 1);
                }
            },
            /**
             * @ngdoc function
             * @name removeAllAlerts
             * @description Clears the error stack
             */
            removeAllAlerts: function() {
                alerts = [];
            },
            /**
             * @ngdoc function
             * @name getAlerts
             * @description Returns an array of stacks
             */
            getAlerts: function() {
                return alerts;
            }

        }

    }
]);