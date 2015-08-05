angular.module('jiraScrumTools.jira.tasks', [])

    .factory('jiraTasks', [
        '$resource',
        function ($resource) {

            var params = {};
            var res = $resource(
                'https://jira.globalorange.nl/jira/rest/api/latest/issue/:id',
                params,
                {
                    getSingle: {
                        method: 'GET',
                        params: {
                            id: '@id'
                        }
                    }
                }
            );

            return {
                getSingle: function (p) {
                    return res.getSingle(p).$promise;
                }
            };
        }
    ]);
