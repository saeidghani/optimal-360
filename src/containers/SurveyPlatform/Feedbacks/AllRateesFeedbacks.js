import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SurveyPlatform/Feedbacks/AllRateesFeedbacks';

class AllRateesFeedbacks extends Component {
  state = {};

  fetchFeedbacks = async (query) => {
    const { fetchFeedbacks } = this.props;

    return fetchFeedbacks(query);
  };

  fetchRelations = async (query) => {
    const { fetchRelations } = this.props;

    return fetchRelations(query);
  };

  addFeedbackResponses = async (data) => {
    const { addFeedbackResponses } = this.props;

    return addFeedbackResponses(data);
  };

  render() {
    const { loading, profileName, questions, feedbacks, relations } = this.props;

    return (
      <Layout
        loading={loading}
        fetchRelations={this.fetchRelations}
        fetchFeedbacks={this.fetchFeedbacks}
        addFeedbackResponses={this.addFeedbackResponses}
        questions={questions}
        relations={relations}
        feedbacks={feedbacks}
        profileName={profileName}
      />
    );
  }
}

AllRateesFeedbacks.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchFeedbacks: PropTypes.func.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  addFeedbackResponses: PropTypes.func.isRequired,
  questions: PropTypes.shape({}),
  feedbacks: PropTypes.shape({}),
  relations: PropTypes.shape({}),
  profileName: PropTypes.string,
};

AllRateesFeedbacks.defaultProps = {
  questions: {},
  feedbacks: {},
  relations: {},
  profileName: '',
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  questions: state.surveyPlatform?.questions || {},
  feedbacks: state.surveyPlatform?.feedbacks || {},
  relations: state.surveyPlatform?.relations || {},
  profileName: state.surveyPlatform?.profile?.data?.name || '',
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeedbacks: dispatch.surveyPlatform?.fetchFeedbacks,
  fetchRelations: dispatch.surveyPlatform?.fetchRelations,
  addFeedbackResponses: dispatch.surveyPlatform?.addFeedbackResponses,
});

export default connect(mapStateToProps, mapDispatchToProps)(AllRateesFeedbacks);
