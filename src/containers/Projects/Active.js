import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Auth/Login';

class ActiveProjects extends Component {
  state = {};

  render() {
    return <Layout />;
  }
}

ActiveProjects.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveProjects);
