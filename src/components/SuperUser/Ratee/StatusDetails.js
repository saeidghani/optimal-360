import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useQuery, useRateeSurveyGroup } from '../../../hooks';
import { stringify } from '../../../hooks/useQuery';

import { dynamicMap } from '../../../routes/RouteMap';

import Progress from '../../Common/Progress';
import Table from '../../Common/Table';
import SearchBox from '../../Common/SearchBox';
import Button from '../../Common/Button';
import ImportExcelButton from '../../Common/ImportExcelButton';

const StatusDetails = (
  {
    loading,
    fetchStatusDetails,
    removeRateeRaters,
    changeAssessmentsStatus,
    statusDetails,
    importRelations,
    exportRelations,
  },
) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const history = useHistory();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [, , surveyGroupId, surveyGroupObject] = useRateeSurveyGroup();

  const viewBy = parsedQuery?.viewBy || 'raters';
  const pageNumber = parsedQuery?.page_number || 1;
  const pageSize = parsedQuery?.page_size || 10;
  const projectId = parsedQuery?.projectId;
  const isNotPastEndDate = !moment(surveyGroupObject.endDate).isBefore();

  const fetch = () => {
    fetchStatusDetails({ query, surveyGroupId });
  };

  React.useEffect(() => {
    fetch();
    setSelectedRows([]);
  }, [fetchStatusDetails, surveyGroupId, pageSize, pageNumber, parsedQuery.q, parsedQuery.sort]);

  const renderHeader = React.useCallback(() => {
    const selectedRowsIds = selectedRows?.length > 0 ? selectedRows.map((el) => el.relationId) : [];

    return selectedRows && selectedRows?.length > 0 ? (
      <div className="flex flex-row items-center">
        <Button
          size="middle"
          textSize="xs"
          text="Remove"
          textClassName="mr-2"
          className="ml-3"
          onClick={async () => {
            await removeRateeRaters({ selectedRowsIds, surveyGroupId });
            fetch();
            setSelectedRows([]);
          }}
        />
        <Button
          size="middle"
          textSize="xs"
          text="Open Assessment"
          textClassName="mr-2"
          className="ml-3"
          onClick={async () => {
            await changeAssessmentsStatus({ selectedRowsIds, surveyGroupId, status: true });
            fetch();
            setSelectedRows([]);
          }}
        />
        <Button
          size="middle"
          textSize="xs"
          text="Close Assessment"
          textClassName="mr-2"
          className="ml-3"
          onClick={async () => {
            await changeAssessmentsStatus({ selectedRowsIds, surveyGroupId, status: false });
            fetch();
            setSelectedRows([]);
          }}
        />
        <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
      </div>
    ) : (
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <Button
            size="middle"
            textSize="xs"
            text="View by raters"
            textClassName="mr-2"
            className="ml-3"
            light={viewBy === 'ratees'}
            onClick={() => (setQuery({ viewBy: 'raters' }))}
          />
          <Button
            size="middle"
            textSize="xs"
            text="View by ratees"
            textClassName="mr-2"
            className="ml-3"
            light={viewBy === 'raters'}
            onClick={() => (setQuery({ viewBy: 'ratees' }))}
          />
        </div>
        <div className="flex flex-row">
          <SearchBox
            className="text-xs"
            placeholder="SEARCH"
            loading={loading}
            onSearch={(val) => setQuery({ q: val })}
            onPressEnter={(e) => setQuery({ q: e.target.value })}
          />
          {isNotPastEndDate ? (
            <Button
              size="middle"
              textSize="xs"
              text="Add Ratee"
              textClassName="mr-2"
              className="ml-3"
              type="gray"
              icon="PlusCircleOutlined"
              iconPosition="right"
              onClick={() => {
                const params = stringify({ projectId, surveyGroupId });
                const path = `${dynamicMap.superUser.addRatee()}${params}`;
                history.push(path);
              }}
            />
          ) : null}

          <Button
            size="middle"
            textSize="xs"
            text="Export Excel File"
            textClassName="mr-2"
            className="ml-3 mr-3"
            type="gray"
            icon="FileExcelOutlined"
            iconPosition="right"
            onClick={() => {
              exportRelations({ surveyGroupId });
            }}
          />
          {isNotPastEndDate ? (
            <ImportExcelButton
              textClassName="mr-2"
              className="ml-3"
              beforeUpload={(file) => {
                importRelations({ file, surveyGroupId });
                return false;
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }, [loading, selectedRows.length, viewBy]);

  const getSortOrder = (key) => {
    return parsedQuery?.sort?.includes(key)
      ? parsedQuery?.sort?.[0] === '+'
        ? 'ascend'
        : 'descend'
      : '';
  };

  const columns = React.useMemo(() => [
    viewBy === 'raters' ? {
      key: 'raterName',
      title: 'Rater Name',
      width: 100,
      sorter: true,
      sortOrder: getSortOrder('raterName'),
    } : {
      key: 'rateeName',
      title: 'Ratee Name',
      width: 100,
      sorter: true,
      sortOrder: getSortOrder('rateeName'),
      render: (num, { rateeId }) => (
        <div className="flex items-center">
          <div className="text-12px inline-block">{num}</div>
          <div className="inline-block">
            <Button
              onClick={() => {
                const params = stringify({ projectId, surveyGroupId, rateeId });
                const path = `${dynamicMap.superUser.editRatee()}${params}`;
                history.push(path);
              }}
              size="middle"
              textSize="xs"
              type="link"
              className="ml-2 p-0 h-6 w-6"
              icon="EditOutlined"
            />
          </div>
        </div>
      ),
    },
    {
      key: 'raterEmail',
      title: 'Rater Email',
      width: 100,
      sorter: true,
      sortOrder: getSortOrder('raterEmail'),
    },
    viewBy === 'ratees' ? {
      key: 'raterName',
      title: 'Rater Name',
      width: 100,
      sorter: true,
      sortOrder: getSortOrder('raterName'),
    } : {
      key: 'rateeName',
      title: 'Ratee Name',
      width: 100,
      sorter: true,
      sortOrder: getSortOrder('rateeName'),
      render: (num, { rateeId }) => (
        <div className="flex items-center">
          <div className="text-12px inline-block">{num}</div>
          <div className="inline-block">
            <Button
              onClick={() => {
                const params = stringify({ projectId, surveyGroupId, rateeId });
                const path = `${dynamicMap.superUser.editRatee()}${params}`;
                history.push(path);
              }}
              size="middle"
              textSize="xs"
              type="link"
              className="ml-2 p-0 h-6 w-6"
              icon="EditOutlined"
            />
          </div>
        </div>
      ),
    },
    {
      key: 'raterGroupName',
      title: 'Rater Group',
      width: 100,

    },
    {
      key: 'questionsAnswered',
      title: 'Questions Answered',
      width: 100,
      render: (_, { totalAnswered, totalQuestions }) => (
        <span>{`${totalAnswered}/${totalQuestions}`}</span>
      ),
    },
    {
      key: 'status',
      title: <span className="text-center ml-2">Status</span>,
      width: 50,
      render: (_, { totalAnswered, totalQuestions, raterSubmited }) => (
        <div className="w-16 flex-inline items-center justify-start">
          <Progress
            className="-mb-12 ml-auto"
            subClassName={`mb-12 pb-2 ${!raterSubmited && 'text-gray-800'}`}
            status={raterSubmited ? 'sub' : ''}
            percentage={parseInt((totalAnswered / totalQuestions) * 100, 10)}
          />
        </div>
      ),
    },
  ]);

  const sort = (sorter) => {
    // eslint-disable-next-line operator-linebreak
    const order = parsedQuery?.sort?.[0] === '+' ? '-' : '+';
    const newItem = `${order}${sorter.columnKey}`;

    setQuery({ sort: newItem });
  };
  return (
    <Table
      size="middle"
      className="c-table-white-head p-6 mt-5 bg-white rounded-lg shadow"
      onTableChange={({ sorter }) => sort(sorter)}
      loading={loading}
      columns={columns}
      dataSource={statusDetails?.data || []}
      rowKey="relationId"
      renderHeader={renderHeader}
      onPageSizeChange={(size) => {
        setQuery({ page_size: size, page_number: 1 });
      }}
      pageSize={pageSize * 1}
      pageNumber={pageNumber * 1}
      // eslint-disable-next-line camelcase
      onPaginationChange={(page_number, page_size) => {
        setSelectedRows([]);
        setQuery({
          page_size,
          page_number,
        });
      }}
      rowSelection={isNotPastEndDate}
      selectedRowKeys={selectedRows?.map((el) => el.relationId)}
      onRowSelectionChange={(_, rows) => {
        setSelectedRows(rows);
      }}
      totalRecordSize={statusDetails?.metaData?.pagination?.totalRecords * 1}
      rowClassName={({ assessmentStatus }) => {
        if (!assessmentStatus) {
          return 'td-gray';
        }
      }}
    />
  );
};

StatusDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchStatusDetails: PropTypes.func.isRequired,
  importRelations: PropTypes.func.isRequired,
  exportRelations: PropTypes.func.isRequired,
  removeRateeRaters: PropTypes.func.isRequired,
  changeAssessmentsStatus: PropTypes.func.isRequired,
  statusDetails: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        pageNumber: PropTypes.string,
        pageSize: PropTypes.string,
        totalRecords: PropTypes.string,
      }),
    }),
    timeStamp: PropTypes.number,
  }),
};

StatusDetails.defaultProps = {
  statusDetails: {},
};

export default StatusDetails;
