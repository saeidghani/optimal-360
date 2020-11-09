import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Ratee/AddRatee';

class AddRatee extends Component {
  state = {};

  render() {
    const { loading } = this.props;
    const path = this.props.location.pathname;
    const isEditing = path.includes('ratee/add/edit');
    return (
      <Layout loading={loading} isEditing={isEditing} />
    );
  }
}

AddRatee.propTypes = {
  loading: PropTypes.bool.isRequired,
};

AddRatee.defaultProps = {};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddRatee);
