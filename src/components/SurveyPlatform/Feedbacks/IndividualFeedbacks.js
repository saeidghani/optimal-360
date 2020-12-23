import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../Common/SurveyPlatformLayout';
import { useQuery } from '../../../hooks';
import { stringify } from '../../../hooks/useQuery';
import { dynamicMap } from '../../../routes/RouteMap';

import Feedbacks from './Helper/Feedbacks';

const IndividualFeedbacks = ({
  loading,
  questions,
  feedbacks,
  relations,
  fetchRelations,
  fetchFeedbacks,
  addFeedbackResponses,
  profileName,
}) => {
  const history = useHistory();
  const { surveyGroupId, feedbackNumber } = useParams();
  const [parsedQuery] = useQuery();
  const { relationId } = parsedQuery;

  const [relationValues, setRelationValues] = useState({});
  const [showErr, setShowErr] = useState(false);

  useEffect(() => {
    if (surveyGroupId && feedbackNumber && relationId) {
      fetchFeedbacks({
        surveyGroupId,
        feedbackNumber,
        relationIds: `relation_ids[]=${relationId}`,
      });
      setRelationValues({ [relationId]: null });
    }
  }, [fetchFeedbacks, surveyGroupId, feedbackNumber, relationId]);

  useEffect(() => {
    if (surveyGroupId) {
      fetchRelations({ surveyGroupId });
    }
  }, [fetchRelations, surveyGroupId]);

  const ratees = React.useMemo(() => {
    const relation = relations?.data?.find(
      (rel) => rel?.relationId?.toString() === relationId?.toString(),
    );
    const { relationId: rateeId, rateeName } = relation || {};
    return [{ rateeId, rateeName }];
  }, [relations?.timeStamp]);

  const submitResponse = async () => {
    const responses = [];
    const newResponse = {};
    // eslint-disable-next-line no-unused-expressions
    Object.keys(relationValues)?.forEach((key) => {
      newResponse.relationId = key * 1;
      newResponse.response = relationValues[key];
      // eslint-disable-next-line no-unused-expressions
      feedbacks?.data?.responses.forEach((res) => {
        if (res?.relationId?.toString() === key?.toString()) {
          newResponse.responseId = res?.responseId;
        }
      });
    });
    if (feedbacks?.data?.feedback?.required && !newResponse?.response) {
      setShowErr(true);
      return;
    }
    setShowErr(false);

    responses.push(newResponse);
    const feedbackId = feedbacks?.data?.feedback?.id;
    if (feedbackNumber <= feedbacks?.data?.totalFeedbacks) {
      try {
        await addFeedbackResponses({ surveyGroupId, feedbackId, responses });
        setRelationValues({});
        if (feedbackNumber < feedbacks?.data?.totalFeedbacks) {
          history.push(
            `${dynamicMap.surveyPlatform.individualFeedbacks({
              surveyGroupId,
              feedbackNumber: feedbackNumber * 1 + 1,
            })}${stringify({ relationId })}`,
          );
        } else {
          history.push(
            dynamicMap.surveyPlatform.dashboard({
              surveyGroupId,
            }),
          );
        }
      } catch (errors) {}
    }
  };

  const handleBack = () => {
    if (feedbackNumber?.toString() === '1') {
      history.push(
        `${dynamicMap.surveyPlatform.individualQuestions({
          surveyGroupId,
          questionNumber: questions?.data?.totalQuestions,
        })}${stringify({ relationId })}`,
      );
    } else {
      history.push(
        `${dynamicMap.surveyPlatform.individualFeedbacks({
          surveyGroupId,
          feedbackNumber: feedbackNumber * 1 - 1,
        })}${stringify({ relationId })}`,
      );
    }
  };

  return (
    <Layout hasBreadCrumb profileName={profileName}>
      <Feedbacks
        loading={loading}
        feedbacks={feedbacks}
        ratees={ratees}
        relationValues={relationValues}
        totalRelations={Object.keys(relationValues)?.length}
        showErr={showErr}
        onSetRelationValues={(e, ratee) =>
          setRelationValues({ ...relationValues, [ratee?.rateeId]: e.target.value })
        }
        onNext={submitResponse}
        onBack={handleBack}
      />
    </Layout>
  );
};

IndividualFeedbacks.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  fetchFeedbacks: PropTypes.func.isRequired,
  addFeedbackResponses: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    data: PropTypes.shape({
      totalQuestions: PropTypes.number,
    }),
  }),
  feedbacks: PropTypes.shape({
    data: PropTypes.shape({
      totalFeedbacks: PropTypes.number,
      feedback: PropTypes.shape({
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
};

IndividualFeedbacks.defaultProps = {
  questions: {},
  feedbacks: {},
  relations: {},
};

export default IndividualFeedbacks;
