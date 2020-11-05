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

  render() {
    const { loading, staff } = this.props;

    return (<Layout
      fetchOrganizationsStaff={this.fetchOrganizationsStaff}
      staff={staff}
      loading={loading}
    />);
  }
}

OrganizationsStaff.propTypes = {
  fetchOrganizationsStaff: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  staff: PropTypes.shape({}),
};

OrganizationsStaff.defaultProps = {
  staff: {},
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  staff: state.organizations?.staff || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrganizationsStaff: dispatch.organizations.fetchOrganizationsStaff,

});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsStaff);
