import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Ratee/Ratee';

class Ratee extends Component {
  state = {};

  // Status overview

  fetchCompletionRate = async (query) => {
    const { fetchCompletionRate } = this.props;

    return fetchCompletionRate(query);
  };

  fetchSummary = async (query) => {
    const { fetchSummary } = this.props;

    return fetchSummary(query);
  };

  // Status Details
  fetchStatusDetails = async (query) => {
    const { fetchStatusDetails } = this.props;

    return fetchStatusDetails(query);
  };

// raters email
  fetchRaters = async (query) => {
    const { fetchRaters } = this.props;

    return fetchRaters(query);
  };

  fetchEmailOptions = async (query) => {
    const { fetchEmailOptions } = this.props;

    return fetchEmailOptions(query);
  };

  render() {
    const { loading, summary, completionRate, statusDetails, raters, emailOptions } = this.props;

    return (
      <Layout
        loading={loading}
        summary={summary}
        completionRate={completionRate}
        statusDetails={statusDetails}
        raters={raters}
        emailOptions={emailOptions}
        fetchSummary={this.fetchSummary}
        fetchCompletionRate={this.fetchCompletionRate}
        fetchRaters={this.fetchRaters}
        fetchEmailOptions={this.fetchEmailOptions}
        fetchStatusDetails={this.fetchStatusDetails}
      />
    );
  }
}

Ratee.propTypes = {
  fetchSummary: PropTypes.func.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,
  fetchStatusDetails: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  fetchEmailOptions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  summary: PropTypes.shape({}),
  completionRate: PropTypes.shape({}),
  statusDetails: PropTypes.shape({}),
  raters: PropTypes.shape({}),
  emailOptions: PropTypes.shape({}),
};

Ratee.defaultProps = {
  summary: {},
  completionRate: {},
  statusDetails: {},
  raters: {},
  emailOptions: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  summary: state.ratee?.summary || {},
  completionRate: state.ratee?.completionRate || {},
  statusDetails: state.ratee?.statusDetails || {},
  raters: state.ratee?.raters || {},
  emailOptions: state.ratee?.emailOptions || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchSummary: dispatch.ratee.fetchSummary,
  fetchCompletionRate: dispatch.ratee.fetchCompletionRate,
  fetchStatusDetails: dispatch.ratee.fetchStatusDetails,
  fetchRaters: dispatch.ratee.fetchRaters,
  fetchEmailOptions: dispatch.ratee.fetchEmailOptions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ratee);
