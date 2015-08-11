'use strict';

/**
 * Add your USERNAME and PASSWORD here for basic authentication
 * Beware of the fact that if you abuse login and trigger captcha protection in Jira, basic authentication will no longer work even if the credentials are correct.
 */
app.constant('CONFIG', {
    'BASE_URL': 'https://jira.globalorange.nl/jira/',
    'USERNAME': '',
    'PASSWORD': ''
});