import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/SurveyGroups/GroupReports';

class GroupReports extends Component {
  state = {};

  fetchClusterBenchmarks = (surveyGroupId) => {
    const { fetchClusterBenchmarks } = this.props;

    return fetchClusterBenchmarks(surveyGroupId);
  };

  fetchCompetencyBenchmarks = (surveyGroupId) => {
    const { fetchCompetencyBenchmarks } = this.props;

    return fetchCompetencyBenchmarks(surveyGroupId);
  };

  setClusterBenchmarks = (data) => {
    const { setClusterBenchmarks } = this.props;

    return setClusterBenchmarks(data);
  };

  setCompetencyBenchmarks = (data) => {
    const { setCompetencyBenchmarks } = this.props;

    return setCompetencyBenchmarks(data);
  };

  importClusterBenchmark = (file) => {
    const { importClusterBenchmark } = this.props;

    return importClusterBenchmark(file);
  };

  importCompetencyBenchmark = (file) => {
    const { importCompetencyBenchmark } = this.props;

    return importCompetencyBenchmark(file);
  };

  exportClusterBenchmark = (surveyGroupId) => {
    const { exportClusterBenchmark } = this.props;

    return exportClusterBenchmark(surveyGroupId);
  };

  exportCompetencyBenchmark = (surveyGroupId) => {
    const { exportCompetencyBenchmark } = this.props;

    return exportCompetencyBenchmark(surveyGroupId);
  };

  render() {
    const { loading, clusterBenchmarks, competencyBenchmarks } = this.props;

    return (
      <Layout
        loading={loading}
        clusterBenchmarks={clusterBenchmarks}
        competencyBenchmarks={competencyBenchmarks}
        fetchClusterBenchmarks={this.fetchClusterBenchmarks}
        setClusterBenchmarks={this.setClusterBenchmarks}
        importClusterBenchmark={this.importClusterBenchmark}
        exportClusterBenchmark={this.exportClusterBenchmark}
        fetchCompetencyBenchmarks={this.fetchCompetencyBenchmarks}
        setCompetencyBenchmarks={this.setCompetencyBenchmarks}
        importCompetencyBenchmark={this.importCompetencyBenchmark}
        exportCompetencyBenchmark={this.exportCompetencyBenchmark}
      />
    );
  }
}

GroupReports.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchClusterBenchmarks: PropTypes.func.isRequired,
  setClusterBenchmarks: PropTypes.func.isRequired,
  importClusterBenchmark: PropTypes.func.isRequired,
  exportClusterBenchmark: PropTypes.func.isRequired,
  fetchCompetencyBenchmarks: PropTypes.func.isRequired,
  setCompetencyBenchmarks: PropTypes.func.isRequired,
  importCompetencyBenchmark: PropTypes.func.isRequired,
  exportCompetencyBenchmark: PropTypes.func.isRequired,
  clusterBenchmarks: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  competencyBenchmarks: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
};

GroupReports.defaultProps = {
  clusterBenchmarks: {},
  competencyBenchmarks: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  clusterBenchmarks: state.projects.clusterBenchmarks || {},
  competencyBenchmarks: state.projects.competencyBenchmarks || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchClusterBenchmarks: dispatch.projects.fetchClusterBenchmarks,
  setClusterBenchmarks: dispatch.projects.setClusterBenchmarks,
  importClusterBenchmark: dispatch.projects.importClusterBenchmark,
  exportClusterBenchmark: dispatch.projects.exportClusterBenchmark,
  fetchCompetencyBenchmarks: dispatch.projects.fetchCompetencyBenchmarks,
  setCompetencyBenchmarks: dispatch.projects.setCompetencyBenchmarks,
  importCompetencyBenchmark: dispatch.projects.importCompetencyBenchmark,
  exportCompetencyBenchmark: dispatch.projects.exportCompetencyBenchmark,
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupReports);
