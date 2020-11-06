import React from 'react';
import PropTypes from 'prop-types';

import Layout from './Helper/Layout';

import Dropdown from '../Common/Dropdown';
import Button from '../Common/Button';
import Tabs from '../Common/Tabs';
import Progress from '../Common/Progress';
import Table from '../Common/Table';

const RateeGroup = ({ loading }) => {
  const [pageSize] = React.useState(10);

  const dropdownOptions = [
    { title: 'Top Leadership', value: 1 },
    { title: 'Top Leadership2', value: 2 },
    { title: 'Top Leadership3', value: 3 },
  ];

  const secondaryTabOptions = [
    { title: 'Individual', key: '1' },
    { title: 'RateeGroup', key: '2' },
    { title: 'All', key: '3' },
  ];

  const renderHeader = React.useCallback((size) => {
    return (
      <div className={`${size !== 'sm' ? 'hidden md:flex justify-between items-center' : ''}`}>
        <div className="md:w-1/2">
          <Tabs className="md:c-tabs-class" defaultActiveKey="2" tabOptions={secondaryTabOptions} />
        </div>
        <div className="flex">
          <span className="text-xs md:text-sm">Survey Ends on 28 Sep</span>
          <span className="mx-1 md:mx-3">|</span>
          <div className="text-xs md:text-sm">
            <span className="mr-1 text-purple-500">29d</span>
            <span>and</span>
            <span className="mx-1 text-purple-500">2h</span>
            <span>left</span>
          </div>
        </div>
      </div>
    );
  }, []);

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
    },
    {
      key: 'statusAction',
      title: 'Status / Action:',
      width: 100,
    },
    {
      key: 'rate',
      title: 'Rate',
      width: 100,
      render: (percentage) => (
        <div className="w-16 h-16 flex items-center justify-between pt-2">
          <div className="pb-2 mr-1 md:mr-4">{percentage}</div>
          <div className="w-12 h-full">
            <Progress className="-mb-12 ml-auto" percentage={percentage} showPercent={false} />
          </div>
        </div>
      ),
    },
  ]);

  const dataSource = [
    {
      key: '1',
      name: 'Katherine Kan',
      relationship: 'Katherine Kan',
      statusAction: 'In progress',
      rate: 100,
    },
    {
      key: '2',
      name: 'Katherine Kan',
      relationship: 'Katherine Kan',
      statusAction: 'In progress',
      rate: 50,
    },
    {
      key: '3',
      name: 'Katherine Kan',
      relationship: 'Katherine Kan',
      statusAction: 'In progress',
      rate: 100,
    },
    {
      key: '4',
      name: 'Katherine Kan',
      relationship: 'Katherine Kan',
      statusAction: 'In progress',
      rate: 70,
    },
    {
      key: '5',
      name: 'Katherine Kan',
      relationship: 'Katherine Kan',
      statusAction: 'In progress',
      rate: 30,
    },
  ];

  return (
    <Layout hasBreadCrumb>
      <div className="grid grid-cols-12 mb-10 mt-10">
        <div className="col-start-1 col-span-6 text-base text-body mb-3">Select Project</div>
        <Dropdown
          className="c-autocomplete col-start-1 col-span-12 md:col-start-1 md:col-span-4 lg:col-start-1
           lg:col-span-3 w-full"
          showSearch
          value={1}
          type="gray"
          options={dropdownOptions}
        />
      </div>
      <div className="flex items-center overflow-auto">
        <Button
          className="mr-1 bg-white border-list-border shadow-none px-2 md:px-4"
          textClassName="text-heading"
          textSize="sm"
          text="Top Leadership"
        />
        <Button
          className="mr-1 bg-white border-list-border shadow-none px-6 md:px-4"
          textClassName="text-heading text-primary-500"
          textSize="sm"
          text="Managers"
        />
        <Button
          className="mr-1 bg-white border-list-border shadow-none px-2 md:px-4"
          textClassName="text-heading"
          textSize="sm"
          text="High Potentials"
        />
      </div>
      <div className="bg-white rounded-lg shadow p-4 mt-6 md:hidden">{renderHeader('sm')}</div>
      <Table
        size="middle"
        className="p-4 mt-8 md:mt-0 md:p-6 bg-white rounded-lg shadow"
        tableClassName="overflow-auto"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pageSize={pageSize * 1}
        pageNumber={1}
        rowSelection={false}
        title={renderHeader}
        paginationClassName="flex flex-col md:flex-row justify-between h-24"
      />
      <div className="block md:ml-auto mt-5 md:mb-24">
        <Button
          className="mt-6 bg-transparent text-primary-500 outline-none border-primary-500 shadow-none
          w-full md:w-auto md:border-none"
          text="Submit All"
        />
      </div>
    </Layout>
  );
};

RateeGroup.propTypes = {
  loading: PropTypes.bool.isRequired,
};

RateeGroup.defaultProps = {};

export default RateeGroup;
