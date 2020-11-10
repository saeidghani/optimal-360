import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

const surveyGroupId = 1; // TODO: change GroupId dynamically

export default {
  namespace: 'ratee',

  state: {
    summary: '',
    completionRate: '',
    statusDetails: '',
    raters: '',
  },

  effects: (dispatch) => ({
    async fetchSummary(query = '') {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/overview/summary${query}`,
        });

        await this.fetchSummary_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async fetchCompletionRate() {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/overview/completion-rate`,
        });

        await this.fetchCompletionRate_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async fetchStatusDetails(query) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/status-details${query}`,
        });

        await this.fetchStatusDetails_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async fetchRaters(query) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/raters${query}`,
        });

        await this.fetchRaters_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    fetchSummary_reducer: (state, payload) => ({
      ...state,
      summary: payload,
    }),
    fetchCompletionRate_reducer: (state, payload) => ({
      ...state,
      completionRate: payload,
    }),
    fetchStatusDetails_reducer: (state, payload) => ({
      ...state,
      statusDetails: payload,
    }),
    fetchRaters_reducer: (state, payload) => ({
      ...state,
      raters: payload,
    }),
  },
};
