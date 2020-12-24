import Cookies from 'js-cookie';
import axios from '../lib/api';
import actionWrapper from '../lib/actionWapper';

export default {
  namespace: 'clientAdmin',

  state: {
    userName: '',
    projects: '',
    completionRate: '',
    raterGroups: '',
    rganization: '',
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

    async fetchOrganization() {
      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: '/survey-platform/organization',
        });

        this.fetchOrganization_reducer(res?.data);
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

    async fetchCompletionRate({ query, surveyGroupId }) {
      if (!surveyGroupId) return this.fetchCompletionRate_reducer('');

      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/client-admin/survey-groups/${surveyGroupId}/overview/completion-rate${query}`,
        });

        this.fetchCompletionRate_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchRaterGroups(surveyGroupId) {
      if (!surveyGroupId) return this.fetchRaterGroups_reducer('');

      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/client-admin/survey-groups/${surveyGroupId}/rater-groups`,
        });

        this.fetchRaterGroups_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchSummary({ query, surveyGroupId }) {
      if (!surveyGroupId) return this.fetchSummary_reducer('');

      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/client-admin/survey-groups/${surveyGroupId}/overview/summary${query}`,
        });

        this.fetchSummary_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchRatees({ query, surveyGroupId }) {
      if (!surveyGroupId) return this.fetchRatees_reducer('');

      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/client-admin/survey-groups/${surveyGroupId}/overview/ratees${query}`,
        });

        this.fetchRatees_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async fetchRaters({ query, surveyGroupId }) {
      if (!surveyGroupId) return this.fetchRaters_reducer('');

      return actionWrapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/client-admin/survey-groups/${surveyGroupId}/overview/raters${query}`,
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
    saveUserName: (state, payload) => ({
      ...state,
      userName: payload.userName,
    }),
    fetchOrganization_reducer: (state, payload) => ({
      ...state,
      organization: payload,
    }),
    fetchProjects_reducer: (state, payload) => ({
      ...state,
      projects: payload,
    }),
    fetchCompletionRate_reducer: (state, payload) => ({
      ...state,
      completionRate: payload,
    }),
    fetchRaterGroups_reducer: (state, payload) => ({
      ...state,
      raterGroups: payload,
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
