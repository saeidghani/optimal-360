import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Bank/NewGroup';

class Models extends React.Component {
  state = {};

  render() {
    const { loading } = this.props;
    return <Layout loading={loading} />;
  }
}
Models.propTypes = {
  loading: PropTypes.bool.isRequired,
};
Models.defaultProps = {};
const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Models);
