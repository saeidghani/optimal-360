import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Wizard/SurveyIntro';

class SurveyIntro extends Component {
  state = {};

  fetchSurveyGroups = async (projectId) => {
    const { fetchSurveyGroups } = this.props;

    await fetchSurveyGroups({ projectId });
  };

  fetchSurveyIntro = async (surveyGroupId) => {
    const { fetchSurveyIntro } = this.props;

    await fetchSurveyIntro(surveyGroupId);
  };

  setSurveyIntro = async (data) => {
    const { setSurveyIntro } = this.props;

    await setSurveyIntro(data);
  };

  render() {
    const { loading, surveyGroups, surveyIntro } = this.props;

    return (
      <Layout
        loading={loading}
        surveyGroups={surveyGroups}
        surveyIntro={surveyIntro}
        fetchSurveyGroups={this.fetchSurveyGroups}
        setSurveyIntro={this.setSurveyIntro}
        fetchSurveyIntro={this.fetchSurveyIntro}
      />
    );
  }
}

SurveyIntro.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchSurveyIntro: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  setSurveyIntro: PropTypes.func.isRequired,
  surveyIntro: PropTypes.shape({
    clientPicture: PropTypes.string,
    clientWelcomeMessage: PropTypes.string,
    surveyMessage: PropTypes.string,
  }),
  surveyGroups: PropTypes.shape({}),
};

SurveyIntro.defaultProps = {
  surveyIntro: { clientPicture: '', clientWelcomeMessage: '', surveyMessage: '' },
  surveyGroups: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  surveyIntro: state.wizard?.surveyIntro || {},
  surveyGroups: state.projects?.surveyGroups || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveyGroups: dispatch.projects.fetchSurveyGroups,
  fetchSurveyIntro: dispatch.wizard.fetchSurveyIntro,
  setSurveyIntro: dispatch.wizard.setSurveyIntro,
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyIntro);
