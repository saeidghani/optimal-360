import Cookies from 'js-cookie';
import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'auth',

  state: {},

  effects: (dispatch) => ({
    async login(payload) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: '/super-user/auth/login',
            data: payload,
          });

          await this.setToken(res.data);
          // await dispatch.user.fetchCurrentUser();
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
          url: '/super-user/auth/forget-password',
          data: payload,
        });

        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    setToken(state, payload) {
      Cookies.set('token', payload?.data?.token);

      return null;
    },
  },
};
