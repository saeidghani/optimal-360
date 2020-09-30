import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/SurveyGroups/RatersStatusOverview';

class RatersStatusOverview extends Component {
  state = {};

  render() {
    return <Layout />;
  }
}

RatersStatusOverview.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RatersStatusOverview);
