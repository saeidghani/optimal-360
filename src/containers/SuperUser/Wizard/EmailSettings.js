import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Wizard/EmailSettings';

class EmailSettings extends React.Component {
  state = {};

  fetchEmailSettings = (surveyGroupId) => {
    const { fetchEmailSettings } = this.props;

    return fetchEmailSettings(surveyGroupId);
  };

  fetchSurveyGroups = (projectId) => {
    const { fetchSurveyGroups } = this.props;

    return fetchSurveyGroups({ projectId });
  };

  setEmailSettings = (data) => {
    const { setEmailSettings } = this.props;

    return setEmailSettings(data);
  };

  setEmailSettingsData = (data) => {
    const { setEmailSettingsData } = this.props;

    return setEmailSettingsData(data);
  };

  render() {
    const { loading, emailSettings, surveyGroups } = this.props;

    return (
      <Layout
        emailSettings={emailSettings}
        surveyGroups={surveyGroups}
        fetchEmailSettings={this.fetchEmailSettings}
        fetchSurveyGroups={this.fetchSurveyGroups}
        setEmailSettings={this.setEmailSettings}
        setEmailSettingsData={this.setEmailSettingsData}
        loading={loading}
      />
    );
  }
}

EmailSettings.propTypes = {
  fetchEmailSettings: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  setEmailSettings: PropTypes.func.isRequired,
  setEmailSettingsData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  emailSettings: PropTypes.shape({}),
  surveyGroups: PropTypes.shape({}),
};

EmailSettings.defaultProps = {
  emailSettings: {},
  surveyGroups: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  emailSettings: state.wizard?.emailSettings || {},
  surveyGroups: state.projects?.surveyGroups || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmailSettings: dispatch.wizard.fetchEmailSettings,
  setEmailSettings: dispatch.wizard.setEmailSettings,
  setEmailSettingsData: dispatch.wizard.setEmailSettingsData,
  fetchSurveyGroups: dispatch.projects.fetchSurveyGroups,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailSettings);
