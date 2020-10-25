/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {EditOutlined} from '@ant-design/icons';

import budgetLogo from '../../assets/images/budget-logo.jpg';

import MainLayout from '../Common/Layout';
import Table from '../Common/Table';
import Button from '../Common/Button';
import SearchBox from '../Common/SearchBox';

const OrganizationsUsers = ({loading}) => {
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
        <div className="flex flex-row justify-between items-center">
          <div className="inline-flex flex-row items-center justify-between">
            <div className="w-10 h-10 rounded border-gray-200 rounded-full border relative">
              <img className="w-8 h-4 absolute top-0 mt-3 mx-1" src={budgetLogo} alt=""/>
            </div>
            <p className="text-sm font-normal ml-2">Sime Darby Group Berhad</p>
          </div>
          <div className="flex flex-row">
            <Button
              size="middle"
              textSize="xs"
              text="Import Exel File"
              type="gray"
              className="mx-3 px-3 flex-row-reverse"
              icon="FileExcelOutlined"
            />
            <Button
              size="middle"
              textSize="xs"
              text="New Staff Member"
              type="gray"
              className="mx-3 px-3 flex-row-reverse"
              icon="UserAddOutlined"
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
        key: 'name',
        title: 'Name',
      },
      {
        key: 'email',
        title: 'Email',
      },
      {
        key: 'password',
        title: 'Password',
      },
      {
        key: 'edit',
        title: '',
        render: () => (
          <span className="text-primary-500">
            <EditOutlined />
          </span>
        )
      },
    ],
    // eslint-disable-next-line
    [],
  );

  const dataSource = [
    {
      key: '1',
      id: '2020060422',
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      password: 'asdfgtfq4124#%',
    },
    {
      key: '2',
      id: '2020060422',
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      password: 'asdfgtfq4124#%',
    },
    {
      key: '3',
      id: '2020060422',
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      password: 'asdfgtfq4124#%',
    },
    {
      key: '4',
      id: '2020060422',
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      password: 'asdfgtfq4124#%',
    },
    {
      key: '5',
      id: '2020060422',
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      password: 'asdfgtfq4124#%',
    },
    {
      key: '6',
      id: '2020060422',
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      password: 'asdfgtfq4124#%',
    },
    {
      key: '7',
      id: '2020060422',
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      password: 'asdfgtfq4124#%',
    },
    {
      key: '8',
      id: '2020060422',
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      password: 'asdfgtfq4124#%',
    },
  ];

  return (
    <MainLayout
      titleClass="mb-6 mt-3"
      hasBreadCrumb
      title="Organizations"
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

OrganizationsUsers.propTypes = {
  duplicateProject: PropTypes.func.isRequired,
  changeStatusOfProjects: PropTypes.func.isRequired,
  removeProjects: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

OrganizationsUsers.defaultProps = {};

export default OrganizationsUsers;
