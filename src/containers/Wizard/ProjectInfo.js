import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Wizard/ProjectInfo';

class ProjectInfo extends Component {
  state = {};

  render() {
    return <Layout />;
  }
}

ProjectInfo.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);
