import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../Common/Layout';
import Loading from '../../Common/Loading';
import Steps from '../../Common/Steps';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import SearchBox from '../../Common/SearchBox';

const AddRatee = ({ loading }) => {
  const history = useHistory();
  const [selectedRows, setSelectedRows] = React.useState([]);

  const renderHeader = React.useCallback(
    () => {
      return (
        <div className="flex flex-row justify-start items-center">
          <div className="flex flex-row">
            <SearchBox
              className="text-xs"
              placeholder="SEARCH"
              loading={loading}
              // onSearch={(val) => setQuery({ q: val })}
              // onPressEnter={(e) => setQuery({ q: e.target.value })}
            />
            <Button
              size="middle"
              textSize="xs"
              text="Add a New Staff"
              textClassName="mr-2"
              className="ml-3"
            />
          </div>
        </div>
      );
    },
    // eslint-disable-next-line
    [loading],
  );

  const columns = React.useMemo(() => [
    {
      title: 'Mission Critical Competencies',
      key: 'staff',
    },
  ]);

  const dataSource = [
    {
      id: 1,
      staff: 'Team Player1',
    },
    {
      id: 2,
      staff: 'Team Player2',
    },
    {
      id: 3,
      staff: 'Team Player3',
    },
    {
      id: 4,
      staff: 'Team Player4',
    },
    {
      id: 5,
      staff: 'Team Player5',
    },
  ];

  return (
    <MainLayout
      hasBreadCrumb
      title="Super User"
      titleClass="mb-6 mt-3"
      contentClass="py-6"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <Loading visible={loading} />

      <div className="bg-white p-6 grid grid-cols-12  min-h-full">
        <div className="px-6 py-5 col-start-2 col-span-10">
          <Steps className="block" steps={['Ratee Details', 'Rater Selection']} currentPosition={0} />
          <Table
            size="middle"
            renderHeader={renderHeader}
            className="p-6 mt-5 bg-white rounded-lg"
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            selectedRowKeys={selectedRows?.map((el) => el.id)}
            onRowSelectionChange={(_, rows) => {
              setSelectedRows(rows);
            }}
            pagination={false}
          />
          <div className="pt-23.5 pb-22 flex justify-end">
            <Button
              className="w-24.5 h-9.5"
              type="link"
              text="Cancel"
              onClick={() => {
                history.push('/super-user/participants/ratee/status-details');
              }}
            />
            <Button
              className="w-24.5 h-9.5"
              text="Next"
              onClick={() => {
                history.push('/super-user/participants/ratee/add/step2');
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

AddRatee.propTypes = {
  loading: PropTypes.bool.isRequired,
};

AddRatee.defaultProps = {};

export default AddRatee;
