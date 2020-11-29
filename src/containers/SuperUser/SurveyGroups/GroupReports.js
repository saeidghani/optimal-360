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

  render() {
    const { loading, clusterBenchmarks, competencyBenchmarks } = this.props;

    return (
      <Layout
        loading={loading}
        clusterBenchmarks={clusterBenchmarks}
        competencyBenchmarks={competencyBenchmarks}
        fetchClusterBenchmarks={this.fetchClusterBenchmarks}
        setClusterBenchmarks={this.setClusterBenchmarks}
        fetchCompetencyBenchmarks={this.fetchCompetencyBenchmarks}
        setCompetencyBenchmarks={this.setCompetencyBenchmarks}
      />
    );
  }
}

GroupReports.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchClusterBenchmarks: PropTypes.func.isRequired,
  setClusterBenchmarks: PropTypes.func.isRequired,
  fetchCompetencyBenchmarks: PropTypes.func.isRequired,
  setCompetencyBenchmarks: PropTypes.func.isRequired,
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
  fetchCompetencyBenchmarks: dispatch.projects.fetchCompetencyBenchmarks,
  setCompetencyBenchmarks: dispatch.projects.setCompetencyBenchmarks,
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupReports);
