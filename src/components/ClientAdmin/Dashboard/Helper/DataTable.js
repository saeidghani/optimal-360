import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Progress from '../../../Common/Progress';

import Table from '../../../Common/Table';
import { useQuery } from '../../../../hooks';

const DataTable = ({
  loading,
  raterGroups,
  summary,
  ratees,
  raters,
  fetchRaterGroups,
  fetchSummary,
  fetchRatees,
  fetchRaters,
}) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const pageNumber = parsedQuery?.page_number || 1;
  const pageSize = parsedQuery?.page_size || 10;
  const surveyGroupId = parsedQuery?.surveyGroupId;
  const viewBy = parsedQuery?.viewBy;

  useEffect(() => {
    if (surveyGroupId) fetchRaterGroups(surveyGroupId);
  }, [fetchRaterGroups, surveyGroupId]);

  useEffect(() => {
    if (viewBy === 'ratee-summary') fetchSummary({ query, surveyGroupId });
  }, [fetchSummary, query, surveyGroupId, pageNumber, pageSize]);

  useEffect(() => {
    if (viewBy === 'ratee-details') fetchRatees({ query, surveyGroupId });
  }, [fetchRatees, query, surveyGroupId, pageNumber, pageSize]);

  useEffect(() => {
    if (viewBy === 'rater-details') fetchRaters({ query, surveyGroupId });
  }, [fetchRaters, query, surveyGroupId, pageNumber, pageSize]);

  const rateeSummaryColumns = React.useMemo(() => {
    const initialColumns = [
      {
        key: 'rateeName',
        title: (
          <div className="flex flex-col justify-between h-16">
            <span className="text-antgray-100">Ratee</span>
          </div>
        ),
        width: 100,
        render: (rateeName) => <span className="text-sm absolute top-0 pt-16">{rateeName}</span>,
      },
      {
        key: 'totalSubmissions',
        title: (
          <div className="flex flex-col justify-between h-16">
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
          <div className="text-center flex flex-col justify-between h-16">
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
        key: 'self',
        title: (
          <div className="text-center flex flex-col justify-between h-16">
            <span className="text-antgray-100 capitalize">By Self</span>
            <span className="text-body text-opacity-75 text-xs">
              <span className="mr-1">Min.</span>1
            </span>
          </div>
        ),
        width: 100,
        render: (_, { groups }) => {
          const { self } = groups || {};
          return (
            self && (
              <div
                className="absolute top-0 w-full mt-16 pt-3 w-16 mt-5 flex-inline flex-col
        items-center justify-center"
              >
                <div className="w-16 mx-auto">
                  <Progress
                    className="h-8"
                    subClassName="mb-10 pb-4"
                    status={self?.totalSubmissions === self?.totalRaters ? 'sub' : ''}
                    percentage={parseInt((self?.totalAnswers / self?.totalQuestions) * 100, 10)}
                  />
                </div>
                <div className="text-center">
                  {self?.totalSubmissions}/{self?.totalRaters}
                </div>
              </div>
            )
          );
        },
      },
    ];

    const otherColumns = (raterGroups?.data || [])?.map(({ name, minRater }) => ({
      key: name,
      title: (
        <div className="text-center flex flex-col justify-between h-16">
          <span className="text-antgray-100 capitalize">By {name}</span>
          <span className="text-body text-opacity-75 text-xs">
            <span className="mr-1">Min.</span>
            {minRater}
          </span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        return (
          groups[name] && (
            <div
              className="absolute top-0 w-full mt-16 pt-3 w-16 mt-5 flex-inline flex-col
        items-center justify-center"
            >
              <div className="w-16 mx-auto">
                <Progress
                  className="h-8"
                  subClassName="mb-10 pb-4"
                  status={groups[name]?.totalSubmissions === groups[name]?.totalRaters ? 'sub' : ''}
                  percentage={parseInt(
                    (groups[name]?.totalAnswers / groups[name]?.totalQuestions) * 100,
                    10,
                  )}
                />
              </div>
              <div className="text-center">
                {groups[name]?.totalSubmissions}/{groups[name]?.totalRaters}
              </div>
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
  }, [raterGroups?.timeStamp]);

  const rateeAndRaterDetailsColumns = React.useMemo(() => {
    const isRateeDetails = viewBy === 'ratee-details';

    const initialColumns = [
      {
        key: isRateeDetails ? 'rateeName' : 'raterName',
        title: (
          <div className="flex flex-col justify-between h-16">
            <span className="text-antgray-100">{isRateeDetails ? 'Ratee' : 'Rater'}</span>
          </div>
        ),
        width: 100,
        render: (name) => <span className="text-sm absolute top-0 pt-16">{name}</span>,
      },
      isRateeDetails
        ? {
            key: 'totalSubmissions',
            title: (
              <div className="flex flex-col justify-between h-16">
                <span className="text-antgray-100">No. Submission</span>
              </div>
            ),
            width: 100,
            render: (_, { totalRaters, totalSubmissions }) => (
              <span className="text-sm absolute top-0 pt-16">
                {totalSubmissions}/{totalRaters}
              </span>
            ),
          }
        : {
            key: 'totalSubmissions',
            title: (
              <div className="flex flex-col justify-between h-16">
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
          <div className="text-center flex flex-col justify-between h-16">
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
        key: 'self',
        title: (
          <div className="text-center flex flex-col justify-between h-16">
            <span className="text-antgray-100">{isRateeDetails ? 'By' : 'As'} Self</span>
            <span className="text-body text-opacity-75 text-xs">
              <span className="mr-1">Min.</span> 1
            </span>
          </div>
        ),
        width: 100,
        render: (_, { groups }) => {
          const { self } = groups || {};
          return (
            self && (
              <div className="mb-auto w-full">
                {isRateeDetails
                  ? self?.raters?.map((rater) => (
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
                    ))
                  : self?.ratees?.map((ratee) => (
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
                        <div className="text-center">{ratee?.raterName}</div>
                      </div>
                    ))}
              </div>
            )
          );
        },
      },
    ];

    const otherColumns = (raterGroups?.data || [])?.map(({ name, minRater }) => ({
      key: name,
      title: (
        <div className="text-center flex flex-col justify-between h-16">
          <span className="text-antgray-100">
            {isRateeDetails ? 'By' : 'As'} {name}
          </span>
          <span className="text-body text-opacity-75 text-xs">
            <span className="mr-1">Min.</span>
            {minRater}
          </span>
        </div>
      ),
      width: 100,
      render: (_, { groups }) => {
        return (
          groups[name] && (
            <div className="mb-auto w-full">
              {isRateeDetails
                ? groups[name]?.raters?.map((rater) => (
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
                      <div className="text-center">{rater.raterName}</div>
                    </div>
                  ))
                : groups[name]?.ratees?.map((ratee) => (
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
                      <div className="text-center">{ratee.raterName}</div>
                    </div>
                  ))}
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
  }, [raterGroups?.timeStamp, viewBy]);

  const arrangeGroups = (groups) => {
    const arrangedGroups = {};
    groups.forEach((group) => {
      arrangedGroups[group.raterGroupName] = group;
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
      tableClassName="c-table-thead-white overflow-x-auto align-top md:overflow-x-visible"
      loading={loading}
      columns={viewBy === 'ratee-summary' ? rateeSummaryColumns : rateeAndRaterDetailsColumns}
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
  fetchRaterGroups: PropTypes.func.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  fetchRatees: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  raterGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    timeStamp: PropTypes.number,
  }),
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
  raterGroups: {
    data: [],
    timeStamp: '',
  },
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
