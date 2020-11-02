import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../components/Wizard/Report';

class Report extends React.Component {
  state = {};

  render() {
    const { loading } = this.props;
    return <Layout loading={loading} />;
  }
}
Report.propTypes = {
  loading: PropTypes.bool.isRequired,
};
Report.defaultProps = {};
const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Report);
