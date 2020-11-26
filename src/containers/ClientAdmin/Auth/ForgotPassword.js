import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/ClientAdmin/Auth/ForgotPassword';
import Success from '../../../components/ClientAdmin/Auth/Success';

class ForgotPassword extends Component {
  state = {
    success: false,
  };

  forgotPassword = async ({ email }) => {
    const { forgotPassword } = this.props;

    await forgotPassword({ email });

    setTimeout(() => this.setState({ success: true }), 500);
  };

  render() {
    const { success } = this.state;
    const { loading } = this.props;

    return success ? (
      <Success />
    ) : (
      <Layout loading={loading} success={success} forgotPassword={this.forgotPassword} />
    );
  }
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: dispatch.clientAdmin.forgotPassword,
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
