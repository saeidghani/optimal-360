import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';

import { parse } from '../../../hooks/useQuery';

import Layout from '../../../components/ClientAdmin/Auth/Login';
import { map } from '../../../routes/RouteMap';

class _Login extends Component {
  state = {};

  login = async ({ email, password, rememberMe }) => {
    const { login, saveUserName } = this.props;

    const { prevPath } = parse(window.location.search);

    await login({ username: email, password, rememberMe });
    saveUserName({ userName: email });

    let defaultPath = map.clientAdmin.dashboard;
    const notFirstVisit = Cookie.get('client-admin-not-first-visit');
    if (!notFirstVisit) {
      defaultPath = map.clientAdmin.referenceGuide;
      Cookie.set('client-admin-not-first-visit', true);
    }
    const newPath = prevPath || defaultPath;
    setTimeout(() => window.location.replace(newPath), 4000);
  };

  render() {
    const { loading } = this.props;

    return <Layout loading={loading} login={this.login} />;
  }
}

_Login.propTypes = {
  login: PropTypes.func.isRequired,
  saveUserName: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({
  login: dispatch.clientAdmin.login,
  saveUserName: dispatch.clientAdmin.saveUserName,
});

export default connect(mapStateToProps, mapDispatchToProps)(_Login);
