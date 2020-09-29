/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { TeamOutlined } from '@ant-design/icons';

import MainLayout from '../Common/Layout';
import Table from '../Common/Table';
import Button from '../Common/Button';
import SearchBox from '../Common/SearchBox';
import Tag from '../Common/Tag';

import { useQuery } from '../../hooks/useQuery';

const ActiveProjects = ({ duplicateProject, changeStatusOfProjects, removeProjects, loading }) => {
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const [parsedQuery, query, setQuery] = useQuery();

  const dispatch = useDispatch();
  const { activeProjects } = useSelector((state) => state.projects);

  const fetch = React.useCallback(async () => {
    await dispatch.projects.fetchActiveProjects(query);
  }, [dispatch, query]);

  React.useEffect(() => {
    fetch();
  }, [query, fetch]);

  const renderHeader = React.useCallback(
    () => {
      const selectedRowsIds = selectedRows?.length > 0 ? selectedRows.map((el) => el.id) : [];

      return selectedRows && selectedRows?.length > 0 ? (
        <div className="flex flex-row items-center">
          <Button
            onClick={async () => {
              await removeProjects(selectedRowsIds);
              fetch();
            }}
            size="middle"
            className="px-2 text-base flex flex-row justify-center items-center
            text-primary-500 bg-primary-500 bg-opacity-8"
            icon="DeleteOutlined"
          />

          <Button
            onClick={async () => {
              await changeStatusOfProjects(
                selectedRowsIds,
                parsedQuery?.status === 'active' ? 'inactive' : 'active',
              );

              fetch();

              setSelectedRows([]);
            }}
            size="middle"
            className="ml-3"
            textSize="xs"
            text={parsedQuery?.status === 'active' ? 'Deactivate' : 'Activate'}
          />
          {/* <Button size="middle" className="ml-3" textSize="xs" text="Deactivate" /> */}

          <h3 className="font-normal ml-3">
            Selected
            {selectedRows.length}
            items
          </h3>
        </div>
      ) : (
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row">
            <Button
              size="middle"
              // onClick={() => setQuery({ status: parsedQuery?.status === 'active' ? '' : 'active' })}
              onClick={() => setQuery({ status: 'active' })}
              textSize="xs"
              text="Active Projects"
              className="mr-3"
              light={parsedQuery?.status === 'active'}
            />
            <Button
              size="middle"
              onClick={() => setQuery({ status: 'inactive' })}
              textSize="xs"
              text="Inactive Projects"
              light={parsedQuery?.status === 'inactive'}
            />
          </div>

          <div className="flex flex-row">
            <SearchBox
              className="text-xs"
              loading={loading}
              onSearch={(val) => setQuery({ q: val })}
              onPressEnter={(e) => setQuery({ q: e.target.value })}
            />
            <Button
              size="middle"
              textSize="xs"
              text="New Organization"
              type="gray"
              className="mx-3"
            />
            <Button size="middle" textSize="xs" text="Add Project" type="gray" />
          </div>
        </div>
      );
    },
    // eslint-disable-next-line
    [activeProjects.timeStamp, loading, setQuery, selectedRows.length],
  );

  const columns = React.useMemo(
    () => [
      { key: 'id', title: 'ID', sorter: (a, b) => a.id - b.id },
      {
        key: 'organization',
        title: 'Organization',
        render: (organization) => (
          <div className="inline-flex flex-row items-center justify-between">
            <p className="text-sm font-normal mr-3">{organization}</p>
            <TeamOutlined className="text-lg text-primary-500" />
          </div>
        ),
        sorter: (a, b) => a.organization.length - b.organization.length,
      },
      {
        key: 'project',
        title: 'Project Name',
        render: (project) => (
          <Button
            className="pl-0"
            // onClick={() => console.log(id)}
            type="link"
            textSize="sm"
            text={project}
            textClassName="underline text-primary-500"
          />
        ),
      },
      {
        key: 'date',
        title: 'Date Created',
        render: (date) => dayjs(date).format('DD/MM/YYYY'),
      },
      {
        key: 'status',
        title: 'Status',
        render: (status) => <Tag color={status !== 'active' ? 'orange' : ''} text={status} />,
      },
      {
        key: 'id',
        width: 50,
        render: (id) => (
          <div className="flex flex-row-reverse">
            <Button
              size="middle"
              textSize="xs"
              // onClick={() => console.log(id)}
              text="Set Client Admin"
            />
            <Button
              onClick={async () => {
                await duplicateProject(id);
                fetch();
              }}
              icon="CopyOutlined"
              type="link"
              className="text-lg mr-7"
              size="middle"
            />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line
    [activeProjects.timeStamp],
  );

  const dataSource = React.useMemo(
    () => activeProjects.data.map((item) => ({ ...item, key: `${item.id}` })),
    // eslint-disable-next-line
    [activeProjects.timeStamp],
  );

  return (
    <MainLayout>
      <Table
        selectedRowKeys={selectedRows?.map((el) => el.key)}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        renderHeader={renderHeader}
        onRowClick={(record, rowIndex) => console.log({ record, rowIndex })}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setQuery({ page_size: size, page_number: 1 });
        }}
        pageSize={pageSize * 1}
        // eslint-disable-next-line camelcase
        onPaginationChange={(page_number, page_size) =>
          setQuery({
            page_size,
            page_number,
          })
        }
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
        totalRecordSize={activeProjects?.metaData?.pagination?.totalRecords * 1}
      />
    </MainLayout>
  );
};

ActiveProjects.propTypes = {
  duplicateProject: PropTypes.func.isRequired,
  changeStatusOfProjects: PropTypes.func.isRequired,
  removeProjects: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

ActiveProjects.defaultProps = {};

export default ActiveProjects;
