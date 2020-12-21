import React from 'react';
import PropTypes from 'prop-types';

import { useHistory, useParams } from 'react-router-dom';

import Button from '../../../Common/Button';
import Progress from '../../../Common/Progress';
import TextArea from '../../../Common/TextArea';
import Modal from '../../../Common/Modal';
import Loading from '../../../Common/Loading';

import { dynamicMap } from '../../../../routes/RouteMap';

const Feedbacks = ({
  loading,
  feedbacks,
  onNext,
  ratees,
  relationValues,
  onSetRelationValues,
  showErr,
}) => {
  const [visible, setVisible] = React.useState(false);

  const history = useHistory();
  const { feedbackNumber } = useParams();

  const handleNext = () => {
    onNext();
  };

  const handleBack = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    history.push(dynamicMap.surveyPlatform.dashboard());
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Loading visible={loading} />
      <Modal
        visible={visible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        width={588}
        cancelText="Continue to Answer"
        okText="Yes, Exit!"
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ textClassName: 'text-red-500' }}
      >
        <div className="flex flex-col">
          <span className="text-2xl mb-4">Attention!</span>
          <p>You have not completed this survey, are you sure to exit?</p>
        </div>
      </Modal>
      <div className="px-4 py-6 mt-16 flex flex-col justify-between md:px-8 md:bg-white md:rounded-lg md:shadow">
        {feedbacks?.data?.totalFeedbacks && (
          <div>
            <p>
              1. {feedbacks?.data?.feedback?.statement}
              {feedbacks?.data?.feedback?.required && <span className="text-red-500">*</span>}
            </p>
            {showErr && <p className="text-red-500 mt-2">Please answer all the questions</p>}
            <div
              className="flex justify-between md:border-b md:border-solid
            md:border-gray-200 md:pb-4"
            >
              <div className="inline-flex flex-col md:flex-row mt-5">
                <div className="w-40 -ml-12">
                  <Progress
                    showPercent={false}
                    type="line"
                    percentage={parseInt(
                      (feedbackNumber / feedbacks?.data?.totalFeedbacks) * 100,
                      10,
                    )}
                  />
                </div>
                <div className="text-antgray-100 text-sm md:ml-4">
                  Question {feedbackNumber} of {feedbacks?.data?.totalFeedbacks}
                </div>
              </div>
              <div className="flex ratees-center justify-end md:my-auto">
                <span className="mr-3">
                  {parseInt((feedbackNumber / feedbacks?.data?.totalFeedbacks) * 100, 10)}%
                </span>
                <div className="w-12 h-12">
                  <Progress
                    showPercent={false}
                    percentage={parseInt(
                      (feedbackNumber / feedbacks?.data?.totalFeedbacks) * 100,
                      10,
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {ratees.map((ratee) => (
          <div className="grid grid-cols-12 mt-8 w-full" key={ratee.rateeId}>
            <span className="col-start-1 col-span-12 md:col-span-2 md:ml-3 lg:ml-5">
              {ratee.rateeName}
            </span>
            <div
              className="w-full col-start-1 col-span-12 md:col-start-3 md:col-span-10
            border border-solid border-antgray-100 rounded-md h-24"
            >
              <TextArea
                value={relationValues[ratee?.rateeId]}
                onChange={(e) => onSetRelationValues(e, ratee)}
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-4 mb-16 md:mb-10 md:flex-row-reverse md:ml-auto">
        <Button
          onClick={handleNext}
          text="Next"
          className="mt-6 px-6 outline-none border-primary-500 shadow-none w-full md:w-auto md:border-none"
          textSize="base"
        />
        <Button
          onClick={handleBack}
          text="Back"
          className="mt-6 bg-transparent text-primary-500 outline-none border-primary-500 shadow-none w-full
          md:mr-6 md:w-auto md:border-none"
          textSize="base"
        />
      </div>
    </div>
  );
};

Feedbacks.propTypes = {
  loading: PropTypes.bool.isRequired,
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
  onSetRelationValues: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  ratees: PropTypes.arrayOf(PropTypes.shape({})),
  relationValues: PropTypes.shape({}),
  showErr: PropTypes.bool,
};

Feedbacks.defaultProps = {
  feedbacks: {},
  relations: {},
  ratees: [{}],
  relationValues: {},
  showErr: false,
};

export default Feedbacks;
