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
  const [jumpModalVisible, setJumpModalVisible] = useState(false);
  const [showErr, setShowErr] = useState(false);

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
    const isFeedback = questions?.data?.isFeedback === true;
    const newRelationValues = {};
    // eslint-disable-next-line no-unused-expressions
    questions?.data?.responses?.forEach((res) => {
      if (isFeedback) {
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

  const submitResponse = async () => {
    const isFeedback = questions?.data?.isFeedback === true;
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

    if (responses?.length !== Object.keys(relationValues)?.length) {
      setShowErr(true);
      return;
    }
    setShowErr(false);

    const questionId = questions?.data?.question?.id;
    if (questionNumber <= questions?.data?.totalQuestions) {
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

  const handleBack = () => {
    setShowErr(false);
    setInputQuestionNumber(questionNumber * 1 - 1);
    history.push(
      `${dynamicMap.surveyPlatform.allRateesQuestions({
        surveyGroupId,
        questionNumber: questionNumber * 1 - 1,
      })}${stringify({ projectId })}`,
    );
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
        });
        if (inputQuestionNumber?.toString() === res?.data?.data?.questionNumber?.toString()) {
          setShowErr(false);
          setInputQuestionNumber(inputQuestionNumber);
          history.push(
            `${dynamicMap.surveyPlatform.allRateesQuestions({
              surveyGroupId,
              questionNumber: inputQuestionNumber,
            })}${stringify({ projectId })}`,
          );
        } else {
          setJumpModalVisible(true);
        }
      } catch (err) {}
    }
  };

  const handleJumpOk = () => {
    setJumpModalVisible(false);
    setInputQuestionNumber(questions?.data?.questionNumber);
    history.push(
      `${dynamicMap.surveyPlatform.allRateesQuestions({
        surveyGroupId,
        questionNumber: questions?.data?.questionNumber,
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
          showErr={showErr}
          dataSource={dataSource}
          questions={questions}
          relationValues={relationValues}
          totalRelations={Object.keys(relationValues)?.length}
          jumpModalVisible={jumpModalVisible}
          onSetRelationValues={handleSelectQuestionsRelationValues}
          onJumpOk={handleJumpOk}
          onJumpCancel={handleJumpCancel}
          inputQuestionNumber={inputQuestionNumber}
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
          showErr={showErr}
          onSetRelationValues={handleFeedbackQuestionsRelationValues}
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
