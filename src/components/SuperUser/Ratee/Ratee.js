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

import { useQuery, useTabs, useSurveyGroup } from '../../../hooks';

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
    emailOptions,
    fetchRaters,
    fetchEmailOptions,
  },
) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();
  const [currentTab, setTab] = useTabs(['status-overview', 'status-details', 'raters-email', 'result']);
  const { TabPane } = Tabs;

  const dropDownOptions = React.useMemo(
    () => (surveyGroups?.data || []).map((elm) => ({ title: elm.name, value: elm.id, label: elm.name })),
    // eslint-disable-next-line
    [surveyGroups.timeStamp],
  );

  function tabChangeCallback(key) {
    setTab(key);
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

      <Tabs defaultActiveKey={currentTab} onChange={tabChangeCallback}>
        <TabPane tab="Status Overview" key="status-overview">
          <StatusOverview
            summary={summary}
            completionRate={completionRate}
            fetchSummary={fetchSummary}
            fetchCompletionRate={fetchCompletionRate}
            loading={loading}
          />
        </TabPane>
        <TabPane tab="Status Details" key="status-details">
          <StatusDetails
            fetchStatusDetails={fetchStatusDetails}
            statusDetails={statusDetails}
            loading={loading}
          />
        </TabPane>
        <TabPane tab="Rates Email" key="raters-email">
          <RatersEmail
            loading={loading}
            raters={raters}
            fetchRaters={fetchRaters}
            emailOptions={emailOptions}
            fetchEmailOptions={fetchEmailOptions}
          />
        </TabPane>
        <TabPane tab="Results" key="result">
          <Result loading={loading} />
        </TabPane>
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
  emailOptions: PropTypes.shape({}),
  fetchSummary: PropTypes.func.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,
  fetchStatusDetails: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  fetchEmailOptions: PropTypes.func.isRequired,
};

Ratee.defaultProps = {
  summary: {},
  completionRate: {},
  statusDetails: {},
  raters: {},
  emailOptions: {},
};

export default Ratee;
