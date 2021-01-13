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
  const [inputQuestionNumber, setInputQuestionNumber] = useState(questionNumber);
  const [jumpQuestion, setJumpQuestion] = useState('');
  const [jumpModalVisible, setJumpModalVisible] = useState(false);
  const [nextIsDisabled, setNextIsDisabled] = useState(false);
  const [isFeedback, setIsFeedback] = useState(false);

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
    const isFeedbackQ = questions?.data?.isFeedback === true;
    setIsFeedback(isFeedbackQ);
    if (questions?.data?.responses?.length > 0) {
      const newRelationValues = {};
      if (isFeedbackQ) {
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
    const isFeedbackQ = questions?.data?.isFeedback === true;
    if (questions?.data?.question?.required) {
      if (questions?.data?.responses?.length === 0) {
        setNextIsDisabled(true);
      }
      if (!isFeedbackQ) {
        if (questions?.data?.responses[0]?.questionResponse === null) {
          setNextIsDisabled(true);
        }
      } else if (questions?.data?.responses[0]?.feedbackResponse === null) {
        setNextIsDisabled(true);
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

  const responseHandler = () => {
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
    responses.push(response);
    return { response, responses };
  };

  const submitResponse = async () => {
    const { response, responses } = responseHandler();

    if (
      questions?.data?.question?.required &&
      ((!isFeedback && response?.questionResponse === null) ||
        (isFeedback && !response?.feedbackResponse))
    ) {
      setNextIsDisabled(false);
      return;
    }
    setNextIsDisabled(false);

    if (questionNumber <= questions?.data?.totalQuestions) {
      const questionId = questions?.data?.question?.id;
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

  const goBack = () => {
    history.push(
      `${dynamicMap.surveyPlatform.individualQuestions({
        surveyGroupId,
        questionNumber: questionNumber * 1 - 1,
      })}${stringify({ relationId, projectId })}`,
    );
  };

  const handleBack = async () => {
    const { responses, response } = responseHandler();
    setNextIsDisabled(false);
    if (questionNumber * 1 > 1) setInputQuestionNumber(questionNumber * 1 - 1);

    const questionId = questions?.data?.question?.id;
    const body = {
      isFeedback,
      responses,
    };
    if (
      questions?.data?.question?.required &&
      ((!isFeedback && response?.questionResponse === null) ||
        (isFeedback && !response?.feedbackResponse))
    ) {
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
      try {
        const res = await fetchQuestions({
          surveyGroupId,
          questionNumber: inputQuestionNumber,
          relationIds: `relation_ids[]=${relationId}`,
          skipReducer: true,
        });
        if (inputQuestionNumber?.toString() === res?.data?.data?.questionNumber?.toString()) {
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
          jumpModalVisible={jumpModalVisible}
          jumpQuestion={jumpQuestion}
          inputQuestionNumber={inputQuestionNumber}
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
          questions={questions}
          ratees={ratees}
          relationValues={relationValues}
          totalRelations={Object.keys(relationValues)?.length}
          nextIsDisabled={nextIsDisabled}
          jumpModalVisible={jumpModalVisible}
          jumpQuestion={jumpQuestion}
          inputQuestionNumber={inputQuestionNumber}
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
