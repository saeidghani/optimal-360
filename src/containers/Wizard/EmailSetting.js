import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Wizard/EmailSetting';

class EmailSetting extends React.Component {
  state = {};

  fetchEmailSettings = async (surveyGroupId) => {
    const { fetchEmailSettings } = this.props;

    await fetchEmailSettings(surveyGroupId);
  };

  fetchSurveyGroups = async (projectId) => {
    const { fetchSurveyGroups } = this.props;

    await fetchSurveyGroups({ projectId });
  };

  setEmailSettings = async (data) => {
    const { setEmailSettings } = this.props;

    return setEmailSettings(data);
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
        loading={loading}
      />
    );
  }
}

EmailSetting.propTypes = {
  fetchEmailSettings: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  setEmailSettings: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  emailSettings: PropTypes.shape({}),
  surveyGroups: PropTypes.shape({}),
};

EmailSetting.defaultProps = {
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
  fetchSurveyGroups: dispatch.projects.fetchSurveyGroups,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailSetting);
