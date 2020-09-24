import Cookies from 'js-cookie';
import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'auth',

  state: {},

  effects: (dispatch) => ({
    async login(payload) {
      actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: '/super-user/auth/login',
            data: payload,
          });

          console.log('res', res, res.response);

          await this.setToken(res.data);
          // await dispatch.user.fetchCurrentUser();
          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },
  }),

  reducers: {
    alert_reducer(state, payload) {
      return {
        ...state,
        notification: payload,
      };
    },

    setToken(state, payload) {
      Cookies.set('token', payload.token);

      return null;
    },
  },
};
