import React from 'react';
// import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import Table from '../../Common/Table';
import SearchBox from '../../Common/SearchBox';
import Button from '../../Common/Button';
import StatusDetailsRates from "./StatusDetailsRates";

const EmailRates = ({ loading, fetchRaters, raters }) => {
  const [pageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);


  const renderHeader = React.useCallback(() => {
    return selectedRows && selectedRows?.length > 0 ? (
      <div className="flex flex-row items-center">
        <Button
          size="middle"
          textSize="xs"
          text="Send reminder email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Send reset password email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Send verification email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <Button
          size="middle"
          textSize="xs"
          text="Send login email"
          textClassName="mr-2"
          className="ml-3"
          icon="FileExcelOutlined"
          iconPosition="right"
        />
        <h3 className="font-normal ml-3">Selected {selectedRows.length} items</h3>
      </div>
    ) : (
      <div className="flex flex-row justify-end items-center">
        <div className="flex flex-row">
          <SearchBox className="text-xs" placeholder="SEARCH" loading={loading} />
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
      key: 'raterPassword',
      title: 'Rates Password',
      width: 100,
      sorter: true,
    },
  ]);

  const dataSource = [
    {
      key: '1',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      raterPassword: 'Katherine Janeway',
    },
    {
      key: '2',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      raterPassword: 'Katherine Janeway',
    },
    {
      key: '3',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      raterPassword: 'Katherine Janeway',
    },
    {
      key: '4',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      raterPassword: 'Katherine Janeway',
    },
    {
      key: '5',
      raterName: 'Jean Luc Picard',
      raterEmail: 'jtkirk@ufp.com',
      raterPassword: 'Katherine Janeway',
    },
  ];

  return (
    <Table
      size="middle"
      className="p-6 mt-5 bg-white rounded-lg shadow"
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

EmailRates.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  raters: PropTypes.shape({
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
};

EmailRates.defaultProps = {
  raters: {},
};

export default EmailRates;
