import React from 'react';
// import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import MainLayout from '../../Common/Layout';
import Dropdown from '../../Common/Dropdown';
import Table from '../../Common/Table';
import Button from '../../Common/Button';

const GroupReports = ({ loading }) => {
  const [pageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const dropDownOptions = [
    { title: 'Top Leadership', value: 1 },
    { title: 'Top Leadership2', value: 2 },
    { title: 'Top Leadership3', value: 3 },
  ];

  const renderHeader = React.useCallback(() => {
    return (
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <Button
            size="middle"
            textSize="xs"
            text="Select Clusters"
            textClassName="mr-2"
            className="ml-3"
          />
          <Button
            size="middle"
            textSize="xs"
            text="Select Competencies"
            textClassName="mr-2"
            className="ml-3"
          />
        </div>
        <div className="flex flex-row">
          <Button
            size="middle"
            textSize="xs"
            text="Export Excel File"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="FileExcelOutlined"
            iconPosition="right"
          />
          <Button
            size="middle"
            textSize="xs"
            text="Import Excel File"
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
      key: 'clusterID',
      title: 'Cluster ID',
      width: 100,
      sorter: true,
    },
    {
      key: 'competencies',
      title: 'Competencies',
      width: 100,
      sorter: true,
    },
    {
      key: 'externalBenchmark',
      title: '',
      width: 100,
    },
  ]);

  const dataSource = [
    {
      key: '1',
      clusterID: 'OPTFE012',
      competencies: 'Relationship Management',
      externalBenchmark: 'External Benchmark Value',
    },
    {
      key: '2',
      clusterID: 'OPTFE012',
      competencies: 'Relationship Management',
      externalBenchmark: 'External Benchmark Value',
    },
    {
      key: '3',
      clusterID: 'OPTFE012',
      competencies: 'Relationship Management',
      externalBenchmark: 'External Benchmark Value',
    },
    {
      key: '4',
      clusterID: 'OPTFE012',
      competencies: 'Relationship Management',
      externalBenchmark: 'External Benchmark Value',
    },
    {
      key: '5',
      clusterID: 'OPTFE012',
      competencies: 'Relationship Management',
      externalBenchmark: 'External Benchmark Value',
    },
  ];

  const footer = React.useCallback(() => {
    return (
      <div className="flex justify-end">
        <div className="flex items-center">
          <span className="text-primary-500">Cancel</span>
          <Button size="middle" textSize="base" text="Save" textClassName="mr-2" className="ml-3" />
        </div>
      </div>
    );
  }, []);

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
      <Table
        size="middle"
        className="p-6 mt-5 bg-white rounded-lg shadow"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pageSize={pageSize * 1}
        pageNumber={1}
        renderHeader={renderHeader}
        footer={footer}
        selectedRowKeys={selectedRows?.map((el) => el.key)}
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
        pagination={false}
      />
    </MainLayout>
  );
};

GroupReports.propTypes = {
  loading: PropTypes.bool.isRequired,
};

GroupReports.defaultProps = {};

export default GroupReports;
