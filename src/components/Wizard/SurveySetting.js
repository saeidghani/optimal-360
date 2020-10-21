import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import { useQuery } from '../../hooks/useQuery';

import Menu from './Helper/Menu';
import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';

import MainLayout from '../Common/Layout';
import Steps from '../Common/Steps';
import DatePicker from '../Common/DatePicker';
import Table from '../Common/Table';
import Button from '../Common/Button';
import Input from '../Common/Input';
import Checkbox from '../Common/Checkbox';
import InputNumber from '../Common/InputNumber';
import Loading from '../Common/Loading';

const SurveySetting = ({
  surveySettings,
  fetchSurveySettings,
  fetchSurveyGroups,
  setSurveySettings,
  loading,
  surveyGroups,
}) => {
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
    surveyModeInUserDashboard: yup
      .object({
        individual: yup.bool(),
        group: yup.bool(),
        all: yup.bool(),
      })
      .test('surveyModeInUserDashboard', 'You Must Specify At least One Rating Group', (vals) => {
        const containsAtLeastOneTrueValue = Object.values(vals).find(
          (el) => typeof el === 'boolean' && el !== false,
        );
        return containsAtLeastOneTrueValue;
      }),
  });

  const formRef = React.useRef();
  const history = useHistory();
  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [isFormDone, setIsFormDone] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');
  const [parsedQuery, , setQuery] = useQuery();
  const { projectId, surveyGroupId } = parsedQuery;

  const {
    surveySetting = {
      startDate: '',
      endDate: '',
      raterInvalidation: 0,
      itemInvalidation: 0,
    },
    raterGroups = [
      {
        key: '1',
        abbr: 'SF',
        name: 'Self',
        minRater: 1,
        includeAverage: false,
        remove: '',
        index: 1,
      },
    ],
    surveyModeInUserDashboard = {
      individual: false,
      ratingGroup: false,
      allRatees: false,
    },
  } = surveySettings || {};

  const surveyGroupsStringified = JSON.stringify(surveyGroups.data);
  React.useEffect(() => {
    const sortedArr = surveyGroups?.data?.sort((el1, el2) => el1.id - el2.id) || [];

    const firstSurveyGroupId = sortedArr?.length > 0 ? sortedArr[0].id : '';

    const isURLSurveyGroupValid = !!sortedArr.find(
      (el) => el.id?.toString() === parsedQuery?.surveyGroupId?.toString(),
    );

    if (
      !isURLSurveyGroupValid &&
      firstSurveyGroupId &&
      firstSurveyGroupId !== parsedQuery?.surveyGroupId
    ) {
      setQuery({ surveyGroupId: firstSurveyGroupId });
    }
    // eslint-disable-next-line
  }, [surveyGroupsStringified]);

  React.useEffect(() => {
    fetchSurveyGroups(projectId);
  }, [projectId, surveyGroupId, fetchSurveyGroups]);

  React.useEffect(() => {
    if (surveyGroupId) {
      fetchSurveySettings(surveyGroupId);
    }

    if (formRef?.current) {
      // reset form state when surveyGroup changes
      // happens when user decides to discard current settings and changes currentSurveyGroup
      formRef.current.setTouched({});
      formRef.current.setErrors({});
      formRef.current.setValues({ surveySetting, surveyModeInUserDashboard });
    }
    // eslint-disable-next-line
  }, [fetchSurveySettings, surveyGroupId]);

  const raterGroupsStringified = JSON.stringify(raterGroups);
  const getInitialData = React.useCallback(() => {
    return raterGroups?.length > 0
      ? raterGroups.map((el, i) => ({
          ...el,
          key: el.id?.toString() || '9999',
          remove: '',
          index: i,
        }))
      : [];

    // eslint-disable-next-line
  }, [raterGroupsStringified]);

  const [dataSource, setDataSource] = React.useState(() => getInitialData());

  React.useEffect(() => {
    setDataSource(() => getInitialData());
  }, [projectId, surveyGroupId, getInitialData]);

  React.useEffect(() => {
    const validateForm = async () => {
      try {
        const errorObj = await formRef.current.validateForm(formRef?.current?.values);

        if (errorObj && Object.values(errorObj).length > 0) {
          throw errorObj;
        } else {
          setIsFormDone(true);
        }
      } catch (errorObj) {
        formRef.current.setErrors(errorObj);
        formRef.current.setTouched(errorObj);

        if (selectedSurveyGroupKey !== parsedQuery?.surveyGroupId) setSurveyGroupModal(true);
      }
    };

    if (selectedSurveyGroupKey && formRef?.current) {
      validateForm(formRef?.current?.values);
    }

    // eslint-disable-next-line
  }, [selectedSurveyGroupKey]);

  React.useEffect(() => {
    if (isFormDone && selectedSurveyGroupKey) {
      setQuery({ surveyGroupId: selectedSurveyGroupKey });
      setIsFormDone(false);
      setSurveyGroupModal(false);
    }
  }, [isFormDone, selectedSurveyGroupKey, setQuery]);

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
          inputClass="uppercase border border-antgray-300"
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
          inputClass="capitalize border border-antgray-300"
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
          inputClass="border border-antgray-300"
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
            <Checkbox
              labelClass="text-body text-sm"
              checked={!!value}
              onChange={(val) => updateTable('includeAverage', val, key)}
            >
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

  const currentSurveyGroupName =
    surveyGroups?.data?.find((el) => el.id.toString() === parsedQuery?.surveyGroupId?.toString())
      ?.name || '';

  return (
    <MainLayout
      hasBreadCrumb
      title="Survey Group"
      titleClass="mb-2"
      contentClass="py-4"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <div className="bg-white grid grid-cols-12 pl-15">
        <Loading visible={loading} />

        <ChangeSurveyGroupModal
          handleOk={() => {
            setIsFormDone(true);
          }}
          handleCancel={() => {
            setSelectedSurveyGroupKey('');
            setSurveyGroupModal(false);
          }}
          currentSurveyGroup={currentSurveyGroupName}
          visible={surveyGroupModal}
        />

        <Menu
          onClick={(key) => setSelectedSurveyGroupKey(key)}
          isFormDone={isFormDone}
          items={surveyGroups?.data}
          className="col-span-2"
        />

        <div className="px-6 py-5 col-start-3 col-span-10">
          <Steps currentPosition={1} />

          <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={{
              surveySetting,
              surveyModeInUserDashboard,
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              await setSurveySettings({
                ...values,
                surveySetting: {
                  ...values.surveySetting,
                  startDate: moment(values.surveySetting?.startDate).toISOString(),
                  endDate: moment(values.surveySetting?.endDate).toISOString(),
                },
                raterGroups: dataSource,
                surveyGroupId,
              });

              const params = history?.location?.search;

              history.push(`/super-user/new-project/email-setting${params}`);
            }}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-12 my-18 xl:pr-24 md:pr-12 xl-pr-0">
                  <div
                    className="xl:col-span-4 lg:col-span-5
                    md:col-span-8 col-span-11 mb-8 lg:mb-0"
                  >
                    <h1 className="text-xl text-secondary mb-6">Date</h1>

                    <div className="flex flex-row justify-between items-center">
                      <DatePicker
                        size="large"
                        onChange={(startDate) =>
                          setFieldValue('surveySetting', {
                            ...values.surveySetting,
                            startDate,
                          })
                        }
                        value={values.surveySetting?.startDate}
                        label="Start Date"
                        className="w-full"
                        wrapperClassName="mr-12"
                        errorMessage={
                          touched.surveySetting?.startDate && errors.surveySetting?.startDate
                        }
                      />

                      <DatePicker
                        size="large"
                        className="w-full"
                        label="End Date"
                        value={values.surveySetting?.endDate}
                        onChange={(endDate) =>
                          setFieldValue('surveySetting', {
                            ...values.surveySetting,
                            endDate,
                          })
                        }
                        errorMessage={
                          touched.surveySetting?.endDate && errors.surveySetting?.endDate
                        }
                      />
                    </div>
                  </div>

                  <div
                    className="xl:col-start-7 xl:col-span-4 lg:col-start-7 lg:col-span-5
                    md:col-span-8 col-span-11"
                  >
                    <h1 className="text-xl text-secondary mb-6">Refrence Guide</h1>

                    <div className="flex flex-row justify-between items-center">
                      <InputNumber
                        size="large"
                        wrapperClassName="mr-12"
                        className="w-full"
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
                        size="large"
                        className="w-full"
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
                </div>

                <div className="flex flex-col xl:pr-24 md:pr-12">
                  <h1 className="text-xl text-secondary mb-8">Rater Settings</h1>

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

                  <div className="flex flex-col mt-16 ">
                    <p className="mb-10 text-secondary text-sm">
                      Select rating group for user dashboard :
                    </p>

                    <Checkbox
                      checked={values.surveyModeInUserDashboard.individual}
                      onChange={(individual) =>
                        setFieldValue('surveyModeInUserDashboard', {
                          ...values.surveyModeInUserDashboard,
                          individual,
                        })
                      }
                      className="ml-0 mb-6"
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
                      className="ml-0 mb-6"
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
                      className="ml-0"
                    >
                      All Ratees
                    </Checkbox>

                    {touched.surveyModeInUserDashboard && errors.surveyModeInUserDashboard && (
                      <p className="text-red-500">{errors.surveyModeInUserDashboard}</p>
                    )}

                    <div className="mt-17 pb-22  flex justify-end">
                      <Button type="link" text="Back" className="px-8 py-3" />
                      <Button onClick={handleSubmit} text="Next" className="px-8 py-3" />
                    </div>
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
    timeStamp: PropTypes.number,
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
