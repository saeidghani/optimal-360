import React from 'react';
import PropTypes from 'prop-types';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import { Table } from 'antd';
import { LineOutlined, ReloadOutlined } from '@ant-design/icons';

const SorTableQuestions = ({ data, onQuestionSortEnd, onRandomize }) => {
  const DragHandle = sortableHandle(() => (
    <div className="flex flex-col justify-center items-center cursor-pointer">
      <LineOutlined className="text-antgray-100 text-lg" />
      <LineOutlined className="text-antgray-100 text-lg -mt-2" />
    </div>
  ));

  const columns = [
    {
      title: '',
      align: 'center',
      dataIndex: 'sort',
      width: 64,
      className: 'drag-visible dragHandler',
      render: () => <DragHandle />,
    },
    {
      title: '#',
      align: 'center',
      dataIndex: 'index',
      width: 64,
      className: 'drag-visible dragHandler',
    },
    {
      title: 'Question Label',
      dataIndex: 'label',
      className: 'drag-visible',
    },
    {
      title: 'Question statement',
      dataIndex: 'statement',
      className: 'drag-visible',
    },
  ];

  const SortableItem = sortableElement((props) => <tr {...props} />);
  const SortableContainer = sortableContainer((props) => <tbody {...props} />);

  // eslint-disable-next-line react/prop-types
  const DraggableBodyRow = (rowProps) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex(
      (x) => x.surveyPlatformShowOrder.toString() === rowProps['data-row-key'].toString(),
    );
    const row = data.find(
      (x) => x.surveyPlatformShowOrder.toString() === rowProps['data-row-key'].toString(),
    );

    return row?.deleted ? null : <SortableItem index={index} {...rowProps} />;
  };

  const DraggableContainer = (containerProps) => (
    <SortableContainer
      useDragHandle
      helperClass="questions-row-dragging"
      onSortEnd={(val) => onQuestionSortEnd(val, data)}
      {...containerProps}
    />
  );

  return (
    <div className="rounded border p-8">
      <div className="flex flex-row justify-between">
        <p className="text-secondary text-xl mb-4">Questions</p>

        <div
          onClick={onRandomize}
          className="link-content text-primary-500 text-sm pb-5 underline text-left cursor-pointer"
        >
          Change Random
          <ReloadOutlined className="ml-2 text-xl" />
        </div>
      </div>

      <Table
        tableClassName="clusters-table"
        scroll={{ y: 350 }}
        align="center"
        pagination={false}
        dataSource={data}
        columns={columns}
        rowKey="surveyPlatformShowOrder"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </div>
  );
};

SorTableQuestions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onQuestionSortEnd: PropTypes.func.isRequired,
  onRandomize: PropTypes.func.isRequired,
};

SorTableQuestions.defaultProps = {
  data: [],
};

export default SorTableQuestions;
