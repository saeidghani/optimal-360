import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Wizard/EditProject';

class EditProject extends Component {
  state = {};

  fetchSingleProject = (data) => {
    const { fetchSingleProject } = this.props;

    return fetchSingleProject(data);
  };

  editProject = (data) => {
    const { editProject } = this.props;

    return editProject(data);
  };

  fetchSurveyGroups = async (query = '') => {
    const { fetchSurveyGroups } = this.props;

    await fetchSurveyGroups(query);
  };

  render() {
    const { loading, project, surveyGroups } = this.props;

    return (
      <Layout
        project={project}
        fetchSingleProject={this.fetchSingleProject}
        fetchSurveyGroups={this.fetchSurveyGroups}
        editProject={this.editProject}
        surveyGroups={surveyGroups}
        loading={loading}
      />
    );
  }
}

EditProject.propTypes = {
  fetchSurveyGroups: PropTypes.func.isRequired,
  fetchSingleProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveyGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  project: PropTypes.shape({}),
};

EditProject.defaultProps = {
  surveyGroups: {
    data: [],
  },
  project: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  surveyGroups: state.bank.surveyGroups || {},
  project: state.projects.project || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveyGroups: dispatch.bank.fetchSurveyGroups,
  fetchSingleProject: dispatch.projects.fetchSingleProject,
  editProject: dispatch.wizard.editProject,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
