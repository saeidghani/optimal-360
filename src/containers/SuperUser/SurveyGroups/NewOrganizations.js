import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/SurveyGroups/NewOrganizations';

class NewOrganizations extends Component {
  state = {};

  addNewOrganization = async ({ name, logo }) => {
    const { addNewOrganization } = this.props;

    await addNewOrganization({ name, logo });
    setTimeout(() => window.location.replace('/super-user/projects/survey-groups'), 4000);
  };

  render() {
    const { loading } = this.props;

    return <Layout loading={loading} addNewOrganization={this.addNewOrganization} />;
  }
}

NewOrganizations.propTypes = {
  addNewOrganization: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({
  addNewOrganization: dispatch.organizations.addNewOrganization,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewOrganizations);
