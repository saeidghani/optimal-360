/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {TeamOutlined} from '@ant-design/icons';

import organizationImg from '../../assets/images/survey-groups-organization.jpg';

import MainLayout from '../Common/Layout';
import Table from '../Common/Table';
import Button from '../Common/Button';
import SearchBox from '../Common/SearchBox';

const Organizations = ({loading}) => {
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const renderHeader = React.useCallback(
    () => {
      const selectedRowsIds = selectedRows?.length > 0 ? selectedRows.map((el) => el.id) : [];

      return selectedRows && selectedRows?.length > 0 ? (
        <div className="flex flex-row items-center">
          <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
        </div>
      ) : (
        <div className="flex flex-row justify-end items-center">
          <div className="flex flex-row">
            <SearchBox
              className="text-xs"
              loading={loading}
            />
            <Button
              size="middle"
              textSize="xs"
              text="New Organization"
              type="gray"
              className="mx-3 px-3"
            />
          </div>
        </div>
      );
    },
    // eslint-disable-next-line
    [loading, selectedRows.length],
  );

  const columns = React.useMemo(
    () => [
      {
        key: 'id',
        title: 'ID',
        sorter: true,
      },
      {
        key: 'organization',
        title: 'Organization',
        render: (organization) => (
          <div className="inline-flex flex-row items-center justify-between">
            <div className="w-10 h-10 rounded border-gray-200 rounded-full border relative">
              <img className="w-8 h-4 absolute top-0 mt-3 ml-1" src={organizationImg} alt=""/>
            </div>
            <p className="text-sm font-normal ml-2">{organization}</p>
          </div>
        ),
        sorter: true,
      },
      {
        key: 'project',
        title: '',
        render: () => (
          <div className="inline-flex flex-row items-center justify-between text-right">
            <TeamOutlined className="text-lg text-primary-500"/>
            <p className="text-sm text-primary-500 font-normal ml-2">Staff</p>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line
    [],
  );

  const dataSource = [
    {
      key: '1',
      id: '1',
      organization: 'Sime Darby Group Berhad',
      project: '',
    },
    {
      key: '1',
      id: '1',
      organization: 'Sime Darby Group Berhad',
      project: '',
    },
    {
      key: '1',
      id: '1',
      organization: 'Sime Darby Group Berhad',
      project: '',
    },
    {
      key: '1',
      id: '1',
      organization: 'Sime Darby Group Berhad',
      project: '',
    },
    {
      key: '1',
      id: '1',
      organization: 'Sime Darby Group Berhad',
      project: '',
    },
    {
      key: '1',
      id: '1',
      organization: 'Sime Darby Group Berhad',
      project: '',
    },
    {
      key: '1',
      id: '1',
      organization: 'Sime Darby Group Berhad',
      project: '',
    },
    {
      key: '1',
      id: '1',
      organization: 'Sime Darby Group Berhad',
      project: '',
    },
  ];

  return (
    <MainLayout
      titleClass="mb-6 mt-3"
      hasBreadCrumb
      title="Super User"
      contentClass="py-6 pl-21 pr-6"
    >
      <Table
        size="small"
        className="p-6 bg-white rounded-lg shadow"
        selectedRowKeys={selectedRows?.map((el) => el.key)}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        renderHeader={renderHeader}
        pageSize={pageSize * 1}
        pageNumber={1}
        // eslint-disable-next-line camelcase
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
      />
    </MainLayout>
  );
};

Organizations.propTypes = {
  duplicateProject: PropTypes.func.isRequired,
  changeStatusOfProjects: PropTypes.func.isRequired,
  removeProjects: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

Organizations.defaultProps = {};

export default Organizations;
