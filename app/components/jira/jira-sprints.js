angular.module('jiraScrumTools.jira.sprints', [])

    .factory('jiraSprints', [
        '$resource',
        function ($resource) {

            var params = {};
            var res = $resource(
                'https://jira.globalorange.nl/jira/rest/greenhopper/latest/xboard/work/allData.json',
                params,
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
