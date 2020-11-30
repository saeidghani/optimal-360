import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from './useQuery';

const useSurveyGroup = () => {
  const [parsedQuery, , setQuery] = useQuery();
  const { surveyGroupId, projectId } = parsedQuery;

  const dispatch = useDispatch();
  const surveyGroups = useSelector((state) => state.projects?.surveyGroups || {});

  React.useEffect(() => {
    if (projectId) dispatch.projects.fetchSurveyGroups({ projectId });
  }, [projectId, dispatch.projects]);

  React.useEffect(() => {
    const sortedArr = surveyGroups?.data?.sort((el1, el2) => el1.id - el2.id) || [];

    const firstValidSurveyGroupId =
      sortedArr?.length > 0 ? sortedArr.find((el) => el.status === 'inactive')?.id : '';

    const isURLSurveyGroupValid = !!sortedArr.find(
      (el) =>
        el.id?.toString() === parsedQuery?.surveyGroupId?.toString() && el.status === 'inactive',
    );

    if (
      !isURLSurveyGroupValid &&
      firstValidSurveyGroupId &&
      firstValidSurveyGroupId !== parsedQuery?.surveyGroupId
    ) {
      setQuery({ surveyGroupId: firstValidSurveyGroupId });
    }
    // eslint-disable-next-line
  }, [JSON.stringify(surveyGroups.data)]);

  const currentSurveyGroupName =
    surveyGroups?.data?.find((el) => el.id.toString() === parsedQuery?.surveyGroupId?.toString())
      ?.name || '';

  return [surveyGroups, currentSurveyGroupName, surveyGroupId];
};

// eslint-disable-next-line import/prefer-default-export
export { useSurveyGroup };
