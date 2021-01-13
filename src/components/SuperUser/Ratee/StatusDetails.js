import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { useQuery, useRateeSurveyGroup } from '../../../hooks';
import { stringify } from '../../../hooks/useQuery';

import { dynamicMap } from '../../../routes/RouteMap';

import Progress from '../../Common/Progress';
import Table from '../../Common/Table';
import SearchBox from '../../Common/SearchBox';
import Button from '../../Common/Button';
import ImportExcelButton from '../../Common/ImportExcelButton';
import Modal from '../../Common/Modal';

const StatusDetails = ({
  loading,
  fetchStatusDetails,
  removeRateeRaters,
  changeAssessmentsStatus,
  statusDetails,
  importRelations,
  exportRelations,
  fetchRaterGroups,
  raterGroups,
  importMissionCriticalsWithExcel,
  exportMissionCriticalsToExcel,
  importRelationError,
  importMissionCriticalError,
  clearExcelImportError,
}) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const history = useHistory();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [importRelationsFile, setImportRelationsFile] = React.useState('');
  const [, , surveyGroupId, surveyGroupObject] = useRateeSurveyGroup();
  const [relationErrorModalVisible, setRelationErrorModalVisible] = React.useState(false);
  const [missionCriticalErrorModalVisible, setMissionCriticalErrorModalVisible] = React.useState(
    false,
  );
  const viewBy = parsedQuery?.viewBy || 'raters';
  const pageNumber = parsedQuery?.page_number || 1;
  const pageSize = parsedQuery?.page_size || 10;
  const projectId = parsedQuery?.projectId;
  const isNotPastEndDate = !moment(surveyGroupObject.endDate).isBefore();

  const fetch = () => {
    fetchStatusDetails({ query, surveyGroupId });
  };

  React.useEffect(() => {
    fetchRaterGroups({ surveyGroupId });
  }, [fetchRaterGroups, surveyGroupId]);

  React.useEffect(() => {
    fetch();
    setSelectedRows([]);
  }, [fetchStatusDetails, surveyGroupId, pageSize, pageNumber, parsedQuery.q, parsedQuery.sort]);

  React.useEffect(() => {
    if (importRelationError) {
      setRelationErrorModalVisible(true);
      setQuery({ errorType: 'rows' });
    }
    if (importMissionCriticalError) {
      setMissionCriticalErrorModalVisible(true);
      setQuery({ errorType: 'ratee' });
    }
  }, [importRelationError, importMissionCriticalError]);

  const renderHeader = React.useCallback(() => {
    const selectedRowsIds = selectedRows?.length > 0 ? selectedRows.map((el) => el.relationId) : [];

    return selectedRows && selectedRows?.length > 0 ? (
      <div className="flex flex-row items-center">
        <Button
          size="middle"
          textSize="xs"
          text="Remove"
          textClassName="mr-2"
          className="ml-3"
          onClick={async () => {
            await removeRateeRaters({ selectedRowsIds, surveyGroupId });
            fetch();
            setSelectedRows([]);
          }}
        />
        <Button
          size="middle"
          textSize="xs"
          text="Open Assessment"
          textClassName="mr-2"
          className="ml-3"
          onClick={async () => {
            await changeAssessmentsStatus({ selectedRowsIds, surveyGroupId, status: true });
            fetch();
            setSelectedRows([]);
          }}
        />
        <Button
          size="middle"
          textSize="xs"
          text="Close Assessment"
          textClassName="mr-2"
          className="ml-3"
          onClick={async () => {
            await changeAssessmentsStatus({ selectedRowsIds, surveyGroupId, status: false });
            fetch();
            setSelectedRows([]);
          }}
        />
        <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
      </div>
    ) : (
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row">
            <div className="flex flex-row items-center">
              <Button
                size="middle"
                textSize="xs"
                text="View by raters"
                textClassName="mr-2"
                className="ml-3"
                light={viewBy === 'ratees'}
                onClick={() => setQuery({ viewBy: 'raters' })}
              />
              <Button
                size="middle"
                textSize="xs"
                text="View by ratees"
                textClassName="mr-2"
                className="ml-3"
                light={viewBy === 'raters'}
                onClick={() => setQuery({ viewBy: 'ratees' })}
              />
            </div>
            <div className="flex flex-row">
              <SearchBox
                className="text-xs ml-6"
                placeholder="Search"
                loading={loading}
                onSearch={(val) => setQuery({ q: val })}
                onPressEnter={(e) => setQuery({ q: e.target.value })}
                onChange={(e) => setQuery({ q: e.target.value })}
                value={parsedQuery?.q || ''}
              />

              {isNotPastEndDate && raterGroups?.length > 0 ? (
                <Button
                  size="middle"
                  textSize="xs"
                  text="Add Ratee"
                  textClassName="mr-2"
                  className="ml-3"
                  type="gray"
                  icon="PlusCircleOutlined"
                  iconPosition="right"
                  onClick={() => {
                    const params = stringify({ projectId, surveyGroupId });
                    const path = `${dynamicMap.superUser.addRatee()}${params}`;
                    history.push(path);
                  }}
                />
              ) : null}
            </div>
          </div>

          <div className="flex flex-col ml-48">
            {isNotPastEndDate && raterGroups?.length > 0 ? (
              <div className="flex flex-row">
                <ImportExcelButton
                  textClassName="pr-3"
                  className="mb-3 pr-3"
                  buttonText="Import Relations Excel File"
                  beforeUpload={(file) => {
                    setImportRelationsFile(file);

                    return false;
                  }}
                />

                <ImportExcelButton
                  textClassName="pr-3"
                  className="mb-3 pr-3"
                  buttonText="Import Mission Critical Competencies Excel File"
                  beforeUpload={(file) => {
                    importMissionCriticalsWithExcel({ file, surveyGroupId });
                    return false;
                  }}
                />
              </div>
            ) : null}

            <div className="flex flex-row">
              <Button
                size="middle"
                textSize="xs"
                text="Export Relations Excel File"
                textClassName="pr-3.5"
                type="gray"
                icon="FileExcelOutlined"
                iconPosition="right"
                onClick={() => {
                  exportRelations({ surveyGroupId });
                }}
              />

              <Button
                size="middle"
                textSize="xs"
                text="Export Mission Critical Competencies Excel File"
                textClassName="pr-3.5"
                className="ml-3"
                type="gray"
                icon="FileExcelOutlined"
                iconPosition="right"
                onClick={() => {
                  exportMissionCriticalsToExcel({ surveyGroupId });
                }}
              />
            </div>
          </div>
        </div>
      );
  }, [loading, selectedRows.length, viewBy, parsedQuery.q]);

  const renderImportRelationErrorHeader = React.useCallback(() => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row">
          <Button
            size="middle"
            onClick={() => setQuery({ errorType: 'rows', page_number: 1 })}
            textSize="xs"
            text="Invalid Rows"
            className="mr-3 px-3"
            light={parsedQuery?.errorType !== 'rows'}
          />

          <Button
            size="middle"
            onClick={() => setQuery({ errorType: 'ratee', page_number: 1 })}
            textSize="xs"
            text="Invalid Ratee"
            light={parsedQuery?.errorType !== 'ratee'}
            className="mr-3 px-3"
          />
        </div>
        {parsedQuery?.errorType === 'ratee' ? (
          <div className="mt-5">
            There are some ratees in your imported excel file that have a relation but do not have
            the “Self” relation!
          </div>
        ) : null}
      </div>
    );
  }, [parsedQuery?.errorType]);

  const renderImportMissionCriticalErrorHeader = React.useCallback(() => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row">
          <Button
            size="middle"
            onClick={() => setQuery({ errorType: 'ratee', page_number: 1 })}
            textSize="xs"
            text="Ratee"
            className="mr-3 px-3"
            light={parsedQuery?.errorType !== 'ratee'}
          />

          <Button
            size="middle"
            onClick={() => setQuery({ errorType: 'competencyName', page_number: 1 })}
            textSize="xs"
            text="Competency Name"
            light={parsedQuery?.errorType !== 'competencyName'}
            className="mr-3 px-3"
          />
        </div>
        {parsedQuery?.errorType === 'competencyName' ? (
          <div className="mt-5">
            There are some invalid competencies in the excel file you have imported!
          </div>
        ) : null}
      </div>
    );
  }, [parsedQuery?.errorType]);

  const getSortOrder = (key) => {
    return parsedQuery?.sort?.includes(key)
      ? parsedQuery?.sort?.[0] === '+'
        ? 'ascend'
        : 'descend'
      : '';
  };

  const columns = React.useMemo(() => [
    viewBy === 'raters'
      ? {
        key: 'raterName',
        title: 'Rater Name',
        width: 100,
        sorter: true,
        sortOrder: getSortOrder('raterName'),
      }
      : {
        key: 'rateeName',
        title: 'Ratee Name',
        width: 100,
        sorter: true,
        sortOrder: getSortOrder('rateeName'),
        render: (num, { rateeId }) => (
          <div className="flex items-center">
            <div className="text-12px inline-block">{num}</div>
            <div className="inline-block">
              <Button
                onClick={() => {
                  const params = stringify({ projectId, surveyGroupId, rateeId, rateeName: num });
                  const path = `${dynamicMap.superUser.editRatee()}${params}`;
                  history.push(path);
                }}
                size="middle"
                textSize="xs"
                type="link"
                className="ml-2 p-0 h-6 w-6"
                icon="EditOutlined"
              />
            </div>
          </div>
        ),
      },
    {
      key: 'raterEmail',
      title: 'Rater Email',
      width: 100,
      sorter: true,
      sortOrder: getSortOrder('raterEmail'),
    },
    viewBy === 'ratees'
      ? {
        key: 'raterName',
        title: 'Rater Name',
        width: 100,
        sorter: true,
        sortOrder: getSortOrder('raterName'),
      }
      : {
        key: 'rateeName',
        title: 'Ratee Name',
        width: 100,
        sorter: true,
        sortOrder: getSortOrder('rateeName'),
        render: (num, { rateeId }) => (
          <div className="flex items-center">
            <div className="text-12px inline-block">{num}</div>
            <div className="inline-block">
              <Button
                onClick={() => {
                  const params = stringify({ projectId, surveyGroupId, rateeId, rateeName: num });
                  const path = `${dynamicMap.superUser.editRatee()}${params}`;
                  history.push(path);
                }}
                disabled={!isNotPastEndDate}
                size="middle"
                textSize="xs"
                type="link"
                className="ml-2 p-0 h-6 w-6"
                icon="EditOutlined"
              />
            </div>
          </div>
        ),
      },
    {
      key: 'raterGroupName',
      title: 'Rater Group',
      width: 100,
    },
    {
      key: 'questionsAnswered',
      title: 'SelectQuestions Answered',
      width: 100,
      render: (_, { totalAnswered, totalQuestions }) => (
        <span>{`${totalAnswered}/${totalQuestions}`}</span>
      ),
    },
    {
      key: 'status',
      title: <span className="text-center ml-2">Status</span>,
      width: 50,
      render: (_, { totalAnswered, totalQuestions, raterSubmited }) => (
        <div className="w-16 flex-inline items-center justify-start">
          <Progress
            className="-mb-12 ml-auto"
            subClassName={`mb-12 pb-2 ${!raterSubmited && 'text-gray-800'}`}
            status={raterSubmited ? 'sub' : ''}
            percentage={parseInt((totalAnswered / totalQuestions) * 100, 10)}
          />
        </div>
      ),
    },
  ]);

  const relationErrorInvalidRowsColumns = React.useMemo(() => [
    {
      key: 'rowNumber',
      title: 'Row Number',
    },
    {
      key: 'ratee',
      title: 'Ratee Email',
    },
    {
      key: 'rater',
      title: 'Rater Email',
    },
    {
      key: 'raterGroup',
      title: 'Rater Group',
    },
    {
      key: 'errorMessage',
      title: 'Error Message',
    },
  ]);

  const relationErrorInvalidRateeColumns = React.useMemo(() => [
    {
      key: 'rateeEmail',
      title: 'Ratee Email',
    },
  ]);

  const missionCriticalErrorRateeColumns = React.useMemo(() => [
    {
      key: 'rowNumber',
      title: 'Row Number',
    },
    {
      key: 'ratee',
      title: 'Ratee Email',
    },
    {
      key: 'errorMessage',
      title: 'Error Message',
    },
  ]);

  const missionCriticalErrorCompetencyNameColumns = React.useMemo(() => [
    {
      key: 'competencyName',
      title: 'Competency Name',
    },
  ]);

  const sort = (sorter) => {
    // eslint-disable-next-line operator-linebreak
    const order = parsedQuery?.sort?.[0] === '+' ? '-' : '+';
    const newItem = `${order}${sorter.columnKey}`;

    setQuery({ sort: newItem });
  };

  return (
    <>
      <Modal
        okText="Yes"
        cancelText="Cancel"
        visible={!!importRelationsFile}
        handleOk={async () => {
          try {
            await importRelations({ file: importRelationsFile, surveyGroupId });
            // eslint-disable-next-line no-empty
          } catch (err) {
          } finally {
            setImportRelationsFile('');
          }
        }}
        handleCancel={() => setImportRelationsFile('')}
      >
        <h3 className="text-lg text-body mb-3">Attention!</h3>

        <p className="text-sm text-secondary">
          If you import this excel file, all prior relations will be deleted, continue?
        </p>
      </Modal>

      <Modal
        visible={relationErrorModalVisible}
        width="100%"
        closable
        handleCancel={() => {
          clearExcelImportError();
          setQuery({ errorType: '' });
          setRelationErrorModalVisible(false);
        }}
        className="h-screen error-table-modal max-w-full"
      >
        <span className="text-primary-500 text-xl mb-6 flex">Errors</span>
        <Table
          showSorterTooltip={false}
          size="normal"
          className="p-6 bg-white rounded-lg shadow"
          columns={
            parsedQuery?.errorType === 'rows'
              ? relationErrorInvalidRowsColumns
              : relationErrorInvalidRateeColumns
          }
          dataSource={
            (
              parsedQuery?.errorType === 'rows'
                ? importRelationError?.importErrors?.invalidRows
                : importRelationError?.importErrors?.invalidRatees.map((el) => ({ rateeEmail: el }))
            )
            || []
          }
          renderHeader={renderImportRelationErrorHeader}
          pagination={false}
          rowSelection={false}
        />
      </Modal>

      <Modal
        visible={missionCriticalErrorModalVisible}
        width="100%"
        closable
        handleCancel={() => {
          clearExcelImportError();
          setQuery({ errorType: '' });
          setMissionCriticalErrorModalVisible(false);
        }}
        className="h-screen error-table-modal max-w-full"
      >
        <span className="text-primary-500 text-xl mb-6 flex">Errors</span>
        <Table
          showSorterTooltip={false}
          size="normal"
          className="p-6 bg-white rounded-lg shadow"
          columns={
            parsedQuery?.errorType === 'ratee'
              ? missionCriticalErrorRateeColumns
              : missionCriticalErrorCompetencyNameColumns
          }
          dataSource={
            (
              parsedQuery?.errorType === 'ratee'
                ? importMissionCriticalError?.importErrors?.invalidRows
                : importMissionCriticalError?.importErrors?.invalidCompetencies
                  .map((el) => ({ competencyName: el }))
            )
            || []
          }
          renderHeader={renderImportMissionCriticalErrorHeader}
          pagination={false}
          rowSelection={false}
        />
      </Modal>

      <Table
        size="middle"
        className="c-table-white-head p-6 mt-5 bg-white rounded-lg shadow"
        onTableChange={({ sorter }) => sort(sorter)}
        loading={loading}
        columns={columns}
        dataSource={statusDetails?.data || []}
        rowKey="relationId"
        renderHeader={renderHeader}
        onPageSizeChange={(size) => {
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
        rowSelection={isNotPastEndDate}
        selectedRowKeys={selectedRows?.map((el) => el.relationId)}
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
        totalRecordSize={statusDetails?.metaData?.pagination?.totalRecords * 1}
        rowClassName={({ assessmentStatus }) => {
          if (!assessmentStatus) {
            return 'td-gray';
          }
        }}
      />
    </>
  );
};

StatusDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchStatusDetails: PropTypes.func.isRequired,
  importRelations: PropTypes.func.isRequired,
  exportRelations: PropTypes.func.isRequired,
  removeRateeRaters: PropTypes.func.isRequired,
  changeAssessmentsStatus: PropTypes.func.isRequired,
  statusDetails: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        pageNumber: PropTypes.string,
        pageSize: PropTypes.string,
        totalRecords: PropTypes.string,
      }),
    }),
    timeStamp: PropTypes.number,
  }),
  fetchRaterGroups: PropTypes.func.isRequired,
  raterGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  importMissionCriticalsWithExcel: PropTypes.func.isRequired,
  exportMissionCriticalsToExcel: PropTypes.func.isRequired,
  importRelationError: PropTypes.arrayOf(PropTypes.object),
  importMissionCriticalError: PropTypes.arrayOf(PropTypes.object),
  clearExcelImportError: PropTypes.func.isRequired,
};

StatusDetails.defaultProps = {
  statusDetails: {},
  importRelationError: {},
  importMissionCriticalError: {},
};

export default StatusDetails;
