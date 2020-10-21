import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'wizard',

  state: {
    surveySettings: '',
    emailSettings: '',
    selectedTemplate: '',
  },

  effects: (dispatch) => ({
    async fetchSurveySettings(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `super-user/wizard/survey-groups/${surveyGroupId}/survey-settings`,
        });

        await this.fetchSurveySettings_reducer(res?.data?.data);
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

        await this.fetchEmailSettings_reducer(res?.data?.data);
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

    async createProject(payload) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: '/super-user/projects',
          data: payload,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async setSelectedEmailTemplate(template) {
      return actionWapper(async () => {
        this.setSelectedEmailTemplate_reducer(template);
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    fetchSurveySettings_reducer: (state, payload) => ({
      ...state,
      surveySettings: payload,
    }),

    fetchEmailSettings_reducer: (state, payload) => ({
      ...state,
      emailSettings: payload,
    }),

    setSelectedEmailTemplate_reducer: (state, payload) => ({
      ...state,
      selectedTemplate: payload,
    }),
  },
};
