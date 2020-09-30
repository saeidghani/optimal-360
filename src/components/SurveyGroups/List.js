/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import MainLayout from '../Common/Layout';
import Table from '../Common/Table';
import Button from '../Common/Button';
import SearchBox from '../Common/SearchBox';
import Tag from '../Common/Tag';
import DatePicker from '../Common/DatePicker';

import { useQuery } from '../../hooks/useQuery';

const SurveyGroups = ({ loading }) => {
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [, query, setQuery] = useQuery();

  const { surveyGroups = {} } = useSelector((state) => state.projects);

  const surveyGroupProject = React.useMemo(() => {
    const ref = surveyGroups?.data?.length > 0 ? surveyGroups.data[0].project : {};
    return ref.name && ref.organization?.name ? ref : {};
    // eslint-disable-next-line
  }, [surveyGroups.timeStamp]);

  const fetch = React.useCallback(async () => {
    const newQuery = query || '?page_size=10&page_number=1&status=active';
    await dispatch.projects.fetchSurveyGroups({ projectId, query: newQuery });
  }, [dispatch, query, projectId]);

  React.useEffect(() => {
    fetch();
  }, [query, fetch]);

  const renderHeader = React.useCallback(
    () => {
      // const selectedRowsIds = selectedRows?.length > 0 ? selectedRows.map((el) => el.id) : [];

      return selectedRows && selectedRows?.length > 0 ? (
        <div className="flex flex-row items-center">
          <Button
            // onClick={async () => {
            //   await removeProjects(selectedRowsIds);
            //   fetch();
            // }}
            size="middle"
            className="px-2 text-base flex flex-row justify-center items-center
            text-primary-500 bg-primary-500 bg-opacity-8"
            icon="CopyOutlined"
          />

          <Button
            // onClick={async () => {
            //   await removeProjects(selectedRowsIds);
            //   fetch();
            // }}
            size="middle"
            className="px-2 ml-3 text-base flex flex-row justify-center items-center
            text-primary-500 bg-primary-500 bg-opacity-8"
            icon="DeleteOutlined"
          />

          <Button
            // onClick={async () => {
            //   await changeStatusOfProjects(
            //     selectedRowsIds,
            //     parsedQuery?.status === 'active' ? 'inactive' : 'active',
            //   );

            //   fetch();

            //   setSelectedRows([]);
            // }}
            text="Export Demographic Data"
            size="middle"
            className="ml-3"
            textSize="xs"
          />

          <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
        </div>
      ) : (
        <div className="flex flex-row justify-between items-center">
          <p className="font-normal text-xs leading-4">
            {surveyGroupProject.name && surveyGroupProject.organization?.name
              ? `${surveyGroupProject.name} | ${surveyGroupProject.organization.name}`
              : ''}
          </p>

          <div className="flex flex-row items-center">
            <SearchBox
              className="text-xs"
              loading={loading}
              onSearch={(val) => setQuery({ q: val })}
              onPressEnter={(e) => setQuery({ q: e.target.value })}
            />

            <div className="flex flex-row items-center">
              <p className="mx-3 text-xs whitespace-no-wrap">Start Date</p>

              <DatePicker
                onChange={(val) => setQuery({ start_Date: val })}
                className="w-32"
                size="large"
                placeholder="Select"
              />
            </div>

            <div className="flex flex-row items-center">
              <p className="mx-3 text-xs whitespace-no-wrap">End Date</p>

              <DatePicker
                onChange={(val) => setQuery({ end_date: val })}
                className="w-32"
                size="large"
                placeholder="Select"
              />
            </div>

            <Button
              size="middle"
              textSize="xs"
              text="New Organization"
              type="gray"
              className="ml-3"
            />

            <Button size="middle" textSize="xs" text="Add Project" type="gray" className="ml-3" />
          </div>
        </div>
      );
    },
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
        key: 'startDate',
        title: 'Start Date',
        render: (date) => moment(date).format('DD/MM/YYYY'),
      },
      {
        key: 'endDate',
        title: 'End Date',
        render: (date) => moment(date).format('DD/MM/YYYY'),
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
        // onRowClick={(record, rowIndex) => console.log({ record, rowIndex })}
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

SurveyGroups.propTypes = {
  loading: PropTypes.bool.isRequired,
};

SurveyGroups.defaultProps = {};

export default SurveyGroups;
