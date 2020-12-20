import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from './useQuery';

const useRateeSurveyGroup = () => {
  const [parsedQuery, , setQuery] = useQuery();
  const { surveyGroupId, projectId } = parsedQuery;

  const dispatch = useDispatch();
  const _surveyGroups = useSelector((state) => state.projects?.surveyGroups || {});

  const surveyGroups = _surveyGroups?.data?.filter((el) => el.stepsStatus);
  const surveyGroupObject = _surveyGroups.data?.find((el) => el.id * 1 === surveyGroupId * 1) || {};

  React.useEffect(() => {
    if (projectId) dispatch.projects.fetchSurveyGroups({ projectId });
  }, [projectId, dispatch.projects]);

  React.useEffect(() => {
    const sortedArr = _surveyGroups?.data?.sort((el1, el2) => el1.id - el2.id) || [];

    const firstValidSurveyGroupId =
      sortedArr?.length > 0 ? sortedArr.find((el) => el.stepsStatus)?.id : '';

    const isURLSurveyGroupValid = !!sortedArr.find(
      (el) =>
        el.id?.toString() === parsedQuery?.surveyGroupId?.toString() && el.stepsStatus,
    );

    if (
      !isURLSurveyGroupValid &&
      firstValidSurveyGroupId &&
      firstValidSurveyGroupId !== parsedQuery?.surveyGroupId
    ) {
      setQuery({ surveyGroupId: firstValidSurveyGroupId });
    }
    // eslint-disable-next-line
  }, [JSON.stringify(_surveyGroups.data)]);

  const currentSurveyGroupName =
    _surveyGroups?.data?.find((el) => el.id.toString() === parsedQuery?.surveyGroupId?.toString())
      ?.name || '';

  return [surveyGroups, currentSurveyGroupName, surveyGroupId, surveyGroupObject];
};

// eslint-disable-next-line import/prefer-default-export
export { useRateeSurveyGroup };
