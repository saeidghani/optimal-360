/* eslint-disable react/prop-types */
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import { dynamicMap } from '../../../routes/RouteMap';
import { useQuery, stringify } from '../../../hooks/useQuery';

import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import Tag from '../../Common/Tag';

const SurveyGroups = ({ fetchSurveyGroups, removeSurveyGroups, surveyGroups, loading }) => {
  const history = useHistory();
  const [parsedQuery, query, setQuery] = useQuery();

  const [selectedRows, setSelectedRows] = React.useState([]);
  const { projectId } = useParams();

  const surveyGroupProject = React.useMemo(() => {
    const ref = surveyGroups?.data?.length > 0 ? surveyGroups.data[0].project : {};
    return ref.name && ref.organization?.name ? ref : {};
    // eslint-disable-next-line
  }, [surveyGroups.timeStamp]);

  React.useEffect(() => {
    fetchSurveyGroups({ projectId, query });
  }, [projectId, fetchSurveyGroups]);

  const renderHeader = React.useCallback(
    () => {
      const selectedRowsIds = selectedRows?.length > 0 ? selectedRows.map((el) => el.id) : [];

      return selectedRows && selectedRows?.length > 0 ? (
        <div className="flex flex-row items-center">
          <Button
            onClick={async () => {
              await removeSurveyGroups({ projectId, surveyGroupIds: selectedRowsIds });
              setSelectedRows([]);

              fetchSurveyGroups({ projectId, query });
            }}
            size="middle"
            className="text-base flex flex-row justify-center items-center
            text-primary-500 bg-primary-500 bg-opacity-8 w-8 h-8 mr-3"
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
            <Button
              onClick={() => history.push(dynamicMap.superUser.addOrganization())}
              size="middle"
              textSize="xs"
              text="New Organization"
              type="gray"
              className="ml-3"
            />

            <Button
              onClick={() => {
                const path = dynamicMap.superUser.editProject();
                const params = stringify({ projectId });

                history.push(`${path}${params}`);
              }}
              size="middle"
              textSize="xs"
              text="Edit Project"
              type="gray"
              className="ml-3"
            />
          </div>
        </div>
      );
    },
    // eslint-disable-next-line
    [surveyGroups.timeStamp, loading, setQuery, selectedRows.length],
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
        sorter: (a, b) => a.id - b.id,
        sortOrder: getSortOrder('id'),
      },
      {
        key: 'name',
        title: 'Survey Group',
        render: (name, { project, id: surveyGroupId, status }) => {
          return status !== 'inactive' ? (
            <Button
              className="pl-0"
              onClick={() => {
                const params = stringify({
                  projectId: project.id,
                  surveyGroupId,
                  tab: 'status-overview',
                  page_number: 1,
                  page_size: 10,
                });
                const path = `${dynamicMap.superUser.ratersList()}${params}`;
                history.push(path);
              }}
              type="link"
              textSize="sm"
              text={name}
              textClassName="underline text-primary-500"
            />
          ) : name;
        },
        sorter: (a, b) => a.name > b.name,
        sortOrder: getSortOrder('name'),
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
        render: (surveyGroupId, { project, status }) => {
          return status === 'inactive' ? (
            <Button
              onClick={() => {
                const params = stringify({ surveyGroupId, projectId: project.id });
                const path = `${dynamicMap.superUser.surveySettings()}${params}`;

                history.push(path);
              }}
              icon="EditOutlined"
              type="link"
              className="text-lg mr-7"
              size="middle"
            />
          ) : null;
        },
      },
    ],
    // eslint-disable-next-line
    [surveyGroups.timeStamp,parsedQuery?.sort],
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
        onTableChange={({ sorter }) => sort(sorter)}
        className="p-6 bg-white rounded-lg shadow"
        size="small"
        selectedRowKeys={selectedRows?.map((el) => el.id.toString())}
        loading={loading}
        columns={columns}
        dataSource={surveyGroups?.data || []}
        renderHeader={renderHeader}
        pagination={false}
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
        rowClassName={({ deleted }) => {
          if (deleted) {
            return 'bg-antgray-100 bg-opacity-10 td-checkbox-visibility-0';
          }
        }}
      />
    </MainLayout>
  );
};

SurveyGroups.propTypes = {
  loading: PropTypes.bool.isRequired,
  surveyGroups: PropTypes.shape({}),
  fetchSurveyGroups: PropTypes.func.isRequired,
  removeSurveyGroups: PropTypes.func.isRequired,
};

SurveyGroups.defaultProps = {
  surveyGroups: {},
};

export default SurveyGroups;
