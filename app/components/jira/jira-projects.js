angular.module('jiraScrumTools.jira.projects', [])

    .factory('jiraProjects', [
        '$resource', 'CONFIG',
        function ($resource, CONFIG) {

            var params = {};
            var url = CONFIG.BASE_URL + 'rest/api/2/project/:id/:resource';
            var res = $resource(
                url, params,
                {
                    get: {
                        method: 'GET',
                        params: {
                            id: '@id',
                            resource: '@resource'
                        },
                        isArray: true
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
