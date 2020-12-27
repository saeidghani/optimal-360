import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/SurveyPlatform/Information';

class Information extends Component {
  state = {};

  fetchProfile = async (query) => {
    const { fetchProfile } = this.props;

    return fetchProfile(query);
  };

  updateProfile = async (data) => {
    const { updateProfile } = this.props;

    return updateProfile(data);
  };

  render() {
    const { loading, profile, organization } = this.props;

    return (
      <Layout
        loading={loading}
        fetchProfile={this.fetchProfile}
        updateProfile={this.updateProfile}
        profile={profile}
        organization={organization}
      />
    );
  }
}

Information.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({}),
  organization: PropTypes.shape({}),
};

Information.defaultProps = {
  profile: {},
  organization: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  profile: state.surveyPlatform?.profile || {},
  organization: state.surveyPlatform?.organization || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: dispatch.surveyPlatform?.fetchProfile,
  updateProfile: dispatch.surveyPlatform?.updateProfile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Information);
