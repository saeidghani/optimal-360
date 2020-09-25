import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const _Table = ({ columns, renderHeader, className, dataSource }) => {
  const [selectionType] = React.useState('checkbox');

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

  // const dataSource = Array(10)
  //   .fill(1)
  //   .map((_, i) => ({
  //     key: i,
  //     name: `John ${i}`,
  //     age: i * 10,
  //     text: `John ${i * 10}`,
  //     number: Math.floor(Math.random() * 100),
  //     // tags: ['nice', 'developer']
  //   }));

  return (
    <div className={`p-6 bg-white rounded-lg shadow ${className}`}>
      <Table
        ellipsis
        columns={_columns}
        dataSource={dataSource}
        // onChange={(pagination, filters, sorter, extra) => {}}
        title={renderHeader}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        pagination={{ position: 'bottomRight' }}
      />
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
        // sorter: PropTypes.bool,
      }),
    ]),
  ).isRequired,
  renderHeader: PropTypes.func,
  className: PropTypes.string,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
    }),
  ).isRequired,
};

_Table.defaultProps = {
  renderHeader: () => 'Hi',
  className: '',
};

export default _Table;
