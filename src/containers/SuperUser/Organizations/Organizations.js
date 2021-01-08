import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Organizations/Organizations';

class Organizations extends Component {
  state = {};

  fetchOrganizations = async (query) => {
    const { fetchOrganizations } = this.props;

    return fetchOrganizations(query);
  };

  deleteOrganizations = async (query) => {
    const { deleteOrganizations } = this.props;

    return deleteOrganizations(query);
  };

  render() {
    const { loading, organizations } = this.props;
    return (
      <Layout
        loading={loading}
        organizations={organizations}
        fetchOrganizations={this.fetchOrganizations}
        deleteOrganizations={this.deleteOrganizations}
      />
    );
  }
}

Organizations.propTypes = {
  fetchOrganizations: PropTypes.func.isRequired,
  deleteOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
};

Organizations.defaultProps = {
  organizations: [],
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  organizations: state.organizations?.organizations || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrganizations: dispatch.organizations.fetchOrganizations,
  deleteOrganizations: dispatch.organizations.deleteOrganizations,
});

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
