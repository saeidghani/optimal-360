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
    const { loading } = this.props;

    return <Layout fetchOrganizationsStaffs={this.fetchOrganizationsStaffs} loading={loading} />;
  }
}

OrganizationsStaff.propTypes = {
  fetchOrganizationsStaffs: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrganizationsStaffs: dispatch.organizations.fetchOrganizationsStaffs,

});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsStaff);
