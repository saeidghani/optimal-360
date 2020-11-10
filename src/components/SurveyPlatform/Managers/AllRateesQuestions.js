import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { QuestionOutlined } from '@ant-design/icons';

import Layout from '../Helper/Layout';

import Button from '../../Common/Button';
import Progress from '../../Common/Progress';
import Table from '../../Common/Table';
import Radio from '../../Common/RadioGroup';
import Modal from '../../Common/Modal';

const AllRateesQuestions = ({ loading }) => {
  const [pageSize] = React.useState(10);
  const [visible, setVisible] = React.useState(false);
  const [items, setItems] = React.useState({});

  const history = useHistory();

  const renderHeader = React.useCallback((size) => {
    return (
      <div className={`${size !== 'sm' ? 'hidden md:flex pb-4' : ''}`}>
        <div className="w-full">
          <p>
            1. This person effectively motivates his/her team members in meeting their work
            objectives.
          </p>
          <div className="flex justify-between">
            <div className="inline-flex flex-col md:flex-row mt-5">
              <div className="w-40 -ml-12">
                <Progress showPercent={false} type="line" percentage={60} />
              </div>
              <div className="text-antgray-100 text-sm md:ml-4">Question 1 of 5</div>
            </div>
            <div className="flex items-center justify-end md:my-auto">
              <span className="mr-3">60%</span>
              <div className="w-12 h-12">
                <Progress showPercent={false} percentage={60} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  const columns = React.useMemo(() => [
    {
      key: 'describesThisPerson',
      title: (
        <span className="text-xs flex justify-center xl:pr-8 md:text-sm">
          Describes this person:
        </span>
      ),
      width: 100,
      render: (text) => (
        <span className="text-xs flex justify-center xl:pr-8 md:text-sm">{text}</span>
      ),
    },
    {
      key: 'notAtAll',
      title: (
        <div className="inline-flex flex-col justify-between items-center md:flex-row">
          <span className="mr-0 text-xs md:mr-2 mb-2 md:mb-0 md:text-sm">Not at all</span>
          <QuestionOutlined
            className="text-white bg-gray-400 w-5 h-5 rounded-full"
            style={{ paddingTop: 3 }}
          />
        </div>
      ),
      width: 100,
      render: (itm) => (
        <Radio
          onChange={(e) => setItems({ ...items, [itm.id]: e.target.value })}
          items={itm.options}
          value={items[itm.id]}
          className="pl-5"
        />
      ),
    },
    {
      key: 'notMuch',
      title: (
        <div className="inline-flex flex-col justify-between items-center md:flex-row">
          <span className="mr-0 text-xs md:mr-2 mb-2 md:mb-0 md:text-sm">Not much</span>
          <QuestionOutlined
            className="text-white bg-gray-400 w-5 h-5 rounded-full"
            style={{ paddingTop: 3 }}
          />
        </div>
      ),
      width: 100,
      render: (itm) => (
        <Radio
          onChange={(e) => setItems({ ...items, [itm.id]: e.target.value })}
          items={itm.options}
          value={items[itm.id]}
          className="pl-5"
        />
      ),
    },
    {
      key: 'somewhat',
      title: (
        <div className="inline-flex flex-col justify-between items-center md:flex-row">
          <span className="mr-0 text-xs md:mr-2 mb-2 md:mb-0 md:text-sm">Somewhat</span>
          <QuestionOutlined
            className="text-white bg-gray-400 w-5 h-5 rounded-full"
            style={{ paddingTop: 3 }}
          />
        </div>
      ),
      width: 100,
      render: (itm) => (
        <Radio
          onChange={(e) => setItems({ ...items, [itm.id]: e.target.value })}
          items={itm.options}
          value={items[itm.id]}
          className="pl-5"
        />
      ),
    },
    {
      key: 'most',
      title: (
        <div className="inline-flex flex-col justify-between items-center md:flex-row">
          <span className="mr-0 text-xs md:mr-2 mb-2 md:mb-0 md:text-sm">Most</span>
          <QuestionOutlined
            className="text-white bg-gray-400 w-5 h-5 rounded-full"
            style={{ paddingTop: 3 }}
          />
        </div>
      ),
      width: 100,
      render: (itm) => (
        <Radio
          onChange={(e) => setItems({ ...items, [itm.id]: e.target.value })}
          items={itm.options}
          value={items[itm.id]}
          className="pl-5"
        />
      ),
    },
    {
      key: 'notClear',
      title: (
        <div className="inline-flex flex-col justify-between items-center md:flex-row">
          <span className="mr-0 text-xs md:mr-2 mb-2 md:mb-0 md:text-sm">Not Clear</span>
          <QuestionOutlined
            className="text-white bg-gray-400 w-5 h-5 rounded-full"
            style={{ paddingTop: 3 }}
          />
        </div>
      ),
      width: 100,
      render: (itm) => (
        <Radio
          onChange={(e) => setItems({ ...items, [itm.id]: e.target.value })}
          items={itm.options}
          value={items[itm.id]}
          className="pl-5"
        />
      ),
    },
  ]);

  const dataSource = [
    {
      key: '1',
      describesThisPerson: 'Katherine Kan',
      notAtAll: { id: '101', options: [{ title: '', value: '1' }] },
      notMuch: { id: '101', options: [{ title: '', value: '2' }] },
      somewhat: { id: '101', options: [{ title: '', value: '3' }] },
      most: { id: '101', options: [{ title: '', value: '4' }] },
      notClear: { id: '101', options: [{ title: '', value: '5' }] },
    },
    {
      key: '2',
      describesThisPerson: 'Katherine Kan',
      notAtAll: { id: '102', options: [{ title: '', value: '1' }] },
      notMuch: { id: '102', options: [{ title: '', value: '2' }] },
      somewhat: { id: '102', options: [{ title: '', value: '3' }] },
      most: { id: '102', options: [{ title: '', value: '4' }] },
      notClear: { id: '102', options: [{ title: '', value: '5' }] },
    },
    {
      key: '3',
      describesThisPerson: 'Katherine Kan',
      notAtAll: { id: '103', options: [{ title: '', value: '1' }] },
      notMuch: { id: '103', options: [{ title: '', value: '2' }] },
      somewhat: { id: '103', options: [{ title: '', value: '3' }] },
      most: { id: '103', options: [{ title: '', value: '4' }] },
      notClear: { id: '103', options: [{ title: '', value: '5' }] },
    },
    {
      key: '4',
      describesThisPerson: 'Katherine Kan',
      notAtAll: { id: '104', options: [{ title: '', value: '1' }] },
      notMuch: { id: '104', options: [{ title: '', value: '2' }] },
      somewhat: { id: '104', options: [{ title: '', value: '3' }] },
      most: { id: '104', options: [{ title: '', value: '4' }] },
      notClear: { id: '104', options: [{ title: '', value: '5' }] },
    },
    {
      key: '5',
      describesThisPerson: 'Katherine Kan',
      notAtAll: { id: '105', options: [{ title: '', value: '1' }] },
      notMuch: { id: '105', options: [{ title: '', value: '2' }] },
      somewhat: { id: '105', options: [{ title: '', value: '3' }] },
      most: { id: '105', options: [{ title: '', value: '4' }] },
      notClear: { id: '105', options: [{ title: '', value: '5' }] },
    },
  ];

  const handleNext = () => {
    history.push('/survey-platform/managers/individual/questions');
  };

  const handleBack = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    history.push('/survey-platform/managers/ratee-group');
  };

  const handleCancel = () => {
    setVisible(false);
    history.push('/survey-platform/managers/individual/questions');
  };

  return (
    <Layout hasBreadCrumb>
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
      <div className="md:bg-white md:rounded-lg md:shadow p-4 mt-6 md:hidden">
        {renderHeader('sm')}
      </div>
      <Table
        size="middle"
        className="p-4 mt-8 md:mt-16 md:p-6 bg-white rounded-lg shadow"
        tableClassName="overflow-auto"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pageSize={pageSize * 1}
        pageNumber={1}
        rowSelection={false}
        title={renderHeader}
        paginationClassName="flex flex-col md:flex-row justify-between h-24"
      />
      <div className="flex flex-col items-center md:flex-row-reverse">
        <Button
          className="mt-6 outline-none border-primary-500 shadow-none w-full md:w-auto md:border-none"
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
    </Layout>
  );
};

AllRateesQuestions.propTypes = {
  loading: PropTypes.bool.isRequired,
};

AllRateesQuestions.defaultProps = {};

export default AllRateesQuestions;
