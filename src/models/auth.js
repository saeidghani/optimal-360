import Cookies from 'js-cookie';
import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'auth',

  state: {},

  effects: (dispatch) => ({
    async login({ username, password, rememberMe }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: '/super-user/auth/login',
            data: { username, password },
          });

          await this.setToken({ token: res?.data?.data?.token, rememberMe });
          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async forgotPassword(payload) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: '/super-user/auth/reset-password',
          data: payload,
        });

        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    setToken(state, { token, rememberMe }) {
      const options = {
        expires: rememberMe ? 7 : null,
      };
      Cookies.set('token', token, options);

      return null;
    },
  },
};
