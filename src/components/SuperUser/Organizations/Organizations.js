import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { useQuery } from '../../../hooks';

import { fetchFullURL } from '../../../lib/utils';

import { dynamicMap } from '../../../routes/RouteMap';

import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import SearchBox from '../../Common/SearchBox';
import Modal from '../../Common/Modal';

const Organizations = ({ organizations, fetchOrganizations, loading, deleteOrganizations }) => {
  const history = useHistory();
  const [parsedQuery, query, setQuery] = useQuery();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);

  React.useEffect(() => {
    if (!parsedQuery?.page_number || !parsedQuery?.page_size) {
      setQuery({
        page_number: 1,
        page_size: 10,
      });
    }

    // eslint-disable-next-line
  }, [history?.location?.pathname]);

  React.useEffect(() => {
    fetchOrganizations(query);
  }, [fetchOrganizations, query]);

  const renderHeader = React.useCallback(
    () => {
      return (
        <div className="flex flex-row justify-between items-center">
          {selectedRows?.length > 0 ? (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setDeleteModalVisible(true)}
                size="middle"
                className="text-base flex flex-row justify-center items-center
            text-primary-500 bg-primary-500 bg-opacity-8 w-8 h-8"
                icon="DeleteOutlined"
              />
              <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
            </div>
          ) : (
            <div className="flex flex-row ml-auto">
              <SearchBox
                className="text-xs"
                loading={loading}
                onSearch={(val) => setQuery({ q: val })}
                onChange={(e) => setQuery({ q: e.target.value })}
                onPressEnter={(e) => setQuery({ q: e.target.value })}
                value={parsedQuery?.q}
              />
              <Button
                size="middle"
                textSize="xs"
                text="New Organization"
                textClassName="mr-2"
                className="ml-3"
                type="gray"
                icon="BankOutlined"
                iconPosition="right"
                onClick={() => history.push(dynamicMap.superUser.addOrganization())}
              />
            </div>
          )}
        </div>
      );
    },
    // eslint-disable-next-line
    [organizations.timeStamp, selectedRows?.length],
  );

  const getSortOrder = (key) => {
    return parsedQuery?.sort?.includes(key)
      ? parsedQuery?.sort?.[0] === '+'
        ? 'ascend'
        : 'descend'
      : '';
  };

  const columns = React.useMemo(
    () => [
      {
        key: 'id',
        title: 'ID',
        sorter: true,
        width: 200,
        sortOrder: getSortOrder('id'),
        render: (id, { logo }) => (
          <div className="flex items-center justify-between">
            <div>{id}</div>
            <div className="w-10 h-10 rounded border-gray-200 rounded-full border relative">
              <img className="rounded-full w-10 h-10" src={fetchFullURL(logo)} alt="logo" />
            </div>
          </div>
        ),
      },
      {
        key: 'name',
        title: 'Organization',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (organization) => {
          return (
            <div className="inline-flex flex-row items-center justify-between">
              <p className="text-sm font-normal ml-2">{organization}</p>
            </div>
          );
        },
      },
      {
        key: 'project',
        title: '',
        width: 100,
        render: (_, { id: organizationId }) => (
          <Button
            onClick={() => {
              const path = dynamicMap.superUser.organizationStaffList({ organizationId });

              history.push(`${path}?page_number=1&page_size=10`);
            }}
            icon="TeamOutlined"
            textClassName="ml-2"
            text="Staff"
            textSize="sm"
            type="link"
            className="text-lg mr-7"
            size="middle"
          />
        ),
      },
    ],
    // eslint-disable-next-line
    [parsedQuery?.sort],
  );

  const dataSource = React.useMemo(
    () => (organizations?.data || []).map((item) => ({ ...item, key: `${item.id}` })),
    // eslint-disable-next-line
    [organizations.timeStamp],
  );

  const sort = (sorter) => {
    // eslint-disable-next-line operator-linebreak
    const order = parsedQuery?.sort?.[0] === '+' ? '-' : '+';
    const newItem = `${order}${sorter.columnKey}`;

    setQuery({ sort: newItem });
  };

  return (
    <MainLayout
      titleClass="mb-6 mt-3"
      breadCrumbItems={['Organizations', selectedRows?.length > 0 ? 'Selected' : '']}
      title="Organizations"
      contentClass="py-6 pl-21 pr-6"
    >
      <Modal
        okText="Yes, delete"
        cancelText="No, cancel"
        footerClassName="justify-center"
        handleCancel={() => setDeleteModalVisible(false)}
        handleOk={async () => {
          const organizationIds = selectedRows?.length > 0 ? selectedRows.map((el) => el.id) : [];
          const data = { organizationIds };
          await deleteOrganizations(data);
          setSelectedRows([]);
          fetchOrganizations(query);
          setDeleteModalVisible(false);
        }}
        visible={deleteModalVisible}
      >
        <div className="flex flex-col items-center">
          <DeleteOutlined className="text-primary-600 text-2xl" />
          <p className="mt-4">Are you sure you want to delete these organization?</p>
          <p className="">
            (With the removal of each organization, all its sub-projects will also be removed.)
          </p>
        </div>
      </Modal>
      <Table
        onTableChange={({ sorter }) => sort(sorter)}
        size="middle"
        className="p-6 bg-white rounded-lg shadow"
        loading={loading}
        on
        columns={columns}
        dataSource={dataSource}
        renderHeader={renderHeader}
        selectedRowKeys={selectedRows?.map((el) => el.key)}
        onPageSizeChange={(size) => {
          setQuery({ page_size: size, page_number: 1 });
        }}
        pageSize={(parsedQuery?.page_size || 10) * 1}
        pageNumber={parsedQuery?.page_number * 1}
        // eslint-disable-next-line camelcase
        onPaginationChange={(page_number, page_size) => {
          setSelectedRows([]);
          setQuery({
            page_size,
            page_number,
          });
        }}
        onRowSelectionChange={(_, rows) => {
          console.log(rows);
          setSelectedRows(rows);
        }}
        totalRecordSize={organizations?.metaData?.pagination?.totalRecords * 1}
      />
    </MainLayout>
  );
};

Organizations.propTypes = {
  fetchOrganizations: PropTypes.func.isRequired,
  deleteOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        pageNumber: PropTypes.string,
        pageSize: PropTypes.string,
        totalRecords: PropTypes.string,
      }),
    }),
    timeStamp: PropTypes.number,
  }),
  loading: PropTypes.bool.isRequired,
};

Organizations.defaultProps = {
  organizations: {
    data: [],
    timeStamp: '',
  },
};

export default Organizations;
