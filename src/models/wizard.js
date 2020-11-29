import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'wizard',

  state: {
    project: '',
    surveySettings: '',
    emailSettings: '',
    selectedTemplates: '',
    surveyIntro: '',
    surveyQuestions: '',
    reports: '',
  },

  effects: (dispatch) => ({
    async createProject(payload) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: '/super-user/projects',
          data: payload,
        });

        await dispatch.projects.fetchSurveyGroups({
          projectId: res?.data?.data?.projectId,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchProject(projectId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/projects/${projectId}`,
        });

        this.fetchProject_reducer(res?.data?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async editProject({ projectId, ...data }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'put',
          url: `/super-user/projects/${projectId}`,
          data,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchSurveySettings(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `super-user/wizard/survey-groups/${surveyGroupId}/survey-settings`,
        });

        this.fetchSurveySettings_reducer(res?.data?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async setSurveySettings({ surveyGroupId, ...payload }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: `super-user/wizard/survey-groups/${surveyGroupId}/survey-settings`,
          data: payload,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchEmailSettings(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `super-user/wizard/survey-groups/${surveyGroupId}/email-settings`,
        });

        this.fetchEmailSettings_reducer(res?.data?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async setEmailSettings({ surveyGroupId, ...payload }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: `super-user/wizard/survey-groups/${surveyGroupId}/email-settings`,
          data: payload,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async setSelectedEmailTemplates(template) {
      return actionWapper(async () => {
        this.setSelectedEmailTemplates_reducer(template);
      }, dispatch.util.errorHandler);
    },

    async fetchSurveyIntro(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `super-user/wizard/survey-groups/${surveyGroupId}/survey-intro`,
        });

        this.fetchSurveyIntro_reducer(res?.data?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async setSurveyIntro({ surveyGroupId, clientPicture, ...payload }) {
      return actionWapper(async () => {
        const path = await dispatch.util.uploadImage(clientPicture);

        const res = await axios({
          method: 'post',
          url: `super-user/wizard/survey-groups/${surveyGroupId}/survey-intro`,
          data: { ...payload, clientPicture: path },
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchSurveyQuestions(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `super-user/wizard/survey-groups/${surveyGroupId}/survey-questions`,
        });

        this.fetchSurveyQuestions_reducer(res?.data?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async setSurveyQuestions({ surveyGroupId, ...payload }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: `super-user/wizard/survey-groups/${surveyGroupId}/survey-questions`,
          data: payload,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchReports(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `super-user/wizard/survey-groups/${surveyGroupId}/reports`,
        });

        await this.fetchReports_reducer(res?.data?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async setReports({ surveyGroupId, ...payload }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: `super-user/wizard/survey-groups/${surveyGroupId}/reports`,
          data: payload,
        });

        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    fetchProject_reducer: (state, payload) => ({
      ...state,
      project: payload,
    }),

    fetchSurveySettings_reducer: (state, payload) => ({
      ...state,
      surveySettings: payload,
    }),

    fetchEmailSettings_reducer: (state, payload) => ({
      ...state,
      emailSettings: payload,
    }),

    setSelectedEmailTemplates_reducer: (state, payload) => ({
      ...state,
      selectedTemplates: payload,
    }),

    fetchSurveyIntro_reducer: (state, payload) => ({
      ...state,
      surveyIntro: payload,
    }),

    fetchSurveyQuestions_reducer: (state, payload) => ({
      ...state,
      surveyQuestions: payload,
    }),

    fetchReports_reducer: (state, payload) => ({
      ...state,
      reports: payload,
    }),
  },
};
