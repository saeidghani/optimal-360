import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Ratee/RaterSelection';

class RaterSelection extends Component {
  state = {};

  fetchRaterGroups = ({ surveyGroupId }) => {
    const { fetchRaterGroups } = this.props;
    return fetchRaterGroups({ surveyGroupId });
  };

  fetchStaffForRater = ({ surveyGroupId, rateeId, raterGroupId, query }) => {
    const { fetchStaffForRater } = this.props;
    return fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId, query });
  };

  render() {
    const { loading, staffForRater, raterGroups } = this.props;
    return (
      <Layout
        fetchStaffForRater={this.fetchStaffForRater}
        staffForRater={staffForRater}
        fetchRaterGroups={this.fetchRaterGroups}
        raterGroups={raterGroups}
        loading={loading}
      />
    );
  }
}

RaterSelection.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchStaffForRater: PropTypes.func.isRequired,
  staffForRater: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRaterGroups: PropTypes.func.isRequired,
  raterGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RaterSelection.defaultProps = {};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  staffForRater: state.ratee.staffForRater || [],
  raterGroups: state.ratee.raterGroups || [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchStaffForRater: dispatch.ratee.fetchStaffForRater,
  fetchRaterGroups: dispatch.ratee.fetchRaterGroups,
});

export default connect(mapStateToProps, mapDispatchToProps)(RaterSelection);
