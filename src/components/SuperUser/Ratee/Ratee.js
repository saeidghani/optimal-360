import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { useQuery, useSurveyGroup, useTabs } from '../../../hooks';

import StatusOverview from './StatusOverview';
import StatusDetails from './StatusDetails';
import RatersEmail from './RatersEmail';
import Result from './Result';

import { Tabs } from 'antd';
import MainLayout from '../../Common/Layout';
import Dropdown from '../../Common/Dropdown';

const Ratee = (
  {
    loading,
    summary,
    completionRate,
    fetchSummary,
    fetchCompletionRate,
    fetchStatusDetails,
    removeRateeRaters,
    changeAssessmentsStatus,
    exportSurveyGroupRaters,
    statusDetails,
    raters,
    emailOptions,
    fetchRaters,
    sendEmail,
    fetchEmailOptions,
    importRelations,
    exportRelations,
    fetchIndividualReports,
    fetchGroupReports,
    exportDemographicData,
    individualReports,
    groupReports,
  },
) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const history = useHistory();
  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();
  const [currentTab, setTab] = useTabs(['status-overview', 'status-details', 'raters-email', 'result']);
  const { TabPane } = Tabs;

  const dropDownOptions = React.useMemo(
    () => (surveyGroups?.data || []).map((elm) => ({ title: elm.name, value: elm.id, label: elm.name })),
    // eslint-disable-next-line
    [surveyGroups.timeStamp],
  );
  React.useEffect(() => {
    if (!parsedQuery?.projectId || !parsedQuery?.surveyGroupId) {
      history.push('/');
    }
  }, []);

  function tabChangeCallback(key) {
    setTab(key);
  }

  return (
    <MainLayout contentClass="pl-21 pr-6 py-4" title="Super User" titleClass="my-2" hasBreadCrumb>
      <div className="grid grid-cols-7 mt-3 mb-10">
        <h2 className="col-start-1 my-6 pt-6 pl-3 font-medium text-base">Survey Group</h2>
        {parsedQuery?.projectId && (
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
        )
        }

      </div>

      <Tabs
        defaultActiveKey={currentTab}
        onChange={tabChangeCallback}
        className="all-ratee-tabs"
      >
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
            removeRateeRaters={removeRateeRaters}
            changeAssessmentsStatus={changeAssessmentsStatus}
            statusDetails={statusDetails}
            importRelations={importRelations}
            exportRelations={exportRelations}
            loading={loading}
          />
        </TabPane>
        <TabPane tab="Raters Email" key="raters-email">
          <RatersEmail
            loading={loading}
            raters={raters}
            fetchRaters={fetchRaters}
            emailOptions={emailOptions}
            sendEmail={sendEmail}
            fetchEmailOptions={fetchEmailOptions}
            exportSurveyGroupRaters={exportSurveyGroupRaters}
          />
        </TabPane>
        <TabPane tab="Results" key="result">
          <Result
            loading={loading}
            fetchIndividualReports={fetchIndividualReports}
            fetchGroupReports={fetchGroupReports}
            exportDemographicData={exportDemographicData}
            individualReports={individualReports}
            groupReports={groupReports}
          />
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
  changeAssessmentsStatus: PropTypes.func.isRequired,
  removeRateeRaters: PropTypes.func.isRequired,
  exportSurveyGroupRaters: PropTypes.func.isRequired,
  importRelations: PropTypes.func.isRequired,
  exportRelations: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  fetchEmailOptions: PropTypes.func.isRequired,
  fetchIndividualReports: PropTypes.func.isRequired,
  fetchGroupReports: PropTypes.func.isRequired,
  exportDemographicData: PropTypes.func.isRequired,
  individualReports: PropTypes.shape({}),
  groupReports: PropTypes.shape({}),
};

Ratee.defaultProps = {
  summary: {},
  completionRate: {},
  statusDetails: {},
  raters: {},
  emailOptions: {},
};

export default Ratee;
