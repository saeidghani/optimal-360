import React from 'react';

import Layout from './Helper/Layout';

import Dropdown from '../Common/Dropdown';
import Button from '../Common/Button';
import Tabs from '../Common/Tabs';
import Progress from '../Common/Progress';
import Table from '../Common/Table';

const AllRatees = ({ loading }) => {
  const [pageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const dropdownOptions = [
    { title: 'Top Leadership', value: 1 },
    { title: 'Top Leadership2', value: 2 },
    { title: 'Top Leadership3', value: 3 },
  ];

  const secondaryTabOptions = [
    { title: 'Individual', key: '1' },
    { title: 'Group', key: '2' },
    { title: 'All', key: '3' },
  ];

  const renderHeader = React.useCallback(() => {
    return selectedRows && selectedRows?.length > 0 ? (
      <div className="flex flex-row items-center">
        <Button
          size="middle"
          textSize="xs"
          text="Force generate report"
          textClassName="mr-2"
          className="ml-3"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Download report"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Export results to Excel"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
      </div>
    ) : (
      <div className="flex justify-between items-center">
        <div>
          <Tabs className="c-tabs-class" defaultActiveKey="3" tabOptions={secondaryTabOptions} />
        </div>
        <div className="flex justify-between">
          <span className="">Survey Ends on 28 Sep</span>
          <span className="mx-3">|</span>
          <div className="">
            <span className="mr-2 text-purple-500">29d</span>
            and
            <span className="mx-2 text-purple-500">2h</span>
            left
          </div>
        </div>
      </div>
    );
  }, [loading, selectedRows.length]);

  const columns = React.useMemo(() => [
    {
      key: 'name',
      title: 'Name',
      width: 100,
      sorter: true,
    },
    {
      key: 'relationship',
      title: 'Relationship',
      width: 100,
      sorter: true,
    },
    {
      key: 'rate',
      title: 'Rate',
      width: 100,
      render: (percentage) => (
        <div className="w-16 flex items-center justify-between">
          <div className="">{percentage}</div>
          <div className="w-20">
            <Progress
              className="-mb-12 ml-auto"
              subClassName="mb-10 pb-2"
              status="sub"
              percentage={percentage}
            />
          </div>
        </div>
      ),
    },
  ]);

  const dataSource = [
    {
      key: '1',
      name: '1000001',
      relationship: 'Katherine Kan',
      rate: 100,
    },
  ];

  return (
    <Layout>
      <div className="grid grid-cols-12 mb-10 mt-8">
        <div className="col-start-1 col-span-6 text-base text-body mb-3">Select Project</div>
        <Dropdown
          className="c-autocomplete col-start-1 col-span-12 md:col-start-1 md:col-span-4 lg:col-start-1 lg:col-span-3 w-full"
          showSearch
          value={1}
          type="gray"
          options={dropdownOptions}
        />
      </div>
      <div className="flex">
        <Button
          className="mr-1 bg-white border-list-border shadow-none"
          textClassName="text-heading"
          textSize="sm"
          text="Top Leadership"
        />
        <Button
          className="mr-1 bg-white border-list-border shadow-none"
          textClassName="text-heading text-primary-500"
          textSize="sm"
          text="Managers"
        />
        <Button
          className="mr-1 bg-white border-list-border shadow-none"
          textClassName="text-heading"
          textSize="sm"
          text="High Potentials"
        />
      </div>
      <Table
        size="middle"
        className="p-6 bg-white rounded-lg shadow"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pageSize={pageSize * 1}
        pageNumber={1}
        renderHeader={renderHeader}
        rowSelection={false}
        selectedRowKeys={selectedRows?.map((el) => el.key)}
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
      />
      <div className="flex justify-end mb-16">
        <Button className="mt-6 mr-3" text="Continue Rating" />
        <Button
          className="mt-6 bg-transparent text-primary-500 outline-none border-none shadow-none"
          text="Submit All"
        />
      </div>
    </Layout>
  );
};

export default AllRatees;
