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

  setSurveyQuestions = async (data) => {
    const { setSurveyQuestions } = this.props;

    // removeing fake ids that are created in front-end
    const newClusters = [...data.clusters].map((cluster) => {
      const newCluster = { ...cluster };

      if (newCluster.newAddedItem) {
        delete newCluster.newAddedItem;
        delete newCluster.id;
      }

      delete newCluster.index;

      newCluster.competencies = newCluster.competencies.map((competency) => {
        const newCompetency = { ...competency };

        if (newCompetency.newAddedItem) {
          delete newCompetency.newAddedItem;
          delete newCompetency.id;
        }

        delete newCompetency.index;

        newCompetency.questions = newCompetency.questions.map((question) => {
          const newQuestion = { ...question };

          if (newQuestion.newAddedItem) {
            delete newQuestion.newAddedItem;
            delete newQuestion.id;
          }

          delete newQuestion.index;

          return newQuestion;
        });

        return newCompetency;
      });

      return newCluster;
    });

    const newFeedbacks = [...data.feedbacks].map((feedback) => {
      const newFeedback = { ...feedback };

      if (newFeedback.newAddedItem) {
        delete newFeedback.newAddedItem;
        delete newFeedback.id;
      }

      delete newFeedback.index;

      return newFeedback;
    });

    const newData = { ...data, clusters: newClusters, feedbacks: newFeedbacks };

    return setSurveyQuestions(newData);
  };

  render() {
    const { loading, surveyQuestions } = this.props;

    return (
      <Layout
        surveyQuestions={surveyQuestions}
        fetchSurveyQuestions={this.fetchSurveyQuestions}
        setSurveyQuestions={this.setSurveyQuestions}
        loading={loading}
      />
    );
  }
}

SurveyQuestions.propTypes = {
  fetchSurveyQuestions: PropTypes.func.isRequired,
  setSurveyQuestions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveyQuestions: PropTypes.shape({}),
};

SurveyQuestions.defaultProps = {
  surveyQuestions: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  surveyQuestions: state.wizard?.surveyQuestions || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveyQuestions: dispatch.wizard.fetchSurveyQuestions,
  setSurveyQuestions: dispatch.wizard.setSurveyQuestions,
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyQuestions);
