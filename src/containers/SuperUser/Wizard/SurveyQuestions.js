import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Wizard/SurveyQuestions';

class SurveyQuestions extends React.Component {
  state = {};

  fetchSurveyQuestions = async (surveyGroupId) => {
    const { fetchSurveyQuestions } = this.props;

    await fetchSurveyQuestions(surveyGroupId);
  };

  fetchSurveyGroups = async (projectId) => {
    const { fetchSurveyGroups } = this.props;

    await fetchSurveyGroups({ projectId });
  };

  setSurveyQuestions = async (data) => {
    const { setSurveyQuestions } = this.props;

    return setSurveyQuestions(data);
  };

  render() {
    const { loading, surveyQuestions, surveyGroups } = this.props;

    return (
      <Layout
        surveyQuestions={surveyQuestions}
        surveyGroups={surveyGroups}
        fetchSurveyQuestions={this.fetchSurveyQuestions}
        fetchSurveyGroups={this.fetchSurveyGroups}
        setSurveyQuestions={this.setSurveyQuestions}
        loading={loading}
      />
    );
  }
}

SurveyQuestions.propTypes = {
  fetchSurveyQuestions: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  setSurveyQuestions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveyQuestions: PropTypes.shape({}),
  surveyGroups: PropTypes.shape({}),
};

SurveyQuestions.defaultProps = {
  surveyQuestions: {},
  surveyGroups: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  surveyQuestions: state.wizard?.surveyQuestions || {},
  surveyGroups: state.projects?.surveyGroups || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveyQuestions: dispatch.wizard.fetchSurveyQuestions,
  setSurveyQuestions: dispatch.wizard.setSurveyQuestions,
  fetchSurveyGroups: dispatch.projects.fetchSurveyGroups,
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyQuestions);
