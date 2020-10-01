import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'projects',

  state: {
    projects: '',
    surveyGroups: '',
  },

  effects: (dispatch) => ({
    async fetchProjects(query) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/projects${query}`,
        });

        await this.fetchProjects_reducer(res?.data);

        return res;
      }, dispatch.util.errorHandler);
    },

    async setClientAdmin({ projectId, ...payload }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/projects/${projectId}/client-admin`,
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

          // await dispatch.projects.fetchProjects();

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

          // await dispatch.projects.fetchProjects();

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async fetchSurveyGroups({ projectId, query }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/projects/${projectId}/survey-groups${query}`,
        });

        this.fetchSurveyGroups_reducer(res?.data);

        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    fetchProjects_reducer: (state, payload) => ({
      ...state,
      projects: payload,
    }),

    fetchSurveyGroups_reducer: (state, payload) => ({
      ...state,
      surveyGroups: payload,
    }),
  },
};
