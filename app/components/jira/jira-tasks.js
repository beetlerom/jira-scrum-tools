angular.module('jiraScrumTools.jira.tasks', [])

    .factory('jiraTasks', [
        '$resource', 'CONFIG',
        function ($resource, CONFIG) {

            var params = {};
            var url = CONFIG.BASE_URL + 'rest/api/latest/issue/:id';
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
