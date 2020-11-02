import React from 'react';
// import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import MainLayout from '../Common/Layout';
import Dropdown from '../Common/Dropdown';
import Tabs from '../Common/Tabs';
import Progress from '../Common/Progress';
import Table from '../Common/Table';
import SearchBox from '../Common/SearchBox';
import Button from '../Common/Button';

const RatersStatusDetails = ({ loading }) => {
  const [pageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);

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

  const renderHeader = React.useCallback(() => {
    return selectedRows && selectedRows?.length > 0 ? (
      <div className="flex flex-row items-center">
        <Button size="middle" textSize="xs" text="Remove" textClassName="mr-2" className="ml-3" />
        <Button
          size="middle"
          textSize="xs"
          text="Open Assessment"
          textClassName="mr-2"
          className="ml-3"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Close Assessment"
          textClassName="mr-2"
          className="ml-3"
        />
        <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
      </div>
    ) : (
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <Button
            size="middle"
            textSize="xs"
            text="View by raters"
            textClassName="mr-2"
            className="ml-3"
          />
          <Button
            size="middle"
            textSize="xs"
            text="View by ratees"
            textClassName="mr-2"
            className="ml-3"
            light
          />
        </div>
        <div className="flex flex-row">
          <SearchBox className="text-xs" placeholder="SEARCH" loading={loading} />
          <Button
            size="middle"
            textSize="xs"
            text="Add Ratee"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="PlusCircleOutlined"
            iconPosition="right"
          />
          <Button
            size="middle"
            textSize="xs"
            text="Export Exel File"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="FileExcelOutlined"
            iconPosition="right"
          />
          <Button
            size="middle"
            textSize="xs"
            text="Import Exel File"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="FileExcelOutlined"
            iconPosition="right"
          />
        </div>
      </div>
    );
  }, [loading, selectedRows.length]);

  const columns = React.useMemo(() => [
    {
      key: 'raterName',
      title: 'Rater Name',
      width: 100,
      sorter: true,
    },
    {
      key: 'raterEmail',
      title: 'Rater Email',
      width: 100,
      sorter: true,
    },
    {
      key: 'rateeName',
      title: 'Ratee Name',
      width: 100,
      sorter: true,
      render: (num) => <span className="text-12px">{num}</span>,
    },
    {
      key: 'raterGroup',
      title: 'Rater Group',
      width: 100,
    },
    {
      key: 'questionsAnswered',
      title: 'Questions Answered',
      width: 100,
    },
    {
      key: 'status',
      title: <span className="text-center ml-2">Status</span>,
      width: 50,
      render: () => (
        <div className="w-16 flex-inline items-center justify-start">
          <Progress
            className="-mb-12 ml-auto"
            subClassName="mb-12 pb-2"
            status="sub"
            percentage={100}
          />
        </div>
      ),
    },
  ]);

  const dataSource = [
    {
      key: '1',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      rateeName: 'Katherine Janeway',
      raterGroup: 'Manager',
      questionsAnswered: '100/100',
      status: '100%',
    },
    {
      key: '2',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      rateeName: 'Katherine Janeway',
      raterGroup: 'Manager',
      questionsAnswered: '100/100',
      status: '100%',
    },
    {
      key: '3',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      rateeName: 'Katherine Janeway',
      raterGroup: 'Manager',
      questionsAnswered: '100/100',
      status: '100%',
    },
    {
      key: '4',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      rateeName: 'Katherine Janeway',
      raterGroup: 'Manager',
      questionsAnswered: '100/100',
      status: '100%',
    },
    {
      key: '5',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      rateeName: 'Katherine Janeway',
      raterGroup: 'Manager',
      questionsAnswered: '100/100',
      status: '100%',
    },
  ];

  return (
    <MainLayout contentClass="pl-21 pr-6 py-4" title="Super User" titleClass="my-2" hasBreadCrumb>
      <div className="lg:w-2/12 w-4/12 mt-3 mb-10">
        <h2 className="my-6 pt-6 pl-3 font-medium text-16px">Survey Group</h2>
        <Dropdown
          className="c-autocomplete w-full"
          showSearch
          value={1}
          type="gray"
          options={dropDownOptions}
        />
      </div>
      <div>
        <Tabs className="c-tabs-class" defaultActiveKey="2" tabOptions={primaryTabOptions} />
      </div>
      <Table
        size="middle"
        className="c-table-white-head p-6 mt-5 bg-white rounded-lg shadow"
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

RatersStatusDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
};

RatersStatusDetails.defaultProps = {};

export default RatersStatusDetails;
