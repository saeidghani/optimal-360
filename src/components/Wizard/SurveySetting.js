import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import moment from 'moment';

import { useQuery } from '../../hooks/useQuery';

import Menu from './Helper/Menu';

import MainLayout from '../Common/Layout';
import Steps from '../Common/Steps';
import DatePicker from '../Common/DatePicker';
import Table from '../Common/Table';
import Button from '../Common/Button';
import Input from '../Common/Input';
import Checkbox from '../Common/Checkbox';
import InputNumber from '../Common/InputNumber';

const SurveySetting = ({
  surveySettings,
  fetchSurveySettings,
  fetchSurveyGroups,
  setSurveySettings,
  loading,
  surveyGroups,
}) => {
  const [parsedQuery] = useQuery();
  const { projectId, surveyGroupId } = parsedQuery;
  const { surveySetting = {}, raterGroups = {}, surveyModeInUserDashboard = {} } = surveySettings;

  const getInitialData = () => {
    return raterGroups?.length > 0
      ? raterGroups.map((el, i) => ({ ...el, key: el.id.toString(), remove: '', index: i }))
      : [];
  };

  const [dataSource, setDataSource] = React.useState(() => getInitialData());

  React.useEffect(() => {
    setDataSource(() => getInitialData());
  }, [projectId, surveyGroupId]);

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

  React.useEffect(() => {
    fetchSurveyGroups(projectId);

    if (surveyGroupId) {
      fetchSurveySettings(surveyGroupId);
    }
  }, [projectId, surveyGroupId, fetchSurveyGroups, fetchSurveySettings]);

  // const [dataSource, setDataSource] = React.useState(() => [
  //   {
  //     key: '1',
  //     abbr: 'SF',
  //     name: 'Self',
  //     minRater: 1,
  //     includeAverage: false,
  //     remove: '',
  //   },
  // ]);

  const updateTable = (key, value, id) => {
    const newData = [...dataSource];

    const oldItem = newData.find((item) => item.key * 1 === id * 1);
    oldItem[key] = value;

    setDataSource(newData);
  };

  const removeTableRow = (key) => {
    const newDate = [...dataSource];
    const foundIndex = newDate.findIndex((item) => item.key === key);

    newDate.splice(foundIndex, 1);

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
        includeAverage: false,
        remove: '',
      },
    ]);
  };

  const columns = [
    {
      title: 'abbr.',
      key: 'abbr',
      render: (value, { key }) => (
        <Input
          inputClass="uppercase"
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
          inputClass="capitalize"
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
          onChange={(e) => {
            const val = e.target.value;

            updateTable('minRater', Number.isInteger(val * 1) ? val * 1 : val, key);
          }}
          value={value.toString()}
          placeholder="Min Raters"
        />
      ),
    },
    {
      title: 'Include Average',
      key: 'includeAverage',
      render: (value, { key, index }) => (
        <div style={{ minWidth: '80px' }} className="justify-center items-center">
          {index !== 0 && (
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
      render: (_, { key, index }) => (
        <div style={{ minWidth: '80px' }} className="justify-center items-center">
          {index !== 0 ? (
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
        <Menu items={surveyGroups?.data} />

        <div className="w-full px-6 pt-6 ">
          <Steps currentPosition={0} className="w-full" />

          <Formik
            enableReinitialize
            initialValues={{
              // surveySetting: {
              //   startDate: '',
              //   endDate: '',
              //   raterInvalidation: 0,
              //   itemInvalidation: 0,
              // },
              surveySetting,
              surveyModeInUserDashboard,
              // surveyModeInUserDashboard: {
              //   individual: false,
              //   ratingGroup: false,
              //   allRatees: false,
              // },
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              setSurveySettings({ ...values, raterGroups: dataSource, surveyGroupId });
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
                          startDate: moment(startDate).format('YYYY-MM-DD'),
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
                          endDate: moment(endDate).format('YYYY-MM-DD'),
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
                      value={values.surveySetting?.raterInvalidation}
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
                      value={values.surveySetting?.itemInvalidation}
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
                    loading={loading}
                    rowSelection={false}
                    pagination={false}
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
                  {dataSource.find(
                    (item) => item.minRater !== '' && typeof item.minRater !== 'number',
                  ) && <p className="text-red-500 mt-2">Min. Raters values must be numbers</p>}

                  <p className="mt-16 mb-10">Select rating group for user dashboard :</p>

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
                    checked={values.surveyModeInUserDashboard.ratingGroup}
                    onChange={(ratingGroup) =>
                      setFieldValue('surveyModeInUserDashboard', {
                        ...values.surveyModeInUserDashboard,
                        ratingGroup,
                      })
                    }
                    className="mb-6"
                  >
                    Pre-defined Rating Group (default Self, Mgr, Peer, etc.)
                  </Checkbox>

                  <Checkbox
                    checked={values.surveyModeInUserDashboard.allRatees}
                    onChange={(allRatees) =>
                      setFieldValue('surveyModeInUserDashboard', {
                        ...values.surveyModeInUserDashboard,
                        allRatees,
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

SurveySetting.propTypes = {
  fetchSurveyGroups: PropTypes.func.isRequired,
  fetchSurveySettings: PropTypes.func.isRequired,
  setSurveySettings: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveyGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  surveySettings: PropTypes.shape({
    raterGroups: PropTypes.arrayOf(PropTypes.object),
    surveyModeInUserDashboard: PropTypes.shape({}),
    surveySetting: PropTypes.shape({}),
  }),
};

SurveySetting.defaultProps = {
  surveyGroups: {
    data: [],
  },
  surveySettings: {
    raterGroups: [],
    surveyModeInUserDashboard: {},
    surveySetting: {},
  },
};

export default SurveySetting;
