import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useQuery, stringify } from '../../../hooks/useQuery';

import { dynamicMap } from '../../../routes/RouteMap';

import Button from '../../Common/Button';
import ImportExcelButton from '../../Common/ImportExcelButton';
import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';

const Models = ({
  loading,
  surveyGroups,
  fetchSurveyGroups,
  importSurveyGroups,
  exportSurveyGroup,
  deleteSurveyGroup,
}) => {
  const history = useHistory();
  const [parsedQuery, query, setQuery] = useQuery();

  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const pageNumber = parsedQuery?.page_number;

  React.useEffect(() => {
    if (!parsedQuery?.page_number || !parsedQuery?.page_size) {
      setQuery({
        page_number: 1,
        page_size: 10,
      });
    }

    // eslint-disable-next-line
  }, [history?.location?.pathname]);

  const getSortOrder = (key) => {
    return parsedQuery?.sort?.includes(key)
      ? parsedQuery?.sort?.[0] === '+'
        ? 'ascend'
        : 'descend'
      : '';
  };

  const sort = (sorter) => {
    // eslint-disable-next-line operator-linebreak
    const order = parsedQuery?.sort?.[0] === '+' ? '-' : '+';
    const newItem = `${order}${sorter.columnKey}`;

    setQuery({ sort: newItem });
  };

  React.useEffect(() => {
    fetchSurveyGroups(query);
  }, [fetchSurveyGroups, query]);

  const columns = React.useCallback(
    [
      {
        key: 'id',
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        sortOrder: getSortOrder('id'),
      },
      {
        key: 'name',
        title: 'Survey Group',
        dataIndex: 'SurveyGroup',
        sorter: true,
        sortOrder: getSortOrder('name'),
      },
      {
        key: 'action',
        width: 100,
        render: (_, { id: surveyGroupId }) => (
          <div className="flex items-center">
            <Button
              className="flex items-center mr-3.5"
              text="Export Excel File"
              icon="FileExcelOutlined"
              size="middle"
              textSize="xs"
              textClassName="mr-2"
              iconPosition="right"
              type="gray"
              onClick={() => exportSurveyGroup(surveyGroupId)}
            />
            <Button
              onClick={() => {
                const params = stringify({ surveyGroupId });
                const path = `${dynamicMap.superUser.bankSurveyGroups()}${params}`;

                history.push(path);
              }}
              icon="EditOutlined"
              type="link"
              className="text-lg"
              size="middle"
            />
          </div>
        ),
      },
    ],
    [],
  );

  const renderHeader = React.useCallback(
    () => {
      const surveyGroupIds = selectedRows?.length > 0 ? selectedRows.map((el) => el.id) : [];

      return (
        <div className="flex flex-row justify-between items-center">
          {selectedRows?.length > 0 ? (
            <div className="flex items-center space-x-2">
              <Button
                onClick={async () => {
                  const data = { surveyGroupIds };
                  await deleteSurveyGroup(data);
                  setSelectedRows([]);
                  fetchSurveyGroups(query);
                }}
                size="middle"
                className="text-base flex flex-row justify-center items-center
            text-primary-500 bg-primary-500 bg-opacity-8 w-8 h-8"
                icon="DeleteOutlined"
              />
              <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
            </div>
          ) : (
            <div className="flex ml-auto">
              <Button
                className="flex items-center mr-3.5"
                text="New Survey Group"
                icon="PlusCircleOutlined"
                textClassName="mr-2"
                size="middle"
                textSize="xs"
                iconPosition="right"
                type="gray"
                onClick={() => history.push(dynamicMap.superUser.bankSurveyGroups())}
              />

              <ImportExcelButton
                beforeUpload={(file) => {
                  importSurveyGroups(file);

                  return false;
                }}
              />
            </div>
          )}
        </div>
      );
    },
    // eslint-disable-next-line
    [surveyGroups.timeStamp, selectedRows.length],
  );

  const dataSource = React.useMemo(
    () => (surveyGroups?.data || []).map((item) => ({ ...item, key: `${item.id}` })),
    // eslint-disable-next-line
    [surveyGroups.timeStamp],
  );

  return (
    <MainLayout
      title="Pre Defined Data"
      breadCrumbItems={['Pre Defined Data', selectedRows?.length > 0 ? 'Selected' : '']}
      titleClass="mb-2"
      contentClass="py-6 pl-21 pr-6"
      childrenPadding={false}
    >
      <Table
        showSorterTooltip={false}
        onTableChange={({ sorter }) => sort(sorter)}
        className="p-6 bg-white rounded-lg shadow"
        size="middle"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        renderHeader={renderHeader}
        selectedRowKeys={selectedRows?.map((el) => el.key)}
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
        totalRecordSize={surveyGroups?.metaData?.pagination?.totalRecords * 1}
      />
    </MainLayout>
  );
};

Models.propTypes = {
  loading: PropTypes.bool.isRequired,
  importSurveyGroups: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  exportSurveyGroup: PropTypes.func.isRequired,
  deleteSurveyGroup: PropTypes.func.isRequired,
  surveyGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        totalRecords: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
    }),
  }),
};

Models.defaultProps = {
  surveyGroups: {
    data: [],
    metaData: {
      pagination: {
        totalRecords: 10,
      },
    },
  },
};

export default Models;
