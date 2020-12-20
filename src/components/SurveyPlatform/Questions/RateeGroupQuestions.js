import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../Common/SurveyPlatformLayout';
import { dynamicMap } from '../../../routes/RouteMap';
import { useQuery, stringify } from '../../../hooks/useQuery';

import Questions from './Helper/Questions';

const RateeGroupQuestions = ({
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
  const { relation } = parsedQuery;

  const [relationValues, setRelationValues] = React.useState({});

  React.useEffect(() => {
    if (surveyGroupId) {
      fetchRelations({ surveyGroupId });
    }
  }, [fetchRelations, surveyGroupId]);

  React.useEffect(() => {
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

  React.useEffect(() => {
    const newRelationValues = { ...relationValues };
    // eslint-disable-next-line no-unused-expressions
    questions?.data?.responses?.forEach((res) => {
      newRelationValues[res.relationId] = res?.responseScore?.toString();
    });
    setRelationValues(newRelationValues);
  }, [questions]);

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

  const submitResponse = async () => {
    const responses = [];
    // eslint-disable-next-line no-unused-expressions
    Object.keys(relationValues)?.forEach((key) => {
      if (questions?.data?.question?.required && !relationValues[key]) return;
      const response = {
        relationId: key * 1,
        responseScore: relationValues[key] === '' ? null : relationValues[key] * 1,
      };
      // eslint-disable-next-line no-unused-expressions
      questions?.data?.responses.forEach((res) => {
        if (res?.relationId?.toString() === key?.toString()) response.responseId = res?.responseId;
      });
      responses.push(response);
    });
    if (responses?.length !== Object.keys(relationValues)?.length) return;
    const questionId = questions?.data?.question?.id;
    if (questionNumber <= questions?.data?.totalQuestions) {
      try {
        await addQuestionResponses({ surveyGroupId, questionId, responses });
        setRelationValues({});
        if (questionNumber < questions?.data?.totalQuestions) {
          history.push(
            `${dynamicMap.surveyPlatform.rateeGroupQuestions({
              surveyGroupId,
              questionNumber: questionNumber * 1 + 1,
            })}${stringify({ relation })}`,
          );
        } else {
          history.push(
            `${dynamicMap.surveyPlatform.rateeGroupFeedbacks({
              surveyGroupId,
              feedbackNumber: 1,
            })}${stringify({ relation })}`,
          );
        }
      } catch (errors) {}
    }
  };

  return (
    <Layout hasBreadCrumb>
      <Questions
        loading={loading}
        dataSource={dataSource}
        options={questions?.data?.options}
        questions={questions}
        relationValues={relationValues}
        onSetRelationValues={(e, item, key) =>
          setRelationValues({ ...relationValues, [key]: item?.value })
        }
        onNext={submitResponse}
      />
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

RateeGroupQuestions.defaultProps = {
  questions: {},
  relations: {},
};

export default RateeGroupQuestions;
