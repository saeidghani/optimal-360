import React from 'react';
// import PropTypes from 'prop-types';
import {TeamOutlined} from '@ant-design/icons';

import PropTypes from 'prop-types';
import MainLayout from '../Common/Layout';
import Dropdown from '../Common/Dropdown';
import Tabs from '../Common/Tabs';
import Progress from '../Common/Progress';
import Table from '../Common/Table';

const RatersStatusOverview = ({loading}) => {
  const [pageSize] = React.useState(10);
  const dropDownOptions = [
    {title: 'Top Leadership', value: 1},
    {title: 'Top Leadership2', value: 2},
    {title: 'Top Leadership3', value: 3},
  ];

  const tabOptions = [
    {title: 'Status Overview', key: 1},
    {title: 'Status Details', key: 2},
    {title: 'Rater Email', key: 3},
    {title: 'Results', key: 4},
  ];

  const columns = React.useMemo(() => [
    {
      key: 'ratee',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Ratee</span>
        </div>
      ),
      width: 100,
    },
    {
      key: 'dueDate',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Due date</span>
        </div>
      ),
      width: 100,
      render: (date) => <span className="text-xs">{date}</span>,
    },
    {
      key: 'noSubmission',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">No. Submission</span>
        </div>
      ),
      width: 100,
      render: (num) => <span className="text-xs">{num}</span>,
    },
    {
      key: 'totalCompletionRate',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Total CompletionRate</span>
        </div>
      ),
      width: 100,
      render: () => (
        <div className="w-20 mt-5 flex-inline flex-col items-center justify-center">
          <Progress subClassName="mb-10" status="sub" percentage={100}/>
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
      render: (percentage) => (
        <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
          <Progress className="h-8" subClassName="mb-12 pb-2" status="sub" percentage={100}/>
          <div className="text-center">{percentage}</div>
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
      render: (percentage) => (
        <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
          <Progress className="h-8" subClassName="mb-12 pb-2" status="sub" percentage={100}/>
          <div className="text-center">{percentage}</div>
        </div>
      ),
    },
    {
      key: 'byPeers',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">by Peers</span>
          <span className="text-body text-opacity-75 text-xs">Min. 2</span>
        </div>
      ),
      width: 100,
      render: (percentage) => (
        <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
          <Progress className="h-8" subClassName="mb-12 pb-2" status="sub" percentage={100}/>
          <div className="text-center">{percentage}</div>
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
      render: (percentage) => (
        <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
          <Progress className="h-8" subClassName="mb-12 pb-2" status="sub" percentage={100}/>
          <div className="text-center">{percentage}</div>
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
      render: (percentage) => (
        <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
          <Progress className="h-8" subClassName="mb-12 pb-2" status="sub" percentage={100}/>
          <div className="text-center">{percentage}</div>
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
      totalCompletionRate: '',
      bySelf: '3/3',
      byManager: '3/3',
      byPeers: '3/3',
      directReports: '3/3',
      others: '3/3',
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '9/9',
      totalCompletionRate: '',
      bySelf: '3/3',
      byManager: '3/3',
      byPeers: '3/3',
      directReports: '3/3',
      others: '3/3',
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '9/9',
      totalCompletionRate: '',
      bySelf: '3/3',
      byManager: '3/3',
      byPeers: '3/3',
      directReports: '3/3',
      others: '3/3',
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '9/9',
      totalCompletionRate: '',
      bySelf: '3/3',
      byManager: '3/3',
      byPeers: '3/3',
      directReports: '3/3',
      others: '3/3',
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '9/9',
      totalCompletionRate: '',
      bySelf: '3/3',
      byManager: '3/3',
      byPeers: '3/3',
      directReports: '3/3',
      others: '3/3',
      status: 'Met Min Req',
    },
  ];

  return (
    <MainLayout contentClass="pl-21 pr-6 py-4" title="Super User" titleClass="my-2" hasBreadCrumb>
      <div className="grid grid-cols-7 mt-3 mb-10">
        <h2 className="col-start-1 my-6 pt-6 pl-3 font-medium text-base">Survey Group</h2>
        <Dropdown
          className="c-autocomplete col-start-1 w-full"
          showSearch
          value={1}
          type="gray"
          options={dropDownOptions}
        />
      </div>
      <div>
        <Tabs className="c-tabs-class" tabOptions={tabOptions} />
      </div>
      <div className="bg-white p-6 pr-32 rounded-md my-6">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-medium text-2xl">Overall Completion Rate</h1>
          <div className="flex justify-between items-center">
            <TeamOutlined className="bg-primary-100 p-2 text-primary-500 mr-5 rounded-sm"/>
            <span className="font-medium text-2xl mr-5">20</span>
            <span className="text-xs text-antgray-100 ">Total Ratee(s)</span>
          </div>
        </div>
        <Progress type="line" percentage="38"/>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="flex flex-col ">
          <div className="bg-white p-6 rounded-md">
            <div className="mb-3">
              <span className="text-xs">Total Raters: </span>
              <span className="text-base text-heading">20</span>
            </div>
            <div className="mb-14">
              <span className="text-xs">Total No. Submission: </span>
              <span className="text-base text-heading">6/20</span>
            </div>
            <div className="mb-6 flex justify-center">
              <Progress percentage={38}/>
            </div>
            <div>
              <h2 className="text-center">Total Self</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="bg-white p-6 rounded-md">
            <div className="mb-3">
              <span className="text-xs">Total Raters: </span>
              <span className="text-base text-heading">20</span>
            </div>
            <div className="mb-14">
              <span className="text-xs">Total No. Submission: </span>
              <span className="text-base text-heading">6/20</span>
            </div>
            <div className="mb-6 flex justify-center">
              <Progress percentage={58}/>
            </div>
            <div>
              <h2 className="text-center">Total Self</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="bg-white p-6 rounded-md">
            <div className="mb-3">
              <span className="text-xs">Total Raters: </span>
              <span className="text-base text-heading">20</span>
            </div>
            <div className="mb-14">
              <span className="text-xs">Total No. Submission: </span>
              <span className="text-base text-heading">6/20</span>
            </div>
            <div className="mb-6 flex justify-center">
              <Progress percentage={100}/>
            </div>
            <div>
              <h2 className="text-center">Total Self</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="bg-white p-6 rounded-md">
            <div className="mb-3">
              <span className="text-xs">Total Raters: </span>
              <span className="text-base text-heading">20</span>
            </div>
            <div className="mb-14">
              <span className="text-xs">Total No. Submission: </span>
              <span className="text-base text-heading">6/20</span>
            </div>
            <div className="mb-6">
              <Progress percentage={70}/>
            </div>
            <div>
              <h2 className="text-center">Total Self</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="bg-white p-6 rounded-md">
            <div className="mb-3">
              <span className="text-xs">Total Raters: </span>
              <span className="text-base text-heading">20</span>
            </div>
            <div className="mb-14">
              <span className="text-xs">Total No. Submission: </span>
              <span className="text-base text-heading">6/20</span>
            </div>
            <div className="mb-6 flex justify-center">
              <Progress percentage={100}/>
            </div>
            <div>
              <h2 className="text-center">Total Self</h2>
            </div>
          </div>
        </div>
      </div>
      <Table
        size="middle"
        className="c-table-white-head p-6 mt-5 bg-white rounded-lg shadow"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pageSize={pageSize * 1}
        pageNumber={1}
        rowSelection={false}
      />
    </MainLayout>
  );
};

RatersStatusOverview.propTypes = {
  loading: PropTypes.bool.isRequired,
};

RatersStatusOverview.defaultProps = {};

export default RatersStatusOverview;
