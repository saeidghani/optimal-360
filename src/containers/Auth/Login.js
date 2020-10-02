import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Auth/Login';

class _Login extends Component {
  state = {};

  login = async ({ email, password }) => {
    const { login } = this.props;

    await login({ username: email, password });

    // TODO : replace 4000 with a constatnt from config file
    setTimeout(
      () =>
        window.location.replace('/super-user/projects?status=active&page_size=10&page_number=1'),
      4000,
    );
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
