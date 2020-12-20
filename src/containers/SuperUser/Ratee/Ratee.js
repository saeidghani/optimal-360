import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Ratee/Ratee';

class Ratee extends Component {
  state = {};

  // Status overview
  fetchCompletionRate = (query) => {
    const { fetchCompletionRate } = this.props;

    return fetchCompletionRate(query);
  };

  fetchSummary = (query) => {
    const { fetchSummary } = this.props;

    return fetchSummary(query);
  };

  // Status Details
  fetchStatusDetails = (query) => {
    const { fetchStatusDetails } = this.props;

    return fetchStatusDetails(query);
  };

  removeRateeRaters = (query) => {
    const { removeRateeRaters } = this.props;

    return removeRateeRaters(query);
  };

  changeAssessmentsStatus = (query) => {
    const { changeAssessmentsStatus } = this.props;

    return changeAssessmentsStatus(query);
  };

  exportRelations = (query) => {
    const { exportRelations } = this.props;

    return exportRelations(query);
  };

  importRelations = (query) => {
    const { importRelations } = this.props;

    return importRelations(query);
  };

  // raters email
  fetchRaters = (query) => {
    const { fetchRaters } = this.props;

    return fetchRaters(query);
  };

  sendEmail = (query) => {
    const { sendEmail } = this.props;

    return sendEmail(query);
  };

  exportSurveyGroupRaters = (query) => {
    const { exportSurveyGroupRaters } = this.props;

    return exportSurveyGroupRaters(query);
  };

  fetchEmailOptions = (query) => {
    const { fetchEmailOptions } = this.props;

    return fetchEmailOptions(query);
  };

  // results
  fetchIndividualReports = (query) => {
    const { fetchIndividualReports } = this.props;

    return fetchIndividualReports(query);
  };

  fetchGroupReports = (query) => {
    const { fetchGroupReports } = this.props;

    return fetchGroupReports(query);
  };

  exportDemographicData = (query) => {
    const { exportDemographicData } = this.props;

    return exportDemographicData(query);
  };

  // reports
  fetchReportSetting = (query) => {
    const { fetchReportSetting } = this.props;

    return fetchReportSetting(query);
  };

  setReportSetting = (query) => {
    const { setReportSetting } = this.props;

    return setReportSetting(query);
  };

  importClientCompetencyModel = (query) => {
    const { importClientCompetencyModel } = this.props;

    return importClientCompetencyModel(query);
  };

  fetchPastResultOptions = (query) => {
    const { fetchPastResultOptions } = this.props;

    return fetchPastResultOptions(query);
  };

  fetchPastResult = (query) => {
    const { fetchPastResult } = this.props;

    return fetchPastResult(query);
  };

  setPastResult = (query) => {
    const { setPastResult } = this.props;

    return setPastResult(query);
  };

  fetchRaterGroups = ({ surveyGroupId }) => {
    const { fetchRaterGroups } = this.props;
    return fetchRaterGroups({ surveyGroupId });
  }

  generateReport = ({ projectId, surveyGroupIds }) => {
    const { generateReport } = this.props;
    return generateReport({ projectId, surveyGroupIds });
  }

  render() {
    const {
      loading,
      summary,
      completionRate,
      statusDetails,
      raters,
      emailOptions,
      individualReports,
      groupReports,
      reportSetting,
      pastResultOptions,
      pastResult,
      raterGroups,
    } = this.props;

    return (
      <Layout
        loading={loading}
        summary={summary}
        completionRate={completionRate}
        statusDetails={statusDetails}
        raters={raters}
        emailOptions={emailOptions}
        fetchSummary={this.fetchSummary}
        fetchCompletionRate={this.fetchCompletionRate}
        fetchRaters={this.fetchRaters}
        sendEmail={this.sendEmail}
        fetchEmailOptions={this.fetchEmailOptions}
        fetchStatusDetails={this.fetchStatusDetails}
        removeRateeRaters={this.removeRateeRaters}
        changeAssessmentsStatus={this.changeAssessmentsStatus}
        exportSurveyGroupRaters={this.exportSurveyGroupRaters}
        exportRelations={this.exportRelations}
        importRelations={this.importRelations}
        fetchIndividualReports={this.fetchIndividualReports}
        fetchGroupReports={this.fetchGroupReports}
        exportDemographicData={this.exportDemographicData}
        groupReports={groupReports}
        individualReports={individualReports}
        // reports
        fetchReportSetting={this.fetchReportSetting}
        setReportSetting={this.setReportSetting}
        reportSetting={reportSetting}
        importClientCompetencyModel={this.importClientCompetencyModel}
        fetchPastResultOptions={this.fetchPastResultOptions}
        fetchPastResult={this.fetchPastResult}
        setPastResult={this.setPastResult}
        pastResultOptions={pastResultOptions}
        pastResult={pastResult}
        fetchRaterGroups={this.fetchRaterGroups}
        raterGroups={raterGroups}
        generateReport={this.generateReport}
      />
    );
  }
}

Ratee.propTypes = {
  fetchIndividualReports: PropTypes.func.isRequired,
  fetchGroupReports: PropTypes.func.isRequired,
  exportDemographicData: PropTypes.func.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,
  fetchStatusDetails: PropTypes.func.isRequired,
  removeRateeRaters: PropTypes.func.isRequired,
  changeAssessmentsStatus: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  fetchEmailOptions: PropTypes.func.isRequired,
  exportSurveyGroupRaters: PropTypes.func.isRequired,
  exportRelations: PropTypes.func.isRequired,
  importRelations: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  summary: PropTypes.shape({}),
  completionRate: PropTypes.shape({}),
  statusDetails: PropTypes.shape({}),
  raters: PropTypes.shape({}),
  emailOptions: PropTypes.shape({}),
  individualReports: PropTypes.shape({}),
  groupReports: PropTypes.shape({}),

  fetchReportSetting: PropTypes.func.isRequired,
  setReportSetting: PropTypes.func.isRequired,
  reportSetting: PropTypes.shape({}),
  importClientCompetencyModel: PropTypes.func.isRequired,
  pastResultOptions: PropTypes.shape({}),
  pastResult: PropTypes.shape({}),
  fetchPastResultOptions: PropTypes.func.isRequired,
  fetchPastResult: PropTypes.func.isRequired,
  setPastResult: PropTypes.func.isRequired,
  fetchRaterGroups: PropTypes.func.isRequired,
  raterGroups: PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
  generateReport: PropTypes.func.isRequired,
};

Ratee.defaultProps = {
  summary: {},
  completionRate: {},
  statusDetails: {},
  raters: {},
  emailOptions: {},
  individualReports: {},
  groupReports: {},
  reportSetting: {},
  pastResultOptions: {},
  pastResult: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  summary: state.ratee?.summary || {},
  completionRate: state.ratee?.completionRate || {},
  statusDetails: state.ratee?.statusDetails || {},
  raters: state.ratee?.raters || {},
  emailOptions: state.ratee?.emailOptions || {},
  individualReports: state.ratee?.individualReports || {},
  groupReports: state.ratee?.groupReports || {},
  reportSetting: state.ratee?.reportSetting || {},
  pastResultOptions: state.ratee?.pastResultOptions || {},
  pastResult: state.ratee?.pastResult || {},
  raterGroups: state.ratee.raterGroups,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSummary: dispatch.ratee.fetchSummary,
  fetchCompletionRate: dispatch.ratee.fetchCompletionRate,
  fetchStatusDetails: dispatch.ratee.fetchStatusDetails,
  removeRateeRaters: dispatch.ratee.removeRateeRaters,
  changeAssessmentsStatus: dispatch.ratee.changeAssessmentsStatus,
  exportSurveyGroupRaters: dispatch.ratee.exportSurveyGroupRaters,
  exportRelations: dispatch.ratee.exportRelations,
  importRelations: dispatch.ratee.importRelations,
  fetchRaters: dispatch.ratee.fetchRaters,
  sendEmail: dispatch.ratee.sendEmail,
  fetchEmailOptions: dispatch.ratee.fetchEmailOptions,
  fetchIndividualReports: dispatch.ratee.fetchIndividualReports,
  fetchGroupReports: dispatch.ratee.fetchGroupReports,
  exportDemographicData: dispatch.ratee.exportDemographicData,
  fetchReportSetting: dispatch.ratee.fetchReportSetting,
  setReportSetting: dispatch.ratee.setReportSetting,
  importClientCompetencyModel: dispatch.ratee.importClientCompetencyModel,
  fetchPastResultOptions: dispatch.ratee.fetchPastResultOptions,
  fetchPastResult: dispatch.ratee.fetchPastResult,
  setPastResult: dispatch.ratee.setPastResult,
  fetchRaterGroups: dispatch.ratee.fetchRaterGroups,
  generateReport: dispatch.ratee.generateReport,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ratee);
