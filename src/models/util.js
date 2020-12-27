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
      if (photo && typeof photo === 'string') return photo;

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

    async saveFile({ blob, filename }) {
      const reader = new FileReader();

      reader.onload = (res) => {
        const link = document.createElement('a');
        link.href = res.target.result;
        link.download = `${filename}.xlsx`;

        link.click();

        window.URL.revokeObjectURL(link.href);
        link.remove();
      };

      reader.readAsDataURL(blob);
    },

    saveZipFile({ res, filename }) {
      // eslint-disable-next-line no-undef
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(link.href);
    },

    async errorHandler(error) {
      const { status, data } = error?.response || {};

      if (status === 401) {
        Cookies.remove('token');
        let platform = 'super-user';
        if (window.location.pathname.includes('client-admin')) platform = 'client-admin';
        if (window.location.pathname.includes('survey-platform')) platform = 'survey-platform';

        if (window.location.pathname !== `/${platform}/login`) {
          return window.location.replace(`/${platform}/login`);
        }
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
