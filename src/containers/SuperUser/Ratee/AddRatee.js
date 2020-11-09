import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Ratee/AddRatee';

class AddRatee extends Component {
  state = {};

  render() {
    const { loading } = this.props;

    return (
      <Layout loading={loading} />
    );
  }
}

AddRatee.propTypes = {
  loading: PropTypes.bool.isRequired,
};

AddRatee.defaultProps = {};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddRatee);
