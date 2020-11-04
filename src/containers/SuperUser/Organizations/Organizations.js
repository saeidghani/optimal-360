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

  render() {
    const { loading } = this.props;

    return <Layout loading={loading} fetchOrganizations={this.fetchOrganizations} />;
  }
}

Organizations.propTypes = {
  fetchOrganizations: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrganizations: dispatch.organizations.fetchOrganizations,
});

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
