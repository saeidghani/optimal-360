const { host } = window.location;

/**
 * Environments
 */
let env = 'production'; // Defaults to production
if (process.env.NODE_ENV === 'development' || host.includes('local')) env = 'development';
if (host.includes('stage.')) env = 'stage';

/**
 * Config object to export
 */
export default {
  // App Details
  appName: 'optimal360',

  // Build Configuration - eg. Debug or Release?
  isDevEnv: env === 'development',
  ENV: env,

  // Date Format
  dateFormat: 'Do MMM YYYY',

  // API
  apiBaseUrl: 'http://165.227.34.172:3010/api/v1',

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: env === 'production' ? 'UA-84284256-2' : 'UA-84284256-1',
};
