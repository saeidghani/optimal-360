import React from 'react';
import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';

import Button from '../../../Common/Button';
import Progress from '../../../Common/Progress';
import TextArea from '../../../Common/TextArea';
import Input from '../../../Common/Input';
import Modal from '../../../Common/Modal';

const FeedbackQuestions = ({
  questions,
  onNext,
  ratees,
  relationValues,
  onSetRelationValues,
  onBack,
  nextIsDisabled,
  inputQuestionNumber,
  jumpModalVisible,
  onJumpOk,
  onJumpCancel,
  onInputPressEnter,
  onSetInputQuestionNumber,
  jumpQuestion,
}) => {
  const { questionNumber } = useParams();

  return (
    <div>
      <Modal
        visible={jumpModalVisible}
        handleCancel={onJumpCancel}
        handleOk={onJumpOk}
        width={588}
        cancelText="Cancel"
        okText="Jump to this question"
        footerClassName="flex-row-reverse sm:justify-start"
        okButtonProps={{
          textClassName: 'text-red-500',
          className: 'bg-transparent border-none shadow-none hover:bg-transparent',
        }}
        cancelButtonProps={{
          type: 'button',
          danger: true,
          className: 'bg-red-500 hover:bg-red-500 hover:opacity-50',
          textClassName: 'text-white',
        }}
      >
        <div className="flex flex-col">
          <span className="text-2xl mb-4">Attention!</span>
          <p>You have not answered question {jumpQuestion}, it’s required.</p>
        </div>
      </Modal>
      <div className="px-4 py-6 mt-16 flex flex-col justify-between md:px-8 md:bg-white md:rounded-lg md:shadow">
        {questions?.data?.totalQuestions && (
          <div>
            <p>
              {questionNumber}. {questions?.data?.question?.statement}
              {questions?.data?.question?.required && <span className="text-red-500">*</span>}
            </p>
            <div
              className="flex justify-between md:border-b md:border-solid
            md:border-gray-200 md:pb-4"
            >
              <div className="inline-flex flex-col md:flex-row items-center mt-5">
                <div className="w-40 -ml-12">
                  <Progress
                    showPercent={false}
                    type="line"
                    percentage={parseInt(
                      (questionNumber / questions?.data?.totalQuestions) * 100,
                      10,
                    )}
                  />
                </div>
                <span className="text-antgray-100 text-sm md:ml-4">Question</span>
                <Input
                  inputClass="w-20 ml-3"
                  name="inputQuestionNumber"
                  fixedHeightForErrorMessage={false}
                  value={inputQuestionNumber}
                  onChange={onSetInputQuestionNumber}
                  onPressEnter={onInputPressEnter}
                />
                <span className="text-antgray-100 text-sm md:ml-4">
                  of {questions?.data?.totalQuestions}
                </span>
              </div>
              <div className="flex ratees-center justify-end md:my-auto">
                <span className="mr-3">
                  {parseInt(((questionNumber - 1) / questions?.data?.totalQuestions) * 100, 10)}%
                </span>
                <div className="w-12 h-12">
                  <Progress
                    showPercent={false}
                    percentage={parseInt(
                      ((questionNumber - 1) / questions?.data?.totalQuestions) * 100,
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
            border border-solid border-antgray-100 rounded-md"
            >
              <TextArea
                value={relationValues[ratee?.rateeId]}
                onChange={(e) => onSetRelationValues(e, ratee)}
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-4 mb-16 md:mb-10 md:flex-row-reverse md:ml-auto">
        <Button
          onClick={onNext}
          text="Next"
          className="mt-6 px-6 outline-none border-primary-500 shadow-none w-full md:w-auto md:border-none"
          textSize="base"
          disabled={nextIsDisabled}
        />
        <Button
          onClick={onBack}
          text="Back"
          className="mt-6 bg-transparent text-primary-500 outline-none border-primary-500 shadow-none w-full
          md:mr-6 md:w-auto md:border-none"
          textSize="base"
        />
      </div>
    </div>
  );
};

FeedbackQuestions.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.shape({
    data: PropTypes.shape({
      totalQuestions: PropTypes.number,
      questionNumber: PropTypes.number,
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
  onSetRelationValues: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  ratees: PropTypes.arrayOf(PropTypes.shape({})),
  relationValues: PropTypes.shape({}),
  nextIsDisabled: PropTypes.bool,
  jumpModalVisible: PropTypes.bool,
  inputQuestionNumber: PropTypes.string,
  jumpQuestion: PropTypes.string,
  onSetInputQuestionNumber: PropTypes.func,
  onInputPressEnter: PropTypes.func,
  onJumpOk: PropTypes.func,
  onJumpCancel: PropTypes.func,
};

FeedbackQuestions.defaultProps = {
  questions: {},
  relations: {},
  ratees: [{}],
  relationValues: {},
  nextIsDisabled: false,
  jumpModalVisible: false,
  inputQuestionNumber: '',
  jumpQuestion: '',
  onSetInputQuestionNumber: () => {},
  onInputPressEnter: () => {},
  onJumpOk: () => {},
  onJumpCancel: () => {},
};

export default FeedbackQuestions;
