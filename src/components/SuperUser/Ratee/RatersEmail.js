import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import Table from '../../Common/Table';
import SearchBox from '../../Common/SearchBox';
import Button from '../../Common/Button';
import { useQuery } from '../../../hooks';

const RatersEmail = ({ surveyGroupId, loading, fetchRaters, raters }) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const pageNumber = parsedQuery?.page_number;

  useEffect(() => {
    const newQuery = query || '?page_size=10&page_number=1';
    fetchRaters({ query: newQuery, surveyGroupId });
  }, [fetchRaters, query, surveyGroupId]);

  const renderHeader = React.useCallback(() => {
    return selectedRows && selectedRows?.length > 0 ? (
      <div className="flex flex-row items-center">
        <Button
          size="middle"
          textSize="xs"
          text="Send reminder email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Send reset password email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Send verification email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Send login email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
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
  surveyGroupId: PropTypes.string.isRequired,
  fetchRaters: PropTypes.func.isRequired,
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
};

RatersEmail.defaultProps = {
  raters: {},
};

export default RatersEmail;
