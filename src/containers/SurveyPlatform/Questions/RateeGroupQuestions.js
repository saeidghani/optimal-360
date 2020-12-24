import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SurveyPlatform/Questions/RateeGroupQuestions';

class RateeGroupQuestions extends Component {
  state = {};

  fetchQuestions = async (query) => {
    const { fetchQuestions } = this.props;

    return fetchQuestions(query);
  };

  fetchRelations = async (query) => {
    const { fetchRelations } = this.props;

    return fetchRelations(query);
  };

  addQuestionResponses = async (data) => {
    const { addQuestionResponses } = this.props;

    return addQuestionResponses(data);
  };

  render() {
    const { loading, profileName, questions, relations, organization } = this.props;

    return (
      <Layout
        loading={loading}
        fetchQuestions={this.fetchQuestions}
        fetchRelations={this.fetchRelations}
        addQuestionResponses={this.addQuestionResponses}
        questions={questions}
        relations={relations}
        profileName={profileName}
        organization={organization}
      />
    );
  }
}

RateeGroupQuestions.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  addQuestionResponses: PropTypes.func.isRequired,
  questions: PropTypes.shape({}),
  relations: PropTypes.shape({}),
  profileName: PropTypes.string,
  organization: PropTypes.shape({}),
};

RateeGroupQuestions.defaultProps = {
  questions: {},
  relations: {},
  profileName: '',
  organization: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  questions: state.surveyPlatform?.questions || {},
  relations: state.surveyPlatform?.relations || {},
  profileName: state.surveyPlatform?.profile?.data?.name || '',
  organization: state.surveyPlatform?.organization || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: dispatch.surveyPlatform?.fetchQuestions,
  addQuestionResponses: dispatch.surveyPlatform?.addQuestionResponses,
  fetchRelations: dispatch.surveyPlatform?.fetchRelations,
});

export default connect(mapStateToProps, mapDispatchToProps)(RateeGroupQuestions);
