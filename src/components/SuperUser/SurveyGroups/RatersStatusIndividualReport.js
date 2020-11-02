import React from 'react';
// import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import MainLayout from '../../Common/Layout';
import Dropdown from '../../Common/Dropdown';
import Tabs from '../../Common/Tabs';
import Table from '../../Common/Table';
import Progress from '../../Common/Progress';
import Button from '../../Common/Button';
import Modal from '../../Common/Modal';
import Checkbox from '../../Common/Checkbox';

const RatersStatusRaterEmail = ({ loading }) => {
  const [pageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  const dropDownOptions = [
    { title: 'Top Leadership', value: 1 },
    { title: 'Top Leadership2', value: 2 },
    { title: 'Top Leadership3', value: 3 },
  ];

  const primaryTabOptions = [
    { title: 'Status Overview', key: 1 },
    { title: 'Status Details', key: 2 },
    { title: 'Rater Email', key: 3 },
    { title: 'Results', key: 4 },
  ];

  const secondaryTabOptions = [
    { title: 'Individual Report', key: 1 },
    { title: 'Group Report', key: 2 },
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
          onClick={() => setVisible(true)}
        />
        <Button
          size="middle"
          textSize="xs"
          text="Download report"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
          onClick={() => setVisible(true)}
        />
        <Button
          size="middle"
          textSize="xs"
          text="Export results to Excel"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
          onClick={() => setVisible(true)}
        />
        <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
      </div>
    ) : (
      <div className="inline-flex justify-start">
        <div>
          <Tabs className="c-tabs-class" defaultActiveKey={1} tabOptions={secondaryTabOptions} />
        </div>
      </div>
    );
  }, [loading, selectedRows.length]);

  const columns = React.useMemo(() => [
    {
      key: 'id',
      title: 'ID',
      width: 100,
      sorter: true,
    },
    {
      key: 'ratee',
      title: 'Ratee',
      width: 100,
      sorter: true,
    },
    {
      key: 'status',
      title: 'Status',
      width: 100,
      render: (percentage) => (
        <div className="w-16 flex-inline items-center justify-start">
          <Progress
            className="-mb-12 ml-auto"
            subClassName="mb-12 pb-2"
            status="sub"
            percentage={percentage}
          />
        </div>
      ),
    },
    {
      key: 'responsesSubmitted',
      title: (
        <div>
          <div>Responses</div>
          <div>Submitted</div>
        </div>
      ),
      width: 100,
    },
    {
      key: 'minSubmission',
      title: (
        <div>
          <div>Min.</div>
          <div>Submission</div>
        </div>
      ),
      width: 100,
    },
    {
      key: 'critCompData',
      title: (
        <div>
          <div>Crit. Comp</div>
          <div>.Data</div>
        </div>
      ),
      width: 100,
      render: () => (
        <div className="w-16 flex-inline items-center justify-start">
          <div className="w-5 h-5 bg-green-400 rounded-full" />
        </div>
      ),
    },
    {
      key: 'previousResults',
      title: (
        <div>
          <div>Previous</div>
          <div>Results</div>
        </div>
      ),
      width: 100,
      render: () => (
        <div className="w-16 flex-inline items-center justify-start">
          <div className="w-5 h-5 bg-orange rounded-full" />
        </div>
      ),
    },
    {
      key: 'reportAvailable',
      title: (
        <div>
          <div>Report</div>
          <div>Available</div>
        </div>
      ),
      width: 100,
      render: (status) => (
        <div className="w-16 flex-inline items-center justify-start">
          <span className={status === 'No' && 'text-red'}>{status}</span>
        </div>
      ),
    },
  ]);

  const dataSource = [
    {
      key: '1',
      id: '1000001',
      ratee: 'Katherine Kan',
      status: 100,
      responsesSubmitted: '2/10',
      minSubmission: 'Min. Met',
      critCompData: '',
      previousResults: '',
      reportAvailable: 'No',
    },
    {
      key: '2',
      id: '1000001',
      ratee: 'Katherine Kan',
      status: 100,
      responsesSubmitted: '2/10',
      minSubmission: 'Min. Met',
      critCompData: '',
      previousResults: '',
      reportAvailable: 'No',
    },
    {
      key: '3',
      id: '1000001',
      ratee: 'Katherine Kan',
      status: 100,
      responsesSubmitted: '2/10',
      minSubmission: 'Min. Met',
      critCompData: '',
      previousResults: '',
      reportAvailable: 'No',
    },
    {
      key: '4',
      id: '1000001',
      ratee: 'Katherine Kan',
      status: 100,
      responsesSubmitted: '2/10',
      minSubmission: 'Min. Met',
      critCompData: '',
      previousResults: '',
      reportAvailable: 'No',
    },
    {
      key: '5',
      id: '1000001',
      ratee: 'Katherine Kan',
      status: 100,
      responsesSubmitted: '2/10',
      minSubmission: 'Min. Met',
      critCompData: '',
      previousResults: '',
      reportAvailable: 'No',
    },
  ];

  return (
    <MainLayout contentClass="pl-21 pr-6 py-4" title="Super User" titleClass="my-2" hasBreadCrumb>
      <Modal
        okText="Discard These Settings"
        cancelText="Cancel"
        visible={visible}
        cancelButtonText="Cancel"
        okButtonText="Export"
        handleOk={() => setVisible(false)}
        handleCancel={() => setVisible(false)}
        width={605}
      >
        <div className="grid grid-cols-2 mb-3">
          <div>
            <Checkbox className="block mb-3" labelClass="text-sm">
              All
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Employment location
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Sector
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Industry
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Job Function
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Job Level
            </Checkbox>
          </div>
          <div>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Length of service in current role
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Age Group
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Gender
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Highest education attained
            </Checkbox>
          </div>
        </div>
      </Modal>
      <div className="grid grid-cols-7 mt-3 mb-10">
        <h2 className="col-start-1 my-6 pt-6 pl-3 font-medium text-base">Survey Group</h2>
        <Dropdown
          className="c-autocomplete col-start-1 w-full"
          showSearch
          value={1}
          type="gray"
          options={dropDownOptions}
        />
      </div>
      <div>
        <Tabs className="c-tabs-class" defaultActiveKey={4} tabOptions={primaryTabOptions} />
      </div>
      <Table
        size="middle"
        className="p-6 mt-5 bg-white rounded-lg shadow"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pageSize={pageSize * 1}
        pageNumber={1}
        renderHeader={renderHeader}
        selectedRowKeys={selectedRows?.map((el) => el.key)}
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
      />
    </MainLayout>
  );
};

RatersStatusRaterEmail.propTypes = {
  loading: PropTypes.bool.isRequired,
};

RatersStatusRaterEmail.defaultProps = {};

export default RatersStatusRaterEmail;
