/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { TeamOutlined } from '@ant-design/icons';

import MainLayout from '../Common/Layout';
import Table from '../Common/Table';
import Button from '../Common/Button';
import SearchBox from '../Common/SearchBox';
import Tag from '../Common/Tag';

import { useQuery } from '../../hooks/useQuery';

const ActiveProjects = ({ duplicateProject, changeStatusOfProjects, removeProjects, loading }) => {
  const [parsedQuery, query, setQuery] = useQuery();

  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const history = useHistory();

  const dispatch = useDispatch();
  const { projects = {} } = useSelector((state) => state.projects);

  const fetch = React.useCallback(async () => {
    const newQuery = query || '?page_size=10&page_number=1&status=active';

    await dispatch.projects.fetchProjects(newQuery);
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
            className="text-base flex flex-row justify-center items-center
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
            className="ml-3 "
            textSize="xs"
            text={parsedQuery?.status === 'active' ? 'Deactivate' : 'Activate'}
          />

          <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
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
              className="mr-3 px-3"
              light={parsedQuery?.status === 'active'}
            />
            <Button
              size="middle"
              onClick={() => setQuery({ status: 'inactive' })}
              textSize="xs"
              text="Inactive Projects"
              light={parsedQuery?.status === 'inactive'}
              className=" px-3"
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
              className="mx-3 px-3"
            />
            <Button className="px-3" size="middle" textSize="xs" text="Add Project" type="gray" />
          </div>
        </div>
      );
    },
    // eslint-disable-next-line
    [projects.timeStamp, loading, setQuery, selectedRows.length],
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
        render: (project, { id }) => (
          <Button
            className="pl-0"
            onClick={() =>
              history.push(`/super-user/projects/${id}/survey-groups?page_size=10&page_number=1`)
            }
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
        render: (date) => moment(date).format('DD/MM/YYYY'),
      },
      {
        key: 'status',
        title: 'Status',
        render: (status) => (
          <Tag color={status !== 'active' ? 'orange' : ''} text={status.toUpperCase()} />
        ),
      },
      {
        key: 'id',
        width: 50,
        render: (projectId) => (
          <div className="flex flex-row-reverse">
            <Button
              size="middle"
              textSize="xs"
              onClick={() => history.push(`/super-user/projects/${projectId}/set-admin`)}
              text="Set Client Admin"
            />
            <Button
              onClick={async () => {
                await duplicateProject(projectId);
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
    [projects.timeStamp],
  );

  const dataSource = React.useMemo(
    () => projects?.data?.map((item) => ({ ...item, key: `${item.id}` })),
    // eslint-disable-next-line
    [projects.timeStamp],
  );

  return (
    <MainLayout hasBreadCrumb title="Super User" contentClass="py-6 pr-6">
      <Table
        size="small"
        className="c-small-padding"
        selectedRowKeys={selectedRows?.map((el) => el.key)}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        renderHeader={renderHeader}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setQuery({ page_size: size, page_number: 1 });
        }}
        pageSize={pageSize * 1}
        // eslint-disable-next-line camelcase
        onPaginationChange={(page_number, page_size) => {
          setSelectedRows([]);
          setQuery({
            page_size,
            page_number,
          });
        }}
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
        totalRecordSize={projects?.metaData?.pagination?.totalRecords * 1}
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
