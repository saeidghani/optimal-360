import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Wizard/SurveySetting';

class SurveySetting extends Component {
  state = {};

  fetchSurveySettings = async (surveyGroupId) => {
    const { fetchSurveySettings } = this.props;

    await fetchSurveySettings(surveyGroupId);
  };

  fetchSurveyGroups = async (projectId) => {
    const { fetchSurveyGroups } = this.props;

    await fetchSurveyGroups({ projectId });
  };

  setSurveySettings = async (data) => {
    const newData = { ...data };

    newData.raterGroups = newData.raterGroups.map((el) => {
      if (el.newlyAddedItem) {
        const newRaterGroupItem = { ...el };

        delete newRaterGroupItem.newlyAddedItem;
        delete newRaterGroupItem.id;

        return newRaterGroupItem;
      }

      return el;
    });

    const { setSurveySettings } = this.props;

    return setSurveySettings(newData);
  };

  render() {
    const { loading, surveySettings, surveyGroups } = this.props;

    return (
      <Layout
        surveySettings={surveySettings}
        surveyGroups={surveyGroups}
        fetchSurveySettings={this.fetchSurveySettings}
        fetchSurveyGroups={this.fetchSurveyGroups}
        setSurveySettings={this.setSurveySettings}
        loading={loading}
      />
    );
  }
}

SurveySetting.propTypes = {
  fetchSurveySettings: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  setSurveySettings: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveySettings: PropTypes.shape({}),
  surveyGroups: PropTypes.shape({}),
};

SurveySetting.defaultProps = {
  surveySettings: {},
  surveyGroups: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  surveySettings: state.wizard?.surveySettings || {},
  surveyGroups: state.projects?.surveyGroups || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveySettings: dispatch.wizard.fetchSurveySettings,
  setSurveySettings: dispatch.wizard.setSurveySettings,
  fetchSurveyGroups: dispatch.projects.fetchSurveyGroups,
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveySetting);
