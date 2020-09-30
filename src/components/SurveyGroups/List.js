/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import MainLayout from '../Common/Layout';
import Table from '../Common/Table';
import Button from '../Common/Button';
import Tag from '../Common/Tag';

import { useQuery } from '../../hooks/useQuery';

const ActiveProjects = ({ loading }) => {
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [parsedQuery, query, setQuery] = useQuery();

  const { surveyGroups = {} } = useSelector((state) => state.projects);
  const surveyGroupProject = surveyGroups?.data?.length > 0 ? surveyGroups.data[0].project : {};

  const fetch = React.useCallback(async () => {
    const newQuery = query || '?page_size=10&page_number=1&status=active';
    await dispatch.projects.fetchSurveyGroups({ projectId, query: newQuery });
  }, [dispatch, query, projectId]);

  React.useEffect(() => {
    fetch();
  }, [query, fetch]);

  const renderHeader = React.useCallback(
    () => (
      <div className="flex flex-row justify-between">
        <p className="font-normal text-xs leading-4">
          {surveyGroupProject.name} | {surveyGroupProject.organization?.name}
        </p>
      </div>
    ),
    // eslint-disable-next-line
    [surveyGroups.timeStamp, loading, setQuery, selectedRows.length],
  );

  const columns = React.useMemo(
    () => [
      { key: 'id', title: 'ID', sorter: (a, b) => a.id - b.id },
      {
        key: 'name',
        title: 'Survay Group',
        render: (name) => (
          <Button
            className="pl-0"
            // onClick={() => console.log(id)}
            type="link"
            textSize="sm"
            text={name}
            textClassName="underline text-primary-500"
          />
        ),
      },
      {
        key: 'date',
        title: 'Start Date',
        render: (date) => dayjs(date).format('DD/MM/YYYY'),
      },
      {
        key: 'date',
        title: 'End Date',
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
          <Button
            // onClick={ () => {}}
            icon="EditOutlined"
            type="link"
            className="text-lg mr-7"
            size="middle"
          />
        ),
      },
    ],
    // eslint-disable-next-line
    [surveyGroups.timeStamp],
  );

  const dataSource = React.useMemo(
    () => surveyGroups.data.map((item) => ({ ...item, key: `${item.id}` })),
    // eslint-disable-next-line
    [surveyGroups.timeStamp],
  );

  return (
    <MainLayout title="Super User" contentClass="p-6">
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
        totalRecordSize={surveyGroups?.metaData?.pagination?.totalRecords * 1}
      />
    </MainLayout>
  );
};

ActiveProjects.propTypes = {
  loading: PropTypes.bool.isRequired,
};

ActiveProjects.defaultProps = {};

export default ActiveProjects;
