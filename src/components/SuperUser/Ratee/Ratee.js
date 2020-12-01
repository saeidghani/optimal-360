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
import ReportSetting from './ReportSetting';

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
    // reports
    reportSetting,
    fetchReportSetting,
    setReportSetting,
    importClientCompetencyModel,
    fetchPastResultOptions,
    fetchPastResult,
    setPastResult,
    pastResultOptions,
    pastResult,
  },
) => {
  const history = useHistory();
  const [parsedQuery, query, setQuery] = useQuery();
  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();
  const allTabs = [
    {
      title: 'Status Overview',
      key: 'status-overview',
    },
    {
      title: 'Status Details',
      key: 'status-details',
    },
    {
      title: 'Raters Email',
      key: 'raters-email',
    },
    {
      title: 'Results',
      key: 'result',
    },
    {
      title: 'Report Setting',
      key: 'report-setting',
    },
  ];
  const [currentTab, setTab] = useTabs('tab', allTabs.map((eachTab) => eachTab.key));
  const { TabPane } = Tabs;

  const dropDownOptions = React.useMemo(
    () => (surveyGroups?.data || []).map((elm) => ({ title: elm.name, value: elm.id, label: elm.name })),
    [surveyGroups.timeStamp],
  );

  React.useEffect(() => {
    if (!parsedQuery?.page_number || !parsedQuery?.page_size) {
      setQuery({
        page_number: 1,
        page_size: 10,
      });
    }
  }, [history?.location?.pathname]);

  const tabChangeCallback = (key) => {
    setTab(key);
  };

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

      <Tabs
        defaultActiveKey={currentTab}
        onChange={tabChangeCallback}
        className="all-ratee-tabs"
      >
        <TabPane tab={allTabs[0].title} key={allTabs[0].key}>
          <StatusOverview
            summary={summary}
            completionRate={completionRate}
            fetchSummary={fetchSummary}
            fetchCompletionRate={fetchCompletionRate}
            loading={loading}
          />
        </TabPane>
        <TabPane tab={allTabs[1].title} key={allTabs[1].key}>
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
        <TabPane tab={allTabs[2].title} key={allTabs[2].key}>
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
        <TabPane tab={allTabs[3].title} key={allTabs[3].key}>
          <Result
            loading={loading}
            fetchIndividualReports={fetchIndividualReports}
            fetchGroupReports={fetchGroupReports}
            exportDemographicData={exportDemographicData}
            individualReports={individualReports}
            groupReports={groupReports}
          />
        </TabPane>
        <TabPane tab={allTabs[4].title} key={allTabs[4].key}>
          <ReportSetting
            loading={loading}
            reportSetting={reportSetting}
            fetchReportSetting={fetchReportSetting}
            setReportSetting={setReportSetting}
            importClientCompetencyModel={importClientCompetencyModel}
            fetchPastResultOptions={fetchPastResultOptions}
            fetchPastResult={fetchPastResult}
            setPastResult={setPastResult}
            pastResultOptions={pastResultOptions}
            pastResult={pastResult}
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
  reportSetting: PropTypes.shape({}),
  fetchReportSetting: PropTypes.func.isRequired,
  setReportSetting: PropTypes.func.isRequired,
  importClientCompetencyModel: PropTypes.func.isRequired,
  fetchPastResultOptions: PropTypes.func.isRequired,
  fetchPastResult: PropTypes.func.isRequired,
  setPastResult: PropTypes.func.isRequired,
  pastResultOptions: PropTypes.shape({}),
  pastResult: PropTypes.shape({}),
};

Ratee.defaultProps = {
  summary: {},
  completionRate: {},
  statusDetails: {},
  raters: {},
  emailOptions: {},
  groupReports: {},
  individualReports: {},
  reportSetting: {},
  pastResultOptions: {},
  pastResult: {},
};

export default Ratee;
