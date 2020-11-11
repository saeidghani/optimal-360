import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '../../../hooks';

import Progress from '../../Common/Progress';
import Table from '../../Common/Table';
import SearchBox from '../../Common/SearchBox';
import Button from '../../Common/Button';
import AwardIcon from '../../../assets/images/award.svg';
import { useHistory } from 'react-router-dom';

const StatusDetails = (
  {
    loading,
    fetchStatusDetails,
    removeRateeRaters,
    changeAssessmentsStatus,
    exportSurveyGroupRaters,
    statusDetails,
  },
) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const history = useHistory();
  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const pageNumber = parsedQuery?.page_number;
  const surveyGroupId = parsedQuery?.surveyGroupId;

  const fetch = () => {
    fetchStatusDetails({ query, surveyGroupId });
  };

  useEffect(() => {
    fetch();
    setSelectedRows([]);
  }, [
    fetchStatusDetails,
    surveyGroupId,
    parsedQuery.page_size,
    parsedQuery.q,
    parsedQuery.page_number,
    parsedQuery.sort,
  ]);

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
          />
          <Button
            size="middle"
            textSize="xs"
            text="View by ratees"
            textClassName="mr-2"
            className="ml-3"
            light
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
          <Button
            size="middle"
            textSize="xs"
            text="Add Ratee"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="PlusCircleOutlined"
            iconPosition="right"
          />
          <Button
            size="middle"
            textSize="xs"
            text="Export Exel File"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="FileExcelOutlined"
            iconPosition="right"
            onClick={() => {
              exportSurveyGroupRaters({surveyGroupId});
            }}
          />
          <Button
            size="middle"
            textSize="xs"
            text="Import Exel File"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="FileExcelOutlined"
            iconPosition="right"
          />
        </div>
      </div>
    );
  }, [loading, selectedRows.length]);

  const getSortOrder = (key) => {
    return parsedQuery?.sort?.includes(key)
      ? parsedQuery?.sort?.[0] === '+'
        ? 'ascend'
        : 'descend'
      : '';
  };

  const columns = React.useMemo(() => [
    {
      key: 'raterName',
      title: 'Rater Name',
      width: 100,
      sorter: true,
      sortOrder: getSortOrder('raterName'),
    },
    {
      key: 'raterEmail',
      title: 'Rater Email',
      width: 100,
      sorter: true,
      sortOrder: getSortOrder('raterEmail'),
    },
    {
      key: 'rateeName',
      title: 'Ratee Name',
      width: 100,
      sorter: true,
      sortOrder: getSortOrder('rateeName'),
      render: (num) => (
        <div className="flex items-center">
          <div className="text-12px inline-block">{num}</div>
          <div className="inline-block">
            <Button
              onClick={() => {
                history.push(`/super-user/participants/ratee/add/edit?surveyGroupId=${parsedQuery.surveyGroupId}${parsedQuery.projectId ? `&projectId=${parsedQuery.projectId}` : ''}`);
              }}
              size="middle"
              textSize="xs"
              type="link"
              className="ml-2 p-0 h-6 w-6"
              icon={<img src={AwardIcon} alt="Ratee Name" className="purple-check h-6 w-6 inline-block" />}
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
            status={raterSubmited && 'sub'}
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
        setPageSize(size);
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
      selectedRowKeys={selectedRows?.map((el) => el.relationId)}
      onRowSelectionChange={(_, rows) => {
        setSelectedRows(rows);
      }}
      totalRecordSize={statusDetails?.metaData?.pagination?.totalRecords * 1}
    />
  );
};

StatusDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchStatusDetails: PropTypes.func.isRequired,
  removeRateeRaters: PropTypes.func.isRequired,
  changeAssessmentsStatus: PropTypes.func.isRequired,
  exportSurveyGroupRaters: PropTypes.func.isRequired,
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
