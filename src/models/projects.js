import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'projects',

  state: {
    activeProjects: '',
  },

  effects: (dispatch) => ({
    async fetchActiveProjects(query) {
      const newQuery = query || '?page_size=10&page_number=1&status=active';

      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/projects${newQuery}`,
        });

        this.fetchActiveProjects_reducer(res?.data);

        return res;
      }, dispatch.util.errorHandler);
    },

    async setClientAdmin(payload) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/projects/${payload.projectId}/client-admin`,
            data: payload,
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async duplicateProject(id) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/projects/${id}/duplicate`,
            // data: { projectId: id },
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async removeProjects({ projectIds }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'patch',
            url: '/super-user/projects/remove',
            data: { projectIds },
          });

          // await dispatch.projects.fetchActiveProjects();

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async changeStatusOfProjects({ projectIds, status }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'patch',
            url: '/super-user/projects/status',
            data: { projectIds, status },
          });

          // await dispatch.projects.fetchActiveProjects();

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },
  }),

  reducers: {
    fetchActiveProjects_reducer: (state, payload) => ({
      ...state,
      activeProjects: payload,
    }),
  },
};
