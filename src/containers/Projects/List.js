import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Projects/List';

class ActiveProjects extends Component {
  state = {};

  duplicateProject = async (id) => {
    const { duplicateProject } = this.props;

    await duplicateProject(id);
  };

  removeProjects = async (projectIds) => {
    const { removeProjects } = this.props;

    await removeProjects({ projectIds });
  };

  changeStatusOfProjects = async (projectIds, status) => {
    const { changeStatusOfProjects } = this.props;

    await changeStatusOfProjects({ projectIds, status });
  };

  render() {
    const { loading } = this.props;

    return (
      <Layout
        removeProjects={this.removeProjects}
        changeStatusOfProjects={this.changeStatusOfProjects}
        duplicateProject={this.duplicateProject}
        loading={loading}
      />
    );
  }
}

ActiveProjects.propTypes = {
  duplicateProject: PropTypes.func.isRequired,
  removeProjects: PropTypes.func.isRequired,
  changeStatusOfProjects: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({
  duplicateProject: dispatch.projects.duplicateProject,
  removeProjects: dispatch.projects.removeProjects,
  changeStatusOfProjects: dispatch.projects.changeStatusOfProjects,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveProjects);
