import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../Common/SurveyPlatformLayout';
import { dynamicMap } from '../../../routes/RouteMap';

import Questions from './Helper/Questions';
import { stringify } from '../../../hooks/useQuery';

const AllRateesQuestions = ({
  loading,
  fetchQuestions,
  fetchRelations,
  addQuestionResponses,
  questions,
  relations,
}) => {
  const history = useHistory();
  const { surveyGroupId, questionNumber } = useParams();

  const [relationValues, setRelationValues] = React.useState({});
  const [showErr, setShowErr] = React.useState(false);

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
    const newRelationValues = {};
    // eslint-disable-next-line no-unused-expressions
    questions?.data?.responses?.forEach((res) => {
      newRelationValues[res.relationId] = res?.responseScore?.toString() || null;
    });
    setRelationValues({ ...relationValues, ...newRelationValues });
  }, [questions]);

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

  const submitResponse = async () => {
    const responses = [];
    // eslint-disable-next-line no-unused-expressions
    Object.keys(relationValues)?.forEach((key) => {
      if (questions?.data?.question?.required && !relationValues[key]) return;
      const response = {
        relationId: key * 1,
        responseScore: !relationValues[key] ? null : relationValues[key] * 1,
      };
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
      try {
        await addQuestionResponses({ surveyGroupId, questionId, responses });
        setRelationValues({});
        if (questionNumber < questions?.data?.totalQuestions) {
          history.push(
            dynamicMap.surveyPlatform.allRateesQuestions({
              surveyGroupId,
              questionNumber: questionNumber * 1 + 1,
            }),
          );
        } else {
          history.push(
            dynamicMap.surveyPlatform.allRateesFeedbacks({
              surveyGroupId,
              feedbackNumber: 1,
            }),
          );
        }
      } catch (errors) {}
    }
  };

  const handleBack = () => {
    setShowErr(false);
    history.push(
      dynamicMap.surveyPlatform.allRateesQuestions({
        surveyGroupId,
        questionNumber: questionNumber * 1 - 1,
      }),
    );
  };

  return (
    <Layout hasBreadCrumb>
      <Questions
        loading={loading}
        showErr={showErr}
        options={questions?.data?.options}
        dataSource={dataSource}
        questions={questions}
        relationValues={relationValues}
        onBack={handleBack}
        onSetRelationValues={(e, item, key) => {
          setRelationValues({ ...relationValues, [key]: item?.value });
        }}
        onNext={submitResponse}
      />
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
};

AllRateesQuestions.defaultProps = {
  questions: {},
  relations: {},
};

export default AllRateesQuestions;
