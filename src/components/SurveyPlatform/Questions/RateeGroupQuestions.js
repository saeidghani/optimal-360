import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../Common/SurveyPlatformLayout';
import { dynamicMap } from '../../../routes/RouteMap';
import { useQuery, stringify } from '../../../hooks/useQuery';

import SelectQuestions from './Helper/SelectQuestions';
import FeedbackQuestions from './Helper/FeedbackQuestions';

const RateeGroupQuestions = ({
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
  const { relation, projectId } = parsedQuery;

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
    if (surveyGroupId && questionNumber && relation) {
      let relationIds = '';
      let allRelationValues = {};
      // eslint-disable-next-line no-unused-expressions
      const relationsGroup = relations?.data?.filter(
        ({ raterGroupName }) => raterGroupName === relation,
      );
      // eslint-disable-next-line no-unused-expressions
      relationsGroup?.forEach(({ relationId }) => {
        relationIds += `relation_ids[]=${relationId}&`;
        allRelationValues = {
          ...allRelationValues,
          [relationId]: '',
        };
      });
      setRelationValues(allRelationValues);
      if (relationIds) fetchQuestions({ surveyGroupId, questionNumber, relationIds });
    }
  }, [fetchQuestions, surveyGroupId, questionNumber, relations, relation]);

  useEffect(() => {
    setIsFeedback(questions?.data?.isFeedback === true);
    const newRelationValues = {};
    // eslint-disable-next-line no-unused-expressions
    questions?.data?.responses?.forEach((res) => {
      if (isFeedback) {
        newRelationValues[res.relationId] = res?.feedbackResponse?.toString() || '';
      } else {
        newRelationValues[res.relationId] = res?.questionResponse?.toString() || null;
      }
    });
    setRelationValues({ ...relationValues, ...newRelationValues });
  }, [questions?.timeStamp]);

  useEffect(() => {
    const isFeedbackQ = questions?.data?.isFeedback === true;
    const relationsGroup = relations?.data?.filter(
      ({ raterGroupName }) => raterGroupName === relation,
    );
    if (questions?.data?.question?.required) {
      if (questions?.data?.responses?.length < relationsGroup?.length) {
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
      row[score] = { value: score };
    });
    const rows = [];
    // eslint-disable-next-line no-unused-expressions
    const relationsGroup = relations?.data?.filter(
      ({ raterGroupName }) => raterGroupName === relation,
    );
    // eslint-disable-next-line no-unused-expressions
    relationsGroup?.forEach(({ relationId, rateeName, raterGroupName }) => {
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
    const relationsGroup = relations?.data?.filter(
      ({ raterGroupName }) => raterGroupName === relation,
    );
    // eslint-disable-next-line no-unused-expressions
    relationsGroup?.forEach(({ relationId, rateeName }) => {
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
    if (questionNumber <= questions?.data?.totalQuestions) {
      const questionId = questions?.data?.question?.id;
      const body = {
        isFeedback,
        responses,
      };
      try {
        await addQuestionResponses({ surveyGroupId, questionId, ...body });
        setRelationValues({});
        if (questionNumber < questions?.data?.totalQuestions) {
          setInputQuestionNumber(questionNumber * 1 + 1);
          history.push(
            `${dynamicMap.surveyPlatform.rateeGroupQuestions({
              surveyGroupId,
              questionNumber: questionNumber * 1 + 1,
            })}${stringify({ relation, projectId })}`,
          );
        } else {
          history.push(
            `${dynamicMap.surveyPlatform.dashboard()}${stringify({ projectId, surveyGroupId })}`,
          );
        }
      } catch (errors) {}
    }
  };

  const handleBack = async () => {
    if (questionNumber * 1 > 1) setInputQuestionNumber(questionNumber * 1 - 1);
    const responses = responseHandler();

    const questionId = questions?.data?.question?.id;
    const body = {
      isFeedback,
      responses,
    };
    try {
      await addQuestionResponses({ surveyGroupId, questionId, ...body });
      setRelationValues({});
      history.push(
        `${dynamicMap.surveyPlatform.rateeGroupQuestions({
          surveyGroupId,
          questionNumber: questionNumber * 1 - 1,
        })}${stringify({ relation, projectId })}`,
      );
    } catch (errors) {}
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
      const relationsGroup = relations?.data?.filter(
        ({ raterGroupName }) => raterGroupName === relation,
      );
      // eslint-disable-next-line no-unused-expressions
      relationsGroup?.forEach(({ relationId }) => {
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
            `${dynamicMap.surveyPlatform.rateeGroupQuestions({
              surveyGroupId,
              questionNumber: inputQuestionNumber,
            })}${stringify({ relation, projectId })}`,
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
      `${dynamicMap.surveyPlatform.rateeGroupQuestions({
        surveyGroupId,
        questionNumber: jumpQuestion,
      })}${stringify({ relation, projectId })}`,
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
          onBack={handleBack}
          onNext={submitResponse}
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
          jumpQuestion={jumpQuestion}
          onSetInputQuestionNumber={handleInputQuestionNumber}
          onInputPressEnter={handleInputPressEnter}
          onNext={submitResponse}
          onBack={handleBack}
        />
      )}
    </Layout>
  );
};

RateeGroupQuestions.propTypes = {
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

RateeGroupQuestions.defaultProps = {
  questions: {},
  relations: {},
  organization: {},
};

export default RateeGroupQuestions;
