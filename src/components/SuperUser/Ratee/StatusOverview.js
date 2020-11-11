import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { TeamOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import Progress from '../../Common/Progress';
import Table from '../../Common/Table';
import { useQuery } from '../../../hooks';

const StatusOverview = (
  {
    surveyGroupId,
    summary,
    completionRate,
    fetchSummary,
    fetchCompletionRate,
    loading,
  },
) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const pageNumber = parsedQuery?.page_number;

  useEffect(() => {
    fetchCompletionRate({ query, surveyGroupId });
  }, [fetchCompletionRate, surveyGroupId]);

  useEffect(() => {
    fetchSummary({ query, surveyGroupId });
  }, [fetchSummary, query, surveyGroupId]);

  const columns = React.useMemo(() => [
    {
      key: 'rateeName',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Ratee</span>
        </div>
      ),
      width: 100,
    },
    {
      key: 'noSubmission',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">No. Submission</span>
        </div>
      ),
      width: 100,
      render: (_, { totalRaters, totalSubmissions }) => (
        <span className="text-xs">{totalSubmissions}/{totalRaters}</span>
      ),
    },
    {
      key: 'totalCompletionRate',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Total CompletionRate</span>
        </div>
      ),
      width: 100,
      render: (_, { totalRaters, totalSubmissions }) => (
        <div className="w-20 mt-5 flex-inline flex-col items-center justify-center">
          <Progress
            subClassName="mb-10"
            status="sub"
            percentage={parseInt((totalSubmissions / totalRaters) * 100, 10)}
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
      render: (_, { groups }) => {
        const { bySelf } = groups || {};
        return bySelf && (
          <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
            <Progress
              className="h-8"
              subClassName="mb-12 pb-2"
              status="sub"
              percentage={parseInt((bySelf?.totalSubmissions / bySelf?.totalRaters) * 100, 10)}
            />
            <div className="text-center">{bySelf?.totalAnswers}/{bySelf?.totalQuestions}</div>
          </div>
        );
      },
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
      render: (_, { groups }) => {
        const { byManager } = groups || {};
        return byManager && (
          <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
            <Progress
              className="h-8"
              subClassName="mb-12 pb-2"
              status="sub"
              percentage={parseInt((byManager?.totalSubmissions / byManager?.totalRaters) * 100, 10)}
            />
            <div className="text-center">{byManager?.totalAnswers}/{byManager?.totalQuestions}</div>
          </div>
        );
      },
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
      render: (_, { groups }) => {
        const { byPeers } = groups || {};
        return byPeers && (
          <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
            <Progress
              className="h-8"
              subClassName="mb-12 pb-2"
              status="sub"
              percentage={parseInt((byPeers?.totalSubmissions / byPeers?.totalRaters) * 100, 10)}
            />
            <div className="text-center">{byPeers?.totalAnswers}/{byPeers?.totalQuestions}</div>
          </div>
        );
      },
    },
    {
      key: 'byDirectReports',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Direct Reports</span>
          <span className="text-body text-opacity-75 text-xs">Min. 3</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byDirectReport } = groups || {};
        return byDirectReport && (
          <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
            <Progress
              className="h-8"
              subClassName="mb-12 pb-2"
              status="sub"
              percentage={parseInt((byDirectReport?.totalSubmissions / byDirectReport?.totalRaters) * 100, 10)}
            />
            <div className="text-center">{byDirectReport?.totalAnswers}/{byDirectReport?.totalQuestions}</div>
          </div>
        );
      },
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
      render: (_, { groups }) => {
        const { byOther } = groups || {};
        return byOther && (
          <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
            <Progress
              className="h-8"
              subClassName="mb-12 pb-2"
              status="sub"
              percentage={parseInt((byOther?.totalSubmissions / byOther?.totalRaters) * 100, 10)}
            />
            <div className="text-center">{byOther?.totalAnswers}/{byOther?.totalQuestions}</div>
          </div>
        );
      },
    },
    {
      key: 'status',
      title: '',
      width: 50,
      render: () => (
        <div
          className="ml-auto text-xs text-antgray-100"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}
        >
          Met Min Req
        </div>
      ),
    },
  ]);
  const dataSource = React.useMemo(
    () => (summary?.data || []).map((item) => {
      const data = {
        key: `${item.rateeName}-${item.totalRaters}-${item.totalSubmissions}`,
        rateeName: item.rateeName,
        totalRaters: item.totalRaters,
        totalSubmissions: item.totalSubmissions,
        groups: {},
      };
      item.raterGroups.forEach((group) => {
        switch (group.raterGroupName) {
          case 'manager':
            data.groups.byManager = group;
            break;
          case 'peers':
            data.groups.byPeers = group;
            break;
          case 'direct report':
            data.groups.byDirectReport = group;
            break;
          case 'self':
            data.groups.bySelf = group;
            break;
          default:
            data.groups.byOther = group;
        }
      });
      return (data);
    }),
    // eslint-disable-next-line
    [summary.timeStamp],
  );

  return (
    <>
      <div className="bg-white p-6 pr-32 rounded-md my-6">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-medium text-2xl">Overall Completion Rate</h1>
          <div className="flex justify-between items-center">
            <TeamOutlined className="bg-primary-100 p-2 text-primary-500 mr-5 rounded-sm" />
            <span className="font-medium text-2xl mr-5">{completionRate?.data?.totalRaters}</span>
            <span className="text-xs text-antgray-100 ">Total Ratee(s)</span>
          </div>
        </div>
        <Progress
          type="line"
          percentage={parseInt((completionRate?.data?.totalSubmissions / completionRate?.data?.totalRaters) * 100, 10) || 0}
        />
      </div>

      <div className="grid grid-cols-5 gap-6">

        {completionRate?.data?.raterGroups?.map((
          {
            raterGroupId,
            raterGroupName,
            totalRaters,
            totalSubmissions,
          },
        ) => (
          <div className="flex flex-col " key={raterGroupId}>
            <div className="bg-white p-6 rounded-md">
              <div className="mb-3">
                <span className="text-xs">Total Raters: </span>
                <span className="text-base text-heading">{totalRaters}</span>
              </div>
              <div className="mb-14">
                <span className="text-xs">Total No. Submission: </span>
                <span className="text-base text-heading">{totalSubmissions}/{totalRaters}</span>
              </div>
              <div className="mb-6 flex justify-center">
                <Progress percentage={parseInt((totalSubmissions / totalRaters) * 100, 10)} />
              </div>
              <div>
                <h2 className="text-center">{raterGroupName}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Table
        size="middle"
        className="c-table-white-head p-6 mt-5 bg-white rounded-lg shadow"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowSelection={false}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setQuery({ page_size: size, page_number: 1 });
        }}
        pageSize={pageSize * 1}
        pageNumber={pageNumber * 1}
        // eslint-disable-next-line camelcase
        onPaginationChange={(page_number, page_size) => {
          setQuery({
            page_size,
            page_number,
          });
        }}
        totalRecordSize={summary?.metaData?.pagination?.totalRecords * 1}
      />

    </>
  );
};

StatusOverview.propTypes = {
  loading: PropTypes.bool.isRequired,
  surveyGroupId: PropTypes.string.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,

  summary: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        pageNumber: PropTypes.string,
        pageSize: PropTypes.string,
        totalRecords: PropTypes.string,
      }),
    }),
    data: {
      rateeName: PropTypes.string,
      totalRaters: PropTypes.number,
      totalSubmissions: PropTypes.number,
      raterGroups: PropTypes.arrayOf({
        raterGroupName: PropTypes.string,
        raterGroupMinRater: PropTypes.number,
        totalQuestions: PropTypes.number,
        totalAnswers: PropTypes.number,
        totalRaters: PropTypes.number,
        totalSubmissions: PropTypes.number,
      }),
    },
    message: PropTypes.string,
  }),

  completionRate: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    data: {
      totalRaters: PropTypes.string,
      totalSubmissions: PropTypes.string,
      raterGroups: PropTypes.arrayOf({
        raterGroupId: PropTypes.number,
        raterGroupName: PropTypes.string,
        totalRaters: PropTypes.string,
        totalSubmissions: PropTypes.string,
      }),
    },
    message: PropTypes.string,
  }),

};

StatusOverview.defaultProps = {
  completionRate: {},
  summary: {},
};

export default StatusOverview;
