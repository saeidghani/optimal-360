import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { useQuery, stringify } from '../../hooks/useQuery';
import * as TEMPLATES from './Helper/EmailTemplates';
import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';

import MainLayout from '../Common/Layout';
import Checkbox from '../Common/Checkbox';
import Menu from './Helper/Menu';
import Steps from '../Common/Steps';
import Calendar from '../Common/Calendar';
import Button from '../Common/Button';
import Loading from '../Common/Loading';
import Table from '../Common/Table';

const pascalize = (txt) => {
  if (!txt) return '';
  let arr = txt?.split(' ');

  arr = arr.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  arr.splice(0, 1, arr[0].toLowerCase());

  return arr.join('');
};

const EmailSetting = ({
  emailSettings,
  fetchEmailSettings,
  fetchSurveyGroups,
  setEmailSettings,
  setSelectedEmailTemplate,
  loading,
  surveyGroups,
}) => {
  const formRef = React.useRef();
  const schema = yup.object({
    emailSettings: yup.array(
      yup
        .object({
          name: yup.string(),
          date: yup.string(),
          copyToAdmin: yup.bool(),
          template: yup.string(),
        })
        .test('emailSettings', 'Date cannot be empty', (vals) => !(vals.selected && !vals.date)),
    ),
  });
  const history = useHistory();
  const [parsedQuery, , setQuery] = useQuery();
  const { search } = history?.location;

  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [isFormDone, setIsFormDone] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');

  const { projectId, surveyGroupId } = parsedQuery;
  const initialValues = [
    {
      id: '1',
      name: 'Rater verification email',
      date: '',
      copyToAdmin: false,
      template: TEMPLATES.raterVerificationEmail,
    },
    {
      id: '2',
      name: 'Login email (self)',
      date: '',
      copyToAdmin: false,
      template: TEMPLATES.loginEmailSelf,
    },
    {
      id: '3',
      name: 'Login email (others)',
      date: '',
      copyToAdmin: false,
      template: TEMPLATES.loginEmailOthers,
    },
    {
      id: '4',
      name: 'Reminder email (1)',
      date: '',
      copyToAdmin: false,
      template: TEMPLATES.reminderEmails,
    },
    {
      id: '5',
      name: 'Reminder email (2)',
      date: '',
      copyToAdmin: false,
      template: TEMPLATES.reminderEmails,
    },
  ];

  const templateKey = `${projectId}-${surveyGroupId}`;
  const TEMP = JSON.parse(localStorage.getItem(templateKey)) || {};
  // console.log(TEMP);

  React.useEffect(() => {
    if (
      isFormDone &&
      selectedSurveyGroupKey &&
      selectedSurveyGroupKey !== parsedQuery?.surveyGroupId
    ) {
      setQuery({ surveyGroupId: selectedSurveyGroupKey });
      setIsFormDone(false);
      setSurveyGroupModal(false);
    }
  }, [isFormDone, selectedSurveyGroupKey, setQuery, parsedQuery.surveyGroupId]);

  React.useEffect(() => {
    fetchSurveyGroups(projectId);
  }, [projectId, surveyGroupId, fetchSurveyGroups]);

  React.useEffect(() => {
    if (surveyGroupId) fetchEmailSettings(surveyGroupId);
  }, [projectId, surveyGroupId, fetchEmailSettings]);

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
  }, [JSON.stringify(surveyGroups.data)]);

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

  const emailSettingsStringified = JSON.stringify(emailSettings);

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, { name }) => <h3 className="text-body text-sm">{name}</h3>,
    },
    {
      title: '',
      dataIndex: 'button',
      key: 'button ',
      render: (_, { template, name }) => (
        <Button
          onClick={async () => {
            await setSelectedEmailTemplate(template);
            history.push(
              `/super-user/new-project/email-settings/${name
                .toLowerCase()
                .replaceAll(' ', '-')}${search}`,
            );
          }}
          textSize="xs"
          ghost
          className="ml-auto"
          text="View/Edit"
        />
      ),
    },
  ];

  const _emailSettings = React.useMemo(() => {
    const settings = [];

    initialValues.forEach((el) => {
      // names are supposed to be unique
      const duplicate = emailSettings.find((item) => item.name === el.name);

      // if there is a duplicate item between initialValues and settings res from api
      // we prioritize the item from api
      const itemToPush = duplicate || el;

      settings.push({
        ...itemToPush,
        key: itemToPush.id.toString(),
        selected: !!itemToPush.date,
        template: TEMP[pascalize(itemToPush.name)] || itemToPush.template,
      });
    });

    return settings;

    // return emailSettings && Object.values(emailSettings).length > 0
    //   ? emailSettings.map((el) => ({
    //       ...el,
    //       key: el.id.toString(),
    //       selected: !!el.date,
    //       template: TEMP[pascalize(el.name)] || el.template,
    //     }))
    //   : initialValues.map((el) => ({
    //       ...el,
    //       key: el.id.toString(),
    //       selected: !!el.date,
    //       template: TEMP[pascalize(el.name)] || el.template,
    //     }));
    // eslint-disable-next-line
  }, [emailSettingsStringified]);

  const updateArr = (refArray, id, key, newVal) => {
    return refArray.map((el) => {
      if (el.id === id) {
        return key === 'selected' && newVal === false
          ? { id, key: id, name: el.name, date: '', copyToAdmin: false, template: '' }
          : {
              ...el,
              [key]: newVal,
            };
      }

      return el;
    });
  };

  React.useEffect(() => {
    if (surveyGroupId) {
      fetchEmailSettings(surveyGroupId);
    }

    if (formRef?.current) {
      // reset form state when surveyGroup changes
      // happens when user decides to discard current settings and changes currentSurveyGroup
      formRef.current.setTouched({});
      formRef.current.setErrors({});
      formRef.current.setValues({ emailSettings: _emailSettings });
    }
    // eslint-disable-next-line
  }, [fetchEmailSettings, surveyGroupId, JSON.stringify(_emailSettings)]);

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
              emailSettings: _emailSettings,
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              const chosenTemplates = [];

              values.emailSettings.forEach((el) => {
                if (el.selected) {
                  chosenTemplates.push({
                    ...el,
                    id: el.id * 1,
                    date: moment(el.date).toISOString(),
                  });
                }
              });

              if (chosenTemplates.length > 0) {
                try {
                  await setEmailSettings({ emailSettings: chosenTemplates, surveyGroupId });
                  history.push(`/super-user/new-project/survey-intro${search}`);
                } catch (error) {}
              }
            }}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mt-16 flex flex-col">
                  <h1 className="text-xl text-secondary mb-12">Email Setting</h1>

                  {values.emailSettings.map(({ name, id, selected, date, copyToAdmin }, i) => (
                    <div className="grid grid-cols-12 my-3" key={id}>
                      <div className="col-span-3 flex flex-row items-center">
                        <Checkbox
                          checked={!!selected}
                          onChange={(val) => {
                            formRef.current.setTouched({ emailSettings: true });

                            setFieldValue(
                              'emailSettings',
                              updateArr(values.emailSettings, id, 'selected', val),
                            );
                          }}
                        />

                        <p className=" whitespace-no-wrap ml-3 text-sm text-secondary">{name}</p>
                      </div>

                      <div className="col-span-2">
                        <Calendar
                          onChange={(val) =>
                            setFieldValue(
                              'emailSettings',
                              updateArr(values.emailSettings, id, 'date', val),
                            )
                          }
                          value={date}
                          disabled={!selected}
                          icon={!date}
                          placeholder="Date"
                        />
                      </div>

                      <div className="col-span-2 flex flex-row items-center">
                        <Checkbox
                          checked={!!copyToAdmin}
                          onChange={(val) =>
                            setFieldValue(
                              'emailSettings',
                              updateArr(values.emailSettings, id, 'copyToAdmin', val),
                            )
                          }
                          disabled={!selected}
                        />

                        <p
                          style={{ opacity: selected ? '1' : '0.3' }}
                          className=" whitespace-no-wrap ml-3 text-sm text-secondary"
                        >
                          Send copy to Admin
                        </p>
                      </div>

                      {(touched || touched.length > 0) &&
                      errors.emailSettings?.length > 0 &&
                      errors.emailSettings[i] ? (
                        <div className="col-span-8 flex flex-row mb-3 mt-2">
                          <p className="text-red-500 my-3">{errors.emailSettings[i]}</p>
                        </div>
                      ) : null}
                    </div>
                  ))}

                  <Button
                    onClick={() => {
                      const newKey = (values.emailSettings.length * 1 + 1).toString();

                      const newVal = {
                        key: newKey,
                        id: newKey,
                        name: `Reminder email (${values.emailSettings.length - 2})`,
                        date: '',
                        copyToAdmin: false,
                        template: '',
                      };

                      setFieldValue('emailSettings', [...values.emailSettings, newVal]);
                    }}
                    type="link"
                    textSize="sm"
                    textClassName="ml-1.5"
                    className="mt-6 text-antgray-800 border border-dashed border-antgray-300 w-24"
                    text="Add Email"
                    icon="PlusOutlined"
                  />
                </div>

                <div className="mt-7 flex flex-col pr-33">
                  <h1 className="text-xl text-secondary mb-8.5">Email Templates</h1>

                  <Table
                    columns={columns}
                    dataSource={values.emailSettings.map((el) => el)}
                    // dataSource={data}
                    rowSelection={false}
                    pagination={false}
                  />
                </div>

                <div className="pt-23.5 pb-22 flex justify-end  pr-33">
                  <Button
                    type="link"
                    text="Back"
                    textSize="base"
                    className="w-24.5 h-9.5"
                    onClick={() => {
                      const params = stringify({
                        projectId: parsedQuery?.projectId,
                        surveyGroupId: parsedQuery?.surveyGroupId,
                      });

                      history.push(`/super-user/new-project/survey-settings${params}`);
                    }}
                  />

                  <Button
                    className="w-24.5 h-9.5"
                    text="Next"
                    textSize="base"
                    onClick={handleSubmit}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

EmailSetting.propTypes = {
  fetchSurveyGroups: PropTypes.func.isRequired,
  fetchEmailSettings: PropTypes.func.isRequired,
  setSelectedEmailTemplate: PropTypes.func.isRequired,
  setEmailSettings: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveyGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    timeStamp: PropTypes.number,
  }),
  emailSettings: PropTypes.arrayOf(PropTypes.object),
};

EmailSetting.defaultProps = {
  surveyGroups: {
    data: [],
  },
  emailSettings: [],
};

export default EmailSetting;
