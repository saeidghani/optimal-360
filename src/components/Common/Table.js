import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'antd';

import Input from './Input';

const _Table = ({
  columns,
  renderHeader,
  className,
  dataSource,
  rowClassName,
  loading,
  onPaginationChange,
  pageSize,
  onPageSizeChange,
  totalRecordSize,
  onRowSelectionChange,
  selectedRowKeys,
  onRowClick,
  size,
}) => {
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   // getCheckboxProps: (record) => ({
  //   //   disabled: record.name === 'Disabled User',
  //   //   // Column configuration not to be checked
  //   //   name: record.name,
  //   // }),
  // };

  const _columns = (columns || []).map((el) => {
    if (typeof el === 'undefined' && !el) return null;

    if (typeof el === 'string') {
      return {
        title: el.toUpperCase(),
        dataIndex: el,
        key: el,
      };
    }

    const newItem = {
      ...el,
      dataIndex: el.key,
    };

    if (el.sorter) {
      newItem.sortDirections = ['ascend', 'descend', 'ascend'];
      newItem.defaultSortOrder = 'descend';
    }

    return newItem;
  });

  return (
    <div className={`p-6 bg-white rounded-lg shadow ${className}`}>
      <Table
        size={size}
        loading={loading}
        onRow={(record, rowIndex) => ({
          onClick: () => (onRowClick ? onRowClick(record, rowIndex) : {}),
        })}
        rowClassName={rowClassName}
        ellipsis
        columns={_columns}
        dataSource={dataSource}
        title={renderHeader}
        rowSelection={{
          type: 'checkbox',
          onChange: onRowSelectionChange,
          selectedRowKeys,
        }}
        pagination={false}
      />

      {/* {pageSize < totalRecordSize ? ( */}
      <div className="flex flex-row justify-between items-center mt-10">
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm text-antgray-100">Number of results per page</p>

          <Input
            size="small"
            inputClass="text-center text-base  under-table-pagination"
            value={pageSize.toString()}
            wrapperClassName="w-12 ml-3"
            name="pager"
            onChange={(e) => onPageSizeChange(e.target.value * 1 !== 0 ? e.target.value : 10)}
          />
        </div>

        <Pagination
          onChange={onPaginationChange}
          pageSize={pageSize}
          showSizeChanger={false}
          defaultCurrent={1}
          total={totalRecordSize && !Number.isNaN(totalRecordSize) ? totalRecordSize : 10}
        />
      </div>
      {/* ) : null} */}
    </div>
  );
};

_Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        key: PropTypes.string,
        title: PropTypes.string,
        sorter: PropTypes.func,
      }),
    ]),
  ).isRequired,
  renderHeader: PropTypes.func,
  className: PropTypes.string,
  rowClassName: PropTypes.func,
  loading: PropTypes.bool,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
    }),
  ).isRequired,
  pageSize: PropTypes.number,
  onPageSizeChange: PropTypes.func.isRequired,
  onPaginationChange: PropTypes.func.isRequired,
  onRowSelectionChange: PropTypes.func.isRequired,
  totalRecordSize: PropTypes.number.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRowClick: PropTypes.func,
  size: PropTypes.string,
};

_Table.defaultProps = {
  renderHeader: () => 'Hi',
  className: '',
  rowClassName: () => {},
  onRowClick: null,
  loading: false,
  pageSize: 10,
  size: 'default',
};

export default _Table;
