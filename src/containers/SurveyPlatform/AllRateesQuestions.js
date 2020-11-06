import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/SurveyPlatform/AllRateesQuestions';

class AllRateesQuestions extends Component {
  state = {};

  render() {
    const { loading } = this.props;

    return <Layout loading={loading} />;
  }
}

AllRateesQuestions.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AllRateesQuestions);
