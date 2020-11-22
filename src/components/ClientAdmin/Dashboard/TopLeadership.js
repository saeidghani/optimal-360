import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '../../../hooks';

import ViewByButtons from './Helper/ViewByButtons';
import OverallCompletion from './Helper/OverallCompletion';
import RateCard from './Helper/RateCard';
import DataTable from './Helper/DataTable';

const TopLeadership = ({
  loading,
  completionRate,
  summary,
  ratees,
  raters,
  fetchCompletionRate,
  fetchSummary,
  fetchRatees,
  fetchRaters,
}) => {
  const [parsedQuery, query] = useQuery();
  const surveyGroupId = parsedQuery?.surveyGroupId;
  const viewBy = parsedQuery?.viewBy;

  useEffect(() => {
    if (surveyGroupId) fetchCompletionRate({ query, surveyGroupId });
  }, [fetchCompletionRate, surveyGroupId]);

  return (
    <div>
      {surveyGroupId && <ViewByButtons />}
      <OverallCompletion
        totalRatees={completionRate?.data?.totalRatees}
        totalSurveySubmissionRate={completionRate?.data?.totalSurveySubmissionRate}
        totalSurveyRate={completionRate?.data?.totalSurveyRate}
        totalAnsweredRate={completionRate?.data?.totalAnsweredRate}
        totalQuestionRate={completionRate?.data?.totalQuestionRate}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 mt-10">
        {(completionRate?.data?.raterGroups || []).map((data) => (
          <RateCard {...data} />
        ))}
      </div>
      {viewBy && (
        <DataTable
          loading={loading}
          ratees={ratees}
          raters={raters}
          fetchRatees={fetchRatees}
          summary={summary}
          fetchSummary={fetchSummary}
          fetchRaters={fetchRaters}
        />
      )}
    </div>
  );
};

TopLeadership.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  fetchRatees: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  completionRate: PropTypes.shape({
    data: PropTypes.shape({
      totalRatees: PropTypes.string,
      totalSurveySubmissionRate: PropTypes.string,
      totalSurveyRate: PropTypes.string,
      totalAnsweredRate: PropTypes.string,
      totalQuestionRate: PropTypes.string,
      raterGroups: PropTypes.arrayOf(
        PropTypes.shape({
          totalRaters: PropTypes.string.isRequired,
          totalSubmissions: PropTypes.string.isRequired,
          totalQuestions: PropTypes.string.isRequired,
          totalAnswered: PropTypes.string.isRequired,
          raterGroupName: PropTypes.string.isRequired,
        }),
      ),
    }),
  }),
  summary: PropTypes.shape({}),
  ratees: PropTypes.shape({}),
  raters: PropTypes.shape({}),
};

TopLeadership.defaultProps = {
  completionRate: {},
  summary: {},
  ratees: {},
  raters: {},
};

export default TopLeadership;