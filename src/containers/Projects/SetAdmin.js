import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Projects/SetAdmin';

class SetAdmin extends Component {
  state = {};

  setAdmin = async (id) => {
    const { setClientAdmin } = this.props;

    await setClientAdmin(id);
  };

  render() {
    const { loading } = this.props;

    return <Layout setAdmin={this.setAdmin} loading={loading} />;
  }
}

SetAdmin.propTypes = {
  setClientAdmin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({
  setClientAdmin: dispatch.projects.setClientAdmin,
});

export default connect(mapStateToProps, mapDispatchToProps)(SetAdmin);
