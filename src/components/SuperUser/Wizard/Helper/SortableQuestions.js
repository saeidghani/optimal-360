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
      width: 100,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: '#',
      dataIndex: 'key',
      width: 140,
      align: 'center',
      className: 'drag-visible',
    },
    {
      title: 'Question Label',
      align: 'left',
      dataIndex: 'label',
    },
    {
      title: 'Question statement',
      align: 'left',
      dataIndex: 'statement',
    },
  ];

  const SortableItem = sortableElement((props) => <tr {...props} />);
  const SortableContainer = sortableContainer((props) => <tbody {...props} />);

  // eslint-disable-next-line react/prop-types
  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex((x) => x.id.toString() === restProps['data-row-key'].toString());

    return <SortableItem index={index} {...restProps} />;
  };

  const DraggableContainer = (containerProps) => (
    <SortableContainer
      useDragHandle
      helperClass="row-dragging"
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
        scroll={{ y: 350 }}
        align="center"
        pagination={false}
        dataSource={data}
        columns={columns}
        rowKey="id"
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
