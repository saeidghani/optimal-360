import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../Common/SurveyPlatformLayout';
import { dynamicMap } from '../../../routes/RouteMap';

import SelectQuestions from './Helper/SelectQuestions';
import FeedbackQuestions from './Helper/FeedbackQuestions';
import { stringify, useQuery } from '../../../hooks/useQuery';

const AllRateesQuestions = ({
  loading,
  fetchQuestions,
  fetchRelations,
  addQuestionResponses,
  questions,
  relations,
  organization,
  profileName,
}) => {
  const history = useHistory();
  const { surveyGroupId, questionNumber } = useParams();
  const [parsedQuery] = useQuery();
  const { projectId } = parsedQuery || {};

  const [relationValues, setRelationValues] = useState({});
  const [inputQuestionNumber, setInputQuestionNumber] = useState(questionNumber);
  const [jumpQuestion, setJumpQuestion] = useState('');
  const [jumpModalVisible, setJumpModalVisible] = useState(false);
  const [nextIsDisabled, setNextIsDisabled] = useState(false);
  const [isFeedback, setIsFeedback] = useState(false);

  const allRelationIds = React.useMemo(
    () => relations?.data?.map((relation) => relation.relationId),
    [relations.timeStamp],
  );

  useEffect(() => {
    if (surveyGroupId) {
      fetchRelations({ surveyGroupId });
    }
  }, [fetchRelations, surveyGroupId]);

  useEffect(() => {
    if (surveyGroupId && questionNumber && allRelationIds?.length > 0) {
      let relationIds = '';
      let allRelationValues = {};
      // eslint-disable-next-line no-unused-expressions
      allRelationIds?.forEach((relationId) => {
        relationIds += `relation_ids[]=${relationId}&`;
        allRelationValues = {
          ...allRelationValues,
          [relationId]: '',
        };
      });
      setRelationValues(allRelationValues);
      if (relationIds) fetchQuestions({ surveyGroupId, questionNumber, relationIds });
    }
  }, [fetchQuestions, surveyGroupId, questionNumber, allRelationIds]);

  useEffect(() => {
    const isFeedbackQ = questions?.data?.isFeedback === true;
    setIsFeedback(isFeedbackQ);
    const newRelationValues = {};
    // eslint-disable-next-line no-unused-expressions
    questions?.data?.responses?.forEach((res) => {
      if (isFeedbackQ) {
        newRelationValues[res.relationId] = res?.feedbackResponse?.toString() || '';
      } else {
        newRelationValues[res.relationId] = res?.questionResponse?.toString() || null;
      }
    });
    setRelationValues({
      ...relationValues,
      ...newRelationValues,
    });
  }, [questions?.timeStamp]);

  useEffect(() => {
    const isFeedbackQ = questions?.data?.isFeedback === true;
    if (questions?.data?.question?.required) {
      if (questions?.data?.responses?.length < allRelationIds?.length) {
        setNextIsDisabled(true);
      }
      if (!isFeedbackQ) {
        let allResponsesCorrect = true;
        // eslint-disable-next-line no-unused-expressions
        questions?.data?.responses?.forEach((res) => {
          if (res?.questionResponse === null) allResponsesCorrect = false;
        });
        if (!allResponsesCorrect) setNextIsDisabled(true);
      } else {
        let allResponsesCorrect = true;
        // eslint-disable-next-line no-unused-expressions
        questions?.data?.responses?.forEach((res) => {
          if (res?.questionResponse === null) allResponsesCorrect = false;
        });
        if (!allResponsesCorrect) setNextIsDisabled(true);
      }
    } else {
      setNextIsDisabled(false);
    }
  }, [questions, relationValues]);

  useEffect(() => {
    let allIsAnswered = true;
    // eslint-disable-next-line no-unused-expressions
    Object.keys(relationValues)?.forEach((key) => {
      if (!relationValues[key]) allIsAnswered = false;
    });
    if (allIsAnswered) setNextIsDisabled(false);
  }, [relationValues]);

  useEffect(() => {
    setNextIsDisabled(false);
  }, [questionNumber]);

  const dataSource = React.useMemo(() => {
    const row = {};
    // eslint-disable-next-line no-unused-expressions
    questions?.data?.options?.forEach(({ score }) => {
      if (score !== 0) row[score] = { value: score };
    });
    const rows = [];
    // eslint-disable-next-line no-unused-expressions
    relations?.data?.forEach(({ relationId, rateeName, raterGroupName }) => {
      const newRow = {
        ...row,
        key: relationId?.toString(),
        describesThisPerson: rateeName,
      };
      if (raterGroupName === 'self') {
        // eslint-disable-next-line no-unused-expressions
        Object.keys(newRow)?.forEach((key) => {
          if (newRow[key]?.value?.toString() === '0') {
            delete newRow[key];
          }
        });
      }
      rows.push(newRow);
    });
    return rows;
  }, [relations.timeStamp, questions.timeStamp]);

  const ratees = React.useMemo(() => {
    const allRatees = [];
    // eslint-disable-next-line no-unused-expressions
    relations?.data?.forEach(({ relationId, rateeName }) => {
      const ratee = {
        rateeId: relationId,
        rateeName,
      };
      allRatees.push(ratee);
    });
    return allRatees;
  }, [relations?.timeStamp]);

  const responseHandler = () => {
    const responses = [];
    // eslint-disable-next-line no-unused-expressions
    Object.keys(relationValues)?.forEach((key) => {
      if (questions?.data?.question?.required && !relationValues[key]) return;
      const response = {
        relationId: key * 1,
      };
      if (isFeedback) {
        response.feedbackResponse = relationValues[key];
      } else {
        response.questionResponse = !relationValues[key] ? null : relationValues[key] * 1;
      }
      // eslint-disable-next-line no-unused-expressions
      questions?.data?.responses.forEach((res) => {
        if (res?.relationId?.toString() === key?.toString()) response.responseId = res?.responseId;
      });
      responses.push(response);
    });
    return responses;
  };

  const submitResponse = async () => {
    const responses = responseHandler();
    if (responses?.length !== Object.keys(relationValues)?.length) {
      return;
    }
    const questionId = questions?.data?.question?.id;
    if (questionNumber <= questions?.data?.totalQuestions) {
      const body = {
        isFeedback,
        responses,
      };
      try {
        await addQuestionResponses({ surveyGroupId, questionId, ...body });
        setRelationValues({});
        setNextIsDisabled(false);
        if (questionNumber < questions?.data?.totalQuestions) {
          setInputQuestionNumber(questionNumber * 1 + 1);
          history.push(
            `${dynamicMap.surveyPlatform.allRateesQuestions({
              surveyGroupId,
              questionNumber: questionNumber * 1 + 1,
            })}${stringify({ projectId })}`,
          );
        } else {
          history.push(
            `${dynamicMap.surveyPlatform.dashboard()}${stringify({ projectId, surveyGroupId })}`,
          );
        }
      } catch (errors) {}
    }
  };

  const goBack = () => {
    history.push(
      `${dynamicMap.surveyPlatform.allRateesQuestions({
        surveyGroupId,
        questionNumber: questionNumber * 1 - 1,
      })}${stringify({ projectId })}`,
    );
  };

  const handleBack = async () => {
    if (questionNumber * 1 > 1) setInputQuestionNumber(questionNumber * 1 - 1);
    const responses = responseHandler();

    const questionId = questions?.data?.question?.id;
    const body = {
      isFeedback,
      responses,
    };
    if (responses?.length !== Object.keys(relationValues)?.length) {
      setRelationValues({});
      goBack();
    } else {
      try {
        await addQuestionResponses({ surveyGroupId, questionId, ...body });
        setRelationValues({});
        goBack();
      } catch (errors) {}
    }
  };

  const handleInputQuestionNumber = (e) => {
    const { value } = e.target;
    if (value === '' || (value * 1 >= 1 && value * 1 <= questions?.data?.totalQuestions * 1)) {
      setInputQuestionNumber(value);
    }
  };

  const handleSelectQuestionsRelationValues = (e, item, key) => {
    setRelationValues({
      ...relationValues,
      [key]: item?.value,
    });
  };

  const handleFeedbackQuestionsRelationValues = (e, ratee) => {
    setRelationValues({
      ...relationValues,
      [ratee?.rateeId]: e.target.value,
    });
  };

  const handleInputPressEnter = async () => {
    if (inputQuestionNumber) {
      let relationIds = '';
      // eslint-disable-next-line no-unused-expressions
      allRelationIds?.forEach((relationId) => {
        relationIds += `relation_ids[]=${relationId}&`;
      });
      try {
        const res = await fetchQuestions({
          surveyGroupId,
          questionNumber: inputQuestionNumber,
          relationIds,
          skipReducer: true,
        });
        if (inputQuestionNumber?.toString() === res?.data?.data?.questionNumber?.toString()) {
          setInputQuestionNumber(inputQuestionNumber);
          history.push(
            `${dynamicMap.surveyPlatform.allRateesQuestions({
              surveyGroupId,
              questionNumber: inputQuestionNumber,
            })}${stringify({ projectId })}`,
          );
        } else {
          setJumpQuestion(res?.data?.data?.questionNumber);
          setJumpModalVisible(true);
        }
      } catch (err) {}
    }
  };

  const handleJumpOk = () => {
    setJumpModalVisible(false);
    setInputQuestionNumber(jumpQuestion);
    history.push(
      `${dynamicMap.surveyPlatform.allRateesQuestions({
        surveyGroupId,
        questionNumber: jumpQuestion,
      })}${stringify({ projectId })}`,
    );
  };

  const handleJumpCancel = () => {
    setJumpModalVisible(false);
  };

  return (
    <Layout
      hasBreadCrumb
      profileName={profileName}
      organizationSrc={organization?.data?.organizationLogo}
    >
      {!questions?.data?.isFeedback ? (
        <SelectQuestions
          loading={loading}
          nextIsDisabled={nextIsDisabled}
          dataSource={dataSource}
          questions={questions}
          relationValues={relationValues}
          totalRelations={Object.keys(relationValues)?.length}
          jumpModalVisible={jumpModalVisible}
          inputQuestionNumber={inputQuestionNumber}
          jumpQuestion={jumpQuestion}
          onSetRelationValues={handleSelectQuestionsRelationValues}
          onJumpOk={handleJumpOk}
          onJumpCancel={handleJumpCancel}
          onSetInputQuestionNumber={handleInputQuestionNumber}
          onInputPressEnter={handleInputPressEnter}
          onNext={submitResponse}
          onBack={handleBack}
        />
      ) : (
        <FeedbackQuestions
          loading={loading}
          nextIsDisabled={nextIsDisabled}
          questions={questions}
          relationValues={relationValues}
          totalRelations={Object.keys(relationValues)?.length}
          jumpModalVisible={jumpModalVisible}
          inputQuestionNumber={inputQuestionNumber}
          jumpQuestion={jumpQuestion}
          ratees={ratees}
          onSetRelationValues={handleFeedbackQuestionsRelationValues}
          onJumpOk={handleJumpOk}
          onJumpCancel={handleJumpCancel}
          onSetInputQuestionNumber={handleInputQuestionNumber}
          onInputPressEnter={handleInputPressEnter}
          onNext={submitResponse}
          onBack={handleBack}
        />
      )}
    </Layout>
  );
};

AllRateesQuestions.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  addQuestionResponses: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    data: PropTypes.shape({
      totalQuestions: PropTypes.number,
      questionNumber: PropTypes.number,
      isFeedback: PropTypes.bool,
      question: PropTypes.shape({
        id: PropTypes.number,
        statement: PropTypes.string,
        required: PropTypes.bool,
      }),
      options: PropTypes.arrayOf(PropTypes.shape({})),
      responses: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    timeStamp: PropTypes.number,
  }),
  relations: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    timeStamp: PropTypes.number,
  }),
  profileName: PropTypes.string.isRequired,
  organization: PropTypes.shape({
    data: PropTypes.shape({ organizationLogo: PropTypes.string }),
  }),
};

AllRateesQuestions.defaultProps = {
  questions: {},
  relations: {},
  organization: {},
};

export default AllRateesQuestions;
