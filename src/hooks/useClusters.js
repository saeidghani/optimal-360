import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useQuery } from './useQuery';
import { useSurveyGroup } from './useSurveyGroup';

const useClusters = () => {
  const [parsedQuery] = useQuery();

  const surveyQuestions = useSelector((state) => state.wizard?.surveyQuestions);
  const dispatch = useDispatch();

  const surveyQuestionsStringified = JSON.stringify(surveyQuestions);

  const [, , surveyGroupId] = useSurveyGroup();

  React.useEffect(() => {
    dispatch.wizard.fetchSurveyQuestions(surveyGroupId);
  }, [surveyGroupId, dispatch.wizard]);

  const firstClusterItem = React.useMemo(() => {
    return surveyQuestions?.clusters?.length > 0 ? surveyQuestions.clusters[0] : {};
    // eslint-disable-next-line
  }, [surveyQuestionsStringified]);

  const selectedCluster = React.useMemo(() => {
    return surveyQuestions?.clusters?.length > 0
      ? surveyQuestions.clusters.find((el) => el.id * 1 === parsedQuery.clusterId * 1)
      : {};
    // eslint-disable-next-line
  }, [surveyQuestionsStringified, parsedQuery.clusterId]);

  const selectedCompetency = React.useMemo(() => {
    return selectedCluster?.competencies?.length > 0
      ? selectedCluster.competencies.find((el) => el.id * 1 === parsedQuery.competencyId * 1)
      : {};
    // eslint-disable-next-line
  }, [surveyQuestionsStringified, parsedQuery.competencyId]);

  return [surveyQuestions, firstClusterItem, selectedCluster, selectedCompetency];
};

// eslint-disable-next-line import/prefer-default-export
export { useClusters };
