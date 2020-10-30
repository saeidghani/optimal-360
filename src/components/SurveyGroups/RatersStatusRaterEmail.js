import React from 'react';
// import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import MainLayout from '../Common/Layout';
import Dropdown from '../Common/Dropdown';
import Tabs from '../Common/Tabs';
import Table from '../Common/Table';
import SearchBox from '../Common/SearchBox';
import Button from '../Common/Button';

const RatersStatusRaterEmail = ({ loading }) => {
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
        <Button
          size="middle"
          textSize="xs"
          text="Send reminder email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Send reset password email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Send verification email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Send login email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
      </div>
    ) : (
      <div className="flex flex-row justify-end items-center">
        <div className="flex flex-row">
          <SearchBox className="text-xs" placeholder="SEARCH" loading={loading} />
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
      key: 'raterPassword',
      title: 'Rater Password',
      width: 100,
      sorter: true,
    },
  ]);

  const dataSource = [
    {
      key: '1',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      raterPassword: 'Katherine Janeway',
    },
    {
      key: '2',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      raterPassword: 'Katherine Janeway',
    },
    {
      key: '3',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      raterPassword: 'Katherine Janeway',
    },
    {
      key: '4',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      raterPassword: 'Katherine Janeway',
    },
    {
      key: '5',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      raterPassword: 'Katherine Janeway',
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
        <Tabs className="c-tabs-class" defaultActiveKey="3" tabOptions={primaryTabOptions} />
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
