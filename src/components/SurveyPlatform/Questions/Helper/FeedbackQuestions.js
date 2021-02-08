import React from 'react';
import PropTypes from 'prop-types';

import TextArea from '../../../Common/TextArea';
import QuestionHeader from './QuestionHeader';
import QuestionModals from './QuestionModals';
import QuestionNav from './QuestionNav';

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
  progressAvg,
  exitModalVisible,
  onSetExitModalVisible,
  exitPath,
  onSetExitPath,
}) => {
  return (
    <div>
      <QuestionModals
        jumpModalVisible={jumpModalVisible}
        onJumpOk={onJumpOk}
        onJumpCancel={onJumpCancel}
        jumpQuestion={jumpQuestion}
        exitModalVisible={exitModalVisible}
        onSetExitModalVisible={onSetExitModalVisible}
        exitPath={exitPath}
        onSetExitPath={onSetExitPath}
      />
      <div className="px-4 py-6 mt-16 flex flex-col justify-between md:px-8 md:bg-white md:rounded-lg md:shadow">
        <div
          className="md:border-b md:border-solid
            md:border-gray-200 md:pb-4"
        >
          <QuestionHeader
            questions={questions?.data}
            inputQuestionNumber={inputQuestionNumber}
            onInputPressEnter={onInputPressEnter}
            onSetInputQuestionNumber={onSetInputQuestionNumber}
            progressAvg={progressAvg}
          />
        </div>
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
      <QuestionNav
        onNext={onNext}
        onBack={onBack}
        nextIsDisabled={nextIsDisabled}
        onSetExitModalVisible={onSetExitModalVisible}
      />
    </div>
  );
};

FeedbackQuestions.propTypes = {
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
  progressAvg: PropTypes.number,
  exitModalVisible: PropTypes.bool,
  onSetExitModalVisible: PropTypes.func,
  onSetExitPath: PropTypes.func,
  exitPath: PropTypes.string,
};

FeedbackQuestions.defaultProps = {
  questions: {},
  relations: {},
  ratees: [{}],
  relationValues: {},
  nextIsDisabled: false,
  jumpModalVisible: false,
  exitModalVisible: false,
  inputQuestionNumber: '',
  jumpQuestion: '',
  exitPath: '',
  progressAvg: 0,
  onSetInputQuestionNumber: () => {},
  onInputPressEnter: () => {},
  onJumpOk: () => {},
  onJumpCancel: () => {},
  onSetExitModalVisible: () => {},
  onSetExitPath: () => {},
};

export default FeedbackQuestions;
