/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { TeamOutlined } from '@ant-design/icons';

import { dynamicMap } from '../../../routes/RouteMap';

import { useQuery } from '../../../hooks/useQuery';

import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import SearchBox from '../../Common/SearchBox';
import Tag from '../../Common/Tag';

const ActiveProjects = ({ changeStatusOfProjects, removeProjects, loading }) => {
  const [parsedQuery, query, setQuery] = useQuery();

  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const history = useHistory();

  const pageNumber = parsedQuery?.page_number;

  React.useEffect(() => {
    if (!parsedQuery?.page_number || !parsedQuery?.page_size || !parsedQuery?.status) {
      setQuery({
        page_number: 1,
        page_size: 10,
        status: 'active',
      });
    }

    // eslint-disable-next-line
  }, [history?.location?.pathname]);

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
              setSelectedRows([]);
              fetch();
            }}
            size="middle"
            className="text-base flex flex-row justify-center items-center
            text-primary-500 bg-primary-500 bg-opacity-8 w-8 h-8"
            icon="DeleteOutlined"
          />

          <Button
            onClick={async () => {
              await changeStatusOfProjects(
                selectedRowsIds,
                parsedQuery?.status === 'active' || parsedQuery?.status === 'complete'
                  ? 'inactive'
                  : 'active',
              );

              fetch();
              setSelectedRows([]);
            }}
            size="middle"
            className="ml-3"
            textSize="xs"
            text={
              parsedQuery?.status === 'active' || parsedQuery?.status === 'complete'
                ? 'Deactivate'
                : 'Activate'
            }
          />

          <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
        </div>
      ) : (
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row">
            <Button
              size="middle"
              onClick={() => setQuery({ status: 'active', page_number: 1 })}
              textSize="xs"
              text="Active Projects"
              className="mr-3 px-3"
              light={parsedQuery?.status !== 'active'}
            />

            <Button
              size="middle"
              onClick={() => setQuery({ status: 'inactive', page_number: 1 })}
              textSize="xs"
              text="Inactive Projects"
              light={parsedQuery?.status !== 'inactive'}
              className="mr-3 px-3"
            />

            <Button
              size="middle"
              onClick={() => setQuery({ status: 'complete', page_number: 1 })}
              textSize="xs"
              text="Complete Projects"
              light={parsedQuery?.status !== 'complete'}
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
              onClick={() => history.push(dynamicMap.superUser.addOrganization())}
            />
            <Button
              onClick={() => history.push(dynamicMap.superUser.projectInfo())}
              className="px-3"
              size="middle"
              textSize="xs"
              text="Add Project"
              type="gray"
            />
          </div>
        </div>
      );
    },
    // eslint-disable-next-line
    [projects.timeStamp, loading, setQuery, selectedRows.length],
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
        sortOrder: getSortOrder('id'),
      },
      {
        key: 'organization',
        title: 'Organization',
        render: (organization) => (
          <div className="inline-flex flex-row items-center justify-between">
            <p className="text-sm font-normal mr-3">{organization}</p>
            <TeamOutlined className="text-lg text-primary-500" />
          </div>
        ),
        sorter: true,
        sortOrder: getSortOrder('organization'),
      },
      {
        key: 'project',
        title: 'Project Name',
        render: (project, { id: projectId }) => (
          <Button
            className="pl-0"
            onClick={() =>
              history.push(
                dynamicMap.superUser.surveyGroupsList({
                  projectId,
                }),
              )
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
          <Tag
            color={status === 'complete' ? 'orange' : status === 'inactive' ? 'red' : ''}
            text={status.toUpperCase()}
          />
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
              onClick={() => history.push(dynamicMap.superUser.setAdmin({ projectId }))}
              text="Set Client Admin"
            />
            <Button
              onClick={() => history.push(dynamicMap.superUser.projectInfo())}
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
    [projects.timeStamp, query],
  );

  const dataSource = React.useMemo(
    () => (projects?.data || []).map((item) => ({ ...item, key: `${item.id}` })),
    // eslint-disable-next-line
    [projects.timeStamp],
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
      hasBreadCrumb
      title="Super User"
      contentClass="py-6 pl-21 pr-6"
    >
      <Table
        showSorterTooltip={false}
        onTableChange={({ sorter }) => sort(sorter)}
        size="small"
        className="p-6 bg-white rounded-lg shadow"
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
        pageNumber={pageNumber * 1}
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
