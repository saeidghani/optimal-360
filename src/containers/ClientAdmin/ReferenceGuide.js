import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/ClientAdmin/ReferenceGuide';

class ReferenceGuide extends Component {
  state = {};

  render() {
    const { loading, userName, organization } = this.props;

    return <Layout loading={loading} userName={userName} organization={organization} />;
  }
}

ReferenceGuide.propTypes = {
  loading: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  organization: PropTypes.shape({}),
};

ReferenceGuide.defaultProps = {
  userName: '',
  organization: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  userName: state.clientAdmin?.userName,
  organization: state.surveyPlatform?.organization || {},
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceGuide);
