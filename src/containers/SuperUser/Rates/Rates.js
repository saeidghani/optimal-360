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

// raters email
  fetchRaters = async (query) => {
    const { fetchRaters } = this.props;

    return fetchRaters(query);
  };

  render() {
    const { loading, statusDetails, raters } = this.props;

    return (
      <Layout
        loading={loading}
        statusDetails={statusDetails}
        raters={raters}
        fetchRaters={this.fetchRaters}
        fetchStatusDetails={this.fetchStatusDetails}
      />
    );
  }
}

Rates.propTypes = {
  fetchStatusDetails: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  statusDetails: PropTypes.shape({}),
  raters: PropTypes.shape({}),
};

Rates.defaultProps = {
  statusDetails: {},
  raters: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  statusDetails: state.rates?.statusDetails || {},
  raters: state.rates?.raters || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchStatusDetails: dispatch.rates.fetchStatusDetails,
  fetchRaters: dispatch.rates.fetchRaters,
});

export default connect(mapStateToProps, mapDispatchToProps)(Rates);
