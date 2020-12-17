import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '../../../../hooks';

import ViewByButtons from './ViewByButtons';
import OverallCompletion from './OverallCompletion';
import RateCard from './RateCard';
import DataTable from './DataTable';

const SurveyGroup = ({
  loading,
  completionRate,
  raterGroups,
  summary,
  ratees,
  raters,
  fetchCompletionRate,
  fetchRaterGroups,
  fetchSummary,
  fetchRatees,
  fetchRaters,
}) => {
  const [parsedQuery, query] = useQuery();
  const { surveyGroupId } = parsedQuery || {};
  const viewBy = parsedQuery?.viewBy;

  useEffect(() => {
    if (surveyGroupId) fetchCompletionRate({ query, surveyGroupId });
  }, [fetchCompletionRate, surveyGroupId]);

  return (
    <div>
      {surveyGroupId && <ViewByButtons />}
      <OverallCompletion
        totalRatees={completionRate?.data?.totalRatees}
        totalRaters={completionRate?.data?.totalRaters}
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
          raterGroups={raterGroups}
          summary={summary}
          fetchRatees={fetchRatees}
          fetchRaterGroups={fetchRaterGroups}
          fetchSummary={fetchSummary}
          fetchRaters={fetchRaters}
        />
      )}
    </div>
  );
};

SurveyGroup.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,
  fetchRaterGroups: PropTypes.func.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  fetchRatees: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  completionRate: PropTypes.shape({
    data: PropTypes.shape({
      totalRatees: PropTypes.string,
      totalRaters: PropTypes.string,
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
  raterGroups: PropTypes.shape({}),
  summary: PropTypes.shape({}),
  ratees: PropTypes.shape({}),
  raters: PropTypes.shape({}),
};

SurveyGroup.defaultProps = {
  completionRate: {},
  raterGroups: {},
  summary: {},
  ratees: {},
  raters: {},
};

export default SurveyGroup;
