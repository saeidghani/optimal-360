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
    staffForRater: '',
    raterGroups: '',
    reportSetting: '',
    pastResultOptions: '',
    pastResult: '',
    selectedRaters: [],
    defaultSelectedRaters: [],
    obj: {},
    importMissionCriticalError: '',
    importRelationError: '',
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
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/send-email`,
            data: {
              raterIds,
              emailOptionId,
            },
          });

          return res;
        },
        dispatch.util.errorHandler,
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
      return actionWapper(
        async () => {
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
      }, dispatch.util.errorHandler);
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
      }, dispatch.util.errorHandler);
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
          if (res?.data?.data !== true) {
            await this.importRelations_reducer(res?.data?.data);
          } else {
            await dispatch.ratee.fetchStatusDetails({
              query: '?page_size=10&page_number=1',
              surveyGroupId,
            });
          }
          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async changeAssessmentsStatus({ surveyGroupId, status, selectedRowsIds }) {
      return actionWapper(
        async () => {
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
      }, dispatch.util.errorHandler);
    },

    async exportDemographicDataForGroups({ surveyGroupIds, fields }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'post',
          url: '/super-user/survey-groups/demographic-data-answer/export',
          data: {
            surveyGroupIds,
            fields,
          },
          responseType: 'arraybuffer',
        });
        dispatch.util.saveZipFile({
          res: res?.data,
          filename: `report--surveyGroups[${surveyGroupIds}].zip`,
        });
        return res;
      }, dispatch.util.errorHandler);
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

    clearRateeMissionCriticals() {
      this.fetchRateeMissionCriticals_reducer('');
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
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/ratees/${rateeId}/mission-criticals`,
            data: { competencyIds },
          });
          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async setStaff({ surveyGroupId, rateeId }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/ratees`,
            data: { rateeId },
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    fetchRaterGroups({ surveyGroupId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/rater-groups`,
        });
        this.fetchRaterGroups_reducer(res?.data?.data);
        return res;
      }, dispatch.util.errorHandler);
    },

    clearRaterGroups() {
      this.fetchRaterGroups_reducer('');
    },

    async fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId, query }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          // eslint-disable-next-line max-len
          url: `/super-user/survey-groups/${surveyGroupId}/ratees/${rateeId}/rater-groups/${raterGroupId}/raters${query}`,
        });
        await this.fetchStaffForRater_reducer(res?.data);
        const defaultSelected = res?.data?.data?.filter((item) => item.relationId);
        this.setSelectedRaters_reducer(defaultSelected);
        this.setDefaultRaters_reducer(defaultSelected);
      }, dispatch.util.errorHandler);
    },

    setSelectedRaters(rows) {
      this.setSelectedRaters_reducer(rows);
    },

    clearSelectedAndDefault() {
      this.setSelectedRaters_reducer([]);
      this.setDefaultRaters_reducer([]);
    },

    submitRaters({ surveyGroupId, rateeId, obj }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            // eslint-disable-next-line max-len
            url: `/super-user/survey-groups/${surveyGroupId}/ratees/${rateeId}/relations`,
            data: obj,
          });
          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async fetchReportSetting({ surveyGroupId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          // eslint-disable-next-line max-len
          url: `/super-user/survey-groups/${surveyGroupId}/report-setting`,
        });

        await this.fetchReportSetting_reducer(res?.data?.data);
      }, dispatch.util.errorHandler);
    },

    async setReportSetting({ surveyGroupId, reports }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/report-setting`,
            data: { ...reports },
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async importClientCompetencyModel({ file, surveyGroupId }) {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('excel', file);
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/client-competency-model/import`,
            data,
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async fetchPastResultOptions({ surveyGroupId, query = '' }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          // eslint-disable-next-line max-len
          url: `/super-user/survey-groups/${surveyGroupId}/past-result-options${query}`,
        });

        await this.fetchPastResultOptions_reducer(res?.data);
      }, dispatch.util.errorHandler);
    },

    async fetchPastResult({ surveyGroupId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          // eslint-disable-next-line max-len
          url: `/super-user/survey-groups/${surveyGroupId}/past-result`,
        });

        await this.fetchPastResult_reducer(res?.data);
      }, dispatch.util.errorHandler);
    },

    async setPastResult({ surveyGroupId, selectedPastResults }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/past-result`,
            data: { selectedPastResults },
          });

          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async generateGroupReports({ projectId, surveyGroupIds }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/projects/${projectId}/results/group-reports/generate-reports`,
            data: { surveyGroupIds },
            responseType: 'blob',
          });
          dispatch.util.saveZipFile({
            res: res?.data,
            filename: `report-project-${projectId}--surveyGroups[${surveyGroupIds}].zip`,
          });
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async generateIndividualReports({ surveyGroupId, rateeIds }) {
      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/results/individual-reports/generate-reports`,
            data: { rateeIds },
            responseType: 'blob',
          });

          dispatch.util.saveZipFile({
            res: res?.data,
            filename: `report-project-${surveyGroupId}--surveyGroups[${rateeIds}].zip`,
          });
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    async exportMissionCriticalsToExcel({ surveyGroupId }) {
      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/survey-groups/${surveyGroupId}/mission-criticals/export`,
          responseType: 'blob',
        });
        dispatch.util.saveFile({ blob: res.data, filename: `MissionCriticals-${surveyGroupId}` });

        return res;
      }, dispatch.util.errorHandler);
    },

    async importMissionCriticalsWithExcel({ file, surveyGroupId }) {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('excel', file);

      return actionWapper(
        async () => {
          const res = await axios({
            method: 'post',
            url: `/super-user/survey-groups/${surveyGroupId}/mission-criticals/import`,
            data,
          });
          if (res?.data?.data !== true) {
            await this.importMissionCriticalsWithExcel_reducer(res?.data?.data);
          } else {
            await dispatch.ratee.fetchStatusDetails({
              query: '?page_size=10&page_number=1',
              surveyGroupId,
            });
          }
          return res;
        },
        dispatch.util.errorHandler,
        dispatch.util.alert,
      );
    },

    clearExcelImportError() {
      this.importMissionCriticalsWithExcel_reducer('');
      this.importRelations_reducer('');
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
      staff: payload,
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

    fetchReportSetting_reducer: (state, payload) => ({
      ...state,
      reportSetting: payload,
    }),

    fetchPastResultOptions_reducer: (state, payload) => ({
      ...state,
      pastResultOptions: payload,
    }),

    fetchPastResult_reducer: (state, payload) => ({
      ...state,
      pastResult: payload,
    }),

    importMissionCriticalsWithExcel_reducer: (state, payload) => ({
      ...state,
      importMissionCriticalError: payload,
    }),

    importRelations_reducer: (state, payload) => ({
      ...state,
      importRelationError: payload,
    }),
  },
};
