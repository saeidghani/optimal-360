import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../Common/SurveyPlatformLayout';
import { useQuery } from '../../../hooks';
import { stringify } from '../../../hooks/useQuery';
import { dynamicMap } from '../../../routes/RouteMap';

import Feedbacks from './Helper/Feedbacks';

const IndividualFeedbacks = ({
  loading,
  feedbacks,
  relations,
  fetchRelations,
  fetchFeedbacks,
  addFeedbackResponses,
}) => {
  const history = useHistory();
  const { surveyGroupId, feedbackNumber } = useParams();
  const [parsedQuery] = useQuery();
  const { relationId } = parsedQuery;

  const [relationValues, setRelationValues] = React.useState({});
  const [showErr, setShowErr] = React.useState(false);

  React.useEffect(() => {
    if (surveyGroupId && feedbackNumber && relationId) {
      fetchFeedbacks({
        surveyGroupId,
        feedbackNumber,
        relationIds: `relation_ids[]=${relationId}`,
      });
      setRelationValues({ [relationId]: null });
    }
  }, [fetchFeedbacks, surveyGroupId, feedbackNumber, relationId]);

  React.useEffect(() => {
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

  return (
    <Layout hasBreadCrumb>
      <Feedbacks
        loading={loading}
        feedbacks={feedbacks}
        ratees={ratees}
        relationValues={relationValues}
        showErr={showErr}
        onSetRelationValues={(e, ratee) =>
          setRelationValues({ ...relationValues, [ratee?.rateeId]: e.target.value })
        }
        onNext={submitResponse}
      />
    </Layout>
  );
};

IndividualFeedbacks.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  fetchFeedbacks: PropTypes.func.isRequired,
  addFeedbackResponses: PropTypes.func.isRequired,
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
};

IndividualFeedbacks.defaultProps = {
  feedbacks: {},
  relations: {},
};

export default IndividualFeedbacks;
