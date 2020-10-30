import React from 'react';

import Layout from './Helper/Layout';

import Dropdown from '../Common/Dropdown';
import Button from '../Common/Button';
import RadioGroup from '../Common/RadioGroup';

const Information = () => {
  const radioGroupOptions = [
    { title: 'Male', value: 1 },
    { title: 'Female', value: 2 },
  ];

  const selectOptions = [
    {
      id: 1,
      title: 'Employment location',
      dropdownOptions: [
        { title: 'Leadership Development1', value: 1 },
        { title: 'Leadership Development2', value: 2 },
        { title: 'Leadership Development3', value: 3 },
      ],
    },
    {
      id: 5,
      title: 'Your sector',
      dropdownOptions: [
        { title: 'Leadership Development1', value: 1 },
        { title: 'Leadership Development2', value: 2 },
        { title: 'Leadership Development3', value: 3 },
      ],
    },
    {
      id: 3,
      title: 'Your industry',
      dropdownOptions: [
        { title: 'Leadership Development1', value: 1 },
        { title: 'Leadership Development2', value: 2 },
        { title: 'Leadership Development3', value: 3 },
      ],
    },

    {
      id: 4,
      title: 'Your job function',
      dropdownOptions: [
        { title: 'Leadership Development1', value: 1 },
        { title: 'Leadership Development2', value: 2 },
        { title: 'Leadership Development3', value: 3 },
      ],
    },
    {
      id: 5,
      title: 'Your job level',
      dropdownOptions: [
        { title: 'Leadership Development1', value: 1 },
        { title: 'Leadership Development2', value: 2 },
        { title: 'Leadership Development3', value: 3 },
      ],
    },

    {
      id: 6,
      title: 'Your highest education attained',
      dropdownOptions: [
        { title: 'Leadership Development1', value: 1 },
        { title: 'Leadership Development2', value: 2 },
        { title: 'Leadership Development3', value: 3 },
      ],
    },
    {
      id: 7,
      title: 'Your age group',
      dropdownOptions: [
        { title: 'Leadership Development1', value: 1 },
        { title: 'Leadership Development2', value: 2 },
        { title: 'Leadership Development3', value: 3 },
      ],
    },
    {
      id: 8,
      title: 'Length of service in your current role',
      dropdownOptions: [
        { title: 'Leadership Development1', value: 1 },
        { title: 'Leadership Development2', value: 2 },
        { title: 'Leadership Development3', value: 3 },
      ],
    },
  ];

  return (
    <Layout title="Information">
      <div className="text-left text-heading hidden md:block">Information</div>
      <h1 className="text-xl text-heading font-medium text-lg mt-1 md:mt-12">
        Tell us more about yourself!
      </h1>
      <p className="text-body tex-base mt-4">
        The information on this page is optional for you to fill;
      </p>
      <p className="text-gray-500 mt-8 text-base text-body opacity-75 font-normal leading-6">
        information from this page would help us in research purposes where no individual
        information will be identified nor disclosed. We highly encourage your participation in our
        research.
      </p>
      <RadioGroup items={radioGroupOptions} value={2} className="mt-4" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 mt-10">
        {selectOptions.map((item) => (
          <div key={item.id} className="mt-8 ">
            <div className="text-sm text-body mb-3">{item.title}</div>
            <Dropdown
              className="c-autocomplete w-full"
              showSearch
              options={item.dropdownOptions}
              placeholder="Select"
            />
          </div>
        ))}
      </div>
      <Button className="w-full mt-12 md:w-auto md:ml-auto" text="Next" />
    </Layout>
  );
};

export default Information;
