import React from 'react';
import PropTypes from 'prop-types';

import Progress from '../../../Common/Progress';

import Table from '../../../Common/Table';
import { useQuery } from '../../../../hooks';

const DataTable = ({
  loading,
  summary,
  ratees,
  raters,
  fetchSummary,
  fetchRatees,
  fetchRaters,
}) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const pageNumber = parsedQuery?.page_number || 1;
  const pageSize = parsedQuery?.page_size || 10;
  const surveyGroupId = parsedQuery?.surveyGroupId;
  const viewBy = parsedQuery?.viewBy;

  React.useEffect(() => {
    if (viewBy === 'ratee-summary') fetchSummary({ query, surveyGroupId });
  }, [fetchSummary, query, surveyGroupId, pageNumber, pageSize]);

  React.useEffect(() => {
    if (viewBy === 'ratee-details') fetchRatees({ query, surveyGroupId });
  }, [fetchRatees, query, surveyGroupId, pageNumber, pageSize]);

  React.useEffect(() => {
    if (viewBy === 'rater-details') fetchRaters({ query, surveyGroupId });
  }, [fetchRaters, query, surveyGroupId, pageNumber, pageSize]);

  const rateeSummaryColumns = React.useMemo(() => [
    {
      key: 'rateeName',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Ratee</span>
        </div>
      ),
      width: 100,
      render: (rateeName) => <span className="text-sm absolute top-0 pt-16">{rateeName}</span>,
    },
    {
      key: 'totalSubmissions',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">No. Submission</span>
        </div>
      ),
      width: 100,
      render: (_, { totalRaters, totalSubmissions }) => (
        <span className="text-sm absolute top-0 pt-16">
          {totalSubmissions}/{totalRaters}
        </span>
      ),
    },
    {
      key: 'totalCompletionRate',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Total Completion Rate</span>
        </div>
      ),
      width: 100,
      render: (_, { totalAnswers, totalQuestions, isTotalQuestionAnsweredRateSub }) => (
        <div className="w-full mt-5 flex-inline flex-col items-center justify-center">
          <div className="w-20 mx-auto">
            <Progress
              subClassName="mb-10"
              percentageClassName="mb-10 text-heading2"
              status={isTotalQuestionAnsweredRateSub ? 'sub' : ''}
              percentage={parseInt((totalAnswers / totalQuestions) * 100, 10)}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'bySelf',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Self</span>
          <span className="text-body text-opacity-75 text-xs">Min. 1</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { bySelf } = groups;

        return (
          bySelf && (
            <div className="absolute top-0 w-full mt-16 pt-3 mt-5 flex-inline flex-col items-center justify-center">
              <div className="w-16 mx-auto">
                <Progress
                  className="h-8"
                  subClassName="mb-10 pb-4"
                  status={bySelf?.totalSubmissions === bySelf?.totalRaters ? 'sub' : ''}
                  percentage={parseInt((bySelf?.totalAnswers / bySelf?.totalQuestions) * 100, 10)}
                />
              </div>
              <div className="text-center">
                {bySelf?.totalSubmissions}/{bySelf?.totalRaters}
              </div>
            </div>
          )
        );
      },
    },
    {
      key: 'byManager',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Manager</span>
          <span className="text-body text-opacity-75 text-xs">Min. 1</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byManager } = groups || {};
        return (
          byManager && (
            <div
              className="absolute top-0 w-full mt-16 pt-3 w-16 mt-5 flex-inline flex-col
        items-center justify-center"
            >
              <div className="w-16 mx-auto">
                <Progress
                  className="h-8"
                  subClassName="mb-10 pb-4"
                  status={byManager?.totalSubmissions === byManager?.totalRaters ? 'sub' : ''}
                  percentage={parseInt(
                    (byManager?.totalAnswers / byManager?.totalQuestions) * 100,
                    10,
                  )}
                />
              </div>
              <div className="text-center">
                {byManager?.totalSubmissions}/{byManager?.totalRaters}
              </div>
            </div>
          )
        );
      },
    },
    {
      key: 'byPeers',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Peers</span>
          <span className="text-body text-opacity-75 text-xs">Min. 2</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byPeers } = groups || {};
        return (
          byPeers && (
            <div className="mb-auto h-full w-full flex flex-col justify-center items-center">
              <div className="mt-16 h-full flex-inline flex-col items-center justify-center">
                <div className="w-16 mx-auto">
                  <Progress
                    className="h-8"
                    subClassName="mb-10 pb-4"
                    status={byPeers?.totalSubmissions === byPeers?.totalRaters ? 'sub' : ''}
                    percentage={parseInt(
                      (byPeers?.totalAnswers / byPeers?.totalQuestions) * 100,
                      10,
                    )}
                  />
                </div>
              </div>
              <div className="text-center">
                {byPeers?.totalSubmissions}/{byPeers?.totalRaters}
              </div>
            </div>
          )
        );
      },
    },
    {
      key: 'byDirectReports',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Direct Reports</span>
          <span className="text-body text-opacity-75 text-xs">Min. 3</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byDirectReports } = groups || {};
        return (
          byDirectReports && (
            <div className="mb-auto w-full flex flex-col items-center">
              <div className="mt-16 flex-inline flex-col items-center justify-center">
                <div className="w-16 mx-auto">
                  <Progress
                    className="h-8"
                    subClassName="mb-10 pb-4"
                    status={
                      byDirectReports?.totalSubmissions === byDirectReports?.totalRaters
                        ? 'sub'
                        : ''
                    }
                    percentage={parseInt(
                      (byDirectReports?.totalAnswers / byDirectReports?.totalQuestions) * 100,
                      10,
                    )}
                  />
                </div>
              </div>
              <div className="text-center">
                {byDirectReports?.totalSubmissions}/{byDirectReports?.totalRaters}
              </div>
            </div>
          )
        );
      },
    },
    {
      key: 'byOthers',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Others</span>
          <span className="text-body text-opacity-75 text-xs">Min. 2</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byOthers } = groups || {};
        return (
          byOthers && (
            <div className="mb-auto w-full">
              <div className="flex flex-col items-center mb-20">
                <div className="w-16 mx-auto">
                  <Progress
                    className="h-8"
                    subClassName="mb-10 pb-4"
                    status={byOthers?.totalSubmissions === byOthers?.totalRaters ? 'sub' : ''}
                    percentage={parseInt(
                      (byOthers?.totalAnswers / byOthers?.totalQuestions) * 100,
                      10,
                    )}
                  />
                </div>
                <div className="text-center">
                  {byOthers?.totalSubmissions}/{byOthers?.totalRaters}
                </div>
              </div>
            </div>
          )
        );
      },
    },
    {
      key: 'status',
      title: '',
      width: 50,
      render: (_, { minMet }) => (
        <div
          className={`ml-auto flex items-center text-xs text-antgray-100 ${
            !minMet && 'opacity-25'
          }`}
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
    },
  ]);

  const rateeDetailsColumns = React.useMemo(() => [
    {
      key: 'rateeName',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Ratee</span>
        </div>
      ),
      width: 100,
      render: (rateeName) => <span className="text-sm absolute top-0 pt-16">{rateeName}</span>,
    },
    {
      key: 'totalSubmissions',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">No. Submission</span>
        </div>
      ),
      width: 100,
      render: (_, { totalRaters, totalSubmissions }) => (
        <span className="text-sm absolute top-0 pt-16">
          {totalSubmissions}/{totalRaters}
        </span>
      ),
    },
    {
      key: 'totalCompletionRate',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">Total Completion Rate</span>
        </div>
      ),
      width: 100,
      render: (_, { totalAnswered, totalQuestions, isTotalQuestionAnsweredRateSub }) => (
        <div className="w-full mt-5 flex-inline flex-col items-center justify-center">
          <div className="w-20 mx-auto">
            <Progress
              subClassName="mb-10"
              percentageClassName="mb-10 text-heading2"
              status={isTotalQuestionAnsweredRateSub ? 'sub' : ''}
              percentage={parseInt((totalAnswered / totalQuestions) * 100, 10)}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'bySelf',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Self</span>
          <span className="text-body text-opacity-75 text-xs">Min. 1</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { bySelf } = groups;

        return (
          bySelf && (
            <div className="mb-auto w-full">
              {bySelf?.raters?.map((rater) => (
                <div className="flex flex-col items-center mb-20" key={rater.raterId}>
                  <div className="w-16 mx-auto">
                    <Progress
                      className="h-8"
                      subClassName="mb-10 pb-4"
                      status={rater?.totalAnswered === rater?.totalQuestions ? 'sub' : ''}
                      percentage={parseInt(
                        (rater?.totalAnswered / rater?.totalQuestions) * 100,
                        10,
                      )}
                    />
                  </div>
                  <div className="text-center">{rater?.raterName}</div>
                </div>
              ))}
            </div>
          )
        );
      },
    },
    {
      key: 'byManager',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Manager</span>
          <span className="text-body text-opacity-75 text-xs">Min. 1</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byManager } = groups || {};
        return (
          byManager && (
            <div className="mb-auto w-full">
              {byManager?.raters?.map((rater) => (
                <div className="flex flex-col items-center mb-20" key={rater.raterId}>
                  <div className="w-16 mx-auto">
                    <Progress
                      className="h-8"
                      subClassName="mb-10 pb-4"
                      status={rater?.totalAnswered === rater?.totalQuestions ? 'sub' : ''}
                      percentage={parseInt(
                        (rater?.totalAnswered / rater?.totalQuestions) * 100,
                        10,
                      )}
                    />
                  </div>
                  <div className="text-center">{rater?.raterName}</div>
                </div>
              ))}
            </div>
          )
        );
      },
    },
    {
      key: 'byPeers',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Peers</span>
          <span className="text-body text-opacity-75 text-xs">Min. 2</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byPeers } = groups || {};
        return (
          byPeers && (
            <div className="mb-auto w-full">
              {byPeers?.raters?.map((rater) => (
                <div className="flex flex-col items-center mb-20" key={rater.raterId}>
                  <div className="w-16 mx-auto">
                    <Progress
                      className="h-8"
                      subClassName="mb-10 pb-4"
                      status={rater?.totalAnswered === rater?.totalQuestions ? 'sub' : ''}
                      percentage={parseInt(
                        (rater?.totalAnswered / rater?.totalQuestions) * 100,
                        10,
                      )}
                    />
                  </div>
                  <div className="text-center">{rater?.raterName}</div>
                </div>
              ))}
            </div>
          )
        );
      },
    },
    {
      key: 'byDirectReports',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Direct Reports</span>
          <span className="text-body text-opacity-75 text-xs">Min. 3</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byDirectReports } = groups || {};
        return (
          byDirectReports && (
            <div className="mb-auto w-full">
              {byDirectReports?.raters?.map((rater) => (
                <div className="flex flex-col items-center mb-20" key={rater.raterId}>
                  <div className="w-16 mx-auto">
                    <Progress
                      className="h-8"
                      subClassName="mb-10 pb-4"
                      status={rater?.totalAnswered === rater?.totalQuestions ? 'sub' : ''}
                      percentage={parseInt(
                        (rater?.totalAnswered / rater?.totalQuestions) * 100,
                        10,
                      )}
                    />
                  </div>
                  <div className="text-center">{rater?.raterName}</div>
                </div>
              ))}
            </div>
          )
        );
      },
    },
    {
      key: 'byOthers',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">By Others</span>
          <span className="text-body text-opacity-75 text-xs">Min. 2</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byOthers } = groups || {};
        return (
          byOthers && (
            <div className="mb-auto w-full">
              {byOthers?.raters?.map((rater) => (
                <div className="flex flex-col items-center mb-20" key={rater.raterId}>
                  <div className="w-16 mx-auto">
                    <Progress
                      className="h-8"
                      subClassName="mb-10 pb-4"
                      status={rater?.totalAnswered === rater?.totalQuestions ? 'sub' : ''}
                      percentage={parseInt(
                        (rater?.totalAnswered / rater?.totalQuestions) * 100,
                        10,
                      )}
                    />
                  </div>
                  <div className="text-center">{rater?.raterName}</div>
                </div>
              ))}
            </div>
          )
        );
      },
    },
    {
      key: 'status',
      title: '',
      width: 50,
      render: (_, { minMet }) => (
        <div
          className={`ml-auto text-xs text-antgray-100 ${!minMet && 'opacity-25'}`}
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
    },
  ]);

  const raterDetailsColumns = React.useMemo(() => [
    {
      key: 'raterName',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">Rater</span>
        </div>
      ),
      width: 100,
      render: (raterName) => <span className="text-sm absolute top-0 pt-16">{raterName}</span>,
    },
    {
      key: 'totalSubmissions',
      title: (
        <div className="flex flex-col justify-between h-20">
          <span className="text-antgray-100">No. Submission</span>
        </div>
      ),
      width: 100,
      render: (_, { totalRatees, totalSubmissions }) => (
        <span className="text-sm absolute top-0 pt-16">
          {totalSubmissions}/{totalRatees}
        </span>
      ),
    },
    {
      key: 'totalCompletionRate',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">Total Completion Rate</span>
        </div>
      ),
      width: 100,
      render: (_, { totalAnswered, totalQuestions, isTotalQuestionAnsweredRateSub }) => (
        <div className="w-full mt-5 flex-inline flex-col items-center justify-center">
          <div className="w-20 mx-auto">
            <Progress
              subClassName="mb-10"
              percentageClassName="mb-10 text-heading2"
              status={isTotalQuestionAnsweredRateSub ? 'sub' : ''}
              percentage={parseInt((totalAnswered / totalQuestions) * 100, 10)}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'bySelf',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">For Self</span>
          <span className="text-body text-opacity-75 text-xs">Min. 1</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { bySelf } = groups;

        return (
          bySelf && (
            <div className="mb-auto w-full">
              {bySelf?.ratees?.map((ratee) => (
                <div className="flex flex-col items-center mb-20" key={ratee.rateeId}>
                  <div className="w-16 mx-auto">
                    <Progress
                      className="h-8"
                      subClassName="mb-10 pb-4"
                      status={ratee?.totalAnswered === ratee?.totalQuestions ? 'sub' : ''}
                      percentage={parseInt(
                        (ratee?.totalAnswered / ratee?.totalQuestions) * 100,
                        10,
                      )}
                    />
                  </div>
                  <div className="text-center">{ratee?.rateeName}</div>
                </div>
              ))}
            </div>
          )
        );
      },
    },
    {
      key: 'byManager',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">For Manager</span>
          <span className="text-body text-opacity-75 text-xs">Min. 1</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byManager } = groups || {};
        return (
          byManager && (
            <div className="mb-auto w-full">
              {byManager?.ratees?.map((ratee) => (
                <div className="flex flex-col items-center mb-20" key={ratee.rateeId}>
                  <div className="w-16 mx-auto">
                    <Progress
                      className="h-8"
                      subClassName="mb-10 pb-4"
                      status={ratee?.totalAnswered === ratee?.totalQuestions ? 'sub' : ''}
                      percentage={parseInt(
                        (ratee?.totalAnswered / ratee?.totalQuestions) * 100,
                        10,
                      )}
                    />
                  </div>
                  <div className="text-center">{ratee?.rateeName}</div>
                </div>
              ))}
            </div>
          )
        );
      },
    },
    {
      key: 'byPeers',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">For Peers</span>
          <span className="text-body text-opacity-75 text-xs">Min. 2</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byPeers } = groups || {};
        return (
          byPeers && (
            <div className="mb-auto w-full">
              {byPeers?.ratees?.map((ratee) => (
                <div className="flex flex-col items-center mb-20" key={ratee.rateeId}>
                  <div className="w-16 mx-auto">
                    <Progress
                      className="h-8"
                      subClassName="mb-10 pb-4"
                      status={ratee?.totalAnswered === ratee?.totalQuestions ? 'sub' : ''}
                      percentage={parseInt(
                        (ratee?.totalAnswered / ratee?.totalQuestions) * 100,
                        10,
                      )}
                    />
                  </div>
                  <div className="text-center">{ratee?.rateeName}</div>
                </div>
              ))}
            </div>
          )
        );
      },
    },
    {
      key: 'byDirectReports',
      title: (
        <div className="text-center flex flex-col justify-between h-20">
          <span className="text-antgray-100">For Direct Reports</span>
          <span className="text-body text-opacity-75 text-xs">Min. 3</span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        const { byDirectReports } = groups || {};
        return (
          byDirectReports && (
            <div className="mb-auto w-full">
              {byDirectReports?.ratees?.map((ratee) => (
                <div className="flex flex-col items-center mb-20" key={ratee.rateeId}>
                  <div className="w-16 mx-auto">
                    <Progress
                      className="h-8"
                      subClassName="mb-10 pb-4"
                      status={ratee?.totalAnswered === ratee?.totalQuestions ? 'sub' : ''}
                      percentage={parseInt(
                        (ratee?.totalAnswered / ratee?.totalQuestions) * 100,
                        10,
                      )}
                    />
                  </div>
                  <div className="text-center">{ratee?.rateeName}</div>
                </div>
              ))}
            </div>
          )
        );
      },
    },
    {
      key: 'status',
      title: '',
      width: 50,
      render: (_, { minMet }) => (
        <div
          className={`ml-auto text-xs text-antgray-100 ${!minMet && 'opacity-25'}`}
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
    },
  ]);

  const arrangeGroups = (groups) => {
    const arrangedGroups = {};
    groups.forEach((group) => {
      switch (group.raterGroupName) {
        case 'manager':
          arrangedGroups.byManager = group;
          break;
        case 'peers':
          arrangedGroups.byPeers = group;
          break;
        case 'direct report':
          arrangedGroups.byDirectReports = group;
          break;
        case 'self':
          arrangedGroups.bySelf = group;
          break;
        default:
          arrangedGroups.byOthers = group;
      }
    });
    return arrangedGroups;
  };

  const rateeSummaryDataSource = React.useMemo(
    () =>
      (summary?.data || []).map(
        ({
          rateeId,
          rateeName,
          totalRaters,
          totalSubmissions,
          totalQuestions,
          totalAnswers,
          minMet,
          raterGroups,
        }) => {
          const data = {
            key: rateeId,
            rateeName,
            totalRaters,
            totalSubmissions,
            totalQuestions,
            totalAnswers,
            minMet,
            groups: arrangeGroups(raterGroups),
          };

          data.isTotalQuestionAnsweredRateSub = !raterGroups.filter(
            (obj) => obj?.totalAnswers !== obj?.totalQuestions,
          ).length;

          return data;
        },
      ),
    [summary.timeStamp],
  );

  const rateeDetailsDataSource = React.useMemo(
    () =>
      (ratees?.data || []).map(
        ({
          rateeId,
          rateeName,
          totalRaters,
          totalSubmissions,
          totalQuestions,
          totalAnswered,
          minMet,
          raterGroups,
        }) => {
          const data = {
            key: rateeId,
            rateeName,
            totalRaters,
            totalSubmissions,
            totalQuestions,
            totalAnswered,
            minMet,
            groups: arrangeGroups(raterGroups),
          };

          data.isTotalQuestionAnsweredRateSub = !raterGroups.filter(
            (obj) => obj?.totalAnswered !== obj?.totalQuestions,
          ).length;

          return data;
        },
      ),
    [ratees.timeStamp],
  );

  const raterDetailsDataSource = React.useMemo(
    () =>
      (raters?.data || []).map(
        ({
          raterId,
          raterName,
          totalRatees,
          totalSubmissions,
          totalQuestions,
          totalAnswered,
          minMet,
          raterGroups,
        }) => {
          const data = {
            key: raterId,
            raterName,
            totalRatees,
            totalSubmissions,
            totalQuestions,
            totalAnswered,
            minMet,
            groups: arrangeGroups(raterGroups),
          };

          data.isTotalQuestionAnsweredRateSub = !raterGroups.filter(
            (obj) => obj?.totalAnswered !== obj?.totalQuestions,
          ).length;

          return data;
        },
      ),
    [raters.timeStamp],
  );

  return (
    <Table
      size="middle"
      className="p-6 bg-white rounded-lg shadow"
      tableClassName="c-table-thead-white overflow-auto align-top"
      loading={loading}
      columns={
        viewBy === 'ratee-summary'
          ? rateeSummaryColumns
          : viewBy === 'ratee-details'
          ? rateeDetailsColumns
          : raterDetailsColumns
      }
      dataSource={
        viewBy === 'ratee-summary'
          ? rateeSummaryDataSource
          : viewBy === 'ratee-details'
          ? rateeDetailsDataSource
          : raterDetailsDataSource
      }
      rowKey="key"
      pageSize={10}
      pageNumber={pageNumber * 1}
      rowSelection={false}
      onPageSizeChange={(size) => setQuery({ page_size: size, page_number: 1 })}
      /* eslint-disable-next-line camelcase */
      onPaginationChange={(page_number, page_size) => setQuery({ page_number, page_size })}
      totalRecordSize={
        viewBy === 'ratee-summary'
          ? summary?.metaData?.pagination?.totalRecords * 1
          : viewBy === 'ratee-details'
          ? ratees?.metaData?.pagination?.totalRecords * 1
          : raters?.metaData?.pagination?.totalRecords * 1
      }
      paginationClassName="flex flex-col md:flex-row justify-between h-24"
    />
  );
};

DataTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  fetchRatees: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  summary: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    timeStamp: PropTypes.number,
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        pageNumber: PropTypes.string,
        pageSize: PropTypes.string,
        totalRecords: PropTypes.string,
      }),
    }),
  }),
  ratees: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    timeStamp: PropTypes.number,
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        pageNumber: PropTypes.string,
        pageSize: PropTypes.string,
        totalRecords: PropTypes.string,
      }),
    }),
  }),
  raters: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    timeStamp: PropTypes.number,
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        pageNumber: PropTypes.string,
        pageSize: PropTypes.string,
        totalRecords: PropTypes.string,
      }),
    }),
  }),
};

DataTable.defaultProps = {
  summary: {
    data: [],
    timeStamp: '',
    metaData: {},
  },
  ratees: {
    data: [],
    timeStamp: '',
    metaData: {},
  },
  raters: {
    data: [],
    timeStamp: '',
    metaData: {},
  },
};

export default DataTable;
