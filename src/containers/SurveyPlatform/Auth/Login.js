import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { parse } from '../../../hooks/useQuery';

import Layout from '../../../components/SurveyPlatform/Auth/Login';

class _Login extends Component {
  state = {};

  login = async ({ email, password, rememberMe }) => {
    const { login } = this.props;

    const { prevPath } = parse(window.location.search);

    const newPath = prevPath || '/survey-platform/dashboard';

    await login({ username: email, password, rememberMe });

    setTimeout(() => window.location.replace(newPath), 4000);
  };

  render() {
    const { loading } = this.props;

    return <Layout loading={loading} login={this.login} />;
  }
}

_Login.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({
  login: dispatch.surveyPlatform?.login,
});

export default connect(mapStateToProps, mapDispatchToProps)(_Login);
