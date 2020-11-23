import Cookies from 'js-cookie';

import axios from '../lib/api';
import actionWrapper from '../lib/actionWapper';

export default {
  namespace: 'surveyPlatform',

  state: {
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

    async fetchInfo({ query, surveyGroupId }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/survey-platform/survey-groups/${surveyGroupId}/info${query}`,
        });

        this.fetchInfo_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchRelations({ query, surveyGroupId }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/survey-platform/survey-groups/${surveyGroupId}/relations${query}`,
        });

        this.fetchRelations_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchQuestions({ query, surveyGroupId, questionNumber }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/survey-platform/survey-groups/${surveyGroupId}/questions/${questionNumber}${query}`,
        });

        this.fetchQuestions_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async postQuestionResponses({ surveyGroupId, questionNumber }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'post',
          url: `/survey-platform/survey-groups/${surveyGroupId}/questions/${questionNumber}`,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchFeedbacks({ query, surveyGroupId, feedbackNumber }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/survey-platform/survey-groups/${surveyGroupId}/feedbacks/${feedbackNumber}${query}`,
        });

        this.fetchFeedbacks_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async postFeedbackResponses({ surveyGroupId, feedbackNumber }) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'post',
          url: `/survey-platform/survey-groups/${surveyGroupId}/feedbacks/${feedbackNumber}`,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async postRaterResponses({ surveyGroupId }) {
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
    },
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
