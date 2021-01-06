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

  const columns = React.useMemo(() => {
    const initialColumns = [
      {
        key: 'rateeName',
        title: (
          <div className="flex flex-col justify-between h-20">
            <span className="text-antgray-100">Ratee</span>
          </div>
        ),
      },
      {
        key: 'noSubmission',
        title: (
          <div className="flex flex-col justify-between h-20">
            <span className="text-antgray-100">No. Submission</span>
          </div>
        ),
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
          <div className="text-center flex flex-col justify-between h-20">
            <span className="text-antgray-100 capitalize">by self</span>
            <span className="text-body text-opacity-75 text-xs">Min. 1</span>
          </div>
        ),
        render: (_, { groups }) => {
          const { self } = groups || {};
          return self && (
            <div className="w-16 mt-6 mx-auto flex-inline flex-col items-center justify-center">
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
    ];

    const otherColumns = (allRaterGroups || [])?.map(({ name, minRater }) => ({
      key: name,
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100 capitalize">By {name}</span>
          <span className="text-body text-opacity-75 text-xs">
            <span className="mr-1">Min.</span>
            {minRater}
          </span>
        </div>
      ),
      render: (_, { groups }) => {
        return (
          groups[name] && (
            <div className="w-16 mt-5 mx-auto flex-inline flex-col items-center justify-center">
              <Progress
                className="h-8"
                subClassName="mb-12 pb-2"
                status={groups[name]?.totalSubmissions === groups[name]?.totalRaters ? 'sub' : ''}
                percentage={parseInt((groups[name]?.totalAnswers / groups[name]?.totalQuestions) * 100, 10)}
              />
              <div className="text-center">{groups[name]?.totalSubmissions}/{groups[name]?.totalRaters}</div>
            </div>
          )
        );
      },
    }));

    const statusColumn = {
      key: 'status',
      title: '',
      width: 50,
      render: (_, { minMet }) => (
        <div
          className={`ml-auto pr-2 text-xs text-antgray-100 ${!minMet && 'opacity-25'}`}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            position: 'absolute',
            top: '30px',
          }}
        >
          Met Min Req
        </div>
      ),
    };

    return [...initialColumns, ...otherColumns, statusColumn];
  }, [allRaterGroups]);

  const arrangeGroups = (groups) => {
    const arrangedGroups = {};
    groups.forEach((group) => {
      arrangedGroups[group.raterGroupName] = group;
    });
    return arrangedGroups;
  };

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
      groups: arrangeGroups(raterGroups),
    };

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
          // eslint-disable-next-line max-len
          percentage={parseInt((completionRate?.data?.totalSurveySubmissionRate / completionRate?.data?.totalSurveyRate) * 100, 10) || 0}
        />
      </div>
      <div className="bg-white p-6 pb-8 pr-32 rounded-md my-6">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-medium text-2xl">Overall Question Answered Rate</h1>

        </div>
        <Progress
          type="line"
          // eslint-disable-next-line max-len
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
