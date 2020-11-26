import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'projects',

  state: {
    projects: '',
    surveyGroups: '',
    clientAdmin: '',
    project: '',
    groupReports: '',
  },

  effects: (dispatch) => ({
    async fetchProjects(query) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/projects${query}`,
        });

        this.fetchProjects_reducer(res?.data);

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchSingleProject(projectId) {
      if (!projectId) return this.fetchSingleProjects_reducer('');

      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/projects/${projectId}`,
        });

        this.fetchSingleProjects_reducer(res?.data);

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

    async fetchClientAdmin(projectId) {
      this.fetchClientAdmin_reducer('');

      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/projects/${projectId}/client-admin`,
        });

        this.fetchClientAdmin_reducer(res?.data);

        return res;
      });
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
          url: `/super-user/projects/${projectId}/survey-groups${query || ''}`,
        });

        this.fetchSurveyGroups_reducer(res?.data);

        return res;
      }, dispatch.util.errorHandler);
    },

    async removeSurveyGroups({ projectId, ...data }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'patch',
            url: `/super-user/projects/${projectId}/survey-groups/remove`,
            data,
          });

          await dispatch.projects.fetchSurveyGroups({ projectId });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async fetchGroupReports(projectId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/projects/${projectId}/results/group-reports`,
        });

        this.fetchGroupReports_reducer(res?.data);

        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    fetchProjects_reducer: (state, payload) => ({
      ...state,
      projects: payload,
    }),

    fetchSingleProjects_reducer: (state, payload) => ({
      ...state,
      project: payload,
    }),

    fetchClientAdmin_reducer: (state, payload) => ({
      ...state,
      clientAdmin: payload,
    }),

    fetchSurveyGroups_reducer: (state, payload) => ({
      ...state,
      surveyGroups: payload,
    }),

    fetchGroupReports_reducer: (state, payload) => ({
      ...state,
      groupReports: payload,
    }),
  },
};
