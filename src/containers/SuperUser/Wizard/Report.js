import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Wizard/Report';

class Report extends React.Component {
  state = {};

  fetchReports = async (surveyGroupId) => {
    const { fetchReports } = this.props;

    await fetchReports(surveyGroupId);
  };

  setReports = async (data) => {
    const { setReports } = this.props;

    return setReports(data);
  };

  render() {
    const { loading, reports } = this.props;

    return (
      <Layout
        reports={reports}
        loading={loading}
        fetchReports={this.fetchReports}
        setReports={this.setReports}
      />
    );
  }
}

Report.propTypes = {
  fetchReports: PropTypes.func.isRequired,
  setReports: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reports: PropTypes.shape({}),
};

Report.defaultProps = {
  reports: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  reports: state.wizard?.reports || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchReports: dispatch.wizard.fetchReports,
  setReports: dispatch.wizard.setReports,
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
