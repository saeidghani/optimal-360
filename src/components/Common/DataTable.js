import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Table } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    render: () => (
      <>
        <DeleteOutlined className="text-xl text-primary-600 mr-4.5 cursor-pointer" />{' '}
        <EditOutlined className="text-xl text-primary-500 cursor-pointer" />{' '}
      </>
    ),
  },
];

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

const SortableTable = (props) => {
  const { data, onSortEnd } = props;

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  const DraggableContainer = (props) => (
    <SortableContainer useDragHandle helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />
  );
  return (
    <Table
      pagination={false}
      showHeader={false}
      dataSource={data}
      columns={columns}
      rowKey="index"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
};
SortableTable.propTypes = {
  data: PropTypes.array,
  onSortEnd: PropTypes.func,
};
export default SortableTable;
