import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Wizard/EditProject';

class EditProject extends Component {
  state = {};

  fetchProject = (data) => {
    const { fetchProject } = this.props;

    return fetchProject(data);
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
        fetchProject={this.fetchProject}
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
  fetchProject: PropTypes.func.isRequired,
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
  project: state.wizard.project || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveyGroups: dispatch.bank.fetchSurveyGroups,
  fetchProject: dispatch.wizard.fetchProject,
  editProject: dispatch.wizard.editProject,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
