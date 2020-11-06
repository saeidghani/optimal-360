import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Layout from '../../../components/SuperUser/Bank/Models';

class Models extends React.Component {
  state = {};

  fetchSurveyGroups = (query) => {
    const { fetchSurveyGroups } = this.props;

    return fetchSurveyGroups(query || '?page_size=10&page_number=1');
  };

  exportSurveyGroup = (surveyGroupId) => {
    const { exportSurveyGroup } = this.props;

    return exportSurveyGroup(surveyGroupId);
  };

  render() {
    const { loading, surveyGroups } = this.props;

    return (
      <Layout
        loading={loading}
        surveyGroups={surveyGroups}
        fetchSurveyGroups={this.fetchSurveyGroups}
        exportSurveyGroup={this.exportSurveyGroup}
      />
    );
  }
}

Models.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  exportSurveyGroup: PropTypes.func.isRequired,
  surveyGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        totalRecords: PropTypes.string,
      }),
    }),
  }),
};

Models.defaultProps = {
  surveyGroups: {
    data: [],
  },
};

const mapStateToProps = (state) => ({
  loading: state.loading.global || false,
  surveyGroups: state.bank.surveyGroups || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveyGroups: dispatch.bank.fetchSurveyGroups,
  exportSurveyGroup: dispatch.bank.exportSurveyGroup,
});

export default connect(mapStateToProps, mapDispatchToProps)(Models);
