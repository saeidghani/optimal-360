import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { parse } from '../../../hooks/useQuery';

import Layout from '../../../components/ClientAdmin/Auth/Login';

class _Login extends Component {
  state = {};

  fetchOrganization = async (surveyGroupId) => {
    const { fetchOrganization } = this.props;

    return fetchOrganization(surveyGroupId);
  };

  login = async ({ email, password, rememberMe }) => {
    const { login, saveUserName } = this.props;

    const { prevPath } = parse(window.location.search);

    const newPath = prevPath || '/client-admin/dashboard';

    await login({ username: email, password, rememberMe });
    saveUserName({ userName: email });
    await this.fetchOrganization;

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
  fetchOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({
  login: dispatch.clientAdmin.login,
  saveUserName: dispatch.clientAdmin.saveUserName,
  fetchOrganization: dispatch.clientAdmin?.fetchOrganization,
});

export default connect(mapStateToProps, mapDispatchToProps)(_Login);
