import Cookies from 'js-cookie';
import axios from '../lib/api';
import actionWrapper from '../lib/actionWapper';

export default {
  namespace: 'clientAdmin',

  state: {
    projects: '',
    completionRate: '',
    summary: '',
    ratees: '',
    raters: '',
  },

  effects: (dispatch) => ({
    async login({ username, password, rememberMe }) {
      return actionWrapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: '/client-admin/auth/login',
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
          url: '/client-admin/auth/reset-password',
          data: payload,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchProjects(query) {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/client-admin/projects${query}`,
        });

        this.fetchProjects_reducer(res?.data);

        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchCompletionRate(surveyGroupId) {
      if (!surveyGroupId) return this.fetchCompletionRate_Reducer('');

      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/client-admin/survey-groups/${surveyGroupId}/overview/completion-rate`,
        });

        this.fetchCompletionRate_Reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchSummary(surveyGroupId) {
      if (!surveyGroupId) return this.fetchSummary_reducer('');

      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/client-admin/survey-groups/${surveyGroupId}/overview/summary`,
        });

        this.fetchSummary_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchRatees(surveyGroupId) {
      if (!surveyGroupId) return this.fetchRatees_Reducer('');

      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/client-admin/survey-groups/${surveyGroupId}/overview/ratees`,
        });

        this.fetchRatees_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchRaters(surveyGroupId) {
      if (!surveyGroupId) return this.fetchRaters_Reducer('');

      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/client-admin/survey-groups/${surveyGroupId}/overview/raters`,
        });

        this.fetchRaters_reducer(res?.data);
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
    fetchProjects_reducer: (state, payload) => ({
      ...state,
      projects: payload,
    }),
    fetchCompletionRate_Reducer: (state, payload) => ({
      ...state,
      completionRate: payload,
    }),
    fetchSummary_reducer: (state, payload) => ({
      ...state,
      summary: payload,
    }),
    fetchRatees_reducer: (state, payload) => ({
      ...state,
      ratees: payload,
    }),
    fetchRaters_reducer: (state, payload) => ({
      ...state,
      raters: payload,
    }),
  },
};
