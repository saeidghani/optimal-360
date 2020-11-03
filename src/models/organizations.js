import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'organization',

  state: {
    organizations: '',
    organizationStaffs: '',
  },

  effects: (dispatch) => ({
    async fetchOrganizations(query) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/organizations${query}`,
        });

        await this.fetchOrganizations_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async addNewOrganization({ name, logo }) {
      return actionWapper(async () => {
          const res = await axios({
            method: 'post',
            url: '/super-user/organizations',
            data: { name, logo },
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },
    async fetchOrganizationsStaffs({ organizationId, query }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/organizations/${organizationId}/staffs${query}`,
        });

        await this.fetchOrganizationsStaffs_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    fetchOrganizations_reducer: (state, payload) => ({
      ...state,
      organizations: payload,
    }),
    fetchOrganizationsStaffs_reducer: (state, payload) => ({
      ...state,
      organizationStaffs: payload,
    }),
  },
};
