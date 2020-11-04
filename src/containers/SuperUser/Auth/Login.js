import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { parse } from '../../../hooks/useQuery';

import Layout from '../../../components/SuperUser/Auth/Login';

class _Login extends Component {
  state = {};

  getNewPath = () => {
    const { prevPath } = parse(window.location.search);

    return prevPath || '/super-user/projects?status=active&page_size=10&page_number=1';
  };

  componentDidMount = () => {
    const token = Cookies.get('token');

    if (token) {
      const newPath = this.getNewPath();

      window.location.replace(newPath);
    }
  };

  login = async ({ email, password, rememberMe }) => {
    const { login } = this.props;

    const newPath = this.getNewPath();

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
  login: dispatch.auth.login,
});

export default connect(mapStateToProps, mapDispatchToProps)(_Login);
