import React from 'react';
import PropTypes from 'prop-types';

import Progress from '../../../Common/Progress';
import Table from '../../../Common/Table';

const ParticipantSummary = ({ loading, fetchSummary, summary }) => {
  const [pageSize] = React.useState(10);

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
          <span className="text-antgray-100">Total Completion Rate</span>
        </div>
      ),
      width: 100,
      render: (item) => (
        <div className="w-20 mt-5 flex-inline flex-col items-center justify-center">
          <Progress
            subClassName="mb-10"
            percentageClassName="mb-10 text-heading2"
            status={item.status}
            percentage={item.status === 'sub' ? 100 : item.percentage}
          />
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
        <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
          {item.percentage && (
            <Progress
              className="h-8"
              subClassName="mb-10 pb-4"
              status={item.status}
              percentage={item.status === 'sub' ? 100 : item.percentage}
            />
          )}
          {item.count && <div className="text-center">{item.count}</div>}
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
        <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
          {item.percentage && (
            <Progress
              className="h-8"
              subClassName="mb-10 pb-4"
              status={item.status}
              percentage={item.status === 'sub' ? 100 : item.percentage}
            />
          )}
          {item.count && <div className="text-center">{item.count}</div>}
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
      render: (item) => (
        <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
          {item.percentage && (
            <Progress
              className="h-8"
              subClassName="mb-10 pb-4"
              status={item.status}
              percentage={item.status === 'sub' ? 100 : item.percentage}
            />
          )}
          {item.count && <div className="text-center">{item.count}</div>}
        </div>
      ),
    },
    {
      key: 'directReports',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Direct Reports</span>
          <span className="text-body text-opacity-75 text-xs">Min. 3</span>
        </div>
      ),
      width: 100,
      render: (item) => (
        <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
          {item.percentage && (
            <Progress
              className="h-8"
              subClassName="mb-10 pb-4"
              status={item.status}
              percentage={item.status === 'sub' ? 100 : item.percentage}
            />
          )}
          {item.count && <div className="text-center">{item.count}</div>}
        </div>
      ),
    },
    {
      key: 'others',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Others</span>
          <span className="text-body text-opacity-75 text-xs">Min. 2</span>
        </div>
      ),
      width: 50,
      render: (item) => (
        <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
          {item.percentage && (
            <Progress
              className="h-8"
              subClassName="mb-10 pb-4"
              status={item.status}
              percentage={item.status === 'sub' ? 100 : item.percentage}
            />
          )}
          {item.count && <div className="text-center">{item.count}</div>}
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
      bySelf: { percentage: 40, status: '', count: '3/3' },
      byManager: { percentage: 30, status: 'sub', count: '3/3' },
      byPeers: { percentage: 70, status: '', count: '1/1' },
      directReports: { percentage: 80, status: 'sub', count: '4/4' },
      others: { percentage: 30, status: '', count: '3/3' },
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '3/10',
      totalCompletionRate: { percentage: 60, status: '' },
      bySelf: { percentage: '0', status: '', count: '0/1' },
      byManager: { percentage: 100, status: 'sub', count: '3/3' },
      byPeers: { percentage: 100, status: 'sub', count: '2/4' },
      directReports: { percentage: 100, status: 'sub', count: '2/4' },
      others: '',
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '1/10',
      totalCompletionRate: { percentage: 70, status: '' },
      bySelf: { percentage: '0', status: '', count: '0/1' },
      byManager: { percentage: 50, status: '', count: '1/1' },
      byPeers: { percentage: 100, status: '', count: '0/1' },
      directReports: { percentage: 50, status: '', count: '2/4' },
      others: { percentage: 100, status: 'sub', count: '1/1' },
      status: 'Met Min Req',
    },
    {
      ratee: 'Katherine Kan',
      dueDate: '26/2/2020',
      noSubmission: '0/12',
      totalCompletionRate: { percentage: 30, status: '' },
      bySelf: { percentage: 100, status: '', count: '1/1' },
      byManager: { percentage: '0', status: '', count: '0/1' },
      byPeers: { percentage: '0', status: '', count: '0/1' },
      directReports: { percentage: '0', status: '', count: '0/1' },
      others: '',
      status: 'Met Min Req',
    },
  ];

  return (
    <Table
      size="middle"
      className="p-6 bg-white rounded-lg shadow"
      tableClassName="c-table-thead-white overflow-auto header-bg-white"
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pageSize={pageSize * 1}
      pageNumber={1}
      rowSelection={false}
      paginationClassName="flex flex-col md:flex-row justify-between h-24"
    />
  );
};

ParticipantSummary.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  summary: PropTypes.shape({}),
};

ParticipantSummary.defaultProps = {
  summary: {},
};

export default ParticipantSummary;
