import React, { Component } from 'react';

import Login from '../../components/Auth/Login';

class Auth extends Component {
  state = {};

  render() {
    return <Login testProp="test" />;
  }
}

export default Auth;
