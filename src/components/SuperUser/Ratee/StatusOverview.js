import React from 'react';
// import PropTypes from 'prop-types';
import { TeamOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import Progress from '../../Common/Progress';
import Table from '../../Common/Table';
import { useQuery } from '../../../hooks';

const StatusOverview = ({
                          summary,
                          completionRate,
                          fetchSummary,
                          fetchCompletionRate,
                          loading,
                        }) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const pageNumber = parsedQuery?.page_number || 1;
  const pageSize = parsedQuery?.page_size || 10;
  const surveyGroupId = parsedQuery?.surveyGroupId;

  React.useEffect(() => {
    fetchCompletionRate({ query, surveyGroupId });
  }, [fetchCompletionRate, surveyGroupId]);

  React.useEffect(() => {
    fetchSummary({ query, surveyGroupId });
  }, [fetchSummary, surveyGroupId, pageSize, pageNumber]);

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
        <div className="flex flex-col justify-between h-20 w-32">
          <span className="text-antgray-100">Total Question Answered Rate</span>
        </div>
      ),
      width: 100,
      render: (_, { totalAnswers, totalQuestions, isTotalQuestionAnsweredRateSub }) => (
        <div className="w-20 mt-5 flex-inline flex-col items-center justify-center">
          <Progress
            subClassName="mb-10"
            status={isTotalQuestionAnsweredRateSub ? 'sub' : ''}
            percentage={parseInt((totalAnswers / totalQuestions) * 100, 10)}
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
              status={bySelf?.totalSubmissions === bySelf?.totalRaters ? 'sub' : ''}
              percentage={parseInt((bySelf?.totalAnswers / bySelf?.totalQuestions) * 100, 10)}
            />
            <div className="text-center">{bySelf?.totalSubmissions}/{bySelf?.totalRaters}</div>
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
              status={byManager?.totalSubmissions === byManager?.totalRaters ? 'sub' : ''}
              percentage={parseInt((byManager?.totalAnswers / byManager?.totalQuestions) * 100, 10)}
            />
            <div className="text-center">{byManager?.totalSubmissions}/{byManager?.totalRaters}</div>
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
              status={byPeers?.totalSubmissions === byPeers?.totalRaters ? 'sub' : ''}
              percentage={parseInt((byPeers?.totalAnswers / byPeers?.totalQuestions) * 100, 10)}
            />
            <div className="text-center">{byPeers?.totalSubmissions}/{byPeers?.totalRaters}</div>
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
              status={byDirectReport?.totalSubmissions === byDirectReport?.totalRaters ? 'sub' : ''}
              percentage={parseInt((byDirectReport?.totalAnswers / byDirectReport?.totalQuestions) * 100, 10)}
            />
            <div className="text-center">{byDirectReport?.totalSubmissions}/{byDirectReport?.totalRaters}</div>
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
              status={byOther?.totalSubmissions === byOther?.totalRaters ? 'sub' : ''}
              percentage={parseInt((byOther?.totalAnswers / byOther?.totalQuestions) * 100, 10)}
            />
            <div className="text-center">{byOther?.totalSubmissions}/{byOther?.totalRaters}</div>
          </div>
        );
      },
    },
    {
      key: 'status',
      title: '',
      width: 50,
      render: (_, { minMet }) => (
        <div
          className={`ml-auto text-xs text-antgray-100 ${!minMet && 'opacity-30'}`}
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
  const dataSource = React.useMemo(() => (summary?.data || []).map((
    {
      rateeName, totalRaters, totalSubmissions, totalAnswers, totalQuestions, minMet, raterGroups,
    },
    ) => {
      const data = {
        key: `${rateeName}-${totalRaters}-${totalSubmissions}`,
        rateeName,
        totalRaters,
        totalSubmissions,
        totalAnswers,
        totalQuestions,
        minMet,
        groups: {},
      };

      raterGroups.forEach((group) => {
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
      data.isTotalQuestionAnsweredRateSub = !((raterGroups.filter((obj) => obj?.totalAnswers !== obj?.totalQuestions)).length);

      return (data);
    }),
    // eslint-disable-next-line
    [summary.timeStamp],
  );

  return (
    <>
      <div className="bg-white p-6 pb-8 pr-32 rounded-md my-6">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-medium text-2xl">Overall Survey Submission Rate</h1>
          <div className="flex justify-between items-center">
            <div>
              <TeamOutlined className="bg-primary-100 p-2 text-primary-500 mr-5 rounded-sm" />
              <span className="font-medium text-2xl mr-5">{completionRate?.data?.totalRaters}</span>
              <span className="text-xs text-antgray-100 ">Total Ratee(s)</span>
            </div>
            <div className="ml-14">
              <TeamOutlined className="bg-primary-100 p-2 text-primary-500 mr-5 rounded-sm" />
              <span className="font-medium text-2xl mr-5">{completionRate?.data?.totalRaters}</span>
              <span className="text-xs text-antgray-100 ">Total Ratee(s)</span>
            </div>
          </div>
        </div>
        <Progress
          type="line"
          percentage={parseInt((completionRate?.data?.totalSurveySubmissionRate / completionRate?.data?.totalSurveyRate) * 100, 10) || 0}
        />
      </div>
      <div className="bg-white p-6 pb-8 pr-32 rounded-md my-6">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-medium text-2xl">Overall Question Answered Rate</h1>

        </div>
        <Progress
          type="line"
          percentage={parseInt((completionRate?.data?.totalAnsweredRate / completionRate?.data?.totalQuestionRate) * 100, 10) || 0}
        />
      </div>
      <div className="grid grid-cols-5 gap-6">
        {(completionRate?.data?.raterGroups || []).map((data) => (
          <CompletionRate {...data} />
        ))}
      </div>
      <Table
        size="middle"
        className="c-table-white-head p-6 mt-5 bg-white rounded-lg shadow"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        rowSelection={false}
        onPageSizeChange={(size) => {
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

const CompletionRate = React.memo(({
                                     raterGroupId,
                                     raterGroupName,
                                     totalRaters,
                                     totalSubmissions,
                                     totalAnswered,
                                     totalQuestions,
                                   }) => (
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
        <Progress percentage={parseInt((totalAnswered / totalQuestions) * 100, 10)} />
      </div>
      <div>
        <h2 className="text-center capitalize">{raterGroupName}</h2>
      </div>
    </div>
  </div>
));

CompletionRate.propTypes = {
  raterGroupId: PropTypes.string.isRequired,
  raterGroupName: PropTypes.string.isRequired,
  totalRaters: PropTypes.string.isRequired,
  totalSubmissions: PropTypes.string.isRequired,
  totalAnswered: PropTypes.string.isRequired,
  totalQuestions: PropTypes.string.isRequired,
};

StatusOverview.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,

  summary: PropTypes.shape({
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        pageNumber: PropTypes.string,
        pageSize: PropTypes.string,
        totalRecords: PropTypes.string,
      }),
    }),
    data: PropTypes.arrayOf(PropTypes.shape({
      rateeId: PropTypes.string,
      rateeName: PropTypes.string,
      totalRaters: PropTypes.string,
      totalSubmissions: PropTypes.string,
      totalAnswers: PropTypes.string,
      totalQuestions: PropTypes.string,
      minMet: PropTypes.bool,
      raterGroups: PropTypes.arrayOf(PropTypes.shape({
        raterGroupName: PropTypes.string,
        raterGroupMinRater: PropTypes.number,
        totalQuestions: PropTypes.string,
        totalAnswers: PropTypes.string,
        totalRaters: PropTypes.string,
        totalSubmissions: PropTypes.string,
      })),
    })),
    message: PropTypes.string,
  }),

  completionRate: PropTypes.shape({
    data: PropTypes.shape({
      totalRatees: PropTypes.string,
      totalRaters: PropTypes.string,
      totalSurveyRate: PropTypes.string,
      totalSurveySubmissionRate: PropTypes.string,
      totalQuestionRate: PropTypes.string,
      totalAnsweredRate: PropTypes.string,
      raterGroups: PropTypes.arrayOf(PropTypes.shape({
        raterGroupName: PropTypes.string,
        totalRaters: PropTypes.string,
        totalSubmissions: PropTypes.string,
        totalQuestions: PropTypes.string,
        totalAnswered: PropTypes.string,
      })),
    }),
    message: PropTypes.string,
  }),

};

StatusOverview.defaultProps = {
  completionRate: {},
  summary: {},
};

export default StatusOverview;
