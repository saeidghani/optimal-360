import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { Tabs } from 'antd';
import Layout from '../../../components/SuperUser/Rates/Rates';

class Rates extends Component {
  state = {};

  render() {
    const { loading } = this.props;

    return (
      <Layout loading={loading} />
    );
  }
}

Rates.propTypes = {
  loading: PropTypes.bool.isRequired,
};

Rates.defaultProps = {};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Rates);
