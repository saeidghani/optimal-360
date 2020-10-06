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
      newItem.sortDirections = ['descend', 'ascend', 'descend'];
      newItem.defaultSortOrder = 'ascend';
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
        onChange={(pagination, filters, sorter, extra) =>
          onTableChange({ pagination, filters, sorter, extra })
        }
        rowSelection={{
          type: 'checkbox',
          onChange: onRowSelectionChange,
          selectedRowKeys,
        }}
        pagination={false}
      />

      <div className="flex flex-row justify-between items-center mt-10">
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm text-antgray-100 whitespace-no-wrap">Number of results per page</p>

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
  onPageSizeChange: PropTypes.func.isRequired,
  onPaginationChange: PropTypes.func.isRequired,
  onRowSelectionChange: PropTypes.func.isRequired,
  totalRecordSize: PropTypes.number.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRowClick: PropTypes.func,
  onTableChange: PropTypes.func,
  size: PropTypes.string,
};

_Table.defaultProps = {
  renderHeader: () => {},
  className: '',
  rowClassName: () => {},
  onTableChange: () => {},
  onRowClick: null,
  loading: false,
  pageSize: 10,
  size: 'default',
};

export default _Table;
