import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { QuestionOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';

import Table from '../../../Common/Table';
import Radio from '../../../Common/Radio';
import Tooltip from '../../../Common/Tooltip';
import QuestionHeader from './QuestionHeader';
import QuestionModals from './QuestionModals';
import QuestionNav from './QuestionNav';

const SelectQuestions = ({
  loading,
  questions,
  relationValues,
  inputQuestionNumber,
  jumpModalVisible,
  onJumpOk,
  onJumpCancel,
  onInputPressEnter,
  onSetInputQuestionNumber,
  onSetRelationValues,
  onNext,
  onBack,
  dataSource,
  nextIsDisabled,
  jumpQuestion,
  progressAvg,
  exitModalVisible,
  onSetExitModalVisible,
  exitPath,
  onSetExitPath,
}) => {
  const columns = React.useMemo(() => {
    const zeroScoreIndex = questions?.data?.options?.findIndex(
      ({ score }) => score?.toString() === '0',
    );
    let arrangedOptions = [];
    if (questions?.data?.options) {
      arrangedOptions = arrayMove(questions?.data?.options, zeroScoreIndex, -1);
    }
    // eslint-disable-next-line no-unused-expressions
    const scoreColumns = arrangedOptions?.map(({ label, score, description }) => ({
      key: score,
      title: (
        <div className="flex flex-col justify-center items-center md:flex-row">
          <span className="mr-0 text-xs md:mr-2 mb-2 capitalize md:mb-0 md:text-sm">{label}</span>
          <Tooltip title={description}>
            <QuestionOutlined
              className="text-white bg-gray-400 w-5 h-5 rounded-full"
              style={{ paddingTop: 3 }}
            />
          </Tooltip>
        </div>
      ),
      width: 100,
      render: (item, { key }) => (
        <div
          className={
            score?.toString() === '0'
              ? 'red-radio flex justify-center items-center'
              : 'flex justify-center items-center'
          }
        >
          {item && (
            <Radio
              onChange={(e) => {
                onSetRelationValues(e, item, key);
              }}
              value={relationValues[key]}
              checked={relationValues[key] === item?.value}
              className="pl-5"
            />
          )}
        </div>
      ),
    }));

    return [
      {
        key: 'describesThisPerson',
        title: (
          <span className="text-xs flex justify-center xl:pr-8 md:text-sm">
            Describes this person:
          </span>
        ),
        width: 100,
        render: (text) => (
          <span className="text-xs flex justify-center p-4 xl:pr-8 md:text-sm">{text}</span>
        ),
      },
      ...scoreColumns,
    ];
  }, [relationValues, questions?.timeStamp]);

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
      {questions?.data?.options && (
        <Fragment>
          <div className="p-4 mt-6 bg-white rounded-lg shadow md:hidden">
            <QuestionHeader
              questions={questions?.data}
              inputQuestionNumber={inputQuestionNumber}
              onInputPressEnter={onInputPressEnter}
              onSetInputQuestionNumber={onSetInputQuestionNumber}
              progressAvg={progressAvg}
            />
          </div>
          <Table
            size="middle"
            className="c-table-last-column-divide p-4 mt-8 md:mt-16 md:p-6 bg-white rounded-lg shadow"
            tableClassName="overflow-auto"
            rowKey="key"
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            title={() => (
              <div className="hidden md:block">
                <QuestionHeader
                  questions={questions?.data}
                  inputQuestionNumber={inputQuestionNumber}
                  onInputPressEnter={onInputPressEnter}
                  onSetInputQuestionNumber={onSetInputQuestionNumber}
                  progressAvg={progressAvg}
                />
              </div>
            )}
            pageNumber={1}
            rowSelection={false}
            pagination={false}
          />
          <QuestionNav
            onNext={onNext}
            onBack={onBack}
            nextIsDisabled={nextIsDisabled}
            onSetExitModalVisible={onSetExitModalVisible}
          />
        </Fragment>
      )}
    </div>
  );
};

SelectQuestions.propTypes = {
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
  relationValues: PropTypes.shape({}),
  onSetRelationValues: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.shape({})),
  options: PropTypes.arrayOf(PropTypes.shape({})),
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

SelectQuestions.defaultProps = {
  questions: {},
  relationValues: {},
  dataSource: [{}],
  options: [{}],
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

export default SelectQuestions;
