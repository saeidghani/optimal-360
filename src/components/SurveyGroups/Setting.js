import React from 'react';
// import PropTypes from 'prop-types';
import MainLayout from '../Common/Layout';
import RadioBtn from '../Common/RadioBtn';
import Input from '../Common/Input';
import Button from '../Common/Button';

const Setting = () => (
  <MainLayout hasBreadCrumb={false} contentClass="items-center justify-around p-0">
    <div className="bg-white rounded-7px  sm:px-16 sm:pb-18 sm:pt-22 px-4 py-6">
      <form>
        <Input
          name="Client Dashboard Login ID"
          labelText="Client Dashboard Login ID"
          placeholder="Client@gmail.com"
          wrapperClassName="c-min-w-form-input mb-6"
        />
        <Input
          wrapperClassName="c-min-w-form-input mb-6"
          name="Client Dashboard Password"
          labelText="Client Dashboard Password"
          placeholder="8 Character"
          extrainfoLink="#"
          extrainfoText="Generate Password"
        />
        <RadioBtn className="mb-14" />
        <Button text="Save" className="ml-auto c-force-padding-y-px px-8" />
      </form>
    </div>
  </MainLayout>
);

// Setting.propTypes = {};

// Setting.defaultProps = {};

export default Setting;
