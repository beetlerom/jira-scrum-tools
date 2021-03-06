angular.module('jiraScrumTools.jira.issues', [])

    .factory('jiraIssues', [
        '$resource', 'CONFIG',
        function ($resource, CONFIG) {

            var params = {};
            var url = CONFIG.BASE_URL + 'rest/api/latest/issue/:id/:sub';
            var res = $resource(
                url, params,
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
