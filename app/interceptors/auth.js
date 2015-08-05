'use strict';

app.factory('auth', [
    '$q',
    function ($q) {

        return {
            request: function (config) {

                config.headers = config.headers || {};
                config.headers.Authorization = 'Basic ' + btoa('daniel.ionescu:fanica419');

                return config;
            },
            response: function (response) {
                return response || $q.when(response);
            }
        };
    }
]);