import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import Layout from '../Helper/Layout';

import Dropdown from '../../Common/Dropdown';
import Button from '../../Common/Button';
import Progress from '../../Common/Progress';
import Table from '../../Common/Table';
import SecondaryTabs from '../Helper/SecondaryTabs';

const RateeGroup = ({ loading }) => {
  const [project, setProject] = React.useState('');

  const history = useHistory();

  const dropdownOptions = [
    { title: 'Top Leadership', value: '1' },
    { title: 'Top Leadership2', value: '2' },
    { title: 'Top Leadership3', value: '3' },
  ];

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
          <div className="pb-2 mr-1 md:mr-4">{percentage}%</div>
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

  const handleSubmit = () => {
    history.push('/survey-platform/managers/all-ratees/questions');
  };

  const DeadlineInfo = () => (
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
  );

  return (
    <Layout hasBreadCrumb>
      <div className="grid grid-cols-12 mb-10 mt-10">
        <div className="col-start-1 col-span-6 text-base text-body mb-3">Select Project</div>
        <Dropdown
          className="c-autocomplete col-start-1 col-span-12 md:col-start-1 md:col-span-4 lg:col-start-1
           lg:col-span-3 w-full"
          showSearch={false}
          type="gray"
          value={project}
          handleChange={(val) => setProject(val)}
          options={dropdownOptions}
        />
      </div>
      <div className="flex items-center overflow-auto">
        <Button
          className="mr-1 bg-white border-list-border shadow-none px-2 md:px-4"
          textClassName="text-heading"
          textSize="sm"
          text="Top Leadership"
          onClick={() => {}}
        />
        <Button
          className="mr-1 bg-white border-list-border shadow-none px-6 md:px-4"
          textClassName="text-heading text-primary-500"
          textSize="sm"
          text="Managers"
          onClick={() => {}}
        />
        <Button
          className="mr-1 bg-white border-list-border shadow-none px-2 md:px-4"
          textClassName="text-heading"
          textSize="sm"
          text="High Potentials"
          onClick={() => {}}
        />
      </div>
      <div className="flex flex-col p-4 bg-white rounded-lg shadow mt-8 md:hidden">
        <SecondaryTabs defaultActiveKey="ratee-group" />
        <DeadlineInfo />
      </div>
      {/* eslint-disable-next-line max-len */}
      <div className="p-0 bg-transparent rounded-none shadow-none mt-2 md:mt-0 md:p-8 md:bg-white md:rounded-lg md:shadow">
        <div className="hidden md:flex justify-between w-full">
          <SecondaryTabs defaultActiveKey="ratee-group" />
          <div className="my-auto">
            <DeadlineInfo />
          </div>
        </div>
        <Table
          size="middle"
          className="p-4 mt-8 md:mt-0 md:p-6 bg-white rounded-lg shadow"
          tableClassName="overflow-auto"
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowSelection={false}
          pagination={false}
          title={null}
        />
      </div>
      <div className="block md:ml-auto mt-5">
        <Button
          onClick={handleSubmit}
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
