import React from 'react';
// import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import MainLayout from '../../Common/Layout';
import Dropdown from '../../Common/Dropdown';
import Tabs from '../../Common/Tabs';
import Progress from '../../Common/Progress';
import Table from '../../Common/Table';
import SearchBox from '../../Common/SearchBox';
import Button from '../../Common/Button';

const StatusDetailsRates = ({ loading }) => {
  const [pageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const renderHeader = React.useCallback(() => {
    return selectedRows && selectedRows?.length > 0 ? (
      <div className="flex flex-row items-center">
        <Button size="middle" textSize="xs" text="Remove" textClassName="mr-2" className="ml-3" />
        <Button
          size="middle"
          textSize="xs"
          text="Open Assessment"
          textClassName="mr-2"
          className="ml-3"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Close Assessment"
          textClassName="mr-2"
          className="ml-3"
        />
        <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
      </div>
    ) : (
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <Button
            size="middle"
            textSize="xs"
            text="View by raters"
            textClassName="mr-2"
            className="ml-3"
          />
          <Button
            size="middle"
            textSize="xs"
            text="View by ratees"
            textClassName="mr-2"
            className="ml-3"
            light
          />
        </div>
        <div className="flex flex-row">
          <SearchBox className="text-xs" placeholder="SEARCH" loading={loading} />
          <Button
            size="middle"
            textSize="xs"
            text="Add Ratee"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="PlusCircleOutlined"
            iconPosition="right"
          />
          <Button
            size="middle"
            textSize="xs"
            text="Export Exel File"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="FileExcelOutlined"
            iconPosition="right"
          />
          <Button
            size="middle"
            textSize="xs"
            text="Import Exel File"
            textClassName="mr-2"
            className="ml-3"
            type="gray"
            icon="FileExcelOutlined"
            iconPosition="right"
          />
        </div>
      </div>
    );
  }, [loading, selectedRows.length]);

  const columns = React.useMemo(() => [
    {
      key: 'raterName',
      title: 'Rates Name',
      width: 100,
      sorter: true,
    },
    {
      key: 'raterEmail',
      title: 'Rates Email',
      width: 100,
      sorter: true,
    },
    {
      key: 'rateeName',
      title: 'Ratee Name',
      width: 100,
      sorter: true,
      render: (num) => <span className="text-12px">{num}</span>,
    },
    {
      key: 'raterGroup',
      title: 'Rates Group',
      width: 100,
    },
    {
      key: 'questionsAnswered',
      title: 'Questions Answered',
      width: 100,
    },
    {
      key: 'status',
      title: <span className="text-center ml-2">Status</span>,
      width: 50,
      render: () => (
        <div className="w-16 flex-inline items-center justify-start">
          <Progress
            className="-mb-12 ml-auto"
            subClassName="mb-12 pb-2"
            status="sub"
            percentage={100}
          />
        </div>
      ),
    },
  ]);

  const dataSource = [
    {
      key: '1',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      rateeName: 'Katherine Janeway',
      raterGroup: 'Manager',
      questionsAnswered: '100/100',
      status: '100%',
    },
    {
      key: '2',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      rateeName: 'Katherine Janeway',
      raterGroup: 'Manager',
      questionsAnswered: '100/100',
      status: '100%',
    },
    {
      key: '3',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      rateeName: 'Katherine Janeway',
      raterGroup: 'Manager',
      questionsAnswered: '100/100',
      status: '100%',
    },
    {
      key: '4',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      rateeName: 'Katherine Janeway',
      raterGroup: 'Manager',
      questionsAnswered: '100/100',
      status: '100%',
    },
    {
      key: '5',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      rateeName: 'Katherine Janeway',
      raterGroup: 'Manager',
      questionsAnswered: '100/100',
      status: '100%',
    },
  ];

  return (
    <Table
      size="middle"
      className="c-table-white-head p-6 mt-5 bg-white rounded-lg shadow"
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pageSize={pageSize * 1}
      pageNumber={1}
      renderHeader={renderHeader}
      selectedRowKeys={selectedRows?.map((el) => el.key)}
      onRowSelectionChange={(_, rows) => {
        setSelectedRows(rows);
      }}
    />
  );
};

StatusDetailsRates.propTypes = {
  loading: PropTypes.bool.isRequired,
};

StatusDetailsRates.defaultProps = {};

export default StatusDetailsRates;
