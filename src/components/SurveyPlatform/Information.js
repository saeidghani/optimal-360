import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Layout from '../Common/SurveyPlatformLayout';

import Dropdown from '../Common/Dropdown';
import Button from '../Common/Button';
import RadioGroup from '../Common/RadioGroup';
import Loading from '../Common/Loading';

import { dynamicMap } from '../../routes/RouteMap';
import {
  employmentLocationOptions,
  sectorOptions,
  industryOptions,
  jobFunctionOptions,
  jobLevelOptions,
  highestEducationAttainedOptions,
  ageGroupOptions,
  lengthOfServiceInCurrentRoleOptions,
} from '../../constants/demographicsData';

const Information = ({ loading, fetchProfile, updateProfile, profile }) => {
  const [selectedSex, setSelectedSex] = React.useState('');
  const [selectItems, setSelectItems] = React.useState({});

  React.useEffect(() => {
    fetchProfile('');
  }, [fetchProfile]);

  React.useEffect(() => {
    const {
      sex,
      employmentLocation,
      sector,
      industry,
      jobFunction,
      jobLevel,
      highestEducation,
      ageGroup,
      lengthOfService,
    } = profile?.data || {};
    setSelectedSex(sex || 'female');
    setSelectItems({
      employmentLocation,
      sector,
      industry,
      jobFunction,
      jobLevel,
      highestEducation,
      ageGroup,
      lengthOfService,
    });
  }, [profile]);

  const history = useHistory();

  const sexOptions = [
    { title: 'Male', value: 'male' },
    { title: 'Female', value: 'female' },
  ];

  const selects = [
    {
      id: 1,
      title: 'Employment location',
      name: 'employmentLocation',
      dropdownOptions: employmentLocationOptions,
    },
    {
      id: 2,
      title: 'Your sector',
      name: 'sector',
      dropdownOptions: sectorOptions,
    },
    {
      id: 3,
      title: 'Your industry',
      name: 'industry',
      dropdownOptions: industryOptions,
    },

    {
      id: 4,
      title: 'Your job function',
      name: 'jobFunction',
      dropdownOptions: jobFunctionOptions,
    },
    {
      id: 5,
      title: 'Your job level',
      name: 'jobLevel',
      dropdownOptions: jobLevelOptions,
    },

    {
      id: 6,
      title: 'Your highest education attained',
      name: 'highestEducation',
      dropdownOptions: highestEducationAttainedOptions,
    },
    {
      id: 7,
      title: 'Your age group',
      name: 'ageGroup',
      dropdownOptions: ageGroupOptions,
    },
    {
      id: 8,
      title: 'Length of service in your current role',
      name: 'lengthOfService',
      dropdownOptions: lengthOfServiceInCurrentRoleOptions,
    },
  ];

  const handleChange = (name, value) => {
    setSelectItems({
      ...selectItems,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const data = { sex: selectedSex, ...selectItems };
    try {
      await updateProfile(data);
      history.push(dynamicMap.surveyPlatform.dashboard());
    } catch (errors) {}
  };

  return (
    <Layout title="Information">
      <Loading visible={loading} />
      <div className="text-left text-heading hidden md:block">Information</div>
      <h1 className="text-xl text-heading font-medium mt-1 md:mt-12">
        Tell us more about yourself!
      </h1>
      <p className="text-body tex-base mt-4">
        The information on this page is optional for you to fill;
      </p>
      <p className="text-gray-500 mt-8 text-base text-body opacity-75 font-normal leading-6">
        Information from this page would help us in research purposes where no individual
        information will be identified nor disclosed. We highly encourage your participation in our
        research.
      </p>
      <RadioGroup
        items={sexOptions}
        onChange={(e) => setSelectedSex(e.target.value)}
        value={selectedSex}
        className="mt-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 mt-10">
        {selects.map((item) => (
          <div key={item.id} className="mt-8 ">
            <div className="text-sm text-body mb-3">{item.title}</div>
            <div className="cursor-pointer">
              <Dropdown
                className="c-autocomplete w-full"
                showSearch={false}
                options={item.dropdownOptions}
                placeholder="Select"
                value={selectItems[item.name]}
                handleChange={(val) => handleChange(item.name, val)}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full mt-12 px-6 md:w-auto md:ml-auto"
        text="Next"
      />
    </Layout>
  );
};

Information.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    data: PropTypes.shape({}),
  }),
};

Information.defaultProps = {
  profile: {},
};

export default Information;
