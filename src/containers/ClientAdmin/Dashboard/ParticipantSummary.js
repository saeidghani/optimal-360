import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/ClientAdmin/Dashboard/TopLeadership/ParticipantSummary';

class ParticipantSummary extends Component {
  state = {};

  fetchSummary = async (surveyGroupId) => {
    const { fetchSummary } = this.props;

    return fetchSummary(surveyGroupId);
  };

  render() {
    const { loading, summary } = this.props;

    return <Layout loading={loading} fetchSummary={this.fetchSummary} summary={summary} />;
  }
}

ParticipantSummary.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  summary: PropTypes.shape({}),
};

ParticipantSummary.defaultProps = {
  summary: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  summary: state.clientAdmin?.summary || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchSummary: dispatch.clientAdmin?.fetchSummary || {},
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantSummary);
