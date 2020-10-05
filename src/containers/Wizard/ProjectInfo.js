import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Wizard/ProjectInfo';

class ProjectInfo extends Component {
  state = {};

  fetchOrganizations = async (query = '') => {
    const { fetchOrganizations } = this.props;

    await fetchOrganizations(query);
  };

  createProjectForOrganization = async (data) => {
    const { createProjectForOrganization } = this.props;

    console.log({ data });
    await createProjectForOrganization(data);
  };

  fetchSurveyGroups = async (query = '') => {
    const { fetchSurveyGroups } = this.props;

    await fetchSurveyGroups(query);
  };

  render() {
    const { loading, organizations, surveyGroups } = this.props;

    return (
      <Layout
        fetchOrganizations={this.fetchOrganizations}
        fetchSurveyGroups={this.fetchSurveyGroups}
        createProjectForOrganization={this.createProjectForOrganization}
        organizations={organizations}
        surveyGroups={surveyGroups}
        loading={loading}
      />
    );
  }
}

ProjectInfo.propTypes = {
  fetchOrganizations: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  createProjectForOrganization: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  surveyGroups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  organizations: state.organizations.organizations || [],
  surveyGroups: state.bank.surveyGroups || [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrganizations: dispatch.organizations.fetchOrganizations,
  fetchSurveyGroups: dispatch.bank.fetchSurveyGroups,
  createProjectForOrganization: dispatch.organizations.createProjectForOrganization,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);
