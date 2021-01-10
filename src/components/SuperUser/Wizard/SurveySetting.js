import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import { useQuery, useSurveyGroup } from '../../../hooks';
import { dynamicMap } from '../../../routes/RouteMap';

import Menu from './Helper/Menu';
import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';

import MainLayout from '../../Common/Layout';
import Steps from '../../Common/Steps';
import DatePicker from '../../Common/DatePicker';
import Table from '../../Common/Table';
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import Checkbox from '../../Common/Checkbox';
import InputNumber from '../../Common/InputNumber';
import Loading from '../../Common/Loading';

const SurveySetting = ({ surveySettings, fetchSurveySettings, setSurveySettings, loading }) => {
  const schema = yup.object({
    surveySetting: yup.object({
      startDate: yup.string().required('Start date cannot be empty').nullable(),
      endDate: yup.string().required('End date cannot be empty').nullable(),
      itemCaution: yup
        .number()
        .nullable()
        .moreThan(0, 'Item caution must be greater than 0')
        .required('Item caution cannot be empty'),
    }),
    raterGroups: yup.array(
      yup.object({
        abbr: yup.string().required('Abbr cannot be empty'),
        name: yup.string().required('Group name cannot be empty'),
        minRater: yup
          .number()
          .typeError('Min raters must be a number')
          .min(0, 'Min raters must be equal or greater than 0'),
      }),
    ),
    surveyModeInUserDashboard: yup
      .object({
        individual: yup.bool(),
        group: yup.bool(),
        all: yup.bool(),
      })
      .test('surveyModeInUserDashboard', 'You must specify at least one rating group', (vals) => {
        const containsAtLeastOneTrueValue = Object.values(vals).find(
          (el) => typeof el === 'boolean' && el !== false,
        );
        return containsAtLeastOneTrueValue;
      }),
  });

  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();

  const [parsedQuery, query, setQuery] = useQuery();

  const formRef = React.useRef();
  const history = useHistory();
  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');

  const {
    surveySetting = {
      startDate: '',
      endDate: '',
      itemCaution: 0,
    },
    raterGroups = [],
    surveyModeInUserDashboard = {
      individual: false,
      ratingGroup: false,
      allRatees: false,
    },
  } = surveySettings || {};

  React.useEffect(() => {
    if (surveyGroupId) fetchSurveySettings(surveyGroupId);
  }, [surveyGroupId, fetchSurveySettings]);

  const formatRaterGroupItems = (arr) =>
    arr.map((el, i) => ({
      ...el,
      index: i,
      // key: `${i}`,
      remove: '',
      disabled: i < 1,
    }));

  const updateTable = (key, value, id) => {
    const oldValues = formRef?.current?.values || {};
    const newRaterGroups = [...(oldValues?.raterGroups || [])];

    const updateIndex = newRaterGroups.findIndex((el) => el.id * 1 === id * 1);
    newRaterGroups[updateIndex][key] = value;

    formRef.current.setValues({ ...oldValues, raterGroups: formatRaterGroupItems(newRaterGroups) });
  };

  const removeTableRow = (id) => {
    const oldValues = formRef?.current?.values || {};
    const newRaterGroups = [...(oldValues?.raterGroups || [])];

    const removeIndex = newRaterGroups.findIndex((el) => el.id * 1 === id * 1);

    if (newRaterGroups[removeIndex].newlyAddedItem) {
      newRaterGroups.splice(removeIndex, 1);
    } else {
      newRaterGroups[removeIndex].deleted = true;
    }

    formRef.current.setValues({ ...oldValues, raterGroups: formatRaterGroupItems(newRaterGroups) });
  };

  const addTableRow = () => {
    const oldValues = formRef?.current?.values || {};
    const newRaterGroups = [...(oldValues?.raterGroups || [])];

    const ids = newRaterGroups.map((el) => el.id * 1);
    const newId = ids.reduce((acc, cur) => acc + cur, 1);

    const newItem = {
      abbr: '',
      name: '',
      minRater: 0,
      includeAverage: false,
      remove: '',
      id: newId,
      newlyAddedItem: true,
    };
    newRaterGroups.push(newItem);

    formRef.current.setValues({ ...oldValues, raterGroups: formatRaterGroupItems(newRaterGroups) });
  };

  const surveySettingsStringified = JSON.stringify(surveySettings);
  const initialValues = React.useMemo(() => {
    return {
      surveySetting: {
        startDate: surveySetting?.startDate || '',
        endDate: surveySetting?.endDate || '',
        itemCaution: surveySetting?.itemCaution || 0,
      },
      raterGroups: formatRaterGroupItems(raterGroups),
      surveyModeInUserDashboard: {
        individual: !!surveyModeInUserDashboard?.individual,
        ratingGroup: !!surveyModeInUserDashboard?.ratingGroup,
        allRatees: !!surveyModeInUserDashboard?.allRatees,
        ...(surveyModeInUserDashboard.id && { id: surveyModeInUserDashboard.id }),
      },
    };

    // eslint-disable-next-line
  }, [query, surveySettingsStringified]);

  const getColumns = (touched, errors) => [
    {
      title: 'abbr.',
      key: 'abbr',
      render: (value, { id, disabled, index }) => (
        <Input
          disabled={disabled}
          inputClass="uppercase border border-antgray-300"
          name="abbr"
          onChange={(e) => updateTable('abbr', e.target.value, id)}
          value={value}
          placeholder="ABBR."
          errorMessage={touched?.raterGroups?.[index]?.abbr && errors?.raterGroups?.[index]?.abbr}
        />
      ),
    },
    {
      title: 'Group Name',
      key: 'name',
      render: (value, { id, disabled, index }) => (
        <Input
          disabled={disabled}
          inputClass="capitalize border border-antgray-300"
          name="name"
          onChange={(e) => updateTable('name', e.target.value, id)}
          value={value}
          placeholder="Group Name"
          errorMessage={touched?.raterGroups?.[index]?.name && errors?.raterGroups?.[index]?.name}
        />
      ),
    },
    {
      title: 'Min Raters',
      key: 'minRater',
      render: (value, { id, disabled, index }) => (
        <Input
          disabled={disabled}
          name="minRater"
          inputClass="border border-antgray-300"
          onChange={(e) => {
            const val = e.target.value;

            updateTable('minRater', Number.isInteger(val * 1) ? val * 1 : val, id);
          }}
          value={value.toString()}
          placeholder="Min Raters"
          errorMessage={
            touched?.raterGroups?.[index]?.minRater && errors?.raterGroups?.[index]?.minRater
          }
        />
      ),
    },
    {
      title: 'Include Average',
      key: 'includeAverage',
      render: (value, { id, index }) => (
        <div style={{ minWidth: '80px' }} className="justify-center items-center">
          {index !== 0 && (
            <Checkbox
              labelClass="text-body text-sm"
              checked={!!value}
              onChange={(val) => updateTable('includeAverage', val, id)}
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
      render: (_, { id, index }) => (
        <div style={{ minWidth: '80px' }} className="justify-center items-center">
          {index !== 0 ? (
            <Button
              onClick={() => removeTableRow(id)}
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
    <MainLayout
      wizardLayout
      breadCrumbItems={['New Project', 'Survey Setting']}
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
            setQuery({ surveyGroupId: selectedSurveyGroupKey });
            setSurveyGroupModal(false);
          }}
          handleCancel={() => {
            setSelectedSurveyGroupKey('');
            setSurveyGroupModal(false);
          }}
          currentSurveyGroup={currentSurveyGroupName}
          visible={surveyGroupModal}
        />

        {!parsedQuery?.wizardEditMode ? (
          <Menu
            onClick={(key) => {
              setSurveyGroupModal(true);
              setSelectedSurveyGroupKey(key);
            }}
            items={surveyGroups?.data}
            className="col-span-2"
          />
        ) : null}

        <div
          className={`px-6 py-5 col-span-10 ${parsedQuery?.wizardEditMode ? 'col-start-2' : 'col-start-3'
            } `}
        >
          <Steps wizardSteps currentPosition={0} />

          <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values) => {
              try {
                await setSurveySettings({
                  ...values,
                  surveySetting: {
                    ...values.surveySetting,
                    startDate: moment(values.surveySetting?.startDate).toISOString(),
                    endDate: moment(values.surveySetting?.endDate).toISOString(),
                  },
                  raterGroups: values.raterGroups,
                  surveyGroupId,
                });

                const path = dynamicMap.superUser.emailSettings();
                const params = history?.location?.search;

                history.push(`${path}${params}`);
              } catch (error) { }
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
                        className="w-1/2"
                        label="Item Caution"
                        value={values.surveySetting.itemCaution || '0'}
                        onChange={(itemCaution) =>
                          setFieldValue('surveySetting', {
                            ...values.surveySetting,
                            itemCaution,
                          })
                        }
                        errorMessage={
                          touched.surveySetting?.itemCaution && errors.surveySetting?.itemCaution
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xl:pr-24 md:pr-12">
                  <h1 className="text-xl text-secondary mb-8">Rater Settings</h1>

                  <Table
                    rowSelection={false}
                    pagination={false}
                    columns={getColumns(touched, errors)}
                    dataSource={values.raterGroups.filter((row) => !row.deleted)}
                    renderHeader={() => (
                      <div className="flex justify-between items-center">
                        <p className="text-14px">Set rater group (limit to 5, including Self):</p>
                        <Button
                          disabled={!!(values.raterGroups?.length > 4)}
                          onClick={addTableRow}
                          textSize="12px"
                          text="Add Rater Group"
                          type="gray"
                        />
                      </div>
                    )}
                  />

                  <div className="flex flex-col mt-16 ">
                    <p className="mb-10 text-secondary text-sm">
                      Select rating group for user dashboard :
                    </p>

                    <Checkbox
                      checked={!!values.surveyModeInUserDashboard.individual}
                      onChange={(individual) =>
                        setFieldValue('surveyModeInUserDashboard', {
                          ...values.surveyModeInUserDashboard,
                          individual,
                        })
                      }
                      className="ml-0 mb-6"
                    >
                      Individual
                    </Checkbox>

                    <Checkbox
                      checked={!!values.surveyModeInUserDashboard.ratingGroup}
                      onChange={(ratingGroup) =>
                        setFieldValue('surveyModeInUserDashboard', {
                          ...values.surveyModeInUserDashboard,
                          ratingGroup,
                        })
                      }
                      className="ml-0 mb-6"
                    >
                      Group
                    </Checkbox>

                    <Checkbox
                      checked={!!values.surveyModeInUserDashboard.allRatees}
                      onChange={(allRatees) =>
                        setFieldValue('surveyModeInUserDashboard', {
                          ...values.surveyModeInUserDashboard,
                          allRatees,
                        })
                      }
                      className="ml-0"
                    >
                      All
                    </Checkbox>

                    {touched.surveyModeInUserDashboard && errors.surveyModeInUserDashboard && (
                      <p className="text-red-500 mt-2">{errors.surveyModeInUserDashboard}</p>
                    )}

                    <div className="mt-17 pb-22  flex justify-end">
                      {/* <Button type="link" text="Back" className="px-8 py-3" /> */}
                      <Button
                        onClick={handleSubmit}
                        text="Next"
                        className="px-8 py-3 w-24.5 h-9.5"
                      />
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
  fetchSurveySettings: PropTypes.func.isRequired,
  setSurveySettings: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveySettings: PropTypes.shape({
    raterGroups: PropTypes.arrayOf(PropTypes.object),
    surveyModeInUserDashboard: PropTypes.shape({
      individual: PropTypes.bool,
      ratingGroup: PropTypes.bool,
      allRatees: PropTypes.bool,
    }),
    surveySetting: PropTypes.shape({}),
  }),
};

SurveySetting.defaultProps = {
  surveySettings: {
    raterGroups: [],
    surveyModeInUserDashboard: {},
    surveySetting: {},
  },
};

export default SurveySetting;
