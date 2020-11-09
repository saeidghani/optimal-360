import React from 'react';
// import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import MainLayout from '../../Common/Layout';
import Dropdown from '../../Common/Dropdown';
import StatusOverview from './StatusOverview';
import StatusDetails from './StatusDetails';
import RatersEmail from './RatersEmail';
import Result from './Result';
import { useParams, useHistory } from 'react-router-dom';

const Ratee = ({ loading, fetchStatusDetails, statusDetails, raters, fetchRaters }) => {
  const history = useHistory();
  const { tab } = useParams() || 'status-overview';
  const { TabPane } = Tabs;
  const dropDownOptions = [
    { title: 'Top Leadership', value: 1 },
    { title: 'Top Leadership2', value: 2 },
    { title: 'Top Leadership3', value: 3 },
  ];
  const tabs = [
    {
      title: 'Status Overview',
      key: 'status-overview',
      component: <StatusOverview loading={loading} />,
    },
    {
      title: 'Status Details',
      key: 'status-details',
      component: (
        <StatusDetails
          fetchStatusDetails={fetchStatusDetails}
          statusDetails={statusDetails}
          loading={loading}
        />
      ),
    },
    {
      title: 'Rates Email',
      key: 'raters-email',
      component: (
        <RatersEmail
          loading={loading}
          raters={raters}
          fetchRaters={fetchRaters}
        />
      ),
    },
    {
      title: 'Results',
      key: 'result',
      component: <Result loading={loading} />,
    },
  ];

  function tabChangeCallback(key) {
    history.push(`/super-user/participants/ratee/${key}`);
  }

  return (
    <MainLayout contentClass="pl-21 pr-6 py-4" title="Super User" titleClass="my-2" hasBreadCrumb>
      <div className="grid grid-cols-7 mt-3 mb-10">
        <h2 className="col-start-1 my-6 pt-6 pl-3 font-medium text-base">Survey Group</h2>
        <Dropdown
          className="c-autocomplete col-start-1 w-full"
          showSearch
          value={1}
          type="gray"
          options={dropDownOptions}
        />
      </div>
      <Tabs defaultActiveKey={tab} onChange={tabChangeCallback}>
        {tabs.map(({ title, key, component }) => (
          <TabPane tab={title} key={key}>
            {component}
          </TabPane>
        ))}
      </Tabs>
    </MainLayout>
  );
};

Ratee.propTypes = {
  loading: PropTypes.bool.isRequired,
  statusDetails: PropTypes.shape({}),
  raters: PropTypes.shape({}),
  fetchStatusDetails: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
};

Ratee.defaultProps = {
  statusDetails: {},
  raters: {},
};

export default Ratee;
