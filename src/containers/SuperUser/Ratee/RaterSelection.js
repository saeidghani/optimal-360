import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../../components/SuperUser/Ratee/RaterSelection';

class RaterSelection extends Component {
  state = {};

  fetchRaterGroups = ({ surveyGroupId, rateeId }) => {
    const { fetchRaterGroups } = this.props;
    return fetchRaterGroups({ surveyGroupId, rateeId });
  };

  fetchStaffForRater = ({ surveyGroupId, rateeId, raterGroupId, query = '' }) => {
    const { fetchStaffForRater } = this.props;
    fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId, query });
  };

  setSelectedRaters = ({ rows, raterGpId }) => {
    const { setSelectedRaters } = this.props;
    return setSelectedRaters({ rows, raterGpId });
  }

  submitRaters = async ({ surveyGroupId, rateeId, raterGroupId }) => {
    const { submitRaters } = this.props;
    await submitRaters({ surveyGroupId, rateeId, raterGroupId });
  }

  render() {
    const { loading, staffForRater, raterGroups, selectedRaters, changedLog } = this.props;
    return (
      <Layout
        fetchStaffForRater={this.fetchStaffForRater}
        submitRaters={this.submitRaters}
        staffForRater={staffForRater}
        fetchRaterGroups={this.fetchRaterGroups}
        raterGroups={raterGroups}
        setSelectedRaters={this.setSelectedRaters}
        selectedRaters={selectedRaters}
        changedLog={changedLog}
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
  selectedRaters: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedRaters: PropTypes.func.isRequired,
  submitRaters: PropTypes.func.isRequired,
  changedLog: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RaterSelection.defaultProps = {};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  staffForRater: state.ratee.staffForRater || [],
  raterGroups: state.ratee.raterGroups || [],
  selectedRaters: state.ratee.selectedRaters || [],
  changedLog: state.ratee.changedLog || [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchStaffForRater: dispatch.ratee.fetchStaffForRater,
  fetchRaterGroups: dispatch.ratee.fetchRaterGroups,
  setSelectedRaters: dispatch.ratee.setSelectedRaters,
  submitRaters: dispatch.ratee.submitRaters,
});

export default connect(mapStateToProps, mapDispatchToProps)(RaterSelection);
