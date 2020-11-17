import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import { useHistory } from 'react-router-dom';
import { useQuery } from '../../../hooks';

import Table from '../../Common/Table';
import Progress from '../../Common/Progress';
import Button from '../../Common/Button';
import Modal from '../../Common/Modal';
import Checkbox from '../../Common/Checkbox';
import SearchBox from '../../Common/SearchBox';
import { CloseOutlined } from '@ant-design/icons';
import { Form, Formik } from 'formik';

const Result = ({
                  loading,
                  fetchIndividualReports,
                  fetchGroupReports,
                  exportDemographicData,
                  individualReports,
                  groupReports,
                }) => {
  const history = useHistory();
  const [parsedQuery, query, setQuery] = useQuery();

  const formRef = React.useRef();

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedTab, setSelectedTab] = useState('1');

  const { TabPane } = Tabs;
  const pageNumber = parsedQuery?.page_number || 1;
  const pageSize = parsedQuery?.page_size || 10;
  const surveyGroupId = parsedQuery?.surveyGroupId;
  const projectId = parsedQuery?.projectId;

  function tabChangeCallback(key) {
    setSelectedTab(key);
  }

  React.useEffect(() => {
    fetchIndividualReports({ query, surveyGroupId });
  }, [fetchIndividualReports, surveyGroupId]);

  React.useEffect(() => {
    fetchGroupReports({ projectId });
  }, [fetchGroupReports, projectId]);

  React.useEffect(() => {
    fetchIndividualReports({ query, surveyGroupId });
  }, [fetchIndividualReports, pageSize, pageNumber, parsedQuery.q, parsedQuery.sort]);

  React.useEffect(() => {
    setSelectedRows([]);
  }, [selectedTab]);

  const renderHeader = React.useCallback(() => {
    return selectedRows && selectedRows?.length > 0 ? (
      <div className="flex flex-row items-center">
        <Button
          size="middle"
          textSize="xs"
          text="Force generate report"
          textClassName="mr-2"
          className="ml-3"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Download report"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Export results to Excel"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
          onClick={() => setVisible(true)}
        />
        <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
      </div>
    ) : (
      <div className="flex justify-between items-center result-tabs">
        <Tabs
          defaultActiveKey={selectedTab}
          onChange={tabChangeCallback}
          className="relative contents"
          tabBarStyle={{ color: '#262626' }}
        >
          <TabPane tab="Individual Report" key="1" />
          <TabPane tab="Group Report" key="2" />
        </Tabs>
        <div className="flex flex-row ">
          {selectedTab === '1' && (<SearchBox
            className="text-xs"
            placeholder="SEARCH"
            loading={loading}
            onSearch={(val) => setQuery({ q: val })}
            onPressEnter={(e) => setQuery({ q: e.target.value })}
          />)}
          <Button
            size="middle"
            textSize="xs"
            text="Add Data"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            onClick={() => history.push('/super-user/new-project/reports/group-reports')}
          />
        </div>
      </div>
    );
  }, [loading, selectedRows.length, selectedTab]);

  const individualColumns = React.useMemo(() => [
    {
      key: 'rateeId',
      title: 'ID',
      width: 100,
      sorter: true,
    },
    {
      key: 'rateeName',
      title: 'Ratee',
      width: 100,
      sorter: true,
    },
    {
      key: 'status',
      title: 'Status',
      width: 100,
      render: (_, { totalQuestions, totalAnswered, totalRaters, totalSubmissions }) => (
        <div className="w-16 flex-inline items-center justify-start">
          <Progress
            className="-mb-12 ml-auto"
            subClassName="mb-12 pb-2 text-sm"
            status={totalSubmissions === totalRaters ? 'sub' : ''}
            percentage={parseInt((totalAnswered / totalQuestions) * 100, 10)}
          />
        </div>
      ),
    },
    {
      key: 'responsesSubmitted',
      title: (
        <div>
          <div>Responses</div>
          <div>Submitted</div>
        </div>
      ),
      width: 100,
      render: (_, { totalSubmissions, totalRaters }) => (
        <div>{totalSubmissions}/{totalRaters}</div>
      ),
    },
    {
      key: 'minMet',
      title: (
        <div>
          <div>Min.</div>
          <div>Submission</div>
        </div>
      ),
      width: 100,
      render: (minMet) => (
        <div className={`${minMet && 'opacity-50'}`}>Min. Met</div>
      ),
    },
    {
      key: 'criticalCompetencyData',
      title: (
        <div>
          <div>Crit. Comp</div>
          <div>.Data</div>
        </div>
      ),
      width: 100,
      render: (criticalCompetencyData) => (
        <div className="w-16 flex-inline items-center justify-start">
          {criticalCompetencyData ? (
            <div className="w-5 h-5 bg-green-400 rounded-full" />
          ) : (
            <CloseOutlined className="text-base ml-2 text-red-500" />
          )}
        </div>
      ),
    },
    {
      key: 'previosResults',
      title: (
        <div>
          <div>Previous</div>
          <div>Results</div>
        </div>
      ),
      width: 100,
      render: (previosResults) => (
        <div className="w-16 flex-inline items-center justify-start">
          {previosResults ? (
            <div className="w-5 h-5 bg-orange rounded-full" />
          ) : (
            <CloseOutlined className="text-base ml-2 text-red-500" />
          )}

        </div>
      ),
    },
    {
      key: 'reportAvailable',
      title: (
        <div>
          <div>Report</div>
          <div>Available</div>
        </div>
      ),
      width: 100,
      render: (reportAvailable) => (
        <div className="w-16 flex-inline items-center justify-start">
          {reportAvailable ? (
            <span>Yes</span>
          ) : (
            <span className="text-red">No</span>
          )}
        </div>
      ),
    },
  ]);
  const groupColumns = React.useMemo(() => [
    {
      key: 'name',
      title: 'Group Report',
      width: 200,
      sorter: true,
    },
    {
      key: 'reportAvailable',
      title: 'Report Available',
      width: 200,
      render: (reportAvailable) => (
        <div className="w-16 flex-inline items-center justify-start">
          <span className={!reportAvailable && 'text-red'}>{reportAvailable ? 'Yes' : 'No'}</span>
        </div>
      ),
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
      <Formik
        innerRef={formRef}
        initialValues={{
          lengthOfService: false,
          ageGroup: false,
          highestEducation: false,
          jobLevel: false,
          jobFunction: false,
          industry: false,
          sector: false,
          employmentLocation: false,
          sex: false,
        }}
        onSubmit={(values) => {
          const fields = Object.entries(values).filter(([_, item]) => item === true).map((item) => item[0]);
          exportDemographicData({ fields, surveyGroupId, rateeIds: selectedRows?.map((el) => el.rateeId) });
          setVisible(false);
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form>
            <Modal
              okText="Export"
              cancelText="Cancel"
              visible={visible}
              cancelButtonText="Cancel"
              okButtonText="Export"
              handleOk={handleSubmit}
              handleCancel={() => setVisible(false)}
              width={605}
            >
              <div className="grid grid-cols-2 mb-3">
                <div>
                  <Checkbox
                    checked={!Object.values(values).some((fieldVal) => fieldVal === false)}
                    className="block mb-3"
                    labelClass="text-sm"
                    onChange={() => {
                      const state = Object.values(values).some((fieldVal) => fieldVal === false);
                      setFieldValue('lengthOfService', state);
                      setFieldValue('ageGroup', state);
                      setFieldValue('highestEducation', state);
                      setFieldValue('jobLevel', state);
                      setFieldValue('jobFunction', state);
                      setFieldValue('industry', state);
                      setFieldValue('sector', state);
                      setFieldValue('employmentLocation', state);
                      setFieldValue('sex', state);
                    }}
                  >
                    All
                  </Checkbox>
                  <Checkbox
                    checked={values.employmentLocation}
                    onChange={(val) => setFieldValue('employmentLocation', val)}
                    className="block mb-3"
                    value="admin"
                    labelClass="text-sm"
                  >
                    Employment location
                  </Checkbox>
                  <Checkbox
                    onChange={(val) => setFieldValue('sector', val)}
                    checked={values.sector}
                    name="checked"
                    value="a11"
                    className="block mb-3"
                    labelClass="text-sm"
                  >
                    Sector
                  </Checkbox>
                  <Checkbox
                    onChange={(val) => setFieldValue('industry', val)}
                    checked={values.industry}
                    name="checked"
                    value="a22"
                    className="block mb-3"
                    labelClass="text-sm"
                  >
                    Industry
                  </Checkbox>
                  <Checkbox
                    onChange={(val) => setFieldValue('jobFunction', val)}
                    checked={values.jobFunction}
                    name="checked"
                    value="a33"
                    className="block mb-3"
                    labelClass="text-sm"
                  >
                    Job Function
                  </Checkbox>
                  <Checkbox
                    onChange={(val) => setFieldValue('jobLevel', val)}
                    checked={values.jobLevel}
                    name="checked"
                    value="a44"
                    className="block mb-3"
                    labelClass="text-sm">
                    Job Level
                  </Checkbox>
                </div>
                <div>
                  <Checkbox
                    onChange={(val) => setFieldValue('lengthOfService', val)}
                    checked={values.lengthOfService}
                    name="checked"
                    className="block mb-3"
                    labelClass="text-sm"
                  >
                    Length of service in current role
                  </Checkbox>
                  <Checkbox
                    onChange={(val) => setFieldValue('ageGroup', val)}
                    checked={values.ageGroup}
                    name="checked"
                    className="block mb-3"
                    labelClass="text-sm"
                  >
                    Age Group
                  </Checkbox>
                  <Checkbox
                    onChange={(val) => setFieldValue('sex', val)}
                    checked={values.sex}
                    name="checked"
                    className="block mb-3"
                    labelClass="text-sm"
                  >
                    Gender
                  </Checkbox>
                  <Checkbox
                    onChange={(val) => setFieldValue('highestEducation', val)}
                    checked={values.highestEducation}
                    name="checked"
                    className="block mb-3"
                    labelClass="text-sm">
                    Highest education attained
                  </Checkbox>
                </div>
              </div>
            </Modal>
          </Form>
        )}
      </Formik>

      <Table
        size="middle"
        className="p-6 mt-5 bg-white rounded-lg shadow"
        onTableChange={({ sorter }) => sort(sorter)}
        loading={loading}
        columns={selectedTab === '1' ? individualColumns : groupColumns}
        dataSource={(selectedTab === '1' ? individualReports?.data : groupReports?.data) || []}
        renderHeader={renderHeader}
        onPageSizeChange={(size) => {
          setQuery({ page_size: size, page_number: 1 });
        }}
        pagination={selectedTab === '1'}
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
        rowKey={selectedTab === '1' ? 'rateeId' : 'id'}
        selectedRowKeys={selectedRows?.map((el) => (selectedTab === '1' ? el.rateeId : el.id))}
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
        totalRecordSize={(selectedTab === '1' ? individualReports : groupReports)?.metaData?.pagination?.totalRecords}
      />
    </>
  );
};

Result.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchIndividualReports: PropTypes.func.isRequired,
  fetchGroupReports: PropTypes.func.isRequired,
  exportDemographicData: PropTypes.func.isRequired,
  individualReports: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      surveyGroupId: PropTypes.string,
      rateeId: PropTypes.string,
      rateeName: PropTypes.string,
      minMet: PropTypes.bool,
      totalRaters: PropTypes.string,
      totalSubmissions: PropTypes.string,
      totalQuestions: PropTypes.string,
      totalAnswered: PropTypes.string,
      criticalCompetencyData: false,
      previosResults: PropTypes.bool,
      reportAvailable: PropTypes.bool,
    })),
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        pageNumber: PropTypes.string,
        pageSize: PropTypes.string,
        totalRecords: PropTypes.string,
      }),
    }),
    timeStamp: PropTypes.number,
  }),
  groupReports: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      reportAvailable: PropTypes.bool,
    })),
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        pageNumber: PropTypes.string,
        pageSize: PropTypes.string,
        totalRecords: PropTypes.string,
      }),
    }),
    timeStamp: PropTypes.number,
  }),
};

Result.defaultProps = {
  individualReports: {},
  groupReports: {},
};

export default Result;
