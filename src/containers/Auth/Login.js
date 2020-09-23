import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Auth/Login';

class _Login extends Component {
  state = {};

  login = async ({ email }) => {
    const { alert } = this.props;

    return alert(email);
  };

  render() {
    return <Layout login={this.login} />;
  }
}

_Login.propTypes = {
  alert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth || {} });

const mapDispatchToProps = (dispatch) => ({
  alert: dispatch.util.alert,
});

export default connect(mapStateToProps, mapDispatchToProps)(_Login);
