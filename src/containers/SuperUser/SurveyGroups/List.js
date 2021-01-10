import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/SurveyGroups/List';

class List extends Component {
  state = {};

  fetchSurveyGroups = ({ projectId, query }) => {
    const { fetchSurveyGroups } = this.props;

    return fetchSurveyGroups({ projectId, query });
  };

  removeSurveyGroups = ({ projectId, surveyGroupIds }) => {
    const { removeSurveyGroups } = this.props;

    return removeSurveyGroups({ projectId, surveyGroupIds });
  };

  changeStatusOfSurveyGroups = (data) => {
    const { changeStatusOfSurveyGroups } = this.props;

    return changeStatusOfSurveyGroups(data);
  };

  changeSurveyGroupEndDate = (data) => {
    const { changeSurveyGroupEndDate } = this.props;

    return changeSurveyGroupEndDate(data);
  };

  exportDemographicDataForGroups = ({ surveyGroupIds, fields }) => {
    const { exportDemographicDataForGroups } = this.props;
    return exportDemographicDataForGroups({ surveyGroupIds, fields });
  }

  render() {
    const { loading, surveyGroups } = this.props;

    return (
      <Layout
        fetchSurveyGroups={this.fetchSurveyGroups}
        removeSurveyGroups={this.removeSurveyGroups}
        changeStatusOfSurveyGroups={this.changeStatusOfSurveyGroups}
        changeSurveyGroupEndDate={this.changeSurveyGroupEndDate}
        exportDemographicDataForGroups={this.exportDemographicDataForGroups}
        surveyGroups={surveyGroups}
        loading={loading}
      />
    );
  }
}

List.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  removeSurveyGroups: PropTypes.func.isRequired,
  changeSurveyGroupEndDate: PropTypes.func.isRequired,
  changeStatusOfSurveyGroups: PropTypes.func.isRequired,
  surveyGroups: PropTypes.shape({}),
  exportDemographicDataForGroups: PropTypes.func.isRequired,
};

List.defaultProps = {
  surveyGroups: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  surveyGroups: state.projects.surveyGroups || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveyGroups: dispatch.projects.fetchSurveyGroups,
  removeSurveyGroups: dispatch.projects.removeSurveyGroups,
  changeStatusOfSurveyGroups: dispatch.projects.changeStatusOfSurveyGroups,
  changeSurveyGroupEndDate: dispatch.projects.changeSurveyGroupEndDate,
  exportDemographicDataForGroups: dispatch.ratee.exportDemographicDataForGroups,
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
