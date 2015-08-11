angular.module('jiraScrumTools.jira.sprintquery', [])

    .factory('jiraSprintQuery', [
        '$resource',
        function ($resource) {

            var params = {};
            var res = $resource(
                'https://jira.globalorange.nl/jira/rest/greenhopper/latest/sprintquery/:id',
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
