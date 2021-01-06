import React, { useState } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { LineOutlined, ReloadOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import { Table } from 'antd';

const SorTableQuestions = ({ data }) => {
    const [dataSource, setDataSource] = useState([]);

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

    const tableData = data?.map((el, i) => ({
        ...el,
        index: i,
        key: i + 1,
    }));
    React.useEffect(() => {
        setDataSource(tableData)
    }, [data])
    const DragHandle = sortableHandle(() => (
        <div className="flex flex-col justify-center items-center cursor-pointer">
            <LineOutlined className="text-antgray-100 text-lg" />
            <LineOutlined className="text-antgray-100 text-lg -mt-2" />
        </div>
    ));

    const SortableItem = sortableElement((props) => <tr {...props} />);
    const SortableContainer = sortableContainer((props) => <tbody {...props} />);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter((el) => !!el);
            const dataOrder = newData.map((el, i) => ({ ...el, key: i + 1 }));
            setDataSource(dataOrder);
        }
    };

    // eslint-disable-next-line react/prop-types
    const DraggableBodyRow = ({ className, style, ...restProps }) => {
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };

    const DraggableContainer = (props) =>
    (
        <SortableContainer
            useDragHandle
            helperClass="row-dragging"
            onSortEnd={onSortEnd}
            {...props}
        />
    );

    const shuffled = () => {
        const newData = dataSource
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
        const dataOrder = newData.map((el, i) => ({ ...el, key: i + 1 }));
        setDataSource(dataOrder);
    };

    return (
        <div className="rounded border p-8">
            <div className="flex flex-row justify-between">
                <p className="text-secondary text-xl mb-4">Questions</p>
                <div
                    onClick={shuffled}
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
        </div>
    );
};

export default SorTableQuestions;
