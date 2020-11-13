import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Organizations/OrganizationsStaff';

class OrganizationsStaff extends Component {
  state = {};

  fetchOrganizationsStaff = async (data) => {
    const { fetchOrganizationsStaff } = this.props;

    return fetchOrganizationsStaff({ ...data });
  };

  fetchOrganizationsInfo = async (organizationId) => {
    const { fetchOrganizationsInfo } = this.props;

    return fetchOrganizationsInfo(organizationId);
  };

  importStaff = async (data) => {
    const { importStaff } = this.props;

    return importStaff(data);
  };

  render() {
    const { loading, organizationsInfo, staff } = this.props;

    return (
      <Layout
        fetchOrganizationsInfo={this.fetchOrganizationsInfo}
        fetchOrganizationsStaff={this.fetchOrganizationsStaff}
        importStaff={this.importStaff}
        organizationsInfo={organizationsInfo}
        staff={staff}
        loading={loading}
      />
    );
  }
}

OrganizationsStaff.propTypes = {
  fetchOrganizationsStaff: PropTypes.func.isRequired,
  fetchOrganizationsInfo: PropTypes.func.isRequired,
  importStaff: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  staff: PropTypes.shape({}),
  organizationsInfo: PropTypes.shape({}),
};

OrganizationsStaff.defaultProps = {
  staff: {},
  organizationsInfo: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  staff: state.organizations?.staff || {},
  organizationsInfo: state.organizations?.organizationsInfo || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrganizationsStaff: dispatch.organizations.fetchOrganizationsStaff,
  fetchOrganizationsInfo: dispatch.organizations.fetchOrganizationsInfo,
  importStaff: dispatch.organizations.importStaff,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsStaff);
