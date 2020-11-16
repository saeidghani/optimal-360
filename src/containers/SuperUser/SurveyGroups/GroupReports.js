import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/SurveyGroups/GroupReports';

class GroupReports extends Component {
  state = {};

  fetchGroupReports = (projectId) => {
    const { fetchGroupReports } = this.props;

    return fetchGroupReports(projectId);
  };

  render() {
    const { loading, groupReports } = this.props;

    return (
      <Layout
        loading={loading}
        groupReports={groupReports}
        fetchGroupReports={this.fetchGroupReports}
      />
    );
  }
}

GroupReports.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchGroupReports: PropTypes.func.isRequired,
  groupReports: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
};

GroupReports.defaultProps = {
  groupReports: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  groupReports: state.projects.groupReports || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchGroupReports: dispatch.projects.fetchGroupReports,
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupReports);
