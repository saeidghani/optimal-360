import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import Table from '../../Common/Table';
import SearchBox from '../../Common/SearchBox';
import Button from '../../Common/Button';
import { useQuery } from '../../../hooks';

const RatersEmail = ({
                       loading,
                       fetchRaters,
                       raters,
                       fetchEmailOptions,
                       emailOptions,
                       exportSurveyGroupRaters,
                       sendEmail,
                     }) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const pageNumber = parsedQuery?.page_number || 1;
  const surveyGroupId = parsedQuery?.surveyGroupId;

  useEffect(() => {
    fetchRaters({ query, surveyGroupId });
    setSelectedRows([]);
  }, [
    fetchRaters,
    surveyGroupId,
    parsedQuery.page_size,
    parsedQuery.q,
    parsedQuery.page_number,
    parsedQuery.sort,
  ]);
  useEffect(() => {
    fetchEmailOptions({ surveyGroupId });
  }, [fetchEmailOptions, surveyGroupId]);

  const renderHeader = React.useCallback(() => {
    return selectedRows && selectedRows?.length > 0 ? (
      <div className="flex flex-row items-center">
        {(emailOptions?.data || []).map(({ id, name }) => (
          <Button
            key={id}
            size="middle"
            textSize="xs"
            text={name}
            textClassName="mr-2"
            className="ml-3"
            icon="FileExcelOutlined"
            iconPosition="right"
            onClick={() => {
              sendEmail({
                surveyGroupId,
                emailOptionId: id,
                raterIds: selectedRows?.map((el) => el.raterId),
              });
            }}
          />
        ))}
        <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
      </div>
    ) : (
      <div className="flex flex-row justify-end items-center">
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
            text="Export Exel File"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="FileExcelOutlined"
            iconPosition="right"
            onClick={() => {
              exportSurveyGroupRaters({ surveyGroupId });
            }}
          />
        </div>
      </div>
    );
  }, [loading, selectedRows.length]);

  const columns = React.useMemo(() => [
    {
      key: 'name',
      title: 'Rates Name',
      width: 100,
      sorter: true,
    },
    {
      key: 'email',
      title: 'Rates Email',
      width: 100,
      sorter: true,
    },
    {
      key: 'password',
      title: 'Rates Password',
      width: 100,
      sorter: true,
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
      dataSource={raters?.data || []}
      rowKey="raterId"
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
      selectedRowKeys={selectedRows?.map((el) => el.raterId)}
      onRowSelectionChange={(_, rows) => {
        setSelectedRows(rows);
      }}
      totalRecordSize={raters?.metaData?.pagination?.totalRecords * 1}
    />
  );
};

RatersEmail.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  exportSurveyGroupRaters: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  raters: PropTypes.shape({
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
  fetchEmailOptions: PropTypes.func.isRequired,
  emailOptions: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
  }),

};

RatersEmail.defaultProps = {
  raters: {},
  emailOptions: {},
};

export default RatersEmail;
