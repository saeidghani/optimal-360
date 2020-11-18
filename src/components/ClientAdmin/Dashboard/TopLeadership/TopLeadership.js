import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '../../../../hooks';

import ButtonsTab from '../Helper/ViewTypeButtons';
import OverallCompletion from '../Helper/OverallCompletion';
import RateCard from '../Helper/RateCard';

const TopLeadership = ({ completionRate, fetchCompletionRate }) => {
  const [parsedQuery, query] = useQuery();
  const surveyGroupId = parsedQuery?.surveyGroupId;

  useEffect(() => {
    if (surveyGroupId) fetchCompletionRate({ query, surveyGroupId });
  }, [fetchCompletionRate, surveyGroupId]);

  return (
    <div>
      {surveyGroupId && <ButtonsTab activeButtonKey="" />}
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
    </div>
  );
};

TopLeadership.propTypes = {
  fetchCompletionRate: PropTypes.func.isRequired,
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
};

TopLeadership.defaultProps = {
  completionRate: {},
};

export default TopLeadership;
