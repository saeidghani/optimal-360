import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/SurveyPlatform/Dashboard/Dashboard';

class Dashboard extends Component {
  state = {};

  fetchProjects = async (query) => {
    const { fetchProjects } = this.props;

    return fetchProjects(query);
  };

  fetchInfo = async (surveyGroupId) => {
    const { fetchInfo } = this.props;

    return fetchInfo(surveyGroupId);
  };

  fetchRelations = async (surveyGroupId) => {
    const { fetchRelations } = this.props;

    return fetchRelations(surveyGroupId);
  };

  fetchQuestions = async (surveyGroupId) => {
    const { fetchQuestions } = this.props;

    return fetchQuestions(surveyGroupId);
  };

  postQuestionResponses = async (data) => {
    const { postQuestionResponses } = this.props;

    return postQuestionResponses(data);
  };

  fetchFeedbacks = async (surveyGroupId) => {
    const { fetchFeedbacks } = this.props;

    return fetchFeedbacks(surveyGroupId);
  };

  postFeedbackResponses = async (data) => {
    const { postFeedbackResponses } = this.props;

    return postFeedbackResponses(data);
  };

  render() {
    const { loading, projects, info, relations, questions, feedbacks } = this.props;

    return (
      <Layout
        loading={loading}
        fetchProjects={this.fetchProjects}
        fetchInfo={this.fetchInfo}
        fetchRelations={this.fetchRelations}
        fetchQuestions={this.fetchQuestions}
        fetchFeedbacks={this.fetchFeedbacks}
        postQuestionResponses={this.postQuestionResponses}
        postFeedbackResponses={this.postFeedbackResponses}
        projects={projects}
        info={info}
        relations={relations}
        questions={questions}
        feedbacks={feedbacks}
      />
    );
  }
}

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchInfo: PropTypes.func.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  fetchFeedbacks: PropTypes.func.isRequired,
  postQuestionResponses: PropTypes.func.isRequired,
  postFeedbackResponses: PropTypes.func.isRequired,
  projects: PropTypes.shape({}),
  info: PropTypes.shape({}),
  relations: PropTypes.shape({}),
  questions: PropTypes.shape({}),
  feedbacks: PropTypes.shape({}),
};

Dashboard.defaultProps = {
  projects: {},
  info: {},
  relations: {},
  questions: {},
  feedbacks: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  projects: state.surveyPlatform?.projects || {},
  info: state.surveyPlatform?.info || {},
  relations: state.surveyPlatform?.relations || {},
  questions: state.surveyPlatform?.questions || {},
  feedbacks: state.surveyPlatform?.feedbacks || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchProjects: dispatch.surveyPlatform?.fetchProjects,
  fetchInfo: dispatch.surveyPlatform?.fetchInfo,
  fetchRelations: dispatch.surveyPlatform?.fetchRelations,
  fetchQuestions: dispatch.surveyPlatform?.fetchQuestions,
  fetchFeedbacks: dispatch.surveyPlatform?.fetchFeedbacks,
  postQuestionResponses: dispatch.surveyPlatform?.postQuestionResponses,
  postFeedbackResponses: dispatch.surveyPlatform?.postFeedbackResponses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
