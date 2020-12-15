import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../../components/SuperUser/Ratee/EditRatee';

class EditRatee extends Component {
  state = {};

  fetchRateeMissionCriticals = ({ surveyGroupId, rateeId }) => {
    const { fetchRateeMissionCriticals } = this.props;
    return fetchRateeMissionCriticals({ surveyGroupId, rateeId });
  };

  clearRateeMissionCriticals = () => {
    const { clearRateeMissionCriticals } = this.props;
    return clearRateeMissionCriticals();
  }

  addMissionCriticalToRatee = ({ surveyGroupId, rateeId, competencyIds }) => {
    const { addMissionCriticalToRatee } = this.props;
    return addMissionCriticalToRatee({ surveyGroupId, rateeId, competencyIds });
  }

  render() {
    const { loading, rateeMissionCriticals } = this.props;
    return (
      <Layout
        loading={loading}
        fetchRateeMissionCriticals={this.fetchRateeMissionCriticals}
        clearRateeMissionCriticals={this.clearRateeMissionCriticals}
        addMissionCriticalToRatee={this.addMissionCriticalToRatee}
        rateeMissionCriticals={rateeMissionCriticals}
      />
    );
  }
}

EditRatee.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRateeMissionCriticals: PropTypes.func.isRequired,
  addMissionCriticalToRatee: PropTypes.func.isRequired,
  rateeMissionCriticals: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearRateeMissionCriticals: PropTypes.func.isRequired,
};

EditRatee.defaultProps = {};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  rateeMissionCriticals: state.ratee.rateeMissionCriticals || [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchRateeMissionCriticals: dispatch.ratee.fetchRateeMissionCriticals,
  addMissionCriticalToRatee: dispatch.ratee.addMissionCriticalToRatee,
  clearRateeMissionCriticals: dispatch.ratee.clearRateeMissionCriticals,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRatee);
