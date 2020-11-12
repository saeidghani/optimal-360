import React, { useEffect, useState } from 'react';
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

const Result = ({ loading }) => {
  const [parsedQuery, , setQuery] = useQuery();

  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedTab, setSelectedTab] = useState('1');
  const { TabPane } = Tabs;
  const pageNumber = parsedQuery?.page_number || 1;
  const history = useHistory();

  function tabChangeCallback(key) {
    setSelectedTab(key);
  }

  useEffect(() => {
    setSelectedRows([]);
  }, [
    pageSize,
    parsedQuery.q,
    pageNumber,
    parsedQuery.sort,
  ]);

  const renderHeader = React.useCallback(() => {
    return selectedRows && selectedRows?.length > 0 ? (
      <div className="flex flex-row items-center">
        <Button
          size="middle"
          textSize="xs"
          text="Force generate report"
          textClassName="mr-2"
          className="ml-3"
          onClick={() => setVisible(true)}
        />
        <Button
          size="middle"
          textSize="xs"
          text="Download report"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
          onClick={() => setVisible(true)}
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
      <div className="flex justify-between items-center">
        <Tabs
          defaultActiveKey={selectedTab}
          onChange={tabChangeCallback}
          className="relative contents"
        >
          <TabPane tab="Individual Report" key="1" />
          <TabPane tab="Group Report" key="2" />
        </Tabs>
        <div className="flex flex-row ">
          <SearchBox className="text-xs" placeholder="SEARCH" loading={loading} />
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
  }, [loading, selectedRows.length]);

  const individualColumns = React.useMemo(() => [
    {
      key: 'id',
      title: 'ID',
      width: 100,
      sorter: true,
    },
    {
      key: 'ratee',
      title: 'Ratee',
      width: 100,
      sorter: true,
    },
    {
      key: 'status',
      title: 'Status',
      width: 100,
      render: (percentage) => (
        <div className="w-16 flex-inline items-center justify-start">
          <Progress
            className="-mb-12 ml-auto"
            subClassName="mb-12 pb-2"
            status="sub"
            percentage={percentage}
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
    },
    {
      key: 'minSubmission',
      title: (
        <div>
          <div>Min.</div>
          <div>Submission</div>
        </div>
      ),
      width: 100,
    },
    {
      key: 'critCompData',
      title: (
        <div>
          <div>Crit. Comp</div>
          <div>.Data</div>
        </div>
      ),
      width: 100,
      render: () => (
        <div className="w-16 flex-inline items-center justify-start">
          <div className="w-5 h-5 bg-green-400 rounded-full" />
        </div>
      ),
    },
    {
      key: 'previousResults',
      title: (
        <div>
          <div>Previous</div>
          <div>Results</div>
        </div>
      ),
      width: 100,
      render: () => (
        <div className="w-16 flex-inline items-center justify-start">
          <div className="w-5 h-5 bg-orange rounded-full" />
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
      render: (status) => (
        <div className="w-16 flex-inline items-center justify-start">
          <span className={status === 'No' && 'text-red'}>{status}</span>
        </div>
      ),
    },
  ]);
  const groupColumns = React.useMemo(() => [
    {
      key: 'groupReport',
      title: 'Group Report',
      width: 200,
      sorter: true,
    },
    {
      key: 'reportAvailable',
      title: 'Report Available',
      width: 200,
      render: (status) => (
        <div className="w-16 flex-inline items-center justify-start">
          <span className={status === 'No' && 'text-red'}>{status}</span>
        </div>
      ),
    },
  ]);

  const groupDataSource = [
    {
      id: 111,
      groupReport: 'Top Leadership',
      reportAvailable: 'No',
    },
    {
      id: 112,
      groupReport: 'Top Leadership',
      reportAvailable: 'Yes',
    },
    {
      id: 113,
      groupReport: 'Top Leadership',
      reportAvailable: 'No',
    },
    {
      id: 114,
      groupReport: 'Top Leadership',
      reportAvailable: 'Yes',
    },
    {
      id: 115,
      groupReport: 'Top Leadership',
      reportAvailable: 'No',
    },
  ];

  const IndividualDataSource = [
    {
      id: 1002520001,
      ratee: 'Katherine Kan',
      status: 100,
      responsesSubmitted: '2/10',
      minSubmission: 'Min. Met',
      critCompData: '',
      previousResults: '',
      reportAvailable: 'No',
    },
    {
      id: 1002420001,
      ratee: 'Katherine Kan',
      status: 100,
      responsesSubmitted: '2/10',
      minSubmission: 'Min. Met',
      critCompData: '',
      previousResults: '',
      reportAvailable: 'No',
    },
    {
      id: 1002230001,
      ratee: 'Katherine Kan',
      status: 100,
      responsesSubmitted: '2/10',
      minSubmission: 'Min. Met',
      critCompData: '',
      previousResults: '',
      reportAvailable: 'No',
    },
    {
      id: 1002200201,
      ratee: 'Katherine Kan',
      status: 100,
      responsesSubmitted: '2/10',
      minSubmission: 'Min. Met',
      critCompData: '',
      previousResults: '',
      reportAvailable: 'No',
    },
    {
      id: 10022078011,
      ratee: 'Katherine Kan',
      status: 100,
      responsesSubmitted: '2/10',
      minSubmission: 'Min. Met',
      critCompData: '',
      previousResults: '',
      reportAvailable: 'No',
    },
  ];
  const sort = (sorter) => {
    // eslint-disable-next-line operator-linebreak
    const order = parsedQuery?.sort?.[0] === '+' ? '-' : '+';
    const newItem = `${order}${sorter.columnKey}`;

    setQuery({ sort: newItem });
  };

  return (
    <>
      <Modal
        okText="Discard These Settings"
        cancelText="Cancel"
        visible={visible}
        cancelButtonText="Cancel"
        okButtonText="Export"
        handleOk={() => setVisible(false)}
        handleCancel={() => setVisible(false)}
        width={605}
      >
        <div className="grid grid-cols-2 mb-3">
          <div>
            <Checkbox className="block mb-3" labelClass="text-sm">
              All
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Employment location
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Sector
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Industry
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Job Function
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Job Level
            </Checkbox>
          </div>
          <div>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Length of service in current role
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Age Group
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Gender
            </Checkbox>
            <Checkbox className="block mb-3" labelClass="text-sm">
              Highest education attained
            </Checkbox>
          </div>
        </div>
      </Modal>

      <Table
        size="middle"
        className="p-6 mt-5 bg-white rounded-lg shadow"
        onTableChange={({ sorter }) => sort(sorter)}
        loading={loading}
        columns={selectedTab === '1' ? individualColumns : groupColumns}
        dataSource={(selectedTab === '1' ? IndividualDataSource : groupDataSource) || []}
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
        rowKey="id"
        selectedRowKeys={selectedRows?.map((el) => el.id)}
        onRowSelectionChange={(_, rows) => {
          setSelectedRows(rows);
        }}
        // totalRecordSize={raters?.metaData?.pagination?.totalRecords * 1}
      />
    </>
  );
};

Result.propTypes = {
  loading: PropTypes.bool.isRequired,
};

Result.defaultProps = {};

export default Result;
