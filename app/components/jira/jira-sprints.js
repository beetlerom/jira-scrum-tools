angular.module('jiraScrumTools.jira.sprints', [])

    .factory('jiraSprints', [
        '$resource', 'CONFIG',
        function ($resource, CONFIG) {

            var params = {};
            var url = CONFIG.BASE_URL + 'rest/greenhopper/latest/xboard/work/allData.json';
            var res = $resource(
                url, params,
                {
                    getSingle: {
                        method: 'GET'
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
