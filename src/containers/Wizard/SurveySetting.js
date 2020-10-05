import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Wizard/SurveySetting';

class SurveySetting extends Component {
  state = {};

  render() {
    return <Layout />;
  }
}

SurveySetting.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SurveySetting);
