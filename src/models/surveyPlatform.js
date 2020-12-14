import Cookies from 'js-cookie';

import axios from '../lib/api';
import actionWrapper from '../lib/actionWapper';

export default {
  namespace: 'surveyPlatform',

  state: {
    profile: '',
    projects: '',
    info: '',
    relations: '',
    questions: '',
    feedbacks: '',
  },

  effects: (dispatch) => ({
    async login({ username, password, rememberMe }) {
      return actionWrapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: '/survey-platform/auth/login',
            data: { username, password },
          });
          console.log(res?.data?.data?.token);
          await this.setToken({ token: res?.data?.data?.token, rememberMe });
          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async forgotPassword(payload) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'post',
          url: '/survey-platform/auth/reset-password',
          data: payload,
        });
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchProfile(query) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/survey-platform/profile${query}`,
        });

        this.fetchProfile_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async updateProfile(data) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'put',
          url: '/survey-platform/profile',
          data,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchProjects(query) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/survey-platform/projects${query}`,
        });

        this.fetchProjects_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchInfo({ surveyGroupId }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/survey-platform/survey-groups/${surveyGroupId}/info`,
        });

        this.fetchInfo_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchRelations({ surveyGroupId }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/survey-platform/survey-groups/${surveyGroupId}/relations`,
        });

        this.fetchRelations_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchQuestions({ surveyGroupId, questionNumber, relationIds }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/survey-platform/survey-groups/${surveyGroupId}/questions/${questionNumber}?${relationIds}`,
        });
        console.log(res?.data?.options);
        this.fetchQuestions_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async addQuestionResponses({ surveyGroupId, questionId, ...payload }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'post',
          url: `/survey-platform/survey-groups/${surveyGroupId}/questions/${questionId}`,
          data: payload,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchFeedbacks({ surveyGroupId, feedbackNumber, relationIds }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/survey-platform/survey-groups/${surveyGroupId}/feedbacks/${feedbackNumber}?${relationIds}`,
        });

        this.fetchFeedbacks_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async addFeedbackResponses({ surveyGroupId, feedbackId, ...payload }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'post',
          url: `/survey-platform/survey-groups/${surveyGroupId}/feedbacks/${feedbackId}`,
          data: payload,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async submitResponses({ surveyGroupId }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'post',
          url: `/survey-platform/survey-groups/${surveyGroupId}/submit`,
        });

        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    setToken(state, { token, rememberMe }) {
      const options = {
        expires: rememberMe ? 7 : null,
      };
      Cookies.set('token', token, options);

      return null;
    },
    fetchProfile_reducer: (state, payload) => ({
      ...state,
      profile: payload,
    }),
    fetchProjects_reducer: (state, payload) => ({
      ...state,
      projects: payload,
    }),
    fetchInfo_reducer: (state, payload) => ({
      ...state,
      info: payload,
    }),
    fetchRelations_reducer: (state, payload) => ({
      ...state,
      relations: payload,
    }),
    fetchQuestions_reducer: (state, payload) => ({
      ...state,
      questions: payload,
    }),
    fetchFeedbacks_reducer: (state, payload) => ({
      ...state,
      feedbacks: payload,
    }),
  },
};
