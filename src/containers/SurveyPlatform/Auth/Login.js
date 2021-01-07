import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Cookie from 'js-cookie';
import { parse } from '../../../hooks/useQuery';

import Layout from '../../../components/SurveyPlatform/Auth/Login';
import { map } from '../../../routes/RouteMap';

class _Login extends Component {
  state = {};

  fetchProfile = async (query) => {
    const { fetchProfile } = this.props;

    return fetchProfile(query);
  };

  fetchOrganization = async (surveyGroupId) => {
    const { fetchOrganization } = this.props;

    return fetchOrganization(surveyGroupId);
  };

  login = async ({ email, password, rememberMe }) => {
    const { login } = this.props;

    const { prevPath } = parse(window.location.search);

    await login({ username: email, password, rememberMe });
    await this.fetchProfile('');
    await this.fetchOrganization('');

    let defaultPath = map.surveyPlatform.information;
    const notFirstVisit = Cookie.get('survey-platform-not-first-visit');
    if (!notFirstVisit) {
      defaultPath = map.surveyPlatform.referenceGuide;
      Cookie.set('survey-platform-not-first-visit', true);
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
  loading: PropTypes.bool.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({}),
  fetchOrganization: PropTypes.func.isRequired,
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
  fetchOrganization: dispatch.surveyPlatform?.fetchOrganization,
});

export default connect(mapStateToProps, mapDispatchToProps)(_Login);
