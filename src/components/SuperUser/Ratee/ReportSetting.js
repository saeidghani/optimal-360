import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import { useTabs } from '../../../hooks';

import ReportContent from '../../../containers/SuperUser/Ratee/helper/ReportContent';
import PastResult from '../../../containers/SuperUser/Ratee/helper/PastResult';

const ReportSetting = ({
                         loading,
                         reportSetting,
                         fetchReportSetting,
                         setReportSetting,
                       }) => {
  const allTabs = [
    {
      title: 'Report Content',
      key: 'report-content',
    },
    {
      title: 'Past Result',
      key: 'past-result',
    },
  ];
  const [currentTab, setTab] = useTabs('report-by', allTabs.map((eachTab) => eachTab.key));

  const { TabPane } = Tabs;

  function tabChangeCallback(key) {
    setTab(key);
  }

  return (
    <div className="p-6 mt-5 bg-white rounded-lg shadow borderless-tab min-h-screen	">
      <Tabs
        defaultActiveKey={currentTab}
        onChange={tabChangeCallback}
        className="relative contents"
        tabBarStyle={{ color: '#262626' }}
      >
        <TabPane tab={allTabs[0].title} key={allTabs[0].key}>
          <ReportContent
            loading={loading}
            reportSetting={reportSetting}
            fetchReportSetting={fetchReportSetting}
            setReportSetting={setReportSetting}
          />

        </TabPane>
        <TabPane tab={allTabs[1].title} key={allTabs[1].key}>
          <PastResult
            loading={loading}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

ReportSetting.propTypes = {
  loading: PropTypes.bool.isRequired,
  reportSetting: PropTypes.shape({}),
  fetchReportSetting: PropTypes.func.isRequired,
  setReportSetting: PropTypes.func.isRequired,
};

ReportSetting.defaultProps = {
  reportSetting: {},
};

export default ReportSetting;
