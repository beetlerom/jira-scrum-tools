'use strict';

angular.module(
    'jiraScrumTools.version',
    [
        'jiraScrumTools.version.interpolate-filter',
        'jiraScrumTools.version.version-directive'
    ]
).value('version', '0.1');
