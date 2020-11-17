import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Common/Dropdown';
import Tabs from '../Common/Tabs';

import Layout from './Helper/Layout';
import ButtonsTab from './Helper/ButtonsTab';
import OverallCompletion from './Helper/OverallCompletion';
import RateCards from './Helper/RateCards';

const Dashboard = ({ loading, completionRate, fetchCompletionRate }) => {
  const [project, setProject] = React.useState('');

  useEffect(() => {
    fetchCompletionRate(1);
  }, []);

  const dropdownOptions = [
    { title: 'Leadership Development1', value: 1 },
    { title: 'Leadership Development2', value: 2 },
    { title: 'Leadership Development3', value: 3 },
  ];

  const tabOptions = [
    { title: 'Top Leadership', key: '1' },
    { title: 'Managers', key: '2' },
    { title: 'High Potentials', key: '3' },
  ];

  return (
    <Layout>
      <div className="grid grid-cols-12 mb-10 mt-8">
        <div className="col-start-1 col-span-6 text-base text-body mb-3">Select Project</div>
        <Dropdown
          className="c-autocomplete col-start-1 col-span-12
          md:col-start-1 md:col-span-4 lg:col-start-1 lg:col-span-3 w-full"
          showSearch={false}
          type="gray"
          placeholder="Leadership Development"
          value={project}
          handleChange={(val) => setProject(val)}
          options={dropdownOptions}
        />
      </div>
      <div className="md:w-full">
        <Tabs className="md:c-tabs-class" defaultActiveKey="1" tabOptions={tabOptions} />
      </div>
      <ButtonsTab activeButtonKey="" />
      <OverallCompletion />
      <RateCards />
    </Layout>
  );
};

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchCompletionRate: PropTypes.func.isRequired,
  completionRate: PropTypes.shape({}),
};

Dashboard.defaultProps = {
  completionRate: {},
};

export default Dashboard;
