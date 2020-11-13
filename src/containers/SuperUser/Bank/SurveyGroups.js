import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Bank/SurveyGroups';

class SurveyGroups extends React.Component {
  state = {};

  fetchSurveyGroupInfo = async (surveyGroupId) => {
    const { fetchSurveyGroupInfo } = this.props;

    return fetchSurveyGroupInfo(surveyGroupId);
  };

  formatData = (data) => {
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

    return { ...data, clusters: newClusters, feedbacks: newFeedbacks };
  };

  setSurveyGroupInfo = async (data) => {
    const { setSurveyGroupInfo } = this.props;

    const newData = this.formatData(data);

    return setSurveyGroupInfo(newData);
  };

  addSurveyGroup = async (data) => {
    const { addSurveyGroup } = this.props;

    const newData = this.formatData(data);

    return addSurveyGroup(newData);
  };

  fetchSurveyGroups = async (query) => {
    const { fetchSurveyGroups } = this.props;

    return fetchSurveyGroups(query);
  };

  render() {
    const { loading, surveyGroups, surveyGroupInfo } = this.props;

    return (
      <Layout
        fetchSurveyGroups={this.fetchSurveyGroups}
        surveyGroups={surveyGroups}
        surveyGroupInfo={surveyGroupInfo}
        setSurveyGroupInfo={this.setSurveyGroupInfo}
        addSurveyGroup={this.addSurveyGroup}
        fetchSurveyGroupInfo={this.fetchSurveyGroupInfo}
        loading={loading}
      />
    );
  }
}

SurveyGroups.propTypes = {
  fetchSurveyGroups: PropTypes.func.isRequired,
  setSurveyGroupInfo: PropTypes.func.isRequired,
  fetchSurveyGroupInfo: PropTypes.func.isRequired,
  addSurveyGroup: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveyGroupInfo: PropTypes.shape({}),
  surveyGroups: PropTypes.shape({}),
};

SurveyGroups.defaultProps = {
  surveyGroupInfo: {},
  surveyGroups: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  surveyGroupInfo: state.bank?.surveyGroupInfo || {},
  surveyGroups: state.bank?.surveyGroups || {},
});

const mapDispatchToProps = (dispatch) => ({
  setSurveyGroupInfo: dispatch.bank.setSurveyGroupInfo,
  fetchSurveyGroupInfo: dispatch.bank.fetchSurveyGroupInfo,
  fetchSurveyGroups: dispatch.bank.fetchSurveyGroups,
  addSurveyGroup: dispatch.bank.addSurveyGroup,
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyGroups);
