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

  deleteStaff = ({ organizationId, staffIds }) => {
    const { deleteStaff } = this.props;

    return deleteStaff({ organizationId, staffIds });
  };

  clearDeleteStaffError = () => {
    const { clearDeleteStaffError } = this.props;

    return clearDeleteStaffError();
  };

  render() {
    const { loading, organizationsInfo, staff, deleteStaffError } = this.props;

    return (
      <Layout
        fetchOrganizationsInfo={this.fetchOrganizationsInfo}
        fetchOrganizationsStaff={this.fetchOrganizationsStaff}
        importStaff={this.importStaff}
        deleteStaff={this.deleteStaff}
        clearDeleteStaffError={this.clearDeleteStaffError}
        organizationsInfo={organizationsInfo}
        deleteStaffError={deleteStaffError}
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
  deleteStaff: PropTypes.func.isRequired,
  deleteStaffError: PropTypes.arrayOf(PropTypes.object),
  clearDeleteStaffError: PropTypes.func.isRequired,
};

OrganizationsStaff.defaultProps = {
  staff: {},
  organizationsInfo: {},
  deleteStaffError: [],
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  staff: state.organizations?.staff || {},
  organizationsInfo: state.organizations?.organizationsInfo || {},
  deleteStaffError: state.organizations.deleteStaffError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrganizationsStaff: dispatch.organizations.fetchOrganizationsStaff,
  fetchOrganizationsInfo: dispatch.organizations.fetchOrganizationsInfo,
  importStaff: dispatch.organizations.importStaff,
  deleteStaff: dispatch.organizations.deleteStaff,
  clearDeleteStaffError: dispatch.organizations.clearDeleteStaffError,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsStaff);
