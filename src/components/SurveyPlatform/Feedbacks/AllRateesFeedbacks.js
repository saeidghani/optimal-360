import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../Common/SurveyPlatformLayout';
import { dynamicMap } from '../../../routes/RouteMap';

import Feedbacks from './Helper/Feedbacks';

const AllRateesFeedbacks = ({
  loading,
  feedbacks,
  relations,
  fetchRelations,
  fetchFeedbacks,
  addFeedbackResponses,
}) => {
  const history = useHistory();
  const { surveyGroupId, feedbackNumber } = useParams();

  const [relationValues, setRelationValues] = React.useState({});

  const allRelationIds = React.useMemo(
    () => relations?.data?.map((relation) => relation.relationId),
    [relations.timeStamp],
  );

  React.useEffect(() => {
    if (surveyGroupId) {
      fetchRelations({ surveyGroupId });
    }
  }, [fetchRelations, surveyGroupId]);

  React.useEffect(() => {
    if (surveyGroupId && feedbackNumber && allRelationIds?.length > 0) {
      let relationIds = '';
      let allRelationValues = {};
      // eslint-disable-next-line no-unused-expressions
      allRelationIds?.forEach((relationId) => {
        relationIds += `relation_ids[]=${relationId}&`;
        allRelationValues = {
          ...allRelationValues,
          [relationId]: null,
        };
      });
      setRelationValues(allRelationValues);
      if (relationIds) fetchFeedbacks({ surveyGroupId, feedbackNumber, relationIds });
    }
  }, [fetchFeedbacks, surveyGroupId, feedbackNumber, allRelationIds]);

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
    const responses = [];
    // eslint-disable-next-line no-unused-expressions
    Object.keys(relationValues)?.forEach((key) => {
      if (feedbacks?.data?.feedback?.required && !relationValues[key]) return;
      const newResponse = {
        relationId: key * 1,
        response: relationValues[key],
      };
      // eslint-disable-next-line no-unused-expressions
      feedbacks?.data?.responses.forEach((res) => {
        if (res?.relationId?.toString() === key?.toString()) {
          newResponse.responseId = res?.responseId;
        }
      });
      responses.push(newResponse);
    });
    if (responses?.length !== Object.keys(relationValues)?.length) return;
    const feedbackId = feedbacks?.data?.feedback?.id;
    if (feedbackNumber <= feedbacks?.data?.totalFeedbacks) {
      try {
        await addFeedbackResponses({ surveyGroupId, feedbackId, responses });
        setRelationValues({});
        if (feedbackNumber < feedbacks?.data?.totalFeedbacks) {
          history.push(
            dynamicMap.surveyPlatform.allRateesFeedbacks({
              surveyGroupId,
              feedbackNumber: feedbackNumber * 1 + 1,
            }),
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
        onSetRelationValues={(e, ratee) =>
          setRelationValues({ ...relationValues, [ratee?.rateeId]: e.target.value })
        }
        onNext={submitResponse}
      />
    </Layout>
  );
};

AllRateesFeedbacks.propTypes = {
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

AllRateesFeedbacks.defaultProps = {
  feedbacks: {},
  relations: {},
};

export default AllRateesFeedbacks;