import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/SurveyPlatform/ReferenceGuide';

class ReferenceGuide extends Component {
  state = {};

  render() {
    const { loading, profileName, organization } = this.props;

    return <Layout loading={loading} profileName={profileName} organization={organization} />;
  }
}

ReferenceGuide.propTypes = {
  loading: PropTypes.bool.isRequired,
  profileName: PropTypes.string,
  organization: PropTypes.shape({}),
};

ReferenceGuide.defaultProps = {
  profileName: '',
  organization: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  profileName: state.surveyPlatform?.profile?.data?.name || '',
  organization: state.surveyPlatform?.organization || {},
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceGuide);
