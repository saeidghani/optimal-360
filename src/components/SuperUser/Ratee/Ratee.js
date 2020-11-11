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

import { useSurveyGroup, useQuery } from '../../../hooks';

const Ratee = (
  {
    loading,
    summary,
    completionRate,
    fetchSummary,
    fetchCompletionRate,
    fetchStatusDetails,
    statusDetails,
    raters,
    fetchRaters,
  },
) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();
  const history = useHistory();
  const { tab = 'status-overview' } = useParams() || {};
  const { TabPane } = Tabs;

  const dropDownOptions = React.useMemo(
    () => (surveyGroups?.data || []).map((elm) => ({ title: elm.name, value: elm.id, label: elm.name })),
    // eslint-disable-next-line
    [surveyGroups.timeStamp],
  );

  const tabs = [
    {
      title: 'Status Overview',
      key: 'status-overview',
      component: (
        <StatusOverview
          summary={summary}
          completionRate={completionRate}
          fetchSummary={fetchSummary}
          fetchCompletionRate={fetchCompletionRate}
          surveyGroupId={surveyGroupId}
          loading={loading}
        />
      ),
    },
    {
      title: 'Status Details',
      key: 'status-details',
      component: (
        <StatusDetails
          fetchStatusDetails={fetchStatusDetails}
          statusDetails={statusDetails}
          surveyGroupId={surveyGroupId}
          loading={loading}
        />
      ),
    },
    {
      title: 'Rates Email',
      key: 'raters-email',
      component: (
        <RatersEmail
          surveyGroupId={surveyGroupId}
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
    history.push(`/super-user/participants/ratee/${key}?projectId=${parsedQuery?.projectId}&surveyGroupId=${surveyGroupId}`);
  }

  return (
    <MainLayout contentClass="pl-21 pr-6 py-4" title="Super User" titleClass="my-2" hasBreadCrumb>
      <div className="grid grid-cols-7 mt-3 mb-10">
        <h2 className="col-start-1 my-6 pt-6 pl-3 font-medium text-base">Survey Group</h2>
        <Dropdown
          className="c-autocomplete col-start-1 w-full"
          showSearch={false}
          labelInValue
          value={{ value: surveyGroupId, label: currentSurveyGroupName }}
          handleChange={({ value }) => {
            setQuery({ surveyGroupId: value });
          }}
          type="gray"
          options={dropDownOptions}
          loading={loading}
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
  summary: PropTypes.shape({}),
  completionRate: PropTypes.shape({}),
  statusDetails: PropTypes.shape({}),
  raters: PropTypes.shape({}),
  fetchSummary: PropTypes.func.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,
  fetchStatusDetails: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
};

Ratee.defaultProps = {
  summary: {},
  completionRate: {},
  statusDetails: {},
  raters: {},
};

export default Ratee;
