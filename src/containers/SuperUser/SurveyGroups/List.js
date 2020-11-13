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

  render() {
    const { loading, surveyGroups } = this.props;

    return (
      <Layout
        fetchSurveyGroups={this.fetchSurveyGroups}
        surveyGroups={surveyGroups}
        removeSurveyGroups={this.removeSurveyGroups}
        loading={loading}
      />
    );
  }
}

List.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  removeSurveyGroups: PropTypes.func.isRequired,
  surveyGroups: PropTypes.shape({}),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
