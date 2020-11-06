import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Rates/Rates';

class Rates extends Component {
  state = {};

  // Status Details
  fetchStatusDetails = async (query) => {
    const { fetchStatusDetails } = this.props;

    return fetchStatusDetails(query);
  };

  render() {
    const { loading, statusDetails } = this.props;

    return (
      <Layout
        loading={loading}
        statusDetails={statusDetails}
        fetchStatusDetails={this.fetchStatusDetails}
      />
    );
  }
}

Rates.propTypes = {
  fetchStatusDetails: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  statusDetails: PropTypes.shape({}),
};

Rates.defaultProps = {
  statusDetails: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  statusDetails: state.rates?.statusDetails || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchStatusDetails: dispatch.rates.fetchStatusDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(Rates);
