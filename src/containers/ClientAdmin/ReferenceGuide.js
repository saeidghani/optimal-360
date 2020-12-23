import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/ClientAdmin/ReferenceGuide';

class ReferenceGuide extends Component {
  state = {};

  render() {
    const { loading, userName } = this.props;

    return <Layout loading={loading} userName={userName} />;
  }
}

ReferenceGuide.propTypes = {
  loading: PropTypes.bool.isRequired,
  userName: PropTypes.string,
};

ReferenceGuide.defaultProps = {
  userName: '',
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  userName: state.clientAdmin?.userName,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceGuide);
