import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../Common/SurveyPlatformLayout';
import { dynamicMap } from '../../../routes/RouteMap';
import { useQuery, stringify } from '../../../hooks/useQuery';

import Questions from './Helper/Questions';

const IndividualQuestions = ({
  loading,
  fetchRelations,
  fetchQuestions,
  addQuestionResponses,
  questions,
  relations,
}) => {
  const history = useHistory();
  const { surveyGroupId, questionNumber } = useParams();
  const [parsedQuery] = useQuery();
  const { relationId } = parsedQuery || {};

  const [relationValues, setRelationValues] = React.useState({});
  const [showErr, setShowErr] = React.useState(false);

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
    if (questions?.data?.responses?.length > 0) {
      const newRelationValues = {};
      newRelationValues[relationId] =
        questions?.data?.responses[0]?.responseScore?.toString() || '';
      setRelationValues({ ...relationValues, ...newRelationValues });
    }
  }, [questions]);

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

  const submitResponse = async () => {
    const responses = [];
    const response = {};
    // eslint-disable-next-line no-unused-expressions
    Object.keys(relationValues)?.forEach((key) => {
      response.relationId = key * 1;
      response.responseScore = !relationValues[key] ? null : relationValues[key] * 1;
      // eslint-disable-next-line no-unused-expressions
      questions?.data?.responses.forEach((res) => {
        if (res?.relationId?.toString() === key?.toString()) {
          response.responseId = res?.responseId;
        }
      });
    });
    if (questions?.data?.question?.required && response?.responseScore === null) {
      setShowErr(true);
      return;
    }
    setShowErr(false);

    responses.push(response);
    const questionId = questions?.data?.question?.id;
    if (questionNumber <= questions?.data?.totalQuestions) {
      try {
        await addQuestionResponses({ surveyGroupId, questionId, responses });
        setRelationValues({});
        if (questionNumber < questions?.data?.totalQuestions) {
          history.push(
            `${dynamicMap.surveyPlatform.individualQuestions({
              surveyGroupId,
              questionNumber: questionNumber * 1 + 1,
            })}${stringify({ relationId })}`,
          );
        } else {
          history.push(
            `${dynamicMap.surveyPlatform.individualFeedbacks({
              surveyGroupId,
              feedbackNumber: 1,
            })}${stringify({ relationId })}`,
          );
        }
      } catch (errors) {}
    }
  };

  const handleBack = () => {
    setShowErr(false);
    history.push(
      `${dynamicMap.surveyPlatform.individualQuestions({
        surveyGroupId,
        questionNumber: questionNumber * 1 - 1,
      })}${stringify({ relationId })}`,
    );
  };

  return (
    <Layout hasBreadCrumb>
      <Questions
        loading={loading}
        dataSource={dataSource}
        questions={questions}
        relationValues={relationValues}
        showErr={showErr}
        onSetRelationValues={(e, item, key) =>
          setRelationValues({ ...relationValues, [key]: item?.value })
        }
        onNext={submitResponse}
        onBack={handleBack}
      />
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
      totalQuestions: PropTypes.number,
      question: PropTypes.shape({
        id: PropTypes.number,
        statement: PropTypes.string,
        required: PropTypes.bool,
      }),
      options: PropTypes.arrayOf(PropTypes.shape({})),
      responses: PropTypes.arrayOf(PropTypes.shape({ responseScore: PropTypes.string })),
    }),
    timeStamp: PropTypes.number,
  }),
  relations: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    timeStamp: PropTypes.number,
  }),
};

IndividualQuestions.defaultProps = {
  questions: {},
  relations: {},
};

export default IndividualQuestions;
