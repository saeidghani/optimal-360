import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { QuestionOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';

import Button from '../../../Common/Button';
import Progress from '../../../Common/Progress';
import Table from '../../../Common/Table';
import Radio from '../../../Common/Radio';
import Modal from '../../../Common/Modal';
import Tooltip from '../../../Common/Tooltip';
import { dynamicMap } from '../../../../routes/RouteMap';

const Questions = ({
  loading,
  questions,
  relationValues,
  onSetRelationValues,
  onNext,
  dataSource,
  options,
  showErr,
}) => {
  const [visible, setVisible] = React.useState(false);
  const history = useHistory();
  const { surveyGroupId, questionNumber } = useParams();

  const renderHeader = React.useCallback(() => {
    return (
      <div className="w-full">
        {questions?.data?.totalQuestions && (
          <React.Fragment>
            <p>
              {questionNumber}. {questions?.data?.question?.statement}
              {questions?.data?.question?.required && <span className="text-red-500">*</span>}
            </p>
            {showErr && <p className="text-red-500 mt-2">Please answer all the questions</p>}
            <div className="flex justify-between">
              <div className="inline-flex flex-col md:flex-row mt-5">
                <div className="w-40 -ml-12">
                  {questions?.data?.totalQuestions && (
                    <Progress
                      showPercent={false}
                      type="line"
                      percentage={parseInt(
                        (questionNumber / questions?.data?.totalQuestions) * 100,
                        10,
                      )}
                    />
                  )}
                </div>
                <div className="text-antgray-100 text-sm md:ml-4">
                  Question {questionNumber} of {questions?.data?.totalQuestions}
                </div>
              </div>
              <div className="flex items-center justify-end md:my-auto">
                <span className="mr-3">
                  {parseInt((questionNumber / questions?.data?.totalQuestions) * 100, 10)}%
                </span>
                <div className="w-12 h-12">
                  {questions?.data?.totalQuestions && (
                    <Progress
                      showPercent={false}
                      percentage={parseInt(
                        (questionNumber / questions?.data?.totalQuestions) * 100,
                        10,
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }, [questions.timeStamp, showErr]);

  const columns = React.useMemo(() => {
    const zeroScoreIndex = options?.findIndex(({ score }) => score?.toString() === '0');
    const arrangedOptions = arrayMove(options, zeroScoreIndex, -1);
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
  }, [relationValues]);

  const handleNext = () => {
    onNext();
  };

  const handleBack = () => {
    if (questionNumber?.toString() === '1') {
      setVisible(true);
    } else {
      history.push(
        dynamicMap.surveyPlatform.allRateesQuestions({
          surveyGroupId,
          questionNumber: questionNumber * 1 - 1,
        }),
      );
    }
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
      <div className="p-4 mt-6 bg-white rounded-lg shadow md:hidden">{renderHeader()}</div>
      <Table
        size="middle"
        className="c-table-last-column-divide p-4 mt-8 md:mt-16 md:p-6 bg-white rounded-lg shadow"
        tableClassName="overflow-auto"
        rowKey="key"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        title={() => <div className="hidden md:block">{renderHeader()}</div>}
        pageNumber={1}
        rowSelection={false}
        pagination={false}
      />
      <div className="flex flex-col items-center md:flex-row-reverse">
        <Button
          className="mt-6 px-6 outline-none border-primary-500 shadow-none w-full md:w-auto md:border-none"
          text="Next"
          onClick={handleNext}
        />
        <Button
          className="mt-6 bg-transparent text-primary-500 outline-none border-primary-500 shadow-none
          w-full md:mr-4 md:w-auto md:border-none"
          text="Back"
          onClick={handleBack}
        />
      </div>
    </div>
  );
};

Questions.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.shape({
    data: PropTypes.shape({
      totalQuestions: PropTypes.number,
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
  dataSource: PropTypes.arrayOf(PropTypes.shape({})),
  options: PropTypes.arrayOf(PropTypes.shape({})),
  showErr: PropTypes.bool,
};

Questions.defaultProps = {
  questions: {},
  relationValues: {},
  dataSource: [{}],
  options: [{}],
  showErr: false,
};

export default Questions;
