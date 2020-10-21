import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Wizard/EmailTemplate';

class ProjectInfo extends Component {
  state = {};

  fetchSingleProject = async (projectId) => {
    const { fetchSingleProject } = this.props;

    await fetchSingleProject(projectId);
  };

  render() {
    const { loading, singleProject, selectedTemplate } = this.props;

    return (
      <Layout
        loading={loading}
        fetchSingleProject={this.fetchSingleProject}
        singleProject={singleProject}
        selectedTemplate={selectedTemplate}
      />
    );
  }
}

ProjectInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  selectedTemplate: PropTypes.string,
  fetchSingleProject: PropTypes.func.isRequired,
  singleProject: PropTypes.shape({}),
};

ProjectInfo.defaultProps = {
  singleProject: {},
  selectedTemplate: '',
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  singleProject: state.projects?.project || {},
  selectedTemplate: state.wizard?.selectedTemplate || '',
});

const mapDispatchToProps = (dispatch) => ({
  fetchSingleProject: dispatch.projects.fetchSingleProject,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);
