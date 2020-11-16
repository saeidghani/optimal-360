import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/ClientAdmin/ParticipantDetails';

class ParticipantDetails extends Component {
  state = {};

  fetchRatees = async (surveyGroupId) => {
    const { fetchRatees } = this.props;

    return fetchRatees(surveyGroupId);
  };

  render() {
    const { loading, ratees } = this.props;

    return <Layout loading={loading} fetchRatees={this.fetchRatees} ratees={ratees} />;
  }
}

ParticipantDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRatees: PropTypes.func.isRequired,
  ratees: PropTypes.shape({}),
};

ParticipantDetails.defaultProps = {
  ratees: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  ratees: state.clientAdmin?.ratees || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchRatees: dispatch.clientAdmin?.fetchRatees || {},
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantDetails);
