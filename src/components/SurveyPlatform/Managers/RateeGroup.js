import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { FileTextOutlined, CheckOutlined } from '@ant-design/icons';

import Layout from '../Helper/Layout';

import Dropdown from '../../Common/Dropdown';
import Button from '../../Common/Button';
import Progress from '../../Common/Progress';
import Table from '../../Common/Table';
import SecondaryTabs from '../Helper/SecondaryTabs';
import Modal from '../../Common/Modal';

const RateeGroup = ({ loading }) => {
  const [submitModalVisible, setSubmitModalVisible] = React.useState(false);
  const [thankYouModalVisible, setThankYouModalVisible] = React.useState(false);
  const [project, setProject] = React.useState('');

  const history = useHistory();

  const dropdownOptions = [
    { title: 'Top Leadership', value: '1' },
    { title: 'Top Leadership2', value: '2' },
    { title: 'Top Leadership3', value: '3' },
  ];

  const columns = React.useMemo(() => [
    {
      key: 'relationship',
      title: 'Relationship',
      width: 100,
      render: (relationship) => (
        <div className="text-primary-500 h-full flex flex-col justify-start mb-auto">
          <Link to="/survey-platform/managers/ratee-group/questions">
            <span className="text-primary-500">{relationship}</span>
          </Link>
        </div>
      ),
    },
    {
      key: 'name',
      title: 'Name',
      width: 100,
      sorter: true,
      render: (names) => (
        <div className="flex flex-col justify-between pt-2">
          {names.map((name, index) => (
            <span
              key={name.id}
              className={`text-primary-500 ${names.length - 1 === index ? 'mb-1' : 'mb-10'}`}
            >
              <Link to="/survey-platform/managers/ratee-group/questions">{name.text}</Link>
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'statusAction',
      title: 'Status / Action:',
      width: 100,
      render: (statuses) => (
        <div className="flex flex-col justify-between pt-2">
          {statuses.map((status, index) => (
            <span key={status.id} className={`${statuses.length - 1 === index ? 'mb-2' : 'mb-10'}`}>
              {status.text}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'rate',
      title: 'Rate',
      width: 100,
      render: (percentages) => (
        <div className="flex flex-col justify-between align-center pt-4">
          {percentages.map((percentage) => (
            <div className="w-16 flex justify-end items-center" key={percentage.id}>
              <div className="pb-4 mr-1 md:mr-4">{percentage.number}%</div>
              <div className="w-12 h-full">
                <Progress
                  className="-mb-12 ml-auto"
                  percentage={percentage.number}
                  showPercent={false}
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'collectiveCompletionRate',
      title: 'Collective Completion Rate',
      width: 50,
      render: (percentage) => (
        <div className="w-16 h-16 flex items-center justify-end pl-auto ml-16 pt-2">
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
      name: [{ id: 1, text: 'Katherine Kan' }],
      relationship: 'Self',
      statusAction: [{ id: 1, text: 'In progress' }],
      rate: [{ id: 1, number: 70 }],
      collectiveCompletionRate: 70,
    },
    {
      key: '2',
      name: [
        { id: 1, text: 'Premela Jaganathan' },
        { id: 2, text: 'Karyn Chow' },
        { id: 3, text: 'Vince Hon' },
      ],
      relationship: 'Manager',
      statusAction: [
        { id: 1, text: 'To start' },
        { id: 2, text: 'To review' },
        { id: 3, text: 'To review' },
      ],
      rate: [
        { id: 1, number: 0 },
        { id: 2, number: 100 },
        { id: 3, number: 100 },
      ],
      collectiveCompletionRate: 66,
    },
    {
      key: '3',
      name: [
        { id: 1, text: 'Tek Ee Lin' },
        { id: 2, text: 'Karyn Chow' },
      ],
      relationship: 'Direct Report',
      statusAction: [
        { id: 1, text: 'To Start' },
        { id: 2, text: 'In progress' },
      ],
      rate: [
        { id: 1, number: 0 },
        { id: 2, number: 90 },
      ],
      collectiveCompletionRate: 45,
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

  const handleSubmit = () => {
    setSubmitModalVisible(true);
  };

  const handleSubmitModalOk = () => {
    setSubmitModalVisible(false);
    setThankYouModalVisible(true);
  };

  const handleThankYouModalOk = () => {
    setThankYouModalVisible(false);
  };

  return (
    <Layout hasBreadCrumb>
      <Modal
        visible={submitModalVisible}
        handleOk={handleSubmitModalOk}
        handleCancel={() => {}}
        width={588}
        okText="Yes"
        cancelText=""
        okButtonProps={{ textClassName: 'px-4' }}
      >
        <div className="flex flex-col items-center">
          <FileTextOutlined className="text-4xl text-primary-500 mb-4" />
          <p>Are you sure to submit this survey?</p>
        </div>
      </Modal>
      <Modal
        visible={thankYouModalVisible}
        handleOk={handleThankYouModalOk}
        handleCancel={() => {}}
        width={588}
        okText="Ok"
        cancelText=""
        okButtonProps={{ className: 'bg-antteal hover:bg-antteal', textClassName: 'px-4' }}
      >
        <div className="flex flex-col items-center">
          <CheckOutlined className="w-10 h-10 bg-antteal rounded-full text-white text-2xl pt-2 mb-4" />
          <p>Thank you for completing the survey. Your response has been submitted.</p>
        </div>
      </Modal>
      <div className="grid grid-cols-12 mb-10 mt-10">
        <div className="col-start-1 col-span-6 text-base text-body mb-3">Select Project</div>
        <Dropdown
          className="c-autocomplete col-start-1 col-span-12 md:col-start-1 md:col-span-4 lg:col-start-1
           lg:col-span-3 w-full"
          showSearch={false}
          type="gray"
          placeholder="Leadership Development"
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
