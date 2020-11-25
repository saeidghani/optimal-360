import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import { useTabs } from '../../../hooks';

import ReportContent from '../../../containers/SuperUser/Ratee/helper/ReportContent';
import PastResult from '../../../containers/SuperUser/Ratee/helper/PastResult';

const ReportSetting = ({
                         loading,
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
    <div className="p-6 mt-5 bg-white rounded-lg shadow borderless-tab">
      <Tabs
        defaultActiveKey={currentTab}
        onChange={tabChangeCallback}
        className="relative contents"
        tabBarStyle={{ color: '#262626' }}
      >
        <TabPane tab={allTabs[0].title} key={allTabs[0].key} />
        <TabPane tab={allTabs[1].title} key={allTabs[1].key} />
      </Tabs>
      {currentTab === allTabs[0].key ? (
        <ReportContent loading={loading} />
      ) : (
        <PastResult loading={loading} />
      )}
    </div>
  );
};

ReportSetting.propTypes = {
  loading: PropTypes.bool.isRequired,
};

ReportSetting.defaultProps = {};

export default ReportSetting;
