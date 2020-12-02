import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Wizard/EmailTemplate';

class EmailTemplate extends Component {
  state = {};

  setEmailSettingsData = (data) => {
    const { setEmailSettingsData } = this.props;

    return setEmailSettingsData(data);
  };

  render() {
    const { loading, emailSettings } = this.props;

    return (
      <Layout
        emailSettings={emailSettings}
        loading={loading}
        setEmailSettingsData={this.setEmailSettingsData}
      />
    );
  }
}

EmailTemplate.propTypes = {
  loading: PropTypes.bool.isRequired,
  setEmailSettingsData: PropTypes.func.isRequired,
  emailSettings: PropTypes.shape({}),
};

EmailTemplate.defaultProps = {
  emailSettings: {},
};

const mapStateToProps = (state) => ({
  emailSettings: state.wizard?.emailSettings || {},
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({
  setEmailSettingsData: dispatch.wizard.setEmailSettingsData,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplate);
