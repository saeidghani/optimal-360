import React from 'react';
import Checkbox from '../Common/Checkbox';
import MainLayout from '../Common/Layout';
import Menu from './Menu';
import Steps from '../Common/Steps';
import DatePicker from '../Common/DatePicker';
import Button from '../Common/Button';
import { Table } from 'antd';
import { useHistory } from 'react-router-dom';

const EmailSetting = () => {
  const history = useHistory();
  const array = [1, 2, 3, 4];
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '',
      dataIndex: 'button',
      key: 'button ',
      render: (text) => (
        <button className="border border-primary-500 text-primary-500 text-12px w-19 h-10 flex items-center justify-center rounded-2px float-right mr-6">
          {text}
        </button>
      ),
    },
  ];
  const data = [
    { key: '1', email: 's@mail.com', button: 'View/Edit' },
    { key: '1', email: 's@mail.com', button: 'View/Edit' },
    { key: '1', email: 's@mail.com', button: 'View/Edit' },
    { key: '1', email: 's@mail.com', button: 'View/Edit' },
  ];

  return (
    <MainLayout title="Super User" contentClass="pt-4" titleClass="pl-6">
      <div className="bg-white w-full flex font-sans ">
        <Menu />
        <div className="w-full pl-6 pt-6  ">
          <Steps className="w-full" />
          <div className="mt-16 flex flex-col pr-33">
            <span className="text-secondary text-20px mb-14 ">Email Setting</span>
            {array.map((item) => (
              <div className="flex flex-row items-center mb-3" key={item}>
                <Checkbox />
                <span className=" ml-3 text-12px text-secondary mr-16">
                  Rater verification email
                </span>
                <DatePicker className="w-30 h-10" />
                <Checkbox className="ml-14" />
                <span className=" ml-3 text-12px text-secondary mr-16">Send copy to Admin</span>
              </div>
            ))}
            <button className="mt-3 self-start text-12 text-gray-8 border w-19 border-dashed border-antgray-300 rounded-2px">
              <span className="text-12px px-1 pb-2"> + Add Email</span>
            </button>
          </div>
          <div className="mt-6 flex flex-col  pr-33">
            <span className="text-secondary text-20px mb-10 ">Email Templates</span>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
          <div className="pt-23.5 pb-22 flex justify-end  pr-33">
            <Button
              type="link"
              text="Back"
              className="text-base w-24.5 h-9.5 flex items-center justify-center"
            />
            <Button
              text="Next"
              className="text-base w-24.5 h-9.5 flex items-center justify-center"
              onClick={() => history.push('/super-user/Projects/rater-verification-email')}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmailSetting;
