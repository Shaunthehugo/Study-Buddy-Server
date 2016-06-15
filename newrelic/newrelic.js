'use strict'

/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */

print("Newrelic is running");

exports.config = {
  /**
   * Array of application names.
   */
  app_name: study-buddy-app,
  /**
   * Your New Relic license key.
   */
  license_key: 40d8193749ea8d6dde7bc1d122972b4d516f9df1,
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  }
}
