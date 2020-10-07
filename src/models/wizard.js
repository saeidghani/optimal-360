import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'wizard',

  state: {
    surveySettings: '',
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
  }),

  reducers: {
    fetchSurveySettings_reducer: (state, payload) => ({
      ...state,
      surveySettings: payload,
    }),
  },
};
