import React from 'react';
import PropTypes from 'prop-types';

import { EditOutlined } from '@ant-design/icons';

import Button from '../../Common/Button';
import MainLayout from '../../Common/Layout';
import Loading from '../../Common/Loading';
import Table from '../../Common/Table';

const Models = ({ loading }) => {
  const data = [
    {
      id: 2020060422,
      SurveyGroup: 'Top Leadership',
    },
    {
      id: 2020060421,
      SurveyGroup: 'Managers',
    },
    {
      id: 2020060424,
      SurveyGroup: 'High Potentials',
    },
    {
      id: 2020060423,
      SurveyGroup: 'Setting Direction',
    },
    {
      id: 2020060425,
      SurveyGroup: 'Delivering Results',
    },
    {
      id: 2020060428,
      SurveyGroup: 'Improving & Innovating',
    },
    {
      id: 2020060428,
      SurveyGroup: 'Managers',
    },
    {
      id: 2020060428,
      SurveyGroup: 'High Potentials',
    },
    {
      id: 2020060428,
      SurveyGroup: 'Setting Direction',
    },
    {
      id: 2020060428,
      SurveyGroup: 'Delivering Results',
    },
  ];

  const columns = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'SurveyGroup',
      title: 'Survey Group',
      dataIndex: 'SurveyGroup',
    },
    {
      // key: 'action',
      width: 100,
      render: () => (
        <div className="flex items-center">
          <Button
            className="flex items-center mr-3.5"
            text="Export Exel File"
            icon="FileExcelOutlined"
            size="middle"
            textSize="md"
            textClassName="mr-2"
            iconPosition="right"
            type="gray"
          />
          <EditOutlined className="text-xl text-primary-500 cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <MainLayout
      hasBreadCrumb
      title="Pre Defined Data"
      titleClass="mb-2"
      contentClass="py-4"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <Loading visible={loading} />

      <div className="pl-15 mt-8">
        <div className="px-6">
          <div className="bg-white px-6 py-5">
            <div className="flex justify-end">
              <Button
                className="flex items-center mr-3.5"
                text="Edit Project"
                // icon="PlusCircleOutlined"
                // textClassName="mr-2"
                size="middle"
                textSize="md"
                // iconPosition="right"
                type="gray"
              />
              <Button
                className="flex items-center mr-3.5"
                text="Export Exel File"
                icon="FileExcelOutlined"
                textClassName="mr-2"
                size="middle"
                textSize="md"
                iconPosition="right"
                type="gray"
              />
            </div>
            <div>
              <Table
                size="middle"
                loading={loading}
                columns={columns}
                dataSource={data}
                rowSelection={false}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

Models.propTypes = {
  loading: PropTypes.bool.isRequired,
};

Models.defaultProps = {};

export default Models;
