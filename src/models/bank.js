import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'bank',

  state: {
    surveyGroups: '',
    surveyGroupInfo: '',
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

    async fetchSurveyGroupInfo(surveyGroupId) {
      if (!surveyGroupId) return this.fetchSurveyGroupInfo_reducer('');

      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/bank/survey-groups/${surveyGroupId}`,
        });

        this.fetchSurveyGroupInfo_reducer(res?.data?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    async setSurveyGroupInfo({ surveyGroupId, ...data }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'put',
          url: `/super-user/bank/survey-groups/${surveyGroupId}`,
          data,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async addSurveyGroup(data) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: '/super-user/bank/survey-groups',
          data,
        });

        return res;
      }, dispatch.util.errorHandler);
    },

    async importSurveyGroups(file) {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('excel', file);

      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: '/super-user/bank/survey-groups/import',
            data,
          });

          await dispatch.bank.fetchSurveyGroups('?page_size=10&page_number=1');

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async exportSurveyGroup(surveyGroupId) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/bank/survey-groups/${surveyGroupId}/export`,
          responseType: 'blob',
        });

        dispatch.util.saveFile({ blob: res.data, filename: `survey-group-${surveyGroupId}` });

        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    fetchSurveyGroups_reducer: (state, payload) => ({
      ...state,
      surveyGroups: payload,
    }),

    fetchSurveyGroupInfo_reducer: (state, payload) => ({
      ...state,
      surveyGroupInfo: payload,
    }),
  },
};
