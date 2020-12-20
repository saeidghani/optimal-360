import React from 'react';
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
  fetchRaterGroups,
  allRaterGroups,
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
    fetchRaterGroups({ surveyGroupId });
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
      key: 'self',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100 capitalize">by self</span>
          <span className="text-body text-opacity-75 text-xs">Min. 1</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { self } = groups || {};
        return self && (
          <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
            <Progress
              className="h-8"
              subClassName="mb-12 pb-2"
              status={self?.totalSubmissions === self?.totalRaters ? 'sub' : ''}
              percentage={parseInt((self?.totalAnswers / self?.totalQuestions) * 100, 10)}
            />
            <div className="text-center">{self?.totalSubmissions}/{self?.totalRaters}</div>
          </div>
        );
      },
    },
    {
      // eslint-disable-next-line react/prop-types
      key: allRaterGroups?.[0]?.name,
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100 capitalize">
            {allRaterGroups?.[0]?.name ? `by ${allRaterGroups?.[0]?.name}` : null}
          </span>
          <span className="text-body text-opacity-75 text-xs">
            {allRaterGroups?.[0]?.minRater ? `Min. ${allRaterGroups?.[0]?.minRater}` : null}
          </span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { first } = groups || {};
        return first && (
          <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
            <Progress
              className="h-8"
              subClassName="mb-12 pb-2"
              status={first?.totalSubmissions === first?.totalRaters ? 'sub' : ''}
              percentage={parseInt((first?.totalAnswers / first?.totalQuestions) * 100, 10)}
            />
            <div className="text-center">{first?.totalSubmissions}/{first?.totalRaters}</div>
          </div>
        );
      },
    },
    {
      key: allRaterGroups?.[1]?.name,
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100 capitalize">
            {allRaterGroups?.[1]?.name ? `by ${allRaterGroups?.[1]?.name}` : null}
          </span>
          <span className="text-body text-opacity-75 text-xs">
            {allRaterGroups?.[1]?.minRater ? `Min. ${allRaterGroups?.[1]?.minRater}` : null}
          </span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { second } = groups || {};
        return second && (
          <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
            <Progress
              className="h-8"
              subClassName="mb-12 pb-2"
              status={second?.totalSubmissions === second?.totalRaters ? 'sub' : ''}
              percentage={parseInt((second?.totalAnswers / second?.totalQuestions) * 100, 10)}
            />
            <div className="text-center">{second?.totalSubmissions}/{second?.totalRaters}</div>
          </div>
        );
      },
    },
    {
      key: allRaterGroups?.[2]?.name,
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100 capitalize">
            {allRaterGroups?.[2]?.name ? `by ${allRaterGroups?.[2]?.name}` : null}
          </span>
          <span className="text-body text-opacity-75 text-xs">
            {allRaterGroups?.[2]?.minRater ? `Min. ${allRaterGroups?.[2]?.minRater}` : null}
          </span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { third } = groups || {};
        return third && (
          <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
            <Progress
              className="h-8"
              subClassName="mb-12 pb-2"
              status={third?.totalSubmissions === third?.totalRaters ? 'sub' : ''}
              percentage={parseInt((third?.totalAnswers / third?.totalQuestions) * 100, 10)}
            />
            <div className="text-center">{third?.totalSubmissions}/{third?.totalRaters}</div>
          </div>
        );
      },
    },
    {
      key: allRaterGroups?.[3]?.name,
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100 capitalize">
            {allRaterGroups?.[3]?.name ? `by ${allRaterGroups?.[3]?.name}` : null}
          </span>
          <span className="text-body text-opacity-75 text-xs">
            {allRaterGroups?.[3]?.minRater ? `Min. ${allRaterGroups?.[3]?.minRater}` : null}
          </span>
        </div>
      ),
      width: 50,
      render: (_, { groups }) => {
        const { fourth } = groups || {};
        return fourth && (
          <div className="w-16 mt-5 flex-inline flex-col items-center justify-center">
            <Progress
              className="h-8"
              subClassName="mb-12 pb-2"
              status={fourth?.totalSubmissions === fourth?.totalRaters ? 'sub' : ''}
              percentage={parseInt((fourth?.totalAnswers / fourth?.totalQuestions) * 100, 10)}
            />
            <div className="text-center">{fourth?.totalSubmissions}/{fourth?.totalRaters}</div>
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
        case allRaterGroups?.[0]?.name:
          data.groups.first = group;
          break;
        case allRaterGroups?.[1]?.name:
          data.groups.second = group;
          break;
        case allRaterGroups?.[2]?.name:
          data.groups.third = group;
          break;
        case allRaterGroups?.[3]?.name:
          data.groups.fourth = group;
          break;
        case 'self':
          data.groups.self = group;
          break;
        default: return true;
      }
    });
    data.isTotalQuestionAnsweredRateSub = !((raterGroups.filter((obj) =>
      obj?.totalAnswers !== obj?.totalQuestions)).length);
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
              <span className="text-xs text-antgray-100 ">Total Rater(s)</span>
            </div>
            <div className="ml-14">
              <TeamOutlined className="bg-primary-100 p-2 text-primary-500 mr-5 rounded-sm" />
              <span className="font-medium text-2xl mr-5">{completionRate?.data?.totalRatees}</span>
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
        {(completionRate?.data?.raterGroups || []).map((data) =>
          (<CompletionRate key={data.raterGroupName} {...data} />),
        )}
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
  raterGroupName,
  totalRaters,
  totalSubmissions,
  totalAnswered,
  totalQuestions,
}) => (
  <div className="flex flex-col">
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
  raterGroupName: PropTypes.string.isRequired,
  totalRaters: PropTypes.number.isRequired,
  totalSubmissions: PropTypes.number.isRequired,
  totalAnswered: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

StatusOverview.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,
  allRaterGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRaterGroups: PropTypes.func.isRequired,
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
      totalRaters: PropTypes.number,
      totalSubmissions: PropTypes.number,
      totalAnswers: PropTypes.string,
      totalQuestions: PropTypes.number,
      minMet: PropTypes.bool,
      raterGroups: PropTypes.arrayOf(PropTypes.shape({
        raterGroupName: PropTypes.string,
        raterGroupMinRater: PropTypes.number,
        totalQuestions: PropTypes.number,
        totalAnswers: PropTypes.string,
        totalRaters: PropTypes.number,
        totalSubmissions: PropTypes.number,
      })),
    })),
    message: PropTypes.string,
  }),

  completionRate: PropTypes.shape({
    data: PropTypes.shape({
      totalRatees: PropTypes.number,
      totalRaters: PropTypes.number,
      totalSurveyRate: PropTypes.number,
      totalSurveySubmissionRate: PropTypes.number,
      totalQuestionRate: PropTypes.number,
      totalAnsweredRate: PropTypes.number,
      raterGroups: PropTypes.arrayOf(PropTypes.shape({
        raterGroupName: PropTypes.string,
        totalRaters: PropTypes.number,
        totalSubmissions: PropTypes.number,
        totalQuestions: PropTypes.number,
        totalAnswered: PropTypes.number,
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
