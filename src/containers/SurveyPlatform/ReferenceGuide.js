import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/SurveyPlatform/ReferenceGuide';

class ReferenceGuide extends Component {
  state = {};

  render() {
    const { loading, profileName } = this.props;

    return <Layout loading={loading} profileName={profileName} />;
  }
}

ReferenceGuide.propTypes = {
  loading: PropTypes.bool.isRequired,
  profileName: PropTypes.string,
};

ReferenceGuide.defaultProps = {
  profileName: '',
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  profileName: state.surveyPlatform?.profile?.data?.name || '',
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceGuide);
