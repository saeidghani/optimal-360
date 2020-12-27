import config from '../constants/config';

const wrapper = (fn, errorHandler, notify) => {
  return fn()
    .then((res) => {
      if (res && config?.isDevEnv) {
        // console.log({ url: res?.config?.url, res });
      }

      // https://www.notion.so/agencywolfe/Remove-successful-messages-7d463dcab3cc4f67bbad450fb5ea9c70
      // if (res?.data?.message && notify) {
      //   notify({ message: res.data.message, type: 'success' });
      // }

      return res;
    })
    .catch((error) => {
      if (config?.isDevEnv) {
        console.log('error.config', error.config);
        console.log('error.response', error.response);
      }

      if (errorHandler) {
        errorHandler(error);
      }

      throw error;
    });
};

export default wrapper;
