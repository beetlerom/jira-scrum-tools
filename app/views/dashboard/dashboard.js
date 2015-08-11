'use strict';

angular.module('jiraScrumTools.dashboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        });
    }])

    .controller('dashboardCtrl', [
        '$scope', 'jiraTasks', 'jiraSprints', 'jiraSprintQuery', 'jiraIssues', 'ngAudio', 'jiraProjects', '$interval',
        function ($scope, jiraTasks, jiraSprints, jiraSprintQuery, jiraIssues, ngAudio, jiraProjects, $interval) {

            // we add Math to scope so we can use math functions in the template
            $scope.Math = window.Math;

            $scope.achievement = 'success';
            $scope.task = {};
            $scope.project = null;
            $scope.sprint = null;
            $scope.states = null;
            $scope.issueType = null;

            // TO DO: make this configurable
            var projectId = 88;
            var projectName = 'Simpled Cards';
            var activeSprint = undefined;
            var timer = null;

            // TO DO: move audio into a separate audio component
            $scope.clap = ngAudio.load('sounds/clap.mp3');

            /**
             * @description Constructor
             */
            function init() {

                $scope.timer = 900;

                jiraIssues.get({sub: 'createmeta'}).then(
                    function(response){
                        if (response.projects) {
                            for (var i in response.projects) {
                                if (response.projects[i].name == projectName) {
                                    $scope.project = response.projects[i];
                                    $scope.project.issuetypes.unshift({name: 'All'});
                                    $scope.issueType = $scope.project.issuetypes[0];
                                }
                            }

                            if (!$scope.project) {
                                alert('Project ' + projectName + ' was not found!')
                            } else {
                                jiraProjects.get({id: $scope.project.id, resource: 'statuses'}).then(
                                    function (response) {
                                        $scope.states = response[0].statuses;
                                        $scope.states.unshift({name:'All'});
                                        $scope.issueState = $scope.states[0];
                                    }
                                )
                            }

                        } else {
                            alert('No projects were found');
                        }
                    }
                );

                jiraSprintQuery.getSingle({id: projectId}).then(
                    function(response) {
                        if (response.sprints) {
                            activeSprint = _.find(response.sprints, function(item) {
                               return item.state == 'ACTIVE';
                            });
                            if (!activeSprint) {
                                alert('No active sprints were found for the project.')
                            } else {
                                jiraSprints.getSingle({rapidViewId: projectId}).then(
                                    function(response) {
                                        $scope.sprint = response;
                                    }
                                );
                            }
                        } else {
                            // TO DO: add error handler service
                            alert('There are no sprints in the project!')
                        }
                    }
                );

            }

            /**
             * @description Sets the achievement type to that the progress bar can display the right colour
             */
            function setAchievementType() {
                var value = $scope.getTotal('Closed')/$scope.getTotal() * 100;

                if (value < 70) {
                    $scope.achievement = 'danger';
                } else if (value < 80) {
                    $scope.achievement = 'warning';
                } else if (value < 90) {
                    $scope.achievement = 'success';
                }
            }

            /**
             * @description Returns the total number of points for the specified type of issue.
             * @param {string} status Returns the total number of points for the specified status. If no status is mentioned it returns the total for all issues.
             * @return {number}
             */
            $scope.getTotal = function(status) {

                var total = 0;

                if ($scope.sprint && $scope.sprint.issuesData && $scope.sprint.issuesData.issues) {

                    var issues = $scope.sprint.issuesData.issues;

                    for (var i in issues) {
                        if (issues[i].estimateStatistic &&
                            issues[i].estimateStatistic.statFieldValue &&
                            issues[i].estimateStatistic.statFieldValue.value) {

                            if (status) {
                                if (issues[i].statusName == status) {
                                    total += issues[i].estimateStatistic.statFieldValue.value;
                                }
                            } else {
                                total += issues[i].estimateStatistic.statFieldValue.value;
                            }

                        }
                    }
                }

                return total;
            };

            $scope.startTimer = function() {

                $scope.timer = 900;

                timer = $interval(function(){
                    if ($scope.timer < 1) {
                        $scope.stopTimer();
                        alert('Time is up, please try to wrap it up!')
                    } else {
                        $scope.timer--;
                    }
                },1000);
            };

            $scope.stopTimer = function() {
                $scope.timer = 900;
                $interval.cancel(timer);
            };

            init();

        }
    ]);