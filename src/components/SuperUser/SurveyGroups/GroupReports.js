import React from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '../../../hooks/useQuery';

import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';
import Button from '../../Common/Button';

const GroupReports = ({ loading, groupReports, fetchGroupReports }) => {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const [parsedQuery] = useQuery();

  React.useEffect(() => {
    if (parsedQuery.projectId) fetchGroupReports(parsedQuery.projectId);
  }, [parsedQuery.projectId]);

  console.log({ groupReports });

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
      key: 'id',
      title: 'Cluster ID',
      width: 100,
      sorter: true,
    },
    {
      key: 'name',
      title: 'Cluster',
      // width: 100,
      sorter: true,
    },
    {
      key: 'reportAvailable',
      title: '',
      // width: 100,
      render: (a, b, c) => console.log({ a, b, c }),
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
      <Table
        size="middle"
        className="p-6 mt-5 bg-white rounded-lg shadow"
        loading={loading}
        columns={columns}
        dataSource={groupReports?.data || []}
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
  fetchGroupReports: PropTypes.func.isRequired,
  groupReports: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
};

GroupReports.defaultProps = {
  groupReports: {},
};

export default GroupReports;
