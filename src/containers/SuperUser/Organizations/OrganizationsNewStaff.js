import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Organizations/OrganizationsNewStaff';

class OrganizationsNewStaff extends Component {
  state = {};

  addNewOrganizationStaff = async (params) => {
    const { addNewOrganizationStaff } = this.props;

    await addNewOrganizationStaff(params);
  };

  render() {
    const { loading } = this.props;
    return <Layout loading={loading} addNewOrganizationStaff={this.addNewOrganizationStaff} />;
  }
}

OrganizationsNewStaff.propTypes = {
  addNewOrganizationStaff: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({
  addNewOrganizationStaff: dispatch.organizations.addNewOrganizationStaff,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsNewStaff);
