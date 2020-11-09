import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'rates',

  state: {
    statusDetails: '',
    raters: '',
  },

  effects: (dispatch) => ({
    async fetchStatusDetails(query) {
      // eslint-disable-next-line no-param-reassign
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/1/status-details${query}`, // TODO: change GroupId dynamically
        });

        await this.fetchStatusDetails_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async fetchRaters(query) {
      // eslint-disable-next-line no-param-reassign
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/1/raters${query}`, // TODO: change GroupId dynamically
        });

        await this.fetchRaters_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    fetchStatusDetails_reducer: (state, payload) => ({
      ...state,
      statusDetails: payload,
    }),
    fetchRaters_reducer: (state, payload) => ({
      ...state,
      raters: payload,
    }),
  },
};
