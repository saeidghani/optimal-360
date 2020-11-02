import React from 'react';
import PropTypes from 'prop-types';

import MainLayout from '../Common/Layout';
import Input from '../Common/Input';
import Button from '../Common/Button';

const ProjectInfo = ({ loading }) => {
  return (
    <MainLayout
      titleClass="mt-3"
      contentClass="py-6 pl-21 pr-6"
      hasBreadCrumb
      title="Organizations"
    >
      <div className="grid grid-cols-12 items-center justify-center min-h-screen">
        <div
          className="col-span-10 col-start-1 md:col-span-8 md:col-start-3
        lg:col-start-4 lg:col-span-6 xl:col-start-5 xl:col-span-4
        rounded-lg sm:px-16 px-4 sm:pb-10 sm:pt-12 py-6 bg-white"
        >
          <h2 className="text-xl font-medium text-heading mb-6">New Organization</h2>
          <Input
            name="organizationName"
            labelText="Organization"
            placeholder="Organization Name"
            wrapperClassName="mb-2"
          />
          <Button text="Upload Logo" textSize="xs" type="gray" className="px-2" />
          <Button
            loading={loading}
            text="Create"
            textSize="base"
            className="ml-auto c-force-padding-y-px px-8 mt-10"
          />
        </div>
      </div>
    </MainLayout>
  );
};

ProjectInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default ProjectInfo;
