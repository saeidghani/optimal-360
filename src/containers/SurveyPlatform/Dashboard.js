import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/SurveyPlatform/Dashboard/Dashboard';

class Dashboard extends Component {
  state = {};

  fetchProjects = async (query) => {
    const { fetchProjects } = this.props;

    return fetchProjects(query);
  };

  fetchInfo = async (surveyGroupId) => {
    const { fetchInfo } = this.props;

    return fetchInfo(surveyGroupId);
  };

  fetchRelations = async (surveyGroupId) => {
    const { fetchRelations } = this.props;

    return fetchRelations(surveyGroupId);
  };

  submitResponses = async (surveyGroupId) => {
    const { submitResponses } = this.props;

    return submitResponses(surveyGroupId);
  };

  render() {
    const { loading, profileName, projects, info, relations, organization } = this.props;

    return (
      <Layout
        loading={loading}
        fetchProjects={this.fetchProjects}
        fetchInfo={this.fetchInfo}
        fetchRelations={this.fetchRelations}
        organization={organization}
        submitResponses={this.submitResponses}
        projects={projects}
        info={info}
        relations={relations}
        profileName={profileName}
      />
    );
  }
}

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchInfo: PropTypes.func.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  submitResponses: PropTypes.func.isRequired,
  projects: PropTypes.shape({}),
  info: PropTypes.shape({}),
  relations: PropTypes.shape({}),
  organization: PropTypes.shape({}),
  profileName: PropTypes.string,
};

Dashboard.defaultProps = {
  projects: {},
  info: {},
  relations: {},
  organization: {},
  profileName: '',
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  projects: state.surveyPlatform?.projects || {},
  info: state.surveyPlatform?.info || {},
  relations: state.surveyPlatform?.relations || {},
  profileName: state.surveyPlatform?.profile?.data?.name || '',
  organization: state.surveyPlatform?.organization || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchProjects: dispatch.surveyPlatform?.fetchProjects,
  fetchInfo: dispatch.surveyPlatform?.fetchInfo,
  fetchRelations: dispatch.surveyPlatform?.fetchRelations,
  submitResponses: dispatch.surveyPlatform?.submitResponses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
