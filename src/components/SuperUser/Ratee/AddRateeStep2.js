import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { useQuery } from '../../../hooks/useQuery';
import { useSurveyGroup } from '../../../hooks';

import ChangeSurveyGroupModal from '../Wizard/Helper/ChangeSurveyGroupModal';

import MainLayout from '../../Common/Layout';
import Loading from '../../Common/Loading';
import Menu from '../Wizard/Helper/Menu';
import Steps from '../../Common/Steps';
import Table from '../../Common/Table';
import Button from '../../Common/Button';

const AddRateeStep2 = ({ loading }) => {
  const history = useHistory();
  const [pageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();

  const [isFormDone, setIsFormDone] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');

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
      id: 20200604221,
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      key: '1',
    },
    {
      id: 20200604222,
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      key: '2',
    },
    {
      id: 20200604223,
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      key: '3',
    },
    {
      id: 20200604224,
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      key: '4',
    },
    {
      id: 20200604225,
      name: 'James Kirk',
      email: 'jtkirk@ufp.com',
      key: '5',
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
          onClick={(key) => setSelectedSurveyGroupKey(key)}
          isFormDone={isFormDone}
          title="Rater Group"
          items={[{ id: 1, name: 'Managers' }, { id: 2, name: 'peers' }]}
          className="col-span-2"
        />

        <div className="px-6 py-5 col-start-3 col-span-10  ">
          <Steps className="block" steps={['Ratee Details', 'Rater Selection']} currentPosition={1} />
          <Table
            size="middle"
            className="p-6 mt-5 bg-white rounded-lg"
            loading={loading}
            columns={columns}
            dataSource={dataSource || []}
            selectedRowKeys={selectedRows?.map((el) => el.key)}
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
                history.push('/super-user/participants/ratee/status-details');
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
    ;
};

AddRateeStep2.propTypes = {
  loading: PropTypes.bool.isRequired,
};

AddRateeStep2.defaultProps = {};

export default AddRateeStep2;
