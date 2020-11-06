import Cookies from 'js-cookie';
import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'util',

  state: {
    notification: '',
    lastChange: '',
  },

  effects: (dispatch) => ({
    async alert(payload) {
      this.alert_reducer(payload);
    },

    async uploadImage(photo) {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('photo', photo);

      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: '/uploads',
            data,
          });

          return res?.data?.data?.filePath;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async errorHandler(error) {
      const { status, data } = error?.response || {};

      if (status === 401) {
        Cookies.remove('token');
      }

      const sendAlert = ({ message, description }) => {
        return this.alert_reducer({
          message,
          description,
          type: 'error',
        });
      };

      if (data && typeof data === 'string') {
        sendAlert({
          message: 'Something went wrong !',
          description: data,
        });

        return;
      }

      const { errors = {}, message = '' } = data || {};

      if (errors && typeof errors === 'object' && Object.values(errors).length > 0) {
        Object.values(errors).forEach((err) => {
          if (err && Array.isArray(err) && err.length > 0) {
            err.forEach((description) => sendAlert({ message, description }));
          }

          if (err && typeof err === 'string') {
            sendAlert({ message, description: err });
          }
        });

        return;
      }

      sendAlert({
        message: 'Something went wrong',
        description: 'Unknown error',
      });
    },

    async clearNotifications() {
      this.alert_reducer('');
    },
  }),

  reducers: {
    alert_reducer(state, payload) {
      return {
        ...state,
        notification: payload,
        lastChange: Date.now(),
      };
    },
  },
};
