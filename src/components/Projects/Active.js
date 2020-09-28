/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types'
import dayjs from 'dayjs';

import { TeamOutlined } from '@ant-design/icons';

import MainLayout from '../Common/Layout';
import Table from '../Common/Table';
import Button from '../Common/Button';
import SearchBox from '../Common/SearchBox';
import Tag from '../Common/Tag';

import { useQuery } from '../../hooks/useQuery';

const ActiveProjects = () => {
  const [loading, setLoading] = React.useState(false);
  const [pageSize, setPageSize] = React.useState();

  // TODO
  // eslint-disable-next-line no-unused-vars
  const [selectedRows, setSelectedRows] = React.useState('');

  const [parsedQuery, query, setQuery] = useQuery();

  const dispatch = useDispatch();
  const { activeProjects } = useSelector((state) => state.projects);

  const isStatusActive = parsedQuery?.status === 'active';

  const fetch = React.useCallback(async () => {
    setLoading(true);

    try {
      await dispatch.projects.fetchActiveProjects(query);
    } finally {
      setLoading(false);
    }
  }, [dispatch, query]);

  React.useEffect(() => {
    fetch();
  }, [query, fetch]);

  const renderHeader = React.useCallback(
    () => (
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <Button
            onClick={() => setQuery({ status: 'active' })}
            textSize="sm"
            text="Active Projects"
            className="mr-3"
            light={isStatusActive}
          />
          <Button
            onClick={() => setQuery({ status: 'inactive' })}
            textSize="sm"
            text="Inactive Projects"
            light={!isStatusActive}
          />
        </div>

        <div className="flex flex-row">
          <SearchBox
            loading={loading}
            onSearch={(val) => setQuery({ q: val })}
            onPressEnter={(e) => setQuery({ q: e.target.value })}
          />
          <Button textSize="sm" text="New Organization" type="gray" className="mx-3" />
          <Button textSize="sm" text="Add Project" type="gray" />
        </div>
      </div>
    ),
    // eslint-disable-next-line
    [activeProjects.timeStamp, loading, setQuery],
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
        render: (status) => <Tag color={status === 'active' ? 'cyan' : 'orange'} text={status} />,
      },
      {
        key: 'id',
        width: 50,
        render: (id) => (
          <div className="flex flex-row-reverse">
            <Button onClick={() => console.log(id)} textSize="sm" text="Set Client Admin" />
            <Button
              onClick={() => console.log(id)}
              icon="CopyOutlined"
              type="link"
              className="text-xl mr-7"
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
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        renderHeader={renderHeader}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        // eslint-disable-next-line camelcase
        onPaginationChange={(page_number, page_size) =>
          setQuery({
            page_size,
            page_number,
          })
        }
        onRowSelectionChange={(rowKeys, rows) => {
          setSelectedRows(rows);
          // console.log(`selectedRowKeys: ${rowKeys}`, 'selectedRows: ', rows);
        }}
        totalRecordSize={activeProjects?.metaData?.pagination?.totalRecords * 1}
      />
    </MainLayout>
  );
};

// ActiveProjects.propTypes = {};

// ActiveProjects.defaultProps = {};

export default ActiveProjects;
