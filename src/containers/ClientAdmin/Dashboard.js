import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/ClientAdmin/Dashboard/Dashboard';

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

  fetchRaterGroups = async (surveyGroupId) => {
    const { fetchRaterGroups } = this.props;

    return fetchRaterGroups(surveyGroupId);
  };

  fetchSummary = async (surveyGroupId) => {
    const { fetchSummary } = this.props;

    return fetchSummary(surveyGroupId);
  };

  fetchRatees = async (surveyGroupId) => {
    const { fetchRatees } = this.props;

    return fetchRatees(surveyGroupId);
  };

  fetchRaters = async (surveyGroupId) => {
    const { fetchRaters } = this.props;

    return fetchRaters(surveyGroupId);
  };

  render() {
    const { loading, projects, completionRate, raterGroups, summary, ratees, raters } = this.props;

    return (
      <Layout
        loading={loading}
        completionRate={completionRate}
        fetchProjects={this.fetchProjects}
        fetchCompletionRate={this.fetchCompletionRate}
        fetchRaterGroups={this.fetchRaterGroups}
        fetchSummary={this.fetchSummary}
        fetchRatees={this.fetchRatees}
        fetchRaters={this.fetchRaters}
        projects={projects}
        raterGroups={raterGroups}
        summary={summary}
        ratees={ratees}
        raters={raters}
      />
    );
  }
}

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,
  fetchRaterGroups: PropTypes.func.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  fetchRatees: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  projects: PropTypes.shape({}),
  completionRate: PropTypes.shape({}),
  raterGroups: PropTypes.shape({}),
  summary: PropTypes.shape({}),
  ratees: PropTypes.shape({}),
  raters: PropTypes.shape({}),
};

Dashboard.defaultProps = {
  projects: {},
  completionRate: {},
  raterGroups: {},
  summary: {},
  ratees: {},
  raters: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  projects: state.clientAdmin?.projects || {},
  completionRate: state.clientAdmin?.completionRate || {},
  raterGroups: state.clientAdmin?.raterGroups || {},
  summary: state.clientAdmin?.summary || {},
  ratees: state.clientAdmin?.ratees || {},
  raters: state.clientAdmin?.raters || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchProjects: dispatch.clientAdmin?.fetchProjects,
  fetchCompletionRate: dispatch.clientAdmin?.fetchCompletionRate,
  fetchRaterGroups: dispatch.clientAdmin?.fetchRaterGroups,
  fetchSummary: dispatch.clientAdmin?.fetchSummary,
  fetchRatees: dispatch.clientAdmin?.fetchRatees,
  fetchRaters: dispatch.clientAdmin?.fetchRaters,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
