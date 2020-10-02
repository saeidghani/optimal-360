import React from 'react';
// import PropTypes from 'prop-types';
import { DeleteOutlined } from '@ant-design/icons';
import MainLayout from '../Common/Layout';

import Menu from '../Common/Menu';
import Steps from '../Common/Steps';
import DatePicker from '../Common/DatePicker';
import Table from '../Common/Table';
import Button from '../Common/Button';
import Input from '../Common/Input';
import Checkbox from '../Common/Checkbox';

const SurveySetting = () => {
  const columns = [
    {
      title: 'abbr.',
      dataIndex: 'abbr.',
      key: 'abbr.',
    },
    {
      title: 'Group Name',
      dataIndex: 'Group Name',
      key: 'group-name',
    },
    {
      title: 'Min.Raters',
      dataIndex: 'Min.Raters',
      key: 'min.raters',
    },
    {
      title: 'Include Average',
      dataIndex: 'Include Average',
      key: 'include-average',
    },
    {
      title: '',
      dataIndex: 'remove',
      key: 'remove',
    },
  ];
  const dataSource = [
    {
      key: '1',
      'abbr.': <Input />,
      'group-name': <Input />,
      'min.raters': <Input />,
      'include-average': <Checkbox>Include</Checkbox>,
      remove: <DeleteOutlined />,
    },
  ];
  return (
    <MainLayout title="Survey Group" contentClass=" p-0">
      <div className="bg-white w-full flex">
        <Menu />
        <div className="w-full px-6 pt-6 ">
          <Steps className="w-full" />
          <div className="w-full flex mb-18 mt-16 ">
            <div className="w-1/2">
              <h1 className="text-20px text-heading mb-6">Date</h1>
              <DatePicker labelname="Start Date" className="mr-12" />
              <DatePicker labelname="End Date" />
            </div>
            <div className="w-1/2">
              <h1 className="text-20px text-heading mb-6">Refrence Guide</h1>
              <DatePicker labelname="Rater Invalidation" className="mr-12" />
              <DatePicker labelname="Item Invalidation" />
            </div>
          </div>
          <div>
            <h1 className="text-20px text-heading">Rater Settings</h1>
            <Table
              className="mb-16"
              columns={columns}
              dataSource={dataSource}
              renderHeader={() => (
                <div className="flex justify-between items-center">
                  <p className="text-14px">Set rater group (limit to 5, including Self):</p>
                  <Button textSize="12px" text="Add Rater Group" type="gray" />
                </div>
              )}
            />
            <p className="mb-10">Select rating group for user dashboard :</p>
            <div>
              <Checkbox className="mb-6">Individual Rater</Checkbox>
            </div>
            <div>
              <Checkbox className="mb-6">
                Pre-defined Rating Group (default Self, Mgr, Peer, etc.)
              </Checkbox>
            </div>
            <div>
              <Checkbox className="mb-6">All Ratees</Checkbox>
            </div>

            <div className="pt-10 pb-22  flex justify-end">
              <Button type="link" text="Back" />
              <Button text="Next" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// SurveySetting.propTypes = {};

// SurveySetting.defaultProps = {};

export default SurveySetting;
