import React from 'react';
import Checkbox from '../Common/Checkbox';
import MainLayout from '../Common/Layout';
import Menu from './Menu';
import Steps from '../Common/Steps';
import DatePicker from '../Common/DatePicker';
import Button from '../Common/Button';
import { Table } from 'antd';
import { useHistory } from 'react-router-dom';

const RaterVerificationEmail = () => {
  return (
    <MainLayout title="Super User" contentClass="pt-4" titleClass="pl-6">
      <div className="bg-white w-full flex font-sans ">
        <Menu />
        <div className="w-full pl-6 pt-6  ">
          <Steps className="w-full" />
          <div className="mt-16 flex flex-col pr-33"></div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RaterVerificationEmail;
