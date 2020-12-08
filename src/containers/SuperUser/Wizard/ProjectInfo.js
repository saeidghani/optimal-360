import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Wizard/ProjectInfo';

class ProjectInfo extends Component {
  state = {};

  fetchOrganizations = (query = '') => {
    const { fetchOrganizations } = this.props;

    return fetchOrganizations(query);
  };

  createProject = async (data) => {
    const { createProject } = this.props;

    const res = await createProject(data);
    return res?.data?.data;
  };

  fetchSurveyGroups = (query = '') => {
    const { fetchSurveyGroups } = this.props;

    return fetchSurveyGroups(query);
  };

  fetchSingleProject = (projectId) => {
    const { fetchSingleProject } = this.props;

    return fetchSingleProject(projectId);
  };

  render() {
    const { loading, project, organizations, surveyGroups } = this.props;

    return (
      <Layout
        fetchOrganizations={this.fetchOrganizations}
        fetchSurveyGroups={this.fetchSurveyGroups}
        createProject={this.createProject}
        fetchSingleProject={this.fetchSingleProject}
        organizations={organizations}
        surveyGroups={surveyGroups}
        project={project}
        loading={loading}
      />
    );
  }
}

ProjectInfo.propTypes = {
  fetchOrganizations: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  fetchSingleProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  surveyGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  project: PropTypes.shape({}),
};

ProjectInfo.defaultProps = {
  organizations: {
    data: [],
  },
  surveyGroups: {
    data: [],
  },
  project: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  organizations: state.organizations.organizations || {},
  surveyGroups: state.bank.surveyGroups || {},
  project: state.projects.project || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrganizations: dispatch.organizations.fetchOrganizations,
  fetchSurveyGroups: dispatch.bank.fetchSurveyGroups,
  createProject: dispatch.wizard.createProject,
  fetchSingleProject: dispatch.projects.fetchSingleProject,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);
