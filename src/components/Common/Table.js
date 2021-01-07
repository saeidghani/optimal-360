import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'antd';

import Dropdown from './Dropdown';

const _Table = ({
  columns,
  renderHeader,
  className,
  tableClassName,
  dataSource,
  rowClassName,
  loading,
  onPaginationChange,
  pageSize,
  pageNumber,
  onPageSizeChange,
  totalRecordSize,
  onRowSelectionChange,
  selectedRowKeys,
  onRowClick,
  onTableChange,
  size,
  pagination,
  paginationClassName,
  extraDetails,
  extraDetailsClassName,
  rowSelection,
  footer,
  rowKey,
  ...props
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
        className={tableClassName}
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
        rowKey={rowKey}
        onChange={(pagination, filters, sorter, extra) =>
          onTableChange({ pagination, filters, sorter, extra })
        }
        rowSelection={
          rowSelection && {
            type: 'checkbox',
            onChange: onRowSelectionChange,
            selectedRowKeys: selectedRowKeys.map((el) => el * 1),
          }
        }
        pagination={false}
        footer={footer}
        {...props}
      />
      {extraDetails && <div className={extraDetailsClassName}>{extraDetails}</div>}

      {pagination ? (
        <div className={`flex flex-row justify-between items-center mt-10 ${paginationClassName}`}>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm text-antgray-100 whitespace-no-wrap">
              Number of Results per Page
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
            current={pageNumber}
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
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
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
  pageNumber: PropTypes.number,
  onPageSizeChange: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowSelectionChange: PropTypes.func,
  totalRecordSize: PropTypes.number,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onRowClick: PropTypes.func,
  onTableChange: PropTypes.func,
  size: PropTypes.string,
  pagination: PropTypes.bool,
  rowSelection: PropTypes.bool,
  footer: PropTypes.func,
  rowKey: PropTypes.string,
  tableClassName: PropTypes.string,
  paginationClassName: PropTypes.string,
  extraDetailsClassName: PropTypes.string,
  extraDetails: PropTypes.node,
};

_Table.defaultProps = {
  renderHeader: () => { },
  onPageSizeChange: () => { },
  onPaginationChange: () => { },
  onRowSelectionChange: () => { },
  className: '',
  rowClassName: () => { },
  onTableChange: () => { },
  onRowClick: null,
  loading: false,
  pageSize: 10,
  pageNumber: 1,
  selectedRowKeys: [],
  totalRecordSize: 10,
  size: 'default',
  pagination: true,
  rowSelection: true,
  footer: null,
  rowKey: 'id',
  tableClassName: '',
  paginationClassName: '',
  extraDetailsClassName: '',
  extraDetails: null,
};

export default _Table;
