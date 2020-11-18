import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/ClientAdmin/Dashboard/TopLeadership/RaterDetails';

class RaterDetails extends Component {
  state = {};

  fetchRaters = async (surveyGroupId) => {
    const { fetchRaters } = this.props;

    return fetchRaters(surveyGroupId);
  };

  render() {
    const { loading, raters } = this.props;

    return <Layout loading={loading} fetchRaters={this.fetchRaters} raters={raters} />;
  }
}

RaterDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  raters: PropTypes.shape({}),
};

RaterDetails.defaultProps = {
  raters: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  raters: state.clientAdmin?.raters || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchRaters: dispatch.clientAdmin?.fetchRaters || {},
});

export default connect(mapStateToProps, mapDispatchToProps)(RaterDetails);
