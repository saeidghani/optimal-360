import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Input from '../../../Common/Input';
import Progress from '../../../Common/Progress';

const QuestionHeader = ({
  questions,
  inputQuestionNumber,
  onInputPressEnter,
  onSetInputQuestionNumber,
  progressAvg,
}) => {
  const { questionNumber } = useParams();

  return (
    <div className="w-full">
      {questions?.totalQuestions && (
        <React.Fragment>
          <p>
            {questionNumber}. {questions?.question?.statement}
            {questions?.question?.required && <span className="text-red-500">*</span>}
          </p>
          <div className="flex justify-between">
            <div className="inline-flex flex-col md:flex-row md:items-center mt-5">
              <div className="w-40 -ml-12">
                {questions?.totalQuestions && (
                  <Progress
                    showPercent={false}
                    type="line"
                    percentage={parseInt((questionNumber / questions?.totalQuestions) * 100, 10)}
                  />
                )}
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
                of {questions?.totalQuestions}
              </span>
            </div>
            <div className="flex items-center justify-end md:my-auto">
              <span className="mr-3">{progressAvg}%</span>
              <div className="w-12 h-12">
                {questions?.totalQuestions && (
                  <Progress showPercent={false} percentage={progressAvg} />
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

QuestionHeader.propTypes = {
  questions: PropTypes.shape({
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
  relationValues: PropTypes.shape({}),
  inputQuestionNumber: PropTypes.string,
  onSetInputQuestionNumber: PropTypes.func,
  onInputPressEnter: PropTypes.func,
  progressAvg: PropTypes.number,
};

QuestionHeader.defaultProps = {
  questions: {},
  relationValues: {},
  inputQuestionNumber: '',
  progressAvg: 0,
  onSetInputQuestionNumber: () => {},
  onInputPressEnter: () => {},
};

export default QuestionHeader;
