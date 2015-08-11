angular.module('jiraScrumTools.jira.issues', [])

    .factory('jiraIssues', [
        '$resource',
        function ($resource) {

            var params = {};
            var res = $resource(
                'https://jira.globalorange.nl/jira/rest/api/latest/issue/:id/:sub',
                params,
                {
                    get: {
                        method: 'GET',
                        params: {
                            id: '@id',
                            sub: '@sub'
                        }
                    }
                }
            );

            return {
                get: function (p) {
                    return res.get(p).$promise;
                }
            };
        }
    ]);
