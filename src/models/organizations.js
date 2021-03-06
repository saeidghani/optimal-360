import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'organization',

  state: {
    organizations: '',
    staff: '',
    organizationsInfo: '',
    staffDetails: '',
    deleteStaffError: '',
  },

  effects: (dispatch) => ({
    async fetchOrganizations(query) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/organizations${query || ''}`,
        });

        await this.fetchOrganizations_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async addNewOrganization({ name, logo }) {
      return actionWapper(
        async () => {
          const path = await dispatch.util.uploadImage(logo);

          const res = await axios({
            method: 'post',
            url: '/super-user/organizations',
            data: { name, logo: path },
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async fetchOrganizationsInfo(organizationId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/organizations/${organizationId}`,
        });

        await this.fetchOrganizationsInfo_reducer(res?.data?.data);
        return res;
      }, dispatch.util.errorHandler);
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

    async fetchStaffDetails({ organizationId, staffId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/organizations/${organizationId}/staffs/${staffId}`,
        });

        await this.fetchStaffDetails_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async setStaffDetails({ organizationId, staffId, ...data }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'put',
            url: `/super-user/organizations/${organizationId}/staffs/${staffId}`,
            data,
          });

          await this.fetchStaffDetails_reducer(res?.data);
          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async addNewOrganizationStaff({ organizationId, ...data }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/organizations/${organizationId}/staffs`,
            data,
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async importStaff({ organizationId, file }) {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('excel', file);

      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/organizations/${organizationId}/staffs/import`,
            data,
          });

          await dispatch.organizations.fetchOrganizationsStaff({
            organizationId,
            query: '?page_size=10&page_number=1',
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async deleteOrganizations(data) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'delete',
          url: '/super-user/organizations',
          data,
        });

        await dispatch.organizations.fetchOrganizations('?page_number=1&page_size=10');

        return res;
      }, dispatch.util.errorHandler);
    },

    async deleteStaff({ organizationId, staffIds }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'delete',
          url: `/super-user/organizations/${organizationId}/staffs`,
          data: { staffIds },
        });

        if (res?.data?.data.length > 0 && res?.data?.data !== true) {
          await this.deleteStaff_reducer(res?.data?.data);
        } else {
          await dispatch.organizations.fetchOrganizationsStaff({
            organizationId,
            query: '?page_number=1&page_size=10',
          });

          return res;
        }
      }, dispatch.util.errorHandler);
    },

    clearDeleteStaffError() {
      this.deleteStaff_reducer('');
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

    fetchOrganizationsInfo_reducer: (state, payload) => ({
      ...state,
      organizationsInfo: payload,
    }),

    fetchStaffDetails_reducer: (state, payload) => ({
      ...state,
      staffDetails: payload,
    }),

    deleteStaff_reducer: (state, payload) => ({
      ...state,
      deleteStaffError: payload,
    }),
  },
};
