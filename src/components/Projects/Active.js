import React from 'react';
// import PropTypes from 'prop-types'
import dayjs from 'dayjs';

import { TeamOutlined } from '@ant-design/icons';

import MainLayout from '../Common/Layout';
import Table from '../Common/Table';
import Button from '../Common/Button';
import SearchBox from '../Common/SearchBox';
import Tag from '../Common/Tag';

const ActiveProjects = () => {
  const renderHeader = React.useCallback(
    () => (
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <Button textSize="sm" text="Active Projects" className="mr-3" />
          <Button textSize="sm" text="Inactive Projects" light />
        </div>

        <div className="flex flex-row">
          <SearchBox loading={false} onSearch={() => {}} />
          <Button textSize="sm" text="New Organization" type="gray" className="mx-3" />
          <Button textSize="sm" text="Add Project" type="gray" />
        </div>
      </div>
    ),
    [],
  );

  const rand = () => Math.round(Math.random() * 100);

  const columns = [
    { key: 'id', title: 'ID', sorter: (a, b) => a.id - b.id },
    {
      key: 'organization',
      title: 'Organization',
      render: (text) => (
        <div className="inline-flex flex-row items-center justify-between">
          <p className="text-sm font-normal mr-3">{text}</p>
          <TeamOutlined className="text-lg text-primary-500" />
        </div>
      ),
      sorter: (a, b) => a.organization.length - b.organization.length,
    },
    {
      key: 'projectName',
      title: 'Project Name',
      render: (text) => (
        <Button type="link" textSize="sm" text={text} textClassName="underline text-primary-500" />
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
      render: (tags) => (
        <>
          {tags.map((tag, i) => (
            <Tag key={i} text={tag} />
          ))}
        </>
      ),
    },
    {
      key: 'empty',
      width: 50,
      render: (data) => (
        <div className="flex flex-row-reverse">
          <Button textSize="sm" text="Set Client Admin" />
          <Button icon="CopyOutlined" type="link" className="text-xl mr-7" />
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <Table
        columns={columns}
        dataSource={Array(10)
          .fill(1)
          .map((_, i) => ({
            key: i.toString(),
            id: rand(),
            organization: `abc ${rand()}`,
            projectName: `project ${rand()}`,
            date: Date.now().toString(),
            status: ['success'],
            empty: 'XXXXXXXXXXXX',
          }))}
        renderHeader={renderHeader}
      />
    </MainLayout>
  );
};

// ActiveProjects.propTypes = {};

// ActiveProjects.defaultProps = {};

export default ActiveProjects;
