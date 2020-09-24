import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Auth/Login';

class _Login extends Component {
  state = {};

  login = async ({ email, password }) => {
    const { login } = this.props;

    return login({ username: email, password });
  };

  render() {
    return <Layout login={this.login} />;
  }
}

_Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth || {} });

const mapDispatchToProps = (dispatch) => ({
  login: dispatch.auth.login,
});

export default connect(mapStateToProps, mapDispatchToProps)(_Login);
