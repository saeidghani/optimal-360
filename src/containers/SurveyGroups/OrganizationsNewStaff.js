import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/SurveyGroups/OrganizationsNewStaff';

class OrganizationsNewStaff extends Component {
  state = {};

  render() {
    const { loading } = this.props;

    return <Layout loading={loading} />;
  }
}

OrganizationsNewStaff.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsNewStaff);
