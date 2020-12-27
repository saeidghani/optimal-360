import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../Common/SurveyPlatformLayout';
import { dynamicMap } from '../../../routes/RouteMap';
import { useQuery, stringify } from '../../../hooks/useQuery';

import SelectQuestions from './Helper/SelectQuestions';
import FeedbackQuestions from './Helper/FeedbackQuestions';

const IndividualQuestions = ({
  loading,
  fetchRelations,
  fetchQuestions,
  addQuestionResponses,
  questions,
  relations,
  organization,
  profileName,
}) => {
  const history = useHistory();
  const { surveyGroupId, questionNumber } = useParams();
  const [parsedQuery] = useQuery();
  const { relationId, projectId } = parsedQuery || {};

  const [relationValues, setRelationValues] = useState({});
  const [newAnswersCount, setNewAnswersCount] = useState(0);
  const [inputQuestionNumber, setInputQuestionNumber] = useState(questionNumber);
  const [jumpQuestion, setJumpQuestion] = useState('');
  const [jumpModalVisible, setJumpModalVisible] = useState(false);
  const [nextIsDisabled, setNextIsDisabled] = useState(false);

  useEffect(() => {
    if (surveyGroupId) {
      fetchRelations({ surveyGroupId });
    }
  }, [fetchRelations, surveyGroupId]);

  useEffect(() => {
    if (surveyGroupId && questionNumber && relationId) {
      setRelationValues({ [relationId]: '' });
      fetchQuestions({
        surveyGroupId,
        questionNumber,
        relationIds: `relation_ids[]=${relationId}`,
      });
    }
  }, [fetchQuestions, surveyGroupId, questionNumber, relationId]);

  useEffect(() => {
    const isFeedback = questions?.data?.isFeedback === true;
    if (questions?.data?.responses?.length > 0) {
      const newRelationValues = {};
      if (isFeedback) {
        newRelationValues[relationId] =
          questions?.data?.responses[0]?.feedbackResponse?.toString() || '';
      } else {
        newRelationValues[relationId] =
          questions?.data?.responses[0]?.questionResponse?.toString() || null;
      }
      setRelationValues({ ...relationValues, ...newRelationValues });
    }
  }, [questions?.timeStamp]);

  useEffect(() => {
    const isFeedback = questions?.data?.isFeedback === true;
    if (questions?.data?.question?.required) {
      if (!isFeedback) {
        if (
          questions?.data?.responses?.length === 0 ||
          questions?.data?.responses[0]?.questionResponse === null
        ) {
          setNextIsDisabled(true);
        }
      } else if (
        questions?.data?.responses?.length === 0 ||
        questions?.data?.responses[0]?.questionResponse === null
      ) {
        setNextIsDisabled(true);
      }
    }
    let allIsAnswered = true;
    // eslint-disable-next-line no-unused-expressions
    Object.keys(relationValues)?.forEach((key) => {
      if (!relationValues[key]) allIsAnswered = false;
    });
    if (allIsAnswered) setNextIsDisabled(false);
  }, [questions, newAnswersCount, relationValues]);

  useEffect(() => {
    setNextIsDisabled(false);
  }, [questionNumber]);

  const dataSource = React.useMemo(() => {
    const rows = [];
    const row = {};
    // eslint-disable-next-line no-unused-expressions
    questions?.data?.options?.forEach(({ score }) => {
      row[score] = { value: score };
    });
    const currentRelation =
      relations?.data?.find(
        (relation) => relation?.relationId?.toString() === relationId?.toString(),
      ) || {};
    const newRow = {
      ...row,
      key: relationId?.toString(),
      describesThisPerson: currentRelation?.rateeName,
    };
    if (currentRelation?.raterGroupName === 'self') {
      // eslint-disable-next-line no-unused-expressions
      Object.keys(newRow)?.forEach((key) => {
        if (newRow[key]?.value?.toString() === '0') {
          delete newRow[key];
        }
      });
    }
    rows.push(newRow);
    return rows;
  }, [relations.timeStamp, questions.timeStamp]);

  const ratees = React.useMemo(() => {
    const relation = relations?.data?.find(
      (rel) => rel?.relationId?.toString() === relationId?.toString(),
    );
    const { relationId: rateeId, rateeName } = relation || {};
    return [{ rateeId, rateeName }];
  }, [relations?.timeStamp]);

  const submitResponse = async () => {
    const isFeedback = questions?.data?.isFeedback === true;
    const responses = [];
    const response = {};
    // eslint-disable-next-line no-unused-expressions
    Object.keys(relationValues)?.forEach((key) => {
      response.relationId = key * 1;
      if (isFeedback) {
        response.feedbackResponse = relationValues[key];
      } else {
        response.questionResponse = !relationValues[key] ? null : relationValues[key] * 1;
      }
      // eslint-disable-next-line no-unused-expressions
      questions?.data?.responses.forEach((res) => {
        if (res?.relationId?.toString() === key?.toString()) {
          response.responseId = res?.responseId;
        }
      });
    });
    if (
      questions?.data?.question?.required &&
      ((!isFeedback && response?.questionResponse === null) ||
        (isFeedback && !response?.feedbackResponse))
    ) {
      setNextIsDisabled(false);
      return;
    }
    setNextIsDisabled(false);

    responses.push(response);
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
        setNewAnswersCount(0);
        if (questionNumber < questions?.data?.totalQuestions) {
          setInputQuestionNumber(questionNumber * 1 + 1);
          history.push(
            `${dynamicMap.surveyPlatform.individualQuestions({
              surveyGroupId,
              questionNumber: questionNumber * 1 + 1,
            })}${stringify({ relationId, projectId })}`,
          );
        } else {
          history.push(
            `${dynamicMap.surveyPlatform.dashboard()}${stringify({ projectId, surveyGroupId })}`,
          );
        }
      } catch (errors) {}
    }
  };

  const handleBack = () => {
    setNextIsDisabled(false);
    setNewAnswersCount(0);
    setInputQuestionNumber(questionNumber * 1 - 1);
    history.push(
      `${dynamicMap.surveyPlatform.individualQuestions({
        surveyGroupId,
        questionNumber: questionNumber * 1 - 1,
      })}${stringify({ relationId, projectId })}`,
    );
  };

  const handleInputQuestionNumber = (e) => {
    const { value } = e.target;
    if (value === '' || (value * 1 >= 1 && value * 1 <= questions?.data?.totalQuestions * 1)) {
      setInputQuestionNumber(value);
    }
  };

  const handleSelectQuestionsRelationValues = (e, item, key) => {
    setNewAnswersCount((count) => count + 1);
    setRelationValues({
      ...relationValues,
      [key]: item?.value,
    });
  };

  const handleFeedbackQuestionsRelationValues = (e, ratee) => {
    setNewAnswersCount((count) => count + 1);
    setRelationValues({
      ...relationValues,
      [ratee?.rateeId]: e.target.value,
    });
  };

  const handleInputPressEnter = async () => {
    if (inputQuestionNumber) {
      try {
        const res = await fetchQuestions({
          surveyGroupId,
          questionNumber: inputQuestionNumber,
          relationIds: `relation_ids[]=${relationId}`,
          skipReducer: true,
        });
        if (inputQuestionNumber?.toString() === res?.data?.data?.questionNumber?.toString()) {
          setNextIsDisabled(false);
          setNewAnswersCount(0);
          setInputQuestionNumber(inputQuestionNumber);
          history.push(
            `${dynamicMap.surveyPlatform.individualQuestions({
              surveyGroupId,
              questionNumber: inputQuestionNumber,
            })}${stringify({ relationId, projectId })}`,
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
    setNextIsDisabled(false);
    setNewAnswersCount(0);
    setInputQuestionNumber(jumpQuestion);
    history.push(
      `${dynamicMap.surveyPlatform.individualQuestions({
        surveyGroupId,
        questionNumber: jumpQuestion,
      })}${stringify({ relationId, projectId })}`,
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
          onSetRelationValues={handleSelectQuestionsRelationValues}
          jumpModalVisible={jumpModalVisible}
          onJumpOk={handleJumpOk}
          onJumpCancel={handleJumpCancel}
          inputQuestionNumber={inputQuestionNumber}
          jumpQuestion={jumpQuestion}
          onSetInputQuestionNumber={handleInputQuestionNumber}
          onInputPressEnter={handleInputPressEnter}
          onNext={submitResponse}
          onBack={handleBack}
        />
      ) : (
        <FeedbackQuestions
          loading={loading}
          questions={questions}
          ratees={ratees}
          relationValues={relationValues}
          totalRelations={Object.keys(relationValues)?.length}
          nextIsDisabled={nextIsDisabled}
          onSetRelationValues={handleFeedbackQuestionsRelationValues}
          jumpModalVisible={jumpModalVisible}
          onJumpOk={handleJumpOk}
          onJumpCancel={handleJumpCancel}
          inputQuestionNumber={inputQuestionNumber}
          onSetInputQuestionNumber={handleInputQuestionNumber}
          onInputPressEnter={handleInputPressEnter}
          onNext={submitResponse}
          onBack={handleBack}
        />
      )}
    </Layout>
  );
};

IndividualQuestions.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  addQuestionResponses: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    data: PropTypes.shape({
      questionNumber: PropTypes.number,
      totalQuestions: PropTypes.number,
      isFeedback: PropTypes.bool,
      question: PropTypes.shape({
        id: PropTypes.number,
        statement: PropTypes.string,
        required: PropTypes.bool,
      }),
      options: PropTypes.arrayOf(PropTypes.shape({})),
      responses: PropTypes.arrayOf(
        PropTypes.shape({ feedbackResponse: PropTypes.string, questionResponse: PropTypes.string }),
      ),
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

IndividualQuestions.defaultProps = {
  questions: {},
  relations: {},
  organization: {},
};

export default IndividualQuestions;
