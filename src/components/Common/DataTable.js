import React from 'react';
import PropTypes from 'prop-types';

import arrayMove from 'array-move';

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
  renderHeader,
  onSortEnd,
  renderBodyWrapper,
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
                onClusterDelete(item.id);
              } else if (item?.questions) {
                onCompetencyDelete(item.id);
              } else {
                onQuestionDelete(item.id);
              }
            }}
            type="link"
            className="inline-flex text-xl text-primary-500 ml-auto"
            icon="DeleteOutlined"
          />
          <Button
            onClick={() => {
              if (item?.competencies) {
                onClusterEdit(item.id);
              } else if (item?.questions) {
                onCompetencyEdit(item.id);
              } else {
                onQuestionEdit(item.id);
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
    const index = data.findIndex((x) => x.index === rowProps['data-row-key']);
    return <SortableItem index={index} {...rowProps} />;
  };

  const DraggableContainer = (containerProps) => (
    <SortableContainer
      useDragHandle
      helperClass="row-dragging"
      onSortEnd={(val) => {
        onSortEnd(val, data);
      }}
      {...containerProps}
    />
  );

  return (
    <Table
      pagination={false}
      showHeader={false}
      title={renderHeader}
      dataSource={data}
      columns={columns}
      rowKey="index"
      components={{
        body: {
          wrapper: renderBodyWrapper() ? renderBodyWrapper : DraggableContainer,
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
  renderHeader: PropTypes.func.isRequired,
  renderBodyWrapper: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

SortableTable.defaultProps = {
  data: [],
};

export default SortableTable;
