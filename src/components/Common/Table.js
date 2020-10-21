import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'antd';

import Dropdown from './Dropdown';

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
  onTableChange,
  size,
  pagination,
  rowSelection,
}) => {
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
      // newItem.sortDirections = ['descend', 'ascend', 'descend'];
      // newItem.defaultSortOrder = 'ascend';
    }

    return newItem;
  });

  return (
    <div className={`${className}`}>
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
        onChange={(pagination, filters, sorter, extra) =>
          onTableChange({ pagination, filters, sorter, extra })
        }
        rowSelection={
          rowSelection && {
            type: 'checkbox',
            onChange: onRowSelectionChange,
            selectedRowKeys,
          }
        }
        pagination={false}
      />

      {pagination ? (
        <div className="flex flex-row justify-between items-center mt-10">
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm text-antgray-100 whitespace-no-wrap">
              Number of results per page
            </p>

            <Dropdown
              handleChange={onPageSizeChange}
              value={pageSize.toString()}
              className="ml-3"
              showSearch={false}
              options={[
                { title: '10', value: 10 },
                { title: '20', value: 20 },
                { title: '50', value: 50 },
                { title: '100', value: 100 },
              ]}
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
      ) : null}
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
        sorter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
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
  onPageSizeChange: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowSelectionChange: PropTypes.func,
  totalRecordSize: PropTypes.number,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
  onRowClick: PropTypes.func,
  onTableChange: PropTypes.func,
  size: PropTypes.string,
  pagination: PropTypes.bool,
  rowSelection: PropTypes.bool,
};

_Table.defaultProps = {
  renderHeader: () => {},
  onPageSizeChange: () => {},
  onPaginationChange: () => {},
  onRowSelectionChange: () => {},
  className: '',
  rowClassName: () => {},
  onTableChange: () => {},
  onRowClick: null,
  loading: false,
  pageSize: 10,
  selectedRowKeys: [],
  totalRecordSize: 10,
  size: 'default',
  pagination: true,
  rowSelection: true,
};

export default _Table;
