export const findProgressAvg = (relations) => {
  const avgs = [];
  // eslint-disable-next-line no-unused-expressions
  relations?.forEach((item) => {
    const avg = parseInt((item.totalAnswers / item.totalQuestions) * 100, 10);
    avgs.push(avg);
  });
  let result = 0;
  if (avgs?.length > 0) {
    const avgsSum = avgs.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    result = parseInt(avgsSum / avgs.length, 10) || 0;
  }
  return result;
};

export const findInitialAllQuestionNumber = (projectId, surveyGroupId) => {
  let initialQuestionNumber = 1;
  const lastVisitedQuestionStr = localStorage.getItem('lastVisitedQuestion');
  if (lastVisitedQuestionStr) {
    const { prevAllQuestion } = JSON.parse(lastVisitedQuestionStr) || {};
    if (
      projectId === prevAllQuestion?.projectId &&
      surveyGroupId === prevAllQuestion?.surveyGroupId
    ) {
      initialQuestionNumber = prevAllQuestion?.questionNumber;
    }
  }
  return initialQuestionNumber;
};

export const findInitialIndividualQuestionNumber = (projectId, surveyGroupId, relationId) => {
  let initialQuestionNumber = 1;
  const lastVisitedQuestionStr = localStorage.getItem('lastVisitedQuestion');
  if (lastVisitedQuestionStr) {
    const { prevIndividualQuestion } = JSON.parse(lastVisitedQuestionStr) || {};
    if (
      projectId === prevIndividualQuestion?.projectId &&
      surveyGroupId === prevIndividualQuestion?.surveyGroupId &&
      relationId === prevIndividualQuestion?.relationId
    ) {
      initialQuestionNumber = prevIndividualQuestion?.questionNumber;
    }
  }
  return initialQuestionNumber;
};

export const findInitialRateeGroupQuestionNumber = (projectId, surveyGroupId, relation) => {
  let initialQuestionNumber = 1;
  const lastVisitedQuestionStr = localStorage.getItem('lastVisitedQuestion');
  if (lastVisitedQuestionStr) {
    const { prevRateeGroupQuestion } = JSON.parse(lastVisitedQuestionStr) || {};
    if (
      projectId === prevRateeGroupQuestion?.projectId &&
      surveyGroupId === prevRateeGroupQuestion?.surveyGroupId &&
      relation === prevRateeGroupQuestion?.relation
    ) {
      initialQuestionNumber = prevRateeGroupQuestion?.questionNumber;
    }
  }
  return initialQuestionNumber;
};
