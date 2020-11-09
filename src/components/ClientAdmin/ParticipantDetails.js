import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import Dropdown from '../Common/Dropdown';
import Tabs from '../Common/Tabs';
import Progress from '../Common/Progress';

import Layout from './Helper/Layout';
import Button from '../Common/Button';
import Table from '../Common/Table';
import ButtonsTab from './Helper/ButtonsTab';
import OverallCompletion from './Helper/OverallCompletion';
import RateCards from './Helper/RateCards';

const ParticipantDetails = ({ loading }) => {
  const [pageSize] = React.useState(10);

  const columns = React.useMemo(() => [
    {
      key: 'ratee',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Ratee</span>
        </div>
      ),
      width: 50,
    },
    {
      key: 'dueDate',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Due date</span>
        </div>
      ),
      width: 50,
      render: (date) => <span className="text-xs">{date}</span>,
    },
    {
      key: 'noSubmission',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">No. Submission</span>
        </div>
      ),
      width: 50,
      render: (num) => <span className="text-xs">{num}</span>,
    },
    {
      key: 'totalCompletionRate',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Total CompletionRate</span>
        </div>
      ),
      width: 50,
      render: (item) => (
        <div className="w-full mt-5 flex-inline flex-col items-center justify-center">
          <div className="w-20">
            <Progress
              subClassName="mb-10"
              status={item.status}
              percentage={item.status === 'sub' ? 100 : item.percentage}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'bySelf',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Self</span>
          <span className="text-body text-opacity-75 text-xs">Min. 1</span>
        </div>
      ),
      width: 100,
      render: (item) => (
        <div className="absolute top-0 w-full mt-16 pt-3 w-16 mt-5 flex-inline flex-col items-center justify-center">
          <div className="w-16">
            <Progress
              className="h-8"
              subClassName="mb-10 pb-4"
              status={item.status}
              percentage={item.status === 'sub' ? 100 : item.percentage}
            />
          </div>
          <div className="text-center">{item.percentage}</div>
        </div>
      ),
    },
    {
      key: 'byManager',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Manager</span>
          <span className="text-body text-opacity-75 text-xs">Min. 1</span>
        </div>
      ),
      width: 100,
      render: (item) => (
        <div className="absolute top-0 w-full mt-16 pt-3 w-16 mt-5 flex-inline flex-col items-center justify-center">
          <div className="w-16">
            <Progress
              className="h-8"
              subClassName="mb-10 pb-4"
              status={item.status}
              percentage={item.status === 'sub' ? 100 : item.percentage}
            />
          </div>
          <div className="text-center">{item.percentage}</div>
        </div>
      ),
    },
    {
      key: 'byPeers',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Peers</span>
          <span className="text-body text-opacity-75 text-xs">Min. 2</span>
        </div>
      ),
      width: 100,
      render: (items) => (
        <div className="mb-auto h-full w-full flex flex-col justify-center items-center">
          {items?.map((item) => (
            <div
              key={item.key}
              className="mt-16 h-full flex-inline flex-col items-center justify-center"
            >
              <div className="w-16">
                <Progress
                  className="h-8"
                  subClassName="mb-10 pb-4"
                  status={item.status}
                  percentage={item.status === 'sub' ? 100 : item.percentage}
                />
              </div>
              <div className="text-sm">{item.name}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'directReports',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Direct Reports</span>
          <span className="text-body text-opacity-75 text-xs">Min. 3</span>
        </div>
      ),
      width: 100,
      render: (items) => (
        <div className="mb-auto w-full flex flex-col items-center">
          {items?.map((item) => (
            <div key={item.key} className="mt-16 flex-inline flex-col items-center justify-center">
              <div className="w-16">
                <Progress
                  className="h-8"
                  subClassName="mb-10 pb-4"
                  status={item.status}
                  percentage={item.status === 'sub' ? 100 : item.percentage}
                />
              </div>
              <div className="text-sm">{item.name}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'others',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Others</span>
          <span className="text-body text-opacity-75 text-xs">Min. 2</span>
        </div>
      ),
      width: 50,
      render: (item) => (
        <div className="absolute top-0 mt-16 pt-3 w-16 mt-5 flex-inline flex-col items-center justify-center">
          <div className="w-16">
            <Progress
              className="h-8"
              subClassName="mb-10 pb-4"
              status={item.status}
              percentage={item.status === 'sub' ? 100 : item.percentage}
            />
          </div>
          <div className="text-center">{item.percentage}</div>
        </div>
      ),
    },
    {
      key: 'status',
      title: '',
      width: 50,
      render: (status) => (
        <div
          className="ml-auto text-xs text-antgray-100"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}
        >
          {status}
        </div>
      ),
    },
  ]);

  const dataSource = [
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '9/9',
      totalCompletionRate: { percentage: 60, status: 'sub' },
      bySelf: { percentage: 40, status: '' },
      byManager: { percentage: 30, status: 'sub' },
      byPeers: [
        { percentage: 70, status: '', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
      ],
      directReports: [
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
      ],
      others: { percentage: 30, status: '' },
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '9/9',
      totalCompletionRate: { percentage: 60, status: 'sub' },
      bySelf: { percentage: 50, status: '' },
      byManager: { percentage: 70, status: 'sub' },
      byPeers: [
        { percentage: 30, status: '', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
      ],
      directReports: [
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
      ],
      others: { percentage: 50, status: 'sub' },
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '9/9',
      totalCompletionRate: { percentage: 60, status: '' },
      bySelf: { percentage: 70, status: '' },
      byManager: { percentage: 60, status: 'sub' },
      byPeers: [
        { percentage: 80, status: 'sub', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
      ],
      directReports: [
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
      ],
      others: { percentage: 90, status: 'sub' },
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '9/9',
      totalCompletionRate: { percentage: 80, status: 'sub' },
      bySelf: { percentage: 20, status: 'sub' },
      byManager: { percentage: 70, status: '' },
      byPeers: [
        { percentage: 60, status: 'sub', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
      ],
      directReports: [
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
      ],
      others: { percentage: 30, status: '' },
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '9/9',
      totalCompletionRate: { percentage: 60, status: 'sub' },
      bySelf: { percentage: 20, status: 'sub' },
      byManager: { percentage: 60, status: '' },
      byPeers: [{ percentage: 70, status: 'sub', name: 'Karyn Chow' }],
      directReports: [{ percentage: 80, status: 'sub', name: 'Premala Jagana' }],
      others: { percentage: 10, status: '' },
      status: 'Met Min Req',
    },
  ];

  const dropdownOptions = [
    { title: 'Leadership Development1', value: 1 },
    { title: 'Leadership Development2', value: 2 },
    { title: 'Leadership Development3', value: 3 },
  ];

  const tabOptions = [
    { title: 'Top Leadership', key: '1' },
    { title: 'Managers', key: '2' },
    { title: 'High Potentials', key: '3' },
  ];

  return (
    <Layout>
      <div className="grid grid-cols-12 mb-10 mt-8">
        <div className="col-start-1 col-span-6 text-base text-body mb-3">Select Project</div>
        <Dropdown
          className="c-autocomplete col-start-1 col-span-12
          md:col-start-1 md:col-span-4 lg:col-start-1 lg:col-span-3 w-full"
          showSearch
          value={1}
          type="gray"
          options={dropdownOptions}
        />
      </div>
      <div className="md:w-full">
        <Tabs className="md:c-tabs-class" defaultActiveKey="1" tabOptions={tabOptions} />
      </div>
      <ButtonsTab activeButtonKey="2" />
      <OverallCompletion />
      <RateCards />
      <Table
        size="middle"
        className="p-6 bg-white rounded-lg shadow"
        tableClassName="overflow-auto"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pageSize={pageSize * 1}
        pageNumber={1}
        rowSelection={false}
        paginationClassName="flex flex-col md:flex-row justify-between h-24"
      />
    </Layout>
  );
};

ParticipantDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
};

ParticipantDetails.defaultProps = {};

export default ParticipantDetails;
