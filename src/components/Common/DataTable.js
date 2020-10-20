import React, { useState } from 'react';
import { PlusCircleOutlined, LineOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Table } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';

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

const data = [
  {
    key: '1',
    name: '1',
    index: 0,
  },
  {
    key: '2',
    name: '2',
    index: 1,
  },
  {
    key: '3',
    name: '3',
    index: 2,
  },
  {
    key: '4',
    name: '4',
    index: 3,
  },
  {
    key: '5',
    name: '5',
    index: 4,
  },
];

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

const SortableTable = () => {
  const [dataSource, setDataSource] = useState(data);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter((el) => !!el);
      setDataSource(newData);
    }
  };

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  const DraggableContainer = (props) => (
    <SortableContainer useDragHandle helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />
  );
  return (
    <Table
      pagination={false}
      showHeader={false}
      dataSource={dataSource}
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

export default SortableTable;
