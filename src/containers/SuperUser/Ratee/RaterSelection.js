import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../../components/SuperUser/Ratee/RaterSelection';

class RaterSelection extends Component {
  state = {};

  clearStaffAndStorage = () => {
    const { clearStaffAndStorage } = this.props;
    return clearStaffAndStorage();
  }

  fetchRaterGroups = ({ surveyGroupId }) => {
    const { fetchRaterGroups } = this.props;
    return fetchRaterGroups({ surveyGroupId });
  };

  fetchStaffForRater = ({ surveyGroupId, rateeId, raterGroupId, query }) => {
    const { fetchStaffForRater } = this.props;
    return fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId, query });
  };

  setSelectedRaters = (rows) => {
    const { setSelectedRaters } = this.props;
    return setSelectedRaters(rows);
  }

  submitRaters = async ({ surveyGroupId, rateeId, obj }) => {
    const { submitRaters } = this.props;
    await submitRaters({ surveyGroupId, rateeId, obj });
  }

  fetchAllStaffForRaters = ({ surveyGroupId, rateeId, raterGroupId }) => {
    const { fetchAllStaffForRaters } = this.props;
    return fetchAllStaffForRaters({ surveyGroupId, rateeId, raterGroupId });
  }

  render() {
    const { loading, staffForRater, raterGroups, selectedRaters, defaultSelectedRaters } = this.props;
    return (
      <Layout
        fetchStaffForRater={this.fetchStaffForRater}
        submitRaters={this.submitRaters}
        staffForRater={staffForRater}
        fetchRaterGroups={this.fetchRaterGroups}
        raterGroups={raterGroups}
        setSelectedRaters={this.setSelectedRaters}
        defaultSelectedRaters={defaultSelectedRaters}
        selectedRaters={selectedRaters}
        fetchAllStaffForRaters={this.fetchAllStaffForRaters}
        clearStaffAndStorage={this.clearStaffAndStorage}
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
  defaultSelectedRaters: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearStaffAndStorage: PropTypes.func.isRequired,
  fetchAllStaffForRaters: PropTypes.func.isRequired,
};

RaterSelection.defaultProps = {};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  staffForRater: state.ratee.staffForRater || [],
  raterGroups: state.ratee.raterGroups || [],
  selectedRaters: state.ratee.selectedRaters || [],
  changedLog: state.ratee.changedLog || [],
  defaultSelectedRaters: state.ratee.defaultSelectedRaters || [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchStaffForRater: dispatch.ratee.fetchStaffForRater,
  fetchRaterGroups: dispatch.ratee.fetchRaterGroups,
  setSelectedRaters: dispatch.ratee.setSelectedRaters,
  submitRaters: dispatch.ratee.submitRaters,
  clearStaffAndStorage: dispatch.ratee.clearStaffAndStorage,
  fetchAllStaffForRaters: dispatch.ratee.fetchAllStaffForRaters,
});

export default connect(mapStateToProps, mapDispatchToProps)(RaterSelection);
