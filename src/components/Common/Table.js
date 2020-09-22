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

const _Table = ({ columns, renderHeader, className }) => {
  const [selectionType] = React.useState('checkbox');

  const _columns = columns.map((el) => {
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

  const data = Array(10)
    .fill(1)
    .map((_, i) => ({
      key: i,
      name: `John ${i}`,
      age: i * 10,
      text: `John ${i * 10}`,
      number: Math.floor(Math.random() * 100),
      // tags: ['nice', 'developer']
    }));

  return (
    <div className={`p-5 ${className}`}>
      <Table
        columns={_columns}
        dataSource={data}
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
  columns: PropTypes.shape([]).isRequired,
  renderHeader: PropTypes.func,
  className: PropTypes.string,
};

_Table.defaultProps = {
  renderHeader: () => 'Hi',
  className: '',
};

export default _Table;
