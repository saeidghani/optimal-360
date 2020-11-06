import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Organizations/UpdateStaff';

class UpdateStaff extends Component {
  state = {};

  fetchStaffDetails = async (data) => {
    const { fetchStaffDetails } = this.props;

    await fetchStaffDetails(data);
  };

  setStaffDetails = async (organizationId) => {
    const { setStaffDetails } = this.props;

    await setStaffDetails(organizationId);
  };

  render() {
    const { loading, staffDetails } = this.props;
    return (
      <Layout
        loading={loading}
        fetchStaffDetails={this.fetchStaffDetails}
        staffDetails={staffDetails}
        setStaffDetails={this.setStaffDetails}
      />
    );
  }
}

UpdateStaff.propTypes = {
  fetchStaffDetails: PropTypes.func.isRequired,
  setStaffDetails: PropTypes.func.isRequired,
  staffDetails: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
};
UpdateStaff.defaultProps = {
  staffDetails: [],
};
const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  staffDetails: state.organizations?.staffDetails || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchStaffDetails: dispatch.organizations.fetchStaffDetails,
  setStaffDetails: dispatch.organizations.setStaffDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStaff);
