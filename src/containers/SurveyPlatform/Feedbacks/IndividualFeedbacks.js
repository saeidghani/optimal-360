import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SurveyPlatform/Feedbacks/IndividualFeedbacks';

class IndividualFeedbacks extends Component {
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
    const { loading, feedbacks, relations } = this.props;

    return (
      <Layout
        loading={loading}
        fetchRelations={this.fetchRelations}
        fetchFeedbacks={this.fetchFeedbacks}
        addFeedbackResponses={this.addFeedbackResponses}
        relations={relations}
        feedbacks={feedbacks}
      />
    );
  }
}

IndividualFeedbacks.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchFeedbacks: PropTypes.func.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  addFeedbackResponses: PropTypes.func.isRequired,
  feedbacks: PropTypes.shape({}),
  relations: PropTypes.shape({}),
};

IndividualFeedbacks.defaultProps = {
  feedbacks: {},
  relations: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  feedbacks: state.surveyPlatform?.feedbacks || {},
  relations: state.surveyPlatform?.relations || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeedbacks: dispatch.surveyPlatform?.fetchFeedbacks,
  fetchRelations: dispatch.surveyPlatform?.fetchRelations,
  addFeedbackResponses: dispatch.surveyPlatform?.addFeedbackResponses,
});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualFeedbacks);
