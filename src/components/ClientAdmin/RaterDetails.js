import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Common/Dropdown';
import Tabs from '../Common/Tabs';
import Progress from '../Common/Progress';

import Layout from './Helper/Layout';
import Table from '../Common/Table';
import ButtonsTab from './Helper/ButtonsTab';
import OverallCompletion from './Helper/OverallCompletion';
import RateCard from './Helper/RateCard';

const RaterDetails = ({ loading, fetchRaters, raters }) => {
  const [pageSize] = React.useState(10);
  const [project, setProject] = React.useState('');

  const columns = React.useMemo(() => [
    {
      key: 'ratee',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Ratee</span>
        </div>
      ),
      width: 100,
      render: (ratee) => <span className="text-sm absolute top-0 pt-16">{ratee}</span>,
    },
    {
      key: 'noSubmission',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">No. Submission</span>
        </div>
      ),
      width: 100,
      render: (num) => <span className="text-sm absolute top-0 pt-16">{num}</span>,
    },
    {
      key: 'totalCompletionRate',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Total Completion Rate</span>
        </div>
      ),
      width: 100,
      render: (item) => (
        <div className="w-20 mt-5 flex-inline flex-col items-center justify-center">
          <Progress
            subClassName="mb-10"
            status={item.status}
            percentage={item.status === 'sub' ? 100 : item.percentage}
          />
        </div>
      ),
    },
    {
      key: 'forSelf',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">For Self</span>
          <span className="text-body text-opacity-75 text-xs">Min. 1</span>
        </div>
      ),
      width: 100,
      render: (item) => (
        <div className="absolute top-0 mt-16 pt-3 mt-5 flex-inline flex-col items-center justify-center">
          <div className="w-16 mx-auto">
            <Progress
              className="h-8"
              subClassName="mb-10 pb-4"
              status={item.status}
              percentage={item.status === 'sub' ? 100 : item.percentage}
            />
          </div>
          <div className="text-center">{item.name}</div>
        </div>
      ),
    },
    {
      key: 'forManager',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">For Manager</span>
          <span className="text-body text-opacity-75 text-xs">Min. 1</span>
        </div>
      ),
      width: 100,
      render: (item) => (
        <div className="absolute top-0 mt-16 pt-3 mt-5 flex-inline flex-col items-center justify-center">
          <div className="w-16 mx-auto">
            <Progress
              className="h-8"
              subClassName="mb-10 pb-4"
              status={item.status}
              percentage={item.status === 'sub' ? 100 : item.percentage}
            />
          </div>
          <div className="text-center">{item.name}</div>
        </div>
      ),
    },
    {
      key: 'forPeers',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">For Peers</span>
          <span className="text-body text-opacity-75 text-xs">Min. 2</span>
        </div>
      ),
      width: 100,
      render: (items) => (
        <div className="mb-auto h-full w-full flex flex-col justify-center items-start">
          {items?.map((item) => (
            <div
              key={item.key}
              className="mt-16 h-full flex-inline flex-col items-center justify-center"
            >
              <div className="w-16 mx-auto">
                <Progress
                  className="h-8"
                  subClassName="mb-10 pb-4"
                  status={item.status}
                  percentage={item.status === 'sub' ? 100 : item.percentage}
                />
              </div>
              <div className="text-center">{item.name}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'forDirectReports',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">For Direct Reports</span>
          <span className="text-body text-opacity-75 text-xs">Min. 3</span>
        </div>
      ),
      width: 100,
      render: (items) => (
        <div className="mb-auto w-full flex flex-col items-start">
          {items?.map((item) => (
            <div key={item.key} className="mt-16 flex-inline flex-col items-center justify-center">
              <div className="w-16 mx-auto">
                <Progress
                  className="h-8"
                  subClassName="mb-10 pb-4"
                  status={item.status}
                  percentage={item.status === 'sub' ? 100 : item.percentage}
                />
              </div>
              <div className="text-center">{item.name}</div>
            </div>
          ))}
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
      noSubmission: '9/9',
      totalCompletionRate: { percentage: 60, status: 'sub' },
      forSelf: { percentage: 40, status: '', name: 'Karyn Chow' },
      forManager: { percentage: 30, status: 'sub', name: 'Karyn Chow' },
      forPeers: [
        { percentage: 70, status: '', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
      ],
      forDirectReports: [
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
      ],
      others: { percentage: 30, status: '' },
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      noSubmission: '3/10',
      totalCompletionRate: { percentage: 60, status: 'sub' },
      forSelf: { percentage: 50, status: '' },
      forManager: { percentage: 70, status: 'sub' },
      forPeers: [
        { percentage: 30, status: '', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
      ],
      forDirectReports: [
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
      ],
      others: { percentage: 50, status: 'sub' },
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      noSubmission: '1/10',
      totalCompletionRate: { percentage: 60, status: '' },
      forSelf: { percentage: 70, status: '' },
      forManager: { percentage: 60, status: 'sub' },
      forPeers: [
        { percentage: 80, status: 'sub', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
        { percentage: 70, status: '', name: 'Karyn Chow' },
      ],
      forDirectReports: [
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
        { percentage: 80, status: 'sub', name: 'Premala Jagana' },
      ],
      others: { percentage: 90, status: 'sub' },
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      noSubmission: '1/10',
      totalCompletionRate: { percentage: 60, status: 'sub' },
      forSelf: { percentage: 20, status: 'sub' },
      forManager: { percentage: 60, status: '' },
      forPeers: [{ percentage: 70, status: 'sub', name: 'Karyn Chow' }],
      forDirectReports: [{ percentage: 80, status: 'sub', name: 'Premala Jagana' }],
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
          showSearch={false}
          type="gray"
          placeholder="Leadership Development"
          value={project}
          handleChange={(val) => setProject(val)}
          options={dropdownOptions}
        />
      </div>
      <div className="md:w-full">
        <Tabs className="md:c-tabs-class" defaultActiveKey="1" tabOptions={tabOptions} />
      </div>
      <ButtonsTab activeButtonKey="3" />
      <OverallCompletion />
      <RateCard />
      <Table
        size="middle"
        className="p-6 bg-white rounded-lg shadow"
        tableClassName="c-table-thead-white overflow-auto align-top"
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

RaterDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  raters: PropTypes.shape({}),
};

RaterDetails.defaultProps = {
  raters: {},
};

export default RaterDetails;
