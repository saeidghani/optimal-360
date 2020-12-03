import React from 'react';
import { Link } from 'react-router-dom';
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
}) => {
  const [parsedQuery] = useQuery();
  const { surveyGroupId, surveyMode } = parsedQuery || {};

  const allAndIndividualColumns = React.useMemo(() => [
    {
      key: 'rateeName',
      title: <span className="pl-4">Name</span>,
      width: 100,
      sorter: true,
      render: (rateeName, { key }) => {
        return (
          <React.Fragment>
            {surveyMode === 'individual' ? (
              <Link
                to={`${dynamicMap.surveyPlatform.individualQuestions({
                  surveyGroupId,
                  questionNumber: 1,
                })}${stringify({ relationId: key })}`}
              >
                <span className="text-primary-500 pl-4">{rateeName}</span>
              </Link>
            ) : (
              <span className="pl-4">{rateeName}</span>
            )}
          </React.Fragment>
        );
      },
    },
    {
      key: 'raterGroupName',
      title: 'Relationship',
      width: 100,
    },
    {
      key: 'statusAction',
      title: 'Status / Action:',
      width: 100,
    },
    {
      key: 'rate',
      title: 'Rate',
      width: 100,
      render: (_, { totalAnswers, totalQuestions }) => (
        <div className="w-16 h-16 flex items-center justify-end pt-2">
          <div className="pb-2 mr-1 md:mr-4">
            {parseInt((totalAnswers / totalQuestions) * 100, 10)}%
          </div>
          <div className="w-12 h-full">
            <Progress
              className="-mb-12 ml-auto"
              percentage={parseInt((totalAnswers / totalQuestions) * 100, 10)}
              showPercent={false}
            />
          </div>
        </div>
      ),
    },
  ]);

  const groupColumns = React.useMemo(() => [
    {
      key: 'relationship',
      title: <span className="pl-4">Relationship</span>,
      width: 100,
      sorter: true,
      render: (relationship) => (
        <Link
          to={`${dynamicMap.surveyPlatform.rateeGroupQuestions({
            surveyGroupId,
            questionNumber: 1,
          })}${stringify({ relation: relationship })}`}
        >
          <span className="text-primary-500 pl-4">{relationship}</span>
        </Link>
      ),
    },
    {
      key: 'names',
      title: 'Name',
      width: 100,
      sorter: true,
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
        return 'To review';
      default:
        return 'To start';
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
            status === 0 ? 'To start' : status === 100 ? 'To review' : 'In progress',
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
      style={{ height: 500 }}
      size="middle"
      loading={loading}
      className={className}
      tableClassName={`overflow-x-auto ${tableClassName}`}
      extraDetailsClassName={extraDetailsClassName}
      columns={surveyMode === 'group' ? groupColumns : allAndIndividualColumns}
      dataSource={surveyMode === 'group' ? groupDataSource : allAndIndividualDataSource}
      extraDetails={extraDetails}
      rowSelection={false}
      pagination={false}
      title={null}
    />
  );
};

DataTable.propTypes = {
  loading: PropTypes.bool.isRequired,
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
};

export default DataTable;