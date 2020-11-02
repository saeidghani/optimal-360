import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Projects/SetAdmin';

class SetAdmin extends Component {
  state = {};

  setAdmin = async (data) => {
    const { setClientAdmin } = this.props;

    return setClientAdmin(data);
  };

  fetchAdmin = async (id) => {
    const { fetchClientAdmin } = this.props;

    await fetchClientAdmin(id);
  };

  render() {
    const { loading, clientAdmin } = this.props;

    return (
      <Layout
        clientAdmin={clientAdmin}
        fetchAdmin={this.fetchAdmin}
        setAdmin={this.setAdmin}
        loading={loading}
      />
    );
  }
}

SetAdmin.propTypes = {
  setClientAdmin: PropTypes.func.isRequired,
  fetchClientAdmin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  clientAdmin: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  clientAdmin: state.projects.clientAdmin || {},
});

const mapDispatchToProps = (dispatch) => ({
  setClientAdmin: dispatch.projects.setClientAdmin,
  fetchClientAdmin: dispatch.projects.fetchClientAdmin,
});

export default connect(mapStateToProps, mapDispatchToProps)(SetAdmin);
