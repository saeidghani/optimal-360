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
        loading={loading}
        onRow={(record, rowIndex) => ({
          onClick: () => onRowClick(record, rowIndex),
        })}
        rowClassName={rowClassName}
        ellipsis={false}
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
          <p className="text-sm text-antgray-100 mt-1">Number of results per page</p>

          <Input
            inputStyles={{ fontSize: '1rem' }}
            inputClass="text-center text-base"
            value={pageSize.toString()}
            wrapperClassName="w-12 h-8 ml-3"
            name="pager"
            onChange={(e) => onPageSizeChange(e.target.value)}
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
  selectedRowKeys: PropTypes.shape([]).isRequired,
  onRowClick: PropTypes.func,
};

_Table.defaultProps = {
  renderHeader: () => 'Hi',
  className: '',
  rowClassName: () => {},
  onRowClick: null,
  loading: false,
  pageSize: 10,
};

export default _Table;
