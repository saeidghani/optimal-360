import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import { dynamicMap } from '../../../routes/RouteMap';

import { useQuery, stringify } from '../../../hooks/useQuery';

import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import ImportExcelButton from '../../Common/ImportExcelButton';
import InputNumber from '../../Common/InputNumber';

const GroupReports = ({
  loading,
  clusterBenchmarks,
  competencyBenchmarks,
  fetchClusterBenchmarks,
  setClusterBenchmarks,
  importClusterBenchmark,
  exportClusterBenchmark,
  fetchCompetencyBenchmarks,
  setCompetencyBenchmarks,
  importCompetencyBenchmark,
  exportCompetencyBenchmark,
}) => {
  const history = useHistory();
  const [parsedQuery, query, setQuery] = useQuery();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const { surveyGroupId } = useParams();

  React.useEffect(() => {
    if (surveyGroupId) {
      fetchClusterBenchmarks(surveyGroupId);
      fetchCompetencyBenchmarks(surveyGroupId);
    }
  }, [surveyGroupId, fetchClusterBenchmarks, fetchCompetencyBenchmarks]);

  const fetchTableData = React.useCallback(() => {
    return (
      (parsedQuery?.benchmarkType === 'competency' ? competencyBenchmarks : clusterBenchmarks)
        ?.data || []
    );

    // eslint-disable-next-line
  }, [JSON.stringify({ competencyBenchmarks, clusterBenchmarks }), parsedQuery.benchmarkType]);

  const [tableData, setTableData] = React.useState(fetchTableData);

  React.useEffect(() => {
    const src = fetchTableData();
    setTableData(src);
  }, [fetchTableData]);

  const renderHeader = React.useCallback(
    () => (
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <Button
            onClick={() => {
              setQuery({ benchmarkType: 'cluster' });
              setSelectedRows([]);
            }}
            size="middle"
            textSize="xs"
            text="Select Clusters"
            light={parsedQuery?.benchmarkType === 'competency'}
          />
          <Button
            onClick={() => {
              setQuery({ benchmarkType: 'competency' });
              setSelectedRows([]);
            }}
            size="middle"
            textSize="xs"
            text="Select Competencies"
            className="ml-3"
            light={parsedQuery?.benchmarkType !== 'competency'}
          />
        </div>

        <div className="flex flex-row">
          <Button
            size="middle"
            textSize="xs"
            text="Export Excel File"
            textClassName="mr-2"
            className="mr-3"
            type="gray"
            icon="FileExcelOutlined"
            iconPosition="right"
            onClick={async () => {
              try {
                if (parsedQuery?.benchmarkType === 'competency') {
                  await exportCompetencyBenchmark(surveyGroupId);
                } else {
                  await exportClusterBenchmark(surveyGroupId);
                }
              } catch (err) { }
            }}
          />

          <ImportExcelButton
            beforeUpload={async (file) => {
              try {
                if (parsedQuery?.benchmarkType === 'competency') {
                  await importCompetencyBenchmark({ surveyGroupId, file });
                } else {
                  await importClusterBenchmark({ surveyGroupId, file });
                }
              } catch (err) { }

              return false;
            }}
          />
        </div>
      </div>
    ),

    // eslint-disable-next-line
    [loading, query, selectedRows.length, parsedQuery.benchmarkType],
  );

  const renderFooter = React.useCallback(
    () => (
      <div className="flex justify-end">
        <Button
          onClick={() => {
            const path = dynamicMap.superUser.ratersList();
            const params = stringify({
              projectId: parsedQuery?.projectId,
              surveyGroupId,
            });

            history.replace(`${path}${params}`);
          }}
          className="w-24.5 h-9.5"
          type="link"
          text="Cancel"
        />

        <Button
          disabled={
            selectedRows?.length === 0 || !!selectedRows.find((el) => !el.externalBenchmark)
          }
          className="w-24.5 h-9.5"
          text="Next"
          onClick={async () => {
            const benchmarks = selectedRows.map((row) => ({
              id: row.id,
              externalBenchmark: parseFloat(row.externalBenchmark.toFixed(2)),
              surveyGroupId: row.surveyGroupId,
              ...(row.clusterId && { clusterId: row.clusterId }),
            }));

            try {
              if (parsedQuery?.benchmarkType === 'competency') {
                await setCompetencyBenchmarks({ surveyGroupId, benchmarks });

                setSelectedRows([]);
              } else {
                await setClusterBenchmarks({ surveyGroupId, benchmarks });

                setSelectedRows([]);
              }
            } catch (err) { }
          }}
        />
      </div>
    ),
    // eslint-disable-next-line
    [setCompetencyBenchmarks, JSON.stringify({ selectedRows }), parsedQuery.benchmarkType],
  );

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

  const handleTableChange = (id, value) => {
    const refItemIndex = tableData.findIndex((el) => el.id * 1 === id * 1);

    const newData = [...tableData];
    newData[refItemIndex].externalBenchmark = value;

    setTableData(newData);
  };

  const tableDataStringified = JSON.stringify({ tableData });

  const columns = React.useMemo(
    () => [
      {
        key: 'id',
        title: parsedQuery?.benchmarkType === 'competency' ? 'Competency ID' : 'Cluster ID',
        className: 'pl-5',
        sorter: (a, b) => a.id - b.id,
        sortOrder: getSortOrder('id'),
      },
      {
        key: 'name',
        title: parsedQuery?.benchmarkType === 'competency' ? 'Competencies' : 'Cluster',
        sorter: (a, b) => a.name > b.name,
        sortOrder: getSortOrder('name'),
      },
      {
        key: 'externalBenchmark',
        title: '',
        width: 500,
        render: (value, { id, name }) => (
          <InputNumber
            size="large"
            wrapperClassName="flex flex-col justify-center items-center"
            className="border border-antgray-300 w-28 text-center text-antgray-800 text-14px c-input-number-text-center"
            name={`${name}-${id}`}
            onChange={(newVal) => handleTableChange(id, newVal)}
            value={value}
            placeholder="External Benchmark"
            fixedHeightForErrorMessage={false}
            errorMessage={value ? '' : 'value cannot be empty'}
            formatter={(newVal) => `${newVal}`}
            parser={(newVal) => newVal.replace('', '')}
            precision={2}
            step={0.01}
            min={1}
            max={4}
          />
        ),
      },
    ],

    // eslint-disable-next-line
    [tableDataStringified, selectedRows?.length, query],
  );

  return (
    <MainLayout
      contentClass="pl-21 pr-6 py-4"
      title="Super User"
      titleClass="my-2"
      breadCrumbItems={['New Project', 'Reports', 'Group Reports']}
    >
      <Table
        onTableChange={({ sorter }) => sort(sorter)}
        size="middle"
        className="p-6 mt-5 bg-white rounded-lg shadow c-table-selection-lg"
        loading={loading}
        columns={columns}
        dataSource={tableData}
        renderHeader={renderHeader}
        selectedRowKeys={selectedRows?.map((el) => el.id.toString())}
        onRowSelectionChange={(_, rows) => setSelectedRows(rows)}
        pagination={false}
        footer={renderFooter}
      />
    </MainLayout>
  );
};

GroupReports.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchClusterBenchmarks: PropTypes.func.isRequired,
  setClusterBenchmarks: PropTypes.func.isRequired,
  importClusterBenchmark: PropTypes.func.isRequired,
  exportClusterBenchmark: PropTypes.func.isRequired,
  fetchCompetencyBenchmarks: PropTypes.func.isRequired,
  setCompetencyBenchmarks: PropTypes.func.isRequired,
  importCompetencyBenchmark: PropTypes.func.isRequired,
  exportCompetencyBenchmark: PropTypes.func.isRequired,
  clusterBenchmarks: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  competencyBenchmarks: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
};

GroupReports.defaultProps = {
  clusterBenchmarks: {},
  competencyBenchmarks: {},
};

export default GroupReports;
