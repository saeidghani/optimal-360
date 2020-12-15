import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../../components/SuperUser/Ratee/AddRatee';

class AddRatee extends Component {
  state = {};

  fetchRateeMissionCriticals = ({ surveyGroupId, rateeId }) => {
    const { fetchRateeMissionCriticals } = this.props;
    return fetchRateeMissionCriticals({ surveyGroupId, rateeId });
  };

  fetchStaff = ({ surveyGroupId, query }) => {
    const { fetchStaff } = this.props;
    return fetchStaff({ surveyGroupId, query });
  };

  clearRateeMissionCriticals = () => {
    const { clearRateeMissionCriticals } = this.props;
    return clearRateeMissionCriticals();
  }

  setStaff = ({ surveyGroupId, rateeId }) => {
    const { setStaff } = this.props;
    return setStaff({ surveyGroupId, rateeId });
  };

  fetchOrganizationId = ({ projectId }) => {
    const { fetchOrganizationId } = this.props;
    return fetchOrganizationId({ projectId });
  }

  fetchStaffForRater = ({ surveyGroupId, rateeId, raterGroupId }) => {
    const { fetchStaffForRater } = this.props;
    return fetchStaffForRater({ surveyGroupId, rateeId, raterGroupId });
  }

  addMissionCriticalToRatee = ({ surveyGroupId, rateeId, competencyIds }) => {
    const { addMissionCriticalToRatee } = this.props;
    return addMissionCriticalToRatee({ surveyGroupId, rateeId, competencyIds });
  }

  render() {
    const { loading, rateeMissionCriticals, staff } = this.props;
    return (
      <Layout
        fetchRateeMissionCriticals={this.fetchRateeMissionCriticals}
        addMissionCriticalToRatee={this.addMissionCriticalToRatee}
        fetchStaff={this.fetchStaff}
        clearRateeMissionCriticals={this.clearRateeMissionCriticals}
        setStaff={this.setStaff}
        rateeMissionCriticals={rateeMissionCriticals}
        staff={staff}
        fetchOrganizationId={this.fetchOrganizationId}
        loading={loading}
      />
    );
  }
}

AddRatee.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRateeMissionCriticals: PropTypes.func.isRequired,
  addMissionCriticalToRatee: PropTypes.func.isRequired,
  rateeMissionCriticals: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchStaff: PropTypes.func.isRequired,
  clearRateeMissionCriticals: PropTypes.func.isRequired,
  staff: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStaff: PropTypes.func.isRequired,
  fetchOrganizationId: PropTypes.func.isRequired,
  fetchStaffForRater: PropTypes.func.isRequired,
};

AddRatee.defaultProps = {};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  rateeMissionCriticals: state.ratee.rateeMissionCriticals || [],
  staff: state.ratee.staff || [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchRateeMissionCriticals: dispatch.ratee.fetchRateeMissionCriticals,
  fetchStaff: dispatch.ratee.fetchStaff,
  clearRateeMissionCriticals: dispatch.ratee.clearRateeMissionCriticals,
  setStaff: dispatch.ratee.setStaff,
  fetchOrganizationId: dispatch.ratee.fetchOrganizationId,
  fetchStaffForRater: dispatch.ratee.fetchStaffForRater,
  addMissionCriticalToRatee: dispatch.ratee.addMissionCriticalToRatee,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRatee);
