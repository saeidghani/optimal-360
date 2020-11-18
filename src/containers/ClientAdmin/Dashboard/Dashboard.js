import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/ClientAdmin/Dashboard/Dashboard';

class Dashboard extends Component {
  state = {};

  fetchProjects = async (query) => {
    const { fetchProjects } = this.props;

    return fetchProjects(query);
  };

  fetchCompletionRate = async (surveyGroupId) => {
    const { fetchCompletionRate } = this.props;

    return fetchCompletionRate(surveyGroupId);
  };

  render() {
    const { loading, completionRate, projects } = this.props;

    return (
      <Layout
        loading={loading}
        completionRate={completionRate}
        fetchCompletionRate={this.fetchCompletionRate}
        fetchProjects={this.fetchProjects}
        projects={projects}
      />
    );
  }
}

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  completionRate: PropTypes.shape({}),
  projects: PropTypes.shape({}),
};

Dashboard.defaultProps = {
  completionRate: {},
  projects: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  completionRate: state.clientAdmin?.completionRate || {},
  projects: state.clientAdmin?.projects || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompletionRate: dispatch.clientAdmin?.fetchCompletionRate,
  fetchProjects: dispatch.clientAdmin?.fetchProjects,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
