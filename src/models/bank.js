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

        await this.fetchSurveyGroups_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async exportSurveyGroup(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/bank/survey-groups/${surveyGroupId}/export`,
          headers: { responseType: 'arraybuffer' },
        });

        // eslint-disable-next-line no-undef
        // const blob = new Blob([res.data], {
        //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // });
        // fileSaver.saveAs(blob, 'fixi.xlsx');

        // console.log({ blob });

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
