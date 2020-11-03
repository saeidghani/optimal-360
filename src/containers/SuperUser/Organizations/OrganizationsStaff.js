import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Organizations/OrganizationsStaff';

class OrganizationsStaff extends Component {
  state = {};

  render() {
    const { loading } = this.props;

    return <Layout loading={loading} />;
  }
}

OrganizationsStaff.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsStaff);
