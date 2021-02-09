import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../../../Common/Modal';
import { dynamicMap } from '../../../../routes/RouteMap';
import { stringify, useQuery } from '../../../../hooks/useQuery';

const QuestionModals = ({
  jumpModalVisible,
  onJumpOk,
  onJumpCancel,
  jumpQuestion,
  exitModalVisible,
  onSetExitModalVisible,
  exitPath,
  onSetExitPath,
}) => {
  const history = useHistory();
  const [parsedQuery] = useQuery();
  const { projectId, relationId, relation } = parsedQuery || {};
  const { questionNumber, surveyGroupId } = useParams();

  const handleExit = () => {
    const lastVisitedQuestion = localStorage.getItem('lastVisitedQuestion');
    const lastVisitedQuestionObj = { ...JSON.parse(lastVisitedQuestion) };
    const { pathname } = history.location;
    if (pathname.includes('all-ratees')) {
      lastVisitedQuestionObj.prevAllQuestion = { projectId, surveyGroupId, questionNumber };
    }
    if (pathname.includes('individual')) {
      lastVisitedQuestionObj.prevIndividualQuestion = {
        projectId,
        surveyGroupId,
        relationId,
        questionNumber,
      };
    }
    if (pathname.includes('ratee-group')) {
      lastVisitedQuestionObj.prevRateeGroupQuestion = {
        projectId,
        surveyGroupId,
        relation,
        questionNumber,
      };
    }
    localStorage.setItem('lastVisitedQuestion', JSON.stringify(lastVisitedQuestionObj));
    onSetExitModalVisible(false);
    if (exitPath?.includes('dashboard') || !exitPath) {
      history.push(
        `${dynamicMap.surveyPlatform.dashboard()}${stringify({ projectId, surveyGroupId })}`,
      );
    } else {
      history.push(exitPath);
    }
  };

  const handleContinueToAnswer = () => {
    onSetExitModalVisible(false);
    onSetExitPath('');
  };

  return (
    <div>
      <Modal
        visible={exitModalVisible}
        handleCancel={handleContinueToAnswer}
        handleOk={handleExit}
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
    </div>
  );
};

QuestionModals.propTypes = {
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
  jumpModalVisible: PropTypes.bool,
  jumpQuestion: PropTypes.string,
  onJumpOk: PropTypes.func,
  onJumpCancel: PropTypes.func,
  exitModalVisible: PropTypes.bool,
  onSetExitModalVisible: PropTypes.func,
  onSetExitPath: PropTypes.func,
  exitPath: PropTypes.string,
};

QuestionModals.defaultProps = {
  questions: {},
  relationValues: {},
  jumpModalVisible: false,
  exitModalVisible: false,
  jumpQuestion: '',
  exitPath: '',
  onJumpOk: () => {},
  onJumpCancel: () => {},
  onSetExitModalVisible: () => {},
  onSetExitPath: () => {},
};

export default QuestionModals;
