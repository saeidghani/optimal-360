import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/ClientAdmin/Dashboard';

class Dashboard extends Component {
  state = {};

  fetchCompletionRate = async (surveyGroupId) => {
    const { fetchCompletionRate } = this.props;

    return fetchCompletionRate(surveyGroupId);
  };

  render() {
    const { loading, completionRate } = this.props;

    return (
      <Layout
        loading={loading}
        completionRate={completionRate}
        fetchCompletionRate={this.fetchCompletionRate}
      />
    );
  }
}

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,
  completionRate: PropTypes.shape({}),
};

Dashboard.defaultProps = {
  completionRate: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  completionRate: state.clientAdmin?.completionRate || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompletionRate: dispatch.clientAdmin?.fetchCompletionRate || {},
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
