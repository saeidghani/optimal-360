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

    async createProjectForOrganization({ organizationId, ...payload }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/organizations/${organizationId}/projects`,
            data: payload,
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },
  }),

  reducers: {
    fetchOrganizations_reducer: (state, payload) => ({
      ...state,
      organizations: payload,
    }),
  },
};
