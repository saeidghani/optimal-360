import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Ratee/AddRateeStep2';

class AddRateeStep2 extends Component {
  state = {};

  render() {
    const { loading } = this.props;
    const path = this.props.location.pathname;
    const isEditing = path.includes('ratee/add/step2/edit');
    return (
      <Layout loading={loading} isEditing={isEditing} />
    );
  }
}

AddRateeStep2.propTypes = {
  loading: PropTypes.bool.isRequired,
};

AddRateeStep2.defaultProps = {};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddRateeStep2);
