import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import MainLayout from '../../Common/Layout';
import Loading from '../../Common/Loading';
import Menu from '../Wizard/Helper/Menu';
import Steps from '../../Common/Steps';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import SearchBox from '../../Common/SearchBox';

const AddRateeStep2 = ({ loading, isEditing }) => {
  const history = useHistory();
  const [selectedRows, setSelectedRows] = React.useState([]);

  const buttonLinks = isEditing ? {
    Submit: '/super-user/participants/ratee/status-details',
    Prev: '/super-user/participants/ratee/add/edit',
  } : {
    Submit: '/super-user/participants/ratee/status-details',
    Prev: '/super-user/participants/ratee/add',
  };

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
          </div>
        </div>
      );
    },
    // eslint-disable-next-line
    [loading],
  );

  const columns = React.useMemo(() => [
    {
      key: 'id',
      title: 'ID',
    },
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'email',
      title: 'Email',
    }, ,
  ]);

  const dataSource = [
    {
      id: 202006042211,
      name: 'Jean Luc Picard',
      email: 'jtkirk@ufp.com',
    },
    {
      id: 202006042212,
      name: 'William Riker',
      email: 'jtkirk@ufp.com',
    },
    {
      id: 202006042213,
      name: 'Jean Luc Picard',
      email: 'jtkirk@ufp.com',
    },
    {
      id: 202006042214,
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
    },
    {
      id: 202006042215,
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
    },
    {
      id: 202006042216,
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
    },
    {
      id: 202006042217,
      name: 'Jean Luc Picard',
      email: 'jtkirk@ufp.com',
    },
    {
      id: 202006042218,
      name: 'Benjamin Sisko',
      email: 'jtkirk@ufp.com',
    },
    {
      id: 202006042219,
      name: 'William Riker',
      email: 'jtkirk@ufp.com',
    },
    {
      id: 20200604271,
      name: 'Tom Paris',
      email: 'jtkirk@ufp.com',
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

      <div className="bg-white grid grid-cols-12 pl-15">
        <Menu
          onClick={() => {
          }}
          title="Rater Group"
          items={[{ id: 1, name: 'Managers' }, { id: 2, name: 'peers' }]}
          className="col-span-2"
        />

        <div className="px-6 py-5 col-start-3 col-span-10  ">
          <Steps className="block" steps={['Ratee Details', 'Rater Selection']} currentPosition={1} />
          <Table
            size="middle"
            className="p-6 mt-5 bg-white rounded-lg"
            renderHeader={renderHeader}
            loading={loading}
            columns={columns}
            dataSource={dataSource || []}
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
              text="Prev"
              onClick={() => {
                history.push(buttonLinks.Prev);
              }}
            />
            <Button
              className="w-24.5 h-9.5"
              text="Submit"
              onClick={() => {
                history.push(buttonLinks.Submit);
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

AddRateeStep2.propTypes = {
  loading: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

AddRateeStep2.defaultProps = {};

export default AddRateeStep2;
