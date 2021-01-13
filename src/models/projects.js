import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'projects',

  state: {
    projects: '',
    surveyGroups: '',
    clientAdmin: '',
    project: '',
    clusterBenchmarks: '',
    competencyBenchmarks: '',
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

    async fetchClusterBenchmarks(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/clusters-benchmark`,
        });

        this.fetchClusterBenchmarks_reducer(res?.data);

        return res;
      }, dispatch.util.errorHandler);
    },

    async setClusterBenchmarks({ surveyGroupId, ...data }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: `/super-user/survey-groups/${surveyGroupId}/clusters-benchmark`,
          data,
        });

        await dispatch.projects.fetchClusterBenchmarks(surveyGroupId);

        return res;
      }, dispatch.util.errorHandler);
    },

    async importClusterBenchmark({ surveyGroupId, file }) {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('excel', file);

      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/clusters-benchmark/import`,
            data,
          });

          await dispatch.projects.fetchClusterBenchmarks(surveyGroupId);

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async exportClusterBenchmark(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/clusters-benchmark/export`,
          responseType: 'blob',
        });

        dispatch.util.saveFile({ blob: res.data, filename: `cluster-benchmark-${surveyGroupId}` });

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchCompetencyBenchmarks(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/competencies-benchmark`,
        });

        this.fetchCompetencyBenchmarks_reducer(res?.data);

        return res;
      }, dispatch.util.errorHandler);
    },

    async setCompetencyBenchmarks({ surveyGroupId, ...data }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: `/super-user/survey-groups/${surveyGroupId}/competencies-benchmark`,
          data,
        });

        await dispatch.projects.fetchCompetencyBenchmarks(surveyGroupId);

        return res;
      }, dispatch.util.errorHandler);
    },

    async importCompetencyBenchmark({ surveyGroupId, file }) {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('excel', file);

      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/competencies-benchmark/import`,
            data,
          });

          await dispatch.projects.fetchCompetencyBenchmarks(surveyGroupId);

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async exportCompetencyBenchmark(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/competencies-benchmark/export`,
          responseType: 'blob',
        });

        dispatch.util.saveFile({
          blob: res.data,
          filename: `competency-benchmark-${surveyGroupId}`,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async changeStatusOfSurveyGroups({ projectId, ...data }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'patch',
            url: `/super-user/projects/${projectId}/survey-groups/status`,
            data,
          });

          await dispatch.projects.fetchSurveyGroups({ projectId });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async changeSurveyGroupEndDate({ projectId, surveyGroupId, endDate }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/end-date`,
            data: {
              newEndDate: endDate,
            },
          });

          await dispatch.projects.fetchSurveyGroups({ projectId });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
        { toast: true },
      );
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

    fetchClusterBenchmarks_reducer: (state, payload) => ({
      ...state,
      clusterBenchmarks: payload,
    }),

    fetchCompetencyBenchmarks_reducer: (state, payload) => ({
      ...state,
      competencyBenchmarks: payload,
    }),
  },
};
