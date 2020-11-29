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
    staff: '',
    raterGroups: '',
    staffForRater: '',
    selectedRaters: [],
    defaultSelectedRaters: [],
    changedLog: [],
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

    async fetchStaff({ surveyGroupId, query }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/ratees${query}`,
        });
        await this.fetchStaff_reducer(res?.data?.data);
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
      }, dispatch.util.errorHandler,
        dispatch.util.alert);
    },

    async fetchRaterGroups({ surveyGroupId, rateeId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/rater-groups`,
        });
        const { data } = res?.data;
        await this.fetchRaterGroups_reducer(data);
        data.map(({ id }) => {
         return this.fetchStaffAndSetToStorage({ surveyGroupId, rateeId, raterGroupId: id });
        });
        return res;
      },
        dispatch.util.errorHandler);
    },

    async fetchStaffAndSetToStorage({ surveyGroupId, rateeId, raterGroupId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          // eslint-disable-next-line max-len
          url: `/super-user/survey-groups/${surveyGroupId}/ratees/${rateeId}/rater-groups/${raterGroupId}/raters`,
        });
        const itemsData = res?.data?.data.map((x) => {
          return {
            ...x,
            raterGroupId: parseInt(raterGroupId),
          };
        });
        const obj = {
          raterGroupId,
          isChanged: false,
          items: itemsData,
          defaultItems: itemsData.filter((el) => el.relationId),
          selectedItems: itemsData.filter((el) => el.relationId),
        };
        this.fetchStaffAndSetToStorage_reducer(obj);
      }, dispatch.util.errorHandler);
    },

    async fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId, query }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          // eslint-disable-next-line max-len
          url: `/super-user/survey-groups/${surveyGroupId}/ratees/${rateeId}/rater-groups/${raterGroupId}/raters${query}`,
        });

        const data = res?.data?.data.map((x) => {
          return {
            ...x,
            raterGroupId: parseInt(raterGroupId),
          };
        });
        this.fetchStaffForRater_reducer(data);
        const defaultSelected = data.filter((el) => el.relationId);

        this.setSelectedRaters_reducer(defaultSelected);
        this.setDefaultRaters_reducer(defaultSelected);
      }, dispatch.util.errorHandler);
    },

    setSelectedRaters({ rows, raterGpId }, state) {
      const { changedLog } = state.ratee;
      if (rows.length > 0) {
        const { raterGroupId } = rows[0];
        const data = changedLog.find((item) => item.raterGroupId == raterGroupId);
        data.isChanged = true;
        data.selectedItems = rows.filter((el) => el.id);
    } else {
        const data = changedLog.find((item) => item.raterGroupId == raterGpId);
        data.isChanged = true;
        data.selectedItems = [];
     }
    },

    async submitRaters({ surveyGroupId, rateeId }, state) {
      const obj = {
        addRelations: [],
        removeRelations: [],
      };
      const { changedLog } = state.ratee;
      const changedRaterGroups = changedLog.filter((item) => item.isChanged);
      changedRaterGroups.map(({ selectedItems, defaultItems }) => {
        console.log({ selectedItems, defaultItems });
        const differenceAdd =
        selectedItems.filter((item) => !defaultItems.find((el) => el.id === item.id));
        const differenceRemove =
        defaultItems.filter((item) => !selectedItems.find((el) => el.id === item.id));
        console.log('d', differenceAdd);
        differenceRemove.map((item) => obj.removeRelations.push(item.relationId));
        differenceAdd.map((item) =>
        obj.addRelations.push({ raterId: item.id, raterGroupId: item.raterGroupId }));
      });

      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          // eslint-disable-next-line max-len
          url: `/super-user/survey-groups/${surveyGroupId}/ratees/${rateeId}/relations`,
          data: obj,
        });
        this.fetchStaffAndSetToStorage_reducer('');
        return res;
      }, dispatch.util.errorHandler,
      dispatch.util.alert);
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

    fetchStaff_reducer: (state, payload) => ({
      ...state,
      staffs: payload,
    }),

    fetchStaffForRater_reducer: (state, payload) => ({
      ...state,
      staffForRater: payload,
    }),

    fetchRaterGroups_reducer: (state, payload) => ({
      ...state,
      raterGroups: payload,
    }),

    setSelectedRaters_reducer: (state, payload) => ({
      ...state,
      selectedRaters: payload,
    }),

    setDefaultRaters_reducer: (state, payload) => ({
      ...state,
      defaultSelectedRaters: payload,
    }),

    fetchStaffAndSetToStorage_reducer: (state, payload) => ({
      ...state,
      changedLog: [...state.changedLog, payload],
    }),
  },
};
