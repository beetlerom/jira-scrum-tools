angular.module('jiraScrumTools.jira.sprintquery', [])

    .factory('jiraSprintQuery', [
        '$resource', 'CONFIG',
        function ($resource, CONFIG) {

            var params = {};
            var url = CONFIG.BASE_URL + 'rest/greenhopper/latest/sprintquery/:id';
            var res = $resource(
                url, params,
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
