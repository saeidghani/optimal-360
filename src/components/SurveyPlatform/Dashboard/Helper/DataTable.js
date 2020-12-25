import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Table from '../../../Common/Table';
import Progress from '../../../Common/Progress';
import { dynamicMap } from '../../../../routes/RouteMap';
import { useQuery, stringify } from '../../../../hooks/useQuery';

const DataTable = ({
  loading,
  extraDetails,
  className,
  tableClassName,
  extraDetailsClassName,
  relations,
  isSubmitted,
  surveyGroupSubmited,
  visitedSurveyGroups,
}) => {
  const [parsedQuery, , setQuery] = useQuery();
  const { projectId, surveyGroupId, surveyMode, sort } = parsedQuery || {};
  const history = useHistory();

  const getSortOrder = (key) => {
    const sortOrder = parsedQuery?.sort?.includes(key)
      ? parsedQuery?.sort?.[0] === '+'
        ? 'ascend'
        : 'descend'
      : '';
    return sortOrder;
  };

  const sortColumns = (sorter) => {
    // eslint-disable-next-line operator-linebreak
    const order = parsedQuery?.sort?.[0] === '+' ? '-' : '+';
    const newItem = `${order}${sorter.columnKey}`;

    setQuery({ sort: newItem });
  };

  const handleIndividualClick = (key) => {
    localStorage.setItem('visitedSurveyGroups', JSON?.stringify(visitedSurveyGroups));
    history.push(
      `${dynamicMap.surveyPlatform.individualQuestions({
        surveyGroupId,
        questionNumber: 1,
      })}${stringify({ relationId: key, projectId })}`,
    );
  };

  const handleGroupClick = (relationship) => {
    console.log(relationship);
    localStorage.setItem('visitedSurveyGroups', JSON?.stringify(visitedSurveyGroups));
    history.push(
      `${dynamicMap.surveyPlatform.rateeGroupQuestions({
        surveyGroupId,
        questionNumber: 1,
      })}${stringify({ relation: relationship, projectId })}`,
    );
  };

  const allAndIndividualColumns = React.useMemo(() => {
    const columns = [
      {
        key: 'rateeName',
        title: <span className="pl-4">Name</span>,
        width: 100,
        sorter: (a, b) => a?.rateeName?.localeCompare(b?.rateeName),
        sortOrder: getSortOrder('rateeName'),
        render: (rateeName, { key }) => {
          return (
            <Fragment>
              {surveyMode !== 'individual' ? (
                <span className="pl-4">{rateeName}</span>
              ) : isSubmitted || surveyGroupSubmited ? (
                <span className="text-primary-500 pl-4">{rateeName}</span>
              ) : (
                <span
                  className="text-primary-500 pl-4 cursor-pointer"
                  onClick={() => handleIndividualClick(key)}
                >
                  {rateeName}
                </span>
              )}
            </Fragment>
          );
        },
      },
      {
        key: 'rate',
        title: 'Rate',
        width: 100,
        render: (_, { totalAnswers, totalQuestions }) => (
          <div className="w-16 h-16 flex items-center justify-end pt-2">
            <div className="mr-1 md:mr-4">
              {parseInt((totalAnswers / totalQuestions) * 100, 10)}%
            </div>
            <div>
              <Progress
                width={40}
                className="ml-auto"
                percentage={parseInt((totalAnswers / totalQuestions) * 100, 10)}
                showPercent={false}
              />
            </div>
          </div>
        ),
      },
    ];
    const statusColumn = {
      key: 'statusAction',
      title: 'Status / Action:',
      width: 100,
    };
    if (surveyMode === 'individual') {
      columns.splice(1, 0, {
        key: 'raterGroupName',
        title: 'Relationship',
        width: 100,
      });
      columns.splice(2, 0, statusColumn);
    } else if (surveyMode === 'all') {
      columns.splice(1, 0, {
        key: 'raterGroupName',
        title: 'Relationship',
        width: 100,
        sorter: (a, b) => a?.raterGroupName?.localeCompare(b?.raterGroupName),
        sortOrder: getSortOrder('raterGroupName'),
      });
    }
    return columns;
  }, [surveyMode, sort]);

  const groupColumns = React.useMemo(() => [
    {
      key: 'relationship',
      title: <span className="pl-4">Relationship</span>,
      width: 100,
      render: (relationship) => {
        return (
          <Fragment>
            {!isSubmitted || !surveyGroupSubmited ? (
              <span
                className="text-primary-500 pl-4 cursor-pointer"
                onClick={() => handleGroupClick(relationship)}
              >
                {relationship}
              </span>
            ) : (
              <span className="text-primary-500 pl-4">{relationship}</span>
            )}
          </Fragment>
        );
      },
    },
    {
      key: 'names',
      title: 'Name',
      width: 100,
      render: (names) => (
        <div className="flex flex-col justify-between align-center h-full">
          {names.map((name) => (
            <div className="py-6 text-left">{name}</div>
          ))}
        </div>
      ),
    },
    {
      key: 'statuses',
      title: 'Status / Action:',
      width: 100,
      render: (statuses) => (
        <div className="flex flex-col justify-between align-center h-full">
          {statuses.map((status) => (
            <div className="py-6 text-left">{status}</div>
          ))}
        </div>
      ),
    },
    {
      key: 'rates',
      title: <span className="text-left">Rate</span>,
      width: 100,
      render: (rates) => (
        <div className="flex flex-col justify-between align-center pt-4 pl-5">
          {rates?.map((rate) => (
            <div className="w-16 flex justify-end items-center">
              <div className="pb-4 mr-1 md:mr-4">{rate}%</div>
              <div className="w-12 h-full">
                <Progress className="-mb-12 ml-auto" percentage={rate} showPercent={false} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'collectiveRate',
      title: <span className="text-left">Collective Completion Rate</span>,
      width: 100,
      render: (collectiveRate) => (
        <div className="flex flex-col justify-between align-center pt-4 pl-5 ml-8">
          <div className="w-16 flex justify-end items-center">
            <div className="pb-4 mr-1 md:mr-4">{collectiveRate}%</div>
            <div className="w-12 h-full">
              <Progress
                className="-mb-12 mt-2 ml-auto"
                percentage={collectiveRate}
                showPercent={false}
              />
            </div>
          </div>
        </div>
      ),
    },
  ]);

  const findStatus = (totalAnswers, totalQuestions) => {
    const avg = parseInt((totalAnswers / totalQuestions) * 100, 10);
    switch (avg) {
      case avg > 0 && avg < 100:
        return 'In progress';
      case avg === 100:
        return 'Completed';
      default:
        return 'Not started';
    }
  };

  const allAndIndividualDataSource = React.useMemo(
    () =>
      relations?.data?.map(
        ({ rateeName, raterGroupName, relationId, totalAnswers, totalQuestions }) => {
          const data = {
            key: `${relationId}`,
            rateeName,
            raterGroupName,
            statusAction: findStatus(totalAnswers, totalQuestions),
            totalAnswers,
            totalQuestions,
          };
          return data;
        },
      ),
    [relations.timeStamp],
  );

  const groupDataSource = React.useMemo(() => {
    const rows = [];
    const raterGroupNames = relations?.data?.map(({ raterGroupName }) => raterGroupName);
    const items = {};
    // eslint-disable-next-line no-unused-expressions
    raterGroupNames?.forEach((groupName) => {
      items[groupName] = { names: [], rates: [], statuses: [] };
    });
    // eslint-disable-next-line no-unused-expressions
    relations?.data?.forEach(({ rateeName, raterGroupName, totalAnswers, totalQuestions }) => {
      // eslint-disable-next-line no-unused-expressions
      items[raterGroupName]?.names?.push(rateeName);
      // eslint-disable-next-line no-unused-expressions
      items[raterGroupName]?.rates?.push(parseInt((totalAnswers / totalQuestions) * 100, 10));
    });
    // eslint-disable-next-line no-unused-expressions
    Object.keys(items)?.forEach((item) => {
      if (items[item]?.names?.length > 0) {
        const row = {
          key: `${item}`,
          relationship: item,
          names: items[item]?.names,
          statuses: items[item]?.rates.map((status) =>
            status === 0 ? 'Not started' : status === 100 ? 'Completed' : 'In progress',
          ),
          rates: items[item]?.rates,
        };
        const allRates = items[item]?.rates;
        if (allRates?.length > 0) {
          const allRatesSum = allRates?.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0,
          );
          const avg = parseInt(allRatesSum / allRates?.length, 10) || 0;
          row.collectiveRate = avg;
        }
        rows.push(row);
      }
    });
    return rows;
  }, [relations.timeStamp]);

  return (
    <Table
      scroll={{ y: 450 }}
      size="middle"
      rowKey="key"
      loading={loading}
      className={className}
      tableClassName={`overflow-x-auto ${tableClassName}`}
      extraDetailsClassName={extraDetailsClassName}
      columns={surveyMode === 'group' ? groupColumns : allAndIndividualColumns}
      dataSource={surveyMode === 'group' ? groupDataSource : allAndIndividualDataSource}
      extraDetails={extraDetails}
      onTableChange={({ sorter }) => sortColumns(sorter)}
      rowSelection={false}
      pagination={false}
      title={null}
    />
  );
};

DataTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  isSubmitted: PropTypes.bool,
  surveyGroupSubmited: PropTypes.bool,
  extraDetails: PropTypes.node,
  className: PropTypes.string,
  tableClassName: PropTypes.string,
  extraDetailsClassName: PropTypes.string,
  relations: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    timeStamp: PropTypes.number,
  }),
};

DataTable.defaultProps = {
  className: '',
  tableClassName: '',
  extraDetailsClassName: '',
  extraDetails: null,
  relations: {},
  isSubmitted: false,
  surveyGroupSubmited: false,
};

export default DataTable;
