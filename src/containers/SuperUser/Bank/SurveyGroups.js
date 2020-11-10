import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Bank/SurveyGroups';

class SurveyGroups extends React.Component {
  state = {};

  setSurveyGroupInfo = async (surveyGroupId) => {
    const { setSurveyGroupInfo } = this.props;

    await setSurveyGroupInfo(surveyGroupId);
  };

  fetchSurveyGroupInfo = async (projectId) => {
    const { fetchSurveyGroupInfo } = this.props;

    await fetchSurveyGroupInfo({ projectId });
  };

  render() {
    const { loading, surveyGroupInfo } = this.props;

    return (
      <Layout
        surveyGroupInfo={surveyGroupInfo}
        setSurveyGroupInfo={this.setSurveyGroupInfo}
        fetchSurveyGroupInfo={this.fetchSurveyGroupInfo}
        loading={loading}
      />
    );
  }
}

SurveyGroups.propTypes = {
  setSurveyGroupInfo: PropTypes.func.isRequired,
  fetchSurveyGroupInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveyGroupInfo: PropTypes.shape({}),
};

SurveyGroups.defaultProps = {
  surveyGroupInfo: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  surveyGroupInfo: state.bank?.surveyGroupInfo || {},
});

const mapDispatchToProps = (dispatch) => ({
  setSurveyGroupInfo: dispatch.bank.setSurveyGroupInfo,
  fetchSurveyGroupInfo: dispatch.bank.fetchSurveyGroupInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyGroups);
