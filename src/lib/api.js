import axios from 'axios';
import Cookies from 'js-cookie';
import Config from '../constants/config';

/**
 * Axios defaults
 */
axios.defaults.baseURL = Config.apiBaseUrl;
// axios.defaults.withCredentials = true;

// Headers
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

/**
 * Request Interceptor
 */
axios.interceptors.request.use(
  async (inputConfig) => {
    const config = inputConfig;

    try {
      // Check if the token has or is about to expire, and refresh it
      // if (hasActiveAuthToken()) {
      // Add the token to the Authorization header

      const token = Cookies.get('token');

      if (token && token !== 'undefined') {
        config.headers.common.Authorization = `Bearer ${Cookies.get('token')}`;
      }

      // Otherwise, attempt to refresh the token
      // } else if (hasAuthToken()) {
      // const token = await refreshAuthToken();

      //   if (token) {
      //     config.headers.common.Authorization = `Bearer ${token}`;
      //   }
      // }
    } catch (error) {
      /* Nothing */
    }

    return config;
  },
  (error) => {
    throw error;
  },
);

/**
 * Response Interceptor
 */
axios.interceptors.response.use(
  (res) => {
    // Status code isn't a success code - throw error
    if (!`${res.status}`.startsWith('2')) {
      throw res.data;
    }

    // Otherwise just return the data
    if (res.data && typeof res.data === 'object') {
      res.data.timeStamp = Date.now();
    }

    return res;
  },
  (error) => {
    // Pass the response from the API, rather than a status code
    // if (error && error.response && error.response.data) {
    //   throw error.response.data;
    // }
    throw error;
  },
);

export default axios;
