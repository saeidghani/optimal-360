import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Layout from '../Helper/Layout';
import SecondaryTabs from '../Helper/SecondaryTabs';

import Dropdown from '../../Common/Dropdown';
import Button from '../../Common/Button';
import Progress from '../../Common/Progress';
import Table from '../../Common/Table';

import graphIcon from '../../../assets/images/graph-icon.svg';

const AllRatees = ({ loading }) => {
  const [pageSize] = React.useState(10);
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
      sorter: true,
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
      relationship: 'Self',
      rate: 100,
    },
    {
      key: '2',
      name: 'Premela Jaganathan',
      relationship: 'Manager',
      rate: 0,
    },
    {
      key: '3',
      name: 'Karyn Chow',
      relationship: 'Manager',
      rate: 100,
    },
    {
      key: '4',
      name: 'Vince Hon',
      relationship: 'Peers',
      rate: 70,
    },
    {
      key: '5',
      name: 'Tek Ee Lin',
      relationship: 'Direct Report',
      rate: 0,
    },
  ];

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

  const ExtraDetails = () => (
    <div className="flex flex-col items-center mt-6">
      <div className="md:hidden">
        <DeadlineInfo />
      </div>
      <div className="flex items-center mt-10 md:mt-20">
        <span className="relative w-10 h-10 rounded-full bg-primary-500">
          <img src={graphIcon} className="absolute bottom-0 pb-3 pl-2 w-3/4" alt="" />
        </span>
        <span className="mx-2 text-body text-sm">extraDetails</span>
        <span className="text-heading text-xl">In progress</span>
      </div>
      <Progress className="mt-10" percentage={20} subClassName="text-heading" showPercent />
      <div className="mt-10 text-antgray-100">Collective Completion Rate</div>
    </div>
  );

  const handleContinue = () => {
    history.push('/survey-platform/managers/individual');
  };

  const handleSubmit = () => {
    history.push('/survey-platform/managers/individual');
  };

  return (
    <Layout hasBreadCrumb>
      <div className="grid grid-cols-12 mb-10 mt-8">
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
      <div className="flex items-center overflow-x-auto">
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
      <div className="bg-white rounded-lg shadow p-4 mt-6 md:hidden">
        <SecondaryTabs defaultActiveKey="all-ratees" />
        <ExtraDetails />
      </div>
      <div className="p-8 bg-white rounded-lg shadow mt-8 md:mt-0">
        <div className="hidden md:flex justify-between w-full">
          <SecondaryTabs defaultActiveKey="all-ratees" />
          <div className="my-auto">
            <DeadlineInfo />
          </div>
        </div>
        <Table
          size="middle"
          className="md:grid grid-cols-8 md:mt-0"
          tableClassName="col-span-5 overflow-x-auto"
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowSelection={false}
          pagination={false}
          title={null}
          extraDetails={
            <div className="hidden md:block">
              <ExtraDetails />
            </div>
          }
          extraDetailsClassName="row-start-1 col-start-6 col-span-3"
        />
      </div>
      <div className="md:flex justify-end">
        <Button
          onClick={handleContinue}
          className="mt-6 mr-3 w-full md:w-auto"
          text="Continue Rating"
        />
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

AllRatees.propTypes = {
  loading: PropTypes.bool.isRequired,
};

AllRatees.defaultProps = {};

export default AllRatees;
