import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'organization',

  state: {
    organizations: '',
    staff: '',
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
    async fetchOrganizationsStaff({ organizationId, query }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/organizations/${organizationId}/staffs${query}`,
        });

        await this.fetchOrganizationsStaff_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async addNewOrganizationStaff({ organizationId, name, email, password }) {
      console.log(organizationId, name, email, password);
      return actionWapper(async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/organizations/${organizationId}/staffs`,
            data: { name, email, password },
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
    fetchOrganizationsStaff_reducer: (state, payload) => ({
      ...state,
      staff: payload,
    }),
  },
};
