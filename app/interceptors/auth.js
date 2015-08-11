'use strict';

app.factory('auth', [
    '$q', 'ErrorHandlerService', 'CONFIG',
    function ($q, ErrorHandlerService, CONFIG) {

        return {
            request: function (config) {

                config.headers = config.headers || {};

                config.headers.Authorization = 'Basic ' + btoa(CONFIG.USERNAME + ':' + CONFIG.PASSWORD);

                return config;
            },
            requestError: function(rejection) {
                return $q.reject(rejection);
            },
            response: function(response) {
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection.status === 403) {
                    ErrorHandlerService.addAlert({
                        type: 'danger',
                        msg: 'User is not authenticated.'
                    });
                }
                return $q.reject(rejection);
            }
        };
    }
]);