import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'bank',

  state: {
    surveyGroups: '',
  },

  effects: (dispatch) => ({
    async fetchSurveyGroups(query) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/bank/survey-groups${query}`,
        });

        await this.fetchSurveyGroups_reducer(res?.data?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    fetchSurveyGroups_reducer: (state, payload) => ({
      ...state,
      surveyGroups: payload,
    }),
  },
};
