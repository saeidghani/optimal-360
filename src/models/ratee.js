import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'ratee',

  state: {
    summary: '',
    completionRate: '',
    statusDetails: '',
    raters: '',
    emailOptions: '',
    individualReports: '',
    groupReports: '',
    rateeMissionCriticals: '',
    staffs: '',
    staffForRatee: '',
    raterGroups: '',
  },

  effects: (dispatch) => ({
    async fetchSummary({ query, surveyGroupId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/overview/summary${query}`,
        });

        await this.fetchSummary_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async fetchCompletionRate({ surveyGroupId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/overview/completion-rate`,
        });

        await this.fetchCompletionRate_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async fetchStatusDetails({ query, surveyGroupId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/status-details${query}`,
        });

        await this.fetchStatusDetails_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async fetchRaters({ query, surveyGroupId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/raters${query}`,
        });

        await this.fetchRaters_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async sendEmail({ raterIds, emailOptionId, surveyGroupId }) {
      return actionWapper(async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/send-email`,
            data: {
              raterIds,
              emailOptionId,
            },
          });

          return res;
        }, dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },
    async fetchEmailOptions({ surveyGroupId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/email-options`,
        });

        await this.fetchEmailOptions_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async removeRateeRaters({ surveyGroupId, selectedRowsIds }) {
      return actionWapper(async () => {
          const res = await axios({
            method: 'patch',
            url: `/super-user/survey-groups/${surveyGroupId}/relations/remove`,
            data: { relationIds: selectedRowsIds },
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },
    async exportSurveyGroupRaters({ surveyGroupId }) {
      return actionWapper(async () => {
          const res = await axios({
            method: 'get',
            url: `/super-user/survey-groups/${surveyGroupId}/raters/export`,
            responseType: 'blob',
          });
          dispatch.util.saveFile({ blob: res.data, filename: `raters-${surveyGroupId}` });

          return res;
        },
        dispatch.util.errorHandler,
      );
    },
    async exportRelations({ surveyGroupId }) {
      return actionWapper(async () => {
          const res = await axios({
            method: 'get',
            url: `/super-user/survey-groups/${surveyGroupId}/relations/export`,
            responseType: 'blob',
          });

          dispatch.util.saveFile({ blob: res.data, filename: `relations-${surveyGroupId}` });

          return res;
        }, dispatch.util.errorHandler,
      );
    },
    async importRelations({ file, surveyGroupId }) {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('excel', file);

      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/relations/import`,
            data,
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },
    async changeAssessmentsStatus({ surveyGroupId, status, selectedRowsIds }) {
      return actionWapper(async () => {
          const res = await axios({
            method: 'patch',
            url: `/super-user/survey-groups/${surveyGroupId}/assessments`,
            data: { relationIds: selectedRowsIds, status },
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },
    async fetchIndividualReports({ surveyGroupId, query }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/results/individual-reports${query}`,
        });

        await this.fetchIndividualReports_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async fetchGroupReports({ projectId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/projects/${projectId}/results/group-reports`,
        });

        await this.fetchGroupReports_reducer(res?.data);
        return res;
      }, dispatch.util.errorHandler);
    },
    async exportDemographicData({ surveyGroupId, fields, rateeIds }) {
      return actionWapper(async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/demographic-data/export`,
            data: {
              rateeIds,
              fields,
            },
            responseType: 'blob',
          });

          dispatch.util.saveFile({ blob: res.data, filename: `relations-${surveyGroupId}` });
          return res;
        }, dispatch.util.errorHandler,
      );
    },
    async fetchRateeMissionCriticals({ surveyGroupId, rateeId }) {
            return actionWapper(async () => {
              const res = await axios({
                method: 'get',
                url: `/super-user/survey-groups/${surveyGroupId}/ratees/${rateeId}/mission-criticals`,
              });
              await this.fetchRateeMissionCriticals_reducer(res?.data?.data);
              return res;
            }, dispatch.util.errorHandler);
      },
     async clearRateeMissionCriticals() {
        this.fetchRateeMissionCriticals_reducer('');
      },
      async fetchStaffs({ surveyGroupId, query }) {
        return actionWapper(async () => {
          const res = await axios({
            method: 'get',
            url: `/super-user/survey-groups/${surveyGroupId}/ratees${query}`,
          });
          await this.fetchStaffs_reducer(res?.data?.data);
          return res;
        }, dispatch.util.errorHandler);
      },
      async fetchOrganizationId({ projectId }) {
        return actionWapper(async () => {
          const res = await axios({
            method: 'get',
            url: `/super-user/projects/${projectId}`,
          });
          return res?.data?.data?.organization?.id;
        }, dispatch.util.errorHandler);
      },
      async addMissionCriticalToRatee({ surveyGroupId, rateeId, competencyIds }) {
        return actionWapper(async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/ratees/${rateeId}/mission-criticals`,
            data: { competencyIds },
          });
          return res;
        }, dispatch.util.errorHandler,
        dispatch.util.alert);
    },
    async setStaff({ surveyGroupId, rateeId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: `/super-user/survey-groups/${surveyGroupId}/ratees`,
          data: { rateeId },
        });

        return res;
      },
       dispatch.util.errorHandler,
       dispatch.util.alert);
    },
    async fetchRaterGroups({ surveyGroupId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/rater-groups`,
        });
        await this.fetchRaterGroups_reducer(res?.data?.data);
        return res;
      },
       dispatch.util.errorHandler);
    },
    async fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId, query }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          // eslint-disable-next-line max-len
          url: `/super-user/survey-groups/${surveyGroupId}/ratees/${rateeId}/rater-groups/${raterGroupId}/raters${query}`,
        });

        await this.fetchStaffForRater_reducer(res?.data?.data);
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
    fetchEmailOptions_reducer: (state, payload) => ({
      ...state,
      emailOptions: payload,
    }),
    fetchIndividualReports_reducer: (state, payload) => ({
      ...state,
      individualReports: payload,
    }),
    fetchGroupReports_reducer: (state, payload) => ({
      ...state,
      groupReports: payload,
    }),
    fetchRateeMissionCriticals_reducer: (state, payload) => ({
      ...state,
      rateeMissionCriticals: payload,
    }),
    fetchStaffs_reducer: (state, payload) => ({
      ...state,
      staffs: payload,
    }),
    fetchStaffForRater_reducer: (state, payload) => ({
       ...state,
       staffForRatee: payload,
      }),
    fetchRaterGroups_reducer: (state, payload) => ({
      ...state,
      raterGroups: payload,
      }),
    },
};
