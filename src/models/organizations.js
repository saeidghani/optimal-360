import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'organization',

  state: {
    organizations: '',
  },

  effects: (dispatch) => ({
    async fetchOrganizations(query) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/organizations${query}`,
        });

        await this.fetchOrganizations_reducer(res?.data?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    fetchOrganizations_reducer: (state, payload) => ({
      ...state,
      organizations: payload,
    }),
  },
};
