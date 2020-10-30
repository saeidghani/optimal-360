import React from 'react';
// import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import MainLayout from '../Common/Layout';
import Dropdown from '../Common/Dropdown';
import Tabs from '../Common/Tabs';
import Table from '../Common/Table';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import Checkbox from '../Common/Checkbox';

const RatersStatusGroupReportReview = ({ loading }) => {
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
      <div className="flex justify-between items-center">
        <div>
          <Tabs className="c-tabs-class" defaultActiveKey="2" tabOptions={secondaryTabOptions} />
        </div>
        <Button
          size="middle"
          textSize="xs"
          text="Add Data"
          textClassName="mr-2"
          className="ml-3"
          type="gray"
          onClick={() => setVisible(true)}
        />
      </div>
    );
  }, [loading, selectedRows.length]);

  const columns = React.useMemo(() => [
    {
      key: 'groupReport',
      title: 'Group Report',
      width: 200,
      sorter: true,
    },
    {
      key: 'reportAvailable',
      title: 'Report Available',
      width: 200,
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
      groupReport: 'Top Leadership',
      reportAvailable: 'No',
    },
    {
      key: '2',
      groupReport: 'Top Leadership',
      reportAvailable: 'Yes',
    },
    {
      key: '3',
      groupReport: 'Top Leadership',
      reportAvailable: 'No',
    },
    {
      key: '4',
      groupReport: 'Top Leadership',
      reportAvailable: 'Yes',
    },
    {
      key: '5',
      groupReport: 'Top Leadership',
      reportAvailable: 'No',
    },
  ];

  return (
    <MainLayout contentClass="pl-21 pr-6 py-4" title="Super User" titleClass="my-2" hasBreadCrumb>
      <Modal
        okText="Export"
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
        <Tabs className="c-tabs-class" defaultActiveKey="4" tabOptions={primaryTabOptions} />
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

RatersStatusGroupReportReview.propTypes = {
  loading: PropTypes.bool.isRequired,
};

RatersStatusGroupReportReview.defaultProps = {};

export default RatersStatusGroupReportReview;
