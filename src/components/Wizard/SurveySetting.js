import React from 'react';
// import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import MainLayout from '../Common/Layout';
// import Menu from '../Common/Menu';
// import Steps from '../Common/Steps';
import DatePicker from '../Common/DatePicker';
import Table from '../Common/Table';
import Button from '../Common/Button';
import Input from '../Common/Input';
import Checkbox from '../Common/Checkbox';
import InputNumber from '../Common/InputNumber';

const SurveySetting = () => {
  const schema = yup.object({
    surveySetting: yup.object({
      startDate: yup.string().required('Start Date Cannot Be Empty'),
      endDate: yup.string().required('End Date Cannot Be Empty'),
      raterInvalidation: yup
        .number()
        .moreThan(0, 'Rater Invalidation Must Be Greater Than 0')
        .required('Rater Invalidation Cannot Be Empty'),
      itemInvalidation: yup
        .number()
        .moreThan(0, 'Rater Invalidation Must Be Greater Than 0')
        .required('Item Invalidation Cannot Be Empty'),
    }),
    surveyModeInUserDashboard: yup.object({
      individual: yup.bool(),
      group: yup.bool(),
      all: yup.bool(),
    }),
  });

  const [dataSource, setDataSource] = React.useState(() => [
    {
      key: '1',
      abbr: 'SF',
      name: 'Self',
      minRater: '1',
      includeAverage: false,
      remove: '',
    },
  ]);

  const updateTable = (key, value, index) => {
    const newDate = [...dataSource];

    newDate[index - 1][key] = value;

    setDataSource(newDate);
  };

  const removeTableRow = (key) => {
    const newDate = [...dataSource];
    newDate.splice(key * 1 - 1, 1);

    setDataSource(newDate);
  };

  const addTableRow = () => {
    const newKey = dataSource[dataSource.length - 1].key * 1 + 1;

    setDataSource((prevState) => [
      ...prevState,
      {
        key: newKey.toString(),
        abbr: '',
        name: '',
        minRater: '',
        includeAverage: '',
        remove: '',
      },
    ]);
  };

  const columns = [
    {
      title: 'abbr.',
      key: 'abbr',
      // render: ({ value }, { key }) => console.log({ value, key }),
      render: (value, { key }) => (
        <Input
          name="abbr"
          onChange={(e) => updateTable('abbr', e.target.value, key)}
          value={value}
          placeholder="ABBR."
        />
      ),
    },
    {
      title: 'Group Name',
      key: 'name',
      render: (value, { key }) => (
        <Input
          name="name"
          onChange={(e) => updateTable('name', e.target.value, key)}
          value={value}
          placeholder="Group Name"
        />
      ),
    },
    {
      title: 'Min.Raters',
      key: 'minRater',
      render: (value, { key }) => (
        <Input
          name="minRater"
          onChange={(e) => updateTable('minRater', e.target.value, key)}
          value={value}
          placeholder="Min Raters"
        />
      ),
    },
    {
      title: 'Include Average',
      key: 'includeAverage',
      render: (value, { key }) => (
        <div style={{ minWidth: '80px' }} className="justify-center items-center">
          {value !== false && (
            <Checkbox checked={!!value} onChange={(val) => updateTable('includeAverage', val, key)}>
              Include
            </Checkbox>
          )}
        </div>
      ),
    },
    {
      title: '',
      key: 'remove',
      render: (_, { key }) => (
        <div style={{ minWidth: '80px' }} className="justify-center items-center">
          {key * 1 > 1 ? (
            <Button
              onClick={() => removeTableRow(key)}
              type="link"
              className="text-base text-antgray-200"
              icon="DeleteOutlined"
            />
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <MainLayout title="Survey Group" contentClass=" p-0">
      <div className="bg-white w-full flex">
        {/* <Menu /> */}

        <div className="w-full px-6 pt-6 ">
          {/* <Steps className="w-full" /> */}

          <Formik
            initialValues={{
              surveySetting: {
                startDate: '',
                endDate: '',
                raterInvalidation: 0,
                itemInvalidation: 0,
              },
              surveyModeInUserDashboard: {
                individual: false,
                group: false,
                all: false,
              },
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              console.log({ ...values, raterGroups: dataSource });
            }}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <Form>
                <div className="w-full flex mb-18 mt-16 ">
                  <div className="w-1/2">
                    <h1 className="text-20px text-heading mb-6">Date</h1>

                    <DatePicker
                      onChange={(startDate) =>
                        setFieldValue('surveySetting', {
                          ...values.surveySetting,
                          startDate,
                        })
                      }
                      label="Start Date"
                      className="mr-12"
                      errorMessage={
                        touched.surveySetting?.startDate && errors.surveySetting?.startDate
                      }
                    />
                    <DatePicker
                      label="End Date"
                      onChange={(endDate) =>
                        setFieldValue('surveySetting', {
                          ...values.surveySetting,
                          endDate,
                        })
                      }
                      errorMessage={touched.surveySetting?.endDate && errors.surveySetting?.endDate}
                    />
                  </div>

                  <div className="w-1/2">
                    <h1 className="text-20px text-heading mb-6">Refrence Guide</h1>

                    <InputNumber
                      className="mr-12"
                      label="Rater Invalidation"
                      value={values.surveySetting.raterInvalidation}
                      onChange={(raterInvalidation) =>
                        setFieldValue('surveySetting', {
                          ...values.surveySetting,
                          raterInvalidation,
                        })
                      }
                      errorMessage={
                        touched.surveySetting?.raterInvalidation &&
                        errors.surveySetting?.raterInvalidation
                      }
                    />
                    <InputNumber
                      label="Item Invalidation"
                      value={values.surveySetting.itemInvalidation}
                      onChange={(itemInvalidation) =>
                        setFieldValue('surveySetting', {
                          ...values.surveySetting,
                          itemInvalidation,
                        })
                      }
                      errorMessage={
                        touched.surveySetting?.itemInvalidation &&
                        errors.surveySetting?.itemInvalidation
                      }
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-20px text-heading">Rater Settings</h1>

                  <Table
                    rowSelection={false}
                    pagination={false}
                    className="mb-16"
                    columns={columns}
                    dataSource={dataSource}
                    renderHeader={() => (
                      <div className="flex justify-between items-center">
                        <p className="text-14px">Set rater group (limit to 5, including Self):</p>
                        <Button
                          disabled={dataSource.length > 4}
                          onClick={addTableRow}
                          textSize="12px"
                          text="Add Rater Group"
                          type="gray"
                        />
                      </div>
                    )}
                  />

                  <p className="mb-10">Select rating group for user dashboard :</p>

                  <Checkbox
                    checked={values.surveyModeInUserDashboard.individual}
                    onChange={(individual) =>
                      setFieldValue('surveyModeInUserDashboard', {
                        ...values.surveyModeInUserDashboard,
                        individual,
                      })
                    }
                    className="mb-6"
                  >
                    Individual Rater
                  </Checkbox>

                  <Checkbox
                    checked={values.surveyModeInUserDashboard.group}
                    onChange={(group) =>
                      setFieldValue('surveyModeInUserDashboard', {
                        ...values.surveyModeInUserDashboard,
                        group,
                      })
                    }
                    className="mb-6"
                  >
                    Pre-defined Rating Group (default Self, Mgr, Peer, etc.)
                  </Checkbox>

                  <Checkbox
                    checked={values.surveyModeInUserDashboard.all}
                    onChange={(all) =>
                      setFieldValue('surveyModeInUserDashboard', {
                        ...values.surveyModeInUserDashboard,
                        all,
                      })
                    }
                    className="mb-6"
                  >
                    All Ratees
                  </Checkbox>

                  {touched.surveyModeInUserDashboard &&
                    Object.values(touched.surveyModeInUserDashboard).find((el) => !!el) &&
                    !Object.values(values.surveyModeInUserDashboard).find((el) => !!el) && (
                      <p className="text-red-500">You Must Specify At least One Rating Group </p>
                    )}

                  <div className="pt-10 pb-22  flex justify-end">
                    <Button type="link" text="Back" />
                    <Button onClick={handleSubmit} text="Next" />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

// SurveySetting.propTypes = {};

// SurveySetting.defaultProps = {};

export default SurveySetting;
