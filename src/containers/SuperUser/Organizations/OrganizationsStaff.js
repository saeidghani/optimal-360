import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Organizations/OrganizationsStaff';

class OrganizationsStaff extends Component {
  state = {};

  fetchOrganizationsStaffs = async (data) => {
    const { fetchOrganizationsStaffs } = this.props;

    return fetchOrganizationsStaffs({ ...data });
  };

  render() {
    const { loading, staffs } = this.props;

    return (<Layout
      fetchOrganizationsStaffs={this.fetchOrganizationsStaffs}
      staffs={staffs}
      loading={loading}
    />);
  }
}

OrganizationsStaff.propTypes = {
  fetchOrganizationsStaffs: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  staffs: PropTypes.shape({}),
};

OrganizationsStaff.defaultProps = {
  staffs: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  staffs: state.organizations?.staffs || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrganizationsStaffs: dispatch.organizations.fetchOrganizationsStaffs,

});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsStaff);
