import React from 'react';
import PropTypes from 'prop-types';

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import Button from './Button';

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

const SortableTable = ({
  data,
  onSortEnd,
  onClusterEdit,
  onClusterDelete,
  onCompetencyEdit,
  onCompetencyDelete,
  onQuestionEdit,
  onQuestionDelete,
}) => {
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
      title: 'action',
      dataIndex: 'action',
      // width: 100,
      className: 'drag-visible',
      render: (_, item) => (
        <div className="flex flex-row items-center">
          <Button
            onClick={() => {
              if (item?.competencies) {
                onClusterDelete(item);
              } else if (item?.questions) {
                onCompetencyDelete(item);
              } else {
                onQuestionDelete(item);
              }
            }}
            type="link"
            className="inline-flex text-xl text-primary-500 ml-auto"
            icon="DeleteOutlined"
          />
          <Button
            onClick={() => {
              if (item?.competencies) {
                onClusterEdit(item);
              } else if (item?.questions) {
                onCompetencyEdit(item);
              } else {
                onQuestionEdit(item);
              }
            }}
            type="link"
            className="inline-flex text-xl text-primary-500"
            icon="EditOutlined"
          />
        </div>
      ),
    },
  ];

  const DraggableBodyRow = (rowProps) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex((x) => x.id.toString() === rowProps['data-row-key'].toString());

    return <SortableItem index={index} {...rowProps} />;
  };

  const DraggableContainer = (containerProps) => (
    <SortableContainer
      useDragHandle
      helperClass="row-dragging"
      onSortEnd={(val) => onSortEnd(val, data)}
      {...containerProps}
    />
  );

  const Header = () => (
    <div
      className="flex flex-row justify-between bg-antgray-600 p-4
        items-center border-b border-list-border"
    >
      <span>All</span>

      <div className="flex items-center">
        <Button
          size="middle"
          type="gray"
          textSize="xs"
          textClassName="mr-2"
          text="Add Cluster"
          className="mr-3 text-base"
          // onClick={() => setquestionModal(true)}
          icon="PlusCircleOutlined"
          iconPosition="right"
        />

        <Button
          size="middle"
          type="gray"
          textSize="xs"
          textClassName="mr-2"
          text="Export Exel File"
          icon="PlusCircleOutlined"
          iconPosition="right"
          className="text-base"
          // onClick={() => setQuery()}
        />
      </div>
    </div>
  );

  return (
    <Table
      pagination={false}
      showHeader={false}
      dataSource={data}
      title={Header}
      columns={columns}
      rowKey="id"
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
  onSortEnd: PropTypes.func.isRequired,
  onClusterEdit: PropTypes.func.isRequired,
  onClusterDelete: PropTypes.func.isRequired,
  onCompetencyEdit: PropTypes.func.isRequired,
  onCompetencyDelete: PropTypes.func.isRequired,
  onQuestionEdit: PropTypes.func.isRequired,
  onQuestionDelete: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

SortableTable.defaultProps = {
  data: [],
};

export default SortableTable;
