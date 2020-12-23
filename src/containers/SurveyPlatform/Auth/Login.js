import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { parse } from '../../../hooks/useQuery';

import Layout from '../../../components/SurveyPlatform/Auth/Login';

class _Login extends Component {
  state = {};

  fetchProfile = async (query) => {
    const { fetchProfile } = this.props;

    return fetchProfile(query);
  };

  login = async ({ email, password, rememberMe }) => {
    const { login } = this.props;

    const { prevPath } = parse(window.location.search);

    const newPath = prevPath || '/survey-platform/information';

    await login({ username: email, password, rememberMe });
    await this.fetchProfile('');

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
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({}),
};

_Login.defaultProps = {
  profile: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  profile: state.surveyPlatform?.profile || {},
});

const mapDispatchToProps = (dispatch) => ({
  login: dispatch.surveyPlatform?.login,
  fetchProfile: dispatch.surveyPlatform?.fetchProfile,
});

export default connect(mapStateToProps, mapDispatchToProps)(_Login);
