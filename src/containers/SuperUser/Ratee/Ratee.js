import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Ratee/Ratee';

class Ratee extends Component {
  state = {};

// Status overview
  fetchCompletionRate = async (query) => {
    const { fetchCompletionRate } = this.props;

    return fetchCompletionRate(query);
  };

  fetchSummary = async (query) => {
    const { fetchSummary } = this.props;

    return fetchSummary(query);
  };

// Status Details
  fetchStatusDetails = async (query) => {
    const { fetchStatusDetails } = this.props;

    return fetchStatusDetails(query);
  };

  removeRateeRaters = async (query) => {
    const { removeRateeRaters } = this.props;

    return removeRateeRaters(query);
  };

  changeAssessmentsStatus = async (query) => {
    const { changeAssessmentsStatus } = this.props;

    return changeAssessmentsStatus(query);
  };

  exportRelations = async (query) => {
    const { exportRelations } = this.props;

    return exportRelations(query);
  };

  importRelations = async (query) => {
    const { importRelations } = this.props;

    return importRelations(query);
  };

// raters email
  fetchRaters = async (query) => {
    const { fetchRaters } = this.props;

    return fetchRaters(query);
  };

  sendEmail = async (query) => {
    const { sendEmail } = this.props;

    return sendEmail(query);
  };

  exportSurveyGroupRaters = async (query) => {
    const { exportSurveyGroupRaters } = this.props;

    return exportSurveyGroupRaters(query);
  };

  fetchEmailOptions = async (query) => {
    const { fetchEmailOptions } = this.props;

    return fetchEmailOptions(query);
  };

// results
  fetchIndividualReports = async (query) => {
    const { fetchIndividualReports } = this.props;

    return fetchIndividualReports(query);
  };

  fetchGroupReports = async (query) => {
    const { fetchGroupReports } = this.props;

    return fetchGroupReports(query);
  };

  exportDemographicData = async (query) => {
    const { exportDemographicData } = this.props;

    return exportDemographicData(query);
  };

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
};

Ratee.defaultProps = {
  summary: {},
  completionRate: {},
  statusDetails: {},
  raters: {},
  emailOptions: {},
  individualReports: {},
  groupReports: {},
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Ratee);
