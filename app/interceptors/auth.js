'use strict';

app.factory('auth', [
    '$q',
    function ($q) {

        return {
            request: function (config) {

                config.headers = config.headers || {};

                //TO DO: move this into a separate configuration service
                //replace this with your actual username and password :)
                config.headers.Authorization = 'Basic ' + btoa('username:password');

                return config;
            },
            response: function (response) {
                return response || $q.when(response);
            }
        };
    }
]);