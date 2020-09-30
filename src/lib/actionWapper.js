const wrapper = (fn, errorHandler, notify) => {
  return fn()
    .then((res) => {
      if (res) {
        console.log('res', res);
      }

      if (res?.data?.message && notify) {
        notify({ message: res.data.message, type: 'success' });
      }

      return res;
    })
    .catch((error) => {
      console.log('error', error);
      console.log('error.config', error.config);
      console.log('error.response', error.response);

      errorHandler({ message: `Error ${error?.response?.status}`, type: 'error' });

      throw error;
    });
};

export default wrapper;
