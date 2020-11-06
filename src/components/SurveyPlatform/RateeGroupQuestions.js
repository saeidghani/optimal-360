import React from 'react';
import PropTypes from 'prop-types';
import { QuestionOutlined } from '@ant-design/icons';

import Layout from './Helper/Layout';

import Button from '../Common/Button';
import Progress from '../Common/Progress';
import Table from '../Common/Table';
import Radio from '../Common/RadioGroup';

const RateeGroupQuestions = ({ loading }) => {
  const [pageSize] = React.useState(10);

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
      render: (items) => <Radio onChange={() => {}} items={items} value="a" className="pl-5" />,
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
      render: (items) => <Radio onChange={() => {}} items={items} value="b" className="pl-5" />,
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
      render: (items) => <Radio onChange={() => {}} items={items} value="c" className="pl-5" />,
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
      render: (items) => <Radio onChange={() => {}} items={items} value="d" className="pl-5" />,
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
      render: (items) => <Radio onChange={() => {}} items={items} value="e" className="pl-5" />,
    },
  ]);

  const dataSource = [
    {
      key: '1',
      describesThisPerson: 'Katherine Kan',
      notAtAll: [{ title: '', value: 'a' }],
      notMuch: [{ title: '', value: 'b2' }],
      somewhat: [{ title: '', value: 'c' }],
      most: [{ title: '', value: 'd' }],
      notClear: [{ title: '', value: 'e' }],
    },
  ];

  return (
    <Layout hasBreadCrumb>
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
      <div className="flex flex-col mt-5 mb-16 md:mb-10 md:flex-row-reverse md:ml-auto">
        <Button
          className="mt-6 outline-none border-primary-500 shadow-none w-full md:w-auto md:border-none"
          text="Next"
        />
        <Button
          className="mt-6 bg-transparent text-primary-500 outline-none border-primary-500 shadow-none
          w-full md:mr-6 md:w-auto md:border-none"
          text="Back"
        />
      </div>
    </Layout>
  );
};

RateeGroupQuestions.propTypes = {
  loading: PropTypes.bool.isRequired,
};

RateeGroupQuestions.defaultProps = {};

export default RateeGroupQuestions;
