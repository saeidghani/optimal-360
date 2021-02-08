import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Button from '../../../Common/Button';

const QuestionNav = ({ onNext, onBack, nextIsDisabled, onSetExitModalVisible }) => {
  const { questionNumber } = useParams();

  const handleNext = () => {
    onNext();
  };

  const handleBack = () => {
    if (questionNumber?.toString() === '1') {
      onSetExitModalVisible(true);
    } else {
      onBack();
    }
  };

  return (
    <div className="flex flex-col items-center md:flex-row-reverse">
      <Button
        className="mt-6 px-6 outline-none border-primary-500 shadow-none w-full md:w-auto md:border-none"
        text="Next"
        onClick={handleNext}
        disabled={nextIsDisabled}
      />
      <Button
        className="mt-6 bg-transparent text-primary-500 outline-none border-primary-500 shadow-none
          w-full md:mr-4 md:w-auto md:border-none"
        text="Back"
        onClick={handleBack}
      />
    </div>
  );
};

QuestionNav.propTypes = {
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
  relationValues: PropTypes.shape({}),
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  nextIsDisabled: PropTypes.bool,
  onSetExitModalVisible: PropTypes.func,
};

QuestionNav.defaultProps = {
  questions: {},
  relationValues: {},
  nextIsDisabled: false,
  onSetExitModalVisible: () => {},
};

export default QuestionNav;
