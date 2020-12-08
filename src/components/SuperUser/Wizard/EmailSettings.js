import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { useQuery, stringify } from '../../../hooks/useQuery';
import { useSurveyGroup } from '../../../hooks';
import { dynamicMap } from '../../../routes/RouteMap';

import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';

import MainLayout from '../../Common/Layout';
import Checkbox from '../../Common/Checkbox';
import Menu from './Helper/Menu';
import Steps from '../../Common/Steps';
import Calendar from '../../Common/Calendar';
import Button from '../../Common/Button';
import Loading from '../../Common/Loading';
import Table from '../../Common/Table';

const EmailSettings = ({
  emailSettings,
  fetchEmailSettings,
  setEmailSettings,
  setEmailSettingsData,
  loading,
}) => {
  const formRef = React.useRef();
  const schema = yup.object({
    emailSettings: yup.array(
      yup
        .object({
          name: yup.string(),
          date: yup.string().nullable(),
          copyToAdmin: yup.bool(),
          template: yup.string(),
        })
        .test('emailSettings', 'Date cannot be empty', ({ active, date }) => !(active && !date)),
    ),
  });
  const history = useHistory();

  const [parsedQuery] = useQuery();
  const { projectId } = parsedQuery;

  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();
  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');

  React.useEffect(() => {
    if (
      (surveyGroupId && !emailSettings) ||
      (emailSettings &&
        typeof emailSettings === 'object' &&
        Object.values(emailSettings)?.length === 0)
    ) {
      fetchEmailSettings(surveyGroupId);
    }
  }, [surveyGroupId, fetchEmailSettings, JSON.stringify({ emailSettings })]);

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
      render: (_, { id, name }) => (
        <Button
          onClick={() => {
            const path = dynamicMap.superUser.emailSettingsTemplate({ id, name });
            const params = stringify({
              projectId,
              surveyGroupId,
              wizardEditMode: parsedQuery?.wizardEditMode,
            });

            history.push(`${path}${params}`);
          }}
          textSize="xs"
          ghost
          className="ml-auto"
          text="View/Edit"
        />
      ),
    },
  ];

  const updateForm = (id, name, key, newVal) => {
    const newValues = { ...formRef?.current?.values };

    const updateIndex = newValues.emailSettings.findIndex((el) => el.name === name);

    newValues.emailSettings[updateIndex][key] = newVal;

    if (!newValues.emailSettings[updateIndex]?.active) {
      newValues.emailSettings[updateIndex].date = null;
      newValues.emailSettings[updateIndex].copyToAdmin = false;
    }

    setEmailSettingsData({ ...newValues });
    formRef.current.setValues({ ...newValues });
  };

  const addEmail = async () => {
    const newValues = { ...formRef?.current?.values };

    const { id: emailTemplateId = '', subject, template } = newValues?.emailTemplates.find((el) =>
      el.name.toLowerCase().includes('reminder'),
    );

    const newEmailSettingItem = {
      active: false,
      copyToAdmin: false,
      date: null,
      emailTemplateId,
      name: `Reminder Email (${newValues.emailSettings.length - 3})`,
    };

    // const newEmailTemplateItem = {
    //   id: emailTemplateId,
    //   name: `Reminder Email (${newValues.emailSettings.length - 3})`,
    //   subject,
    //   template,
    // };

    newValues.emailSettings.push(newEmailSettingItem);
    // newValues.emailTemplates.push(newEmailTemplateItem);

    await setEmailSettingsData({ ...newValues });
    formRef.current.setValues({ ...newValues });
  };

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
            const path = dynamicMap.superUser.surveySettings();
            const params = stringify({ projectId, surveyGroupId: selectedSurveyGroupKey });

            history.push(`${path}${params}`);
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
          className={`px-6 py-5 col-span-10 ${
            parsedQuery?.wizardEditMode ? 'col-start-2' : 'col-start-3'
          } `}
        >
          <Steps currentPosition={1} />

          <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={emailSettings}
            validationSchema={schema}
            onSubmit={async (values) => {
              const params = stringify({
                projectId: parsedQuery?.projectId,
                surveyGroupId: parsedQuery?.surveyGroupId,
                wizardEditMode: parsedQuery?.wizardEditMode,
              });

              try {
                await setEmailSettings({ ...values, surveyGroupId });

                const path = dynamicMap.superUser.surveyIntro();
                history.push(`${path}${params}`);
              } catch (error) {}
            }}
          >
            {({ values, errors, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mt-16 flex flex-col">
                  <h1 className="text-xl text-secondary mb-12">Email Setting</h1>

                  {(values?.emailSettings || []).map(
                    ({ name, id, active, date, copyToAdmin }, i) => (
                      <div className="grid grid-cols-12 my-3" key={i}>
                        <div className="col-span-3 flex flex-row items-center">
                          <Checkbox
                            checked={!!active}
                            className="flex flex-row items-center"
                            onChange={(val) => {
                              formRef.current.setTouched({ emailSettings: true });

                              updateForm(id, name, 'active', val);
                            }}
                            textNode={
                              <p className=" whitespace-no-wrap ml-3 text-sm text-secondary">
                                {name}
                              </p>
                            }
                          />
                        </div>

                        <div className="col-span-2">
                          <Calendar
                            onChange={(val) =>
                              updateForm(id, name, 'date', val ? moment(val).toISOString() : null)
                            }
                            value={date}
                            disabled={!active}
                            icon={!date}
                            placeholder="Date"
                          />
                        </div>

                        <div className="col-span-2 flex flex-row items-center">
                          <Checkbox
                            checked={!!copyToAdmin}
                            className="flex flex-row items-center"
                            onChange={(val) => updateForm(id, name, 'copyToAdmin', val)}
                            disabled={!active}
                            textNode={
                              <p
                                style={{ opacity: active ? '1' : '0.3' }}
                                className=" whitespace-no-wrap ml-3 text-sm text-secondary"
                              >
                                Send copy to Admin
                              </p>
                            }
                          />
                        </div>

                        {(touched || touched.length > 0) &&
                        errors.emailSettings?.length > 0 &&
                        errors.emailSettings[i] &&
                        typeof errors.emailSettings[i] === 'string' ? (
                          <div className="col-span-8 flex flex-row mb-3 mt-2">
                            <p className="text-red-500 my-3">{errors.emailSettings[i]}</p>
                          </div>
                        ) : null}
                      </div>
                    ),
                  )}

                  <Button
                    onClick={addEmail}
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
                    rowKey="fId"
                    columns={columns}
                    dataSource={(values?.emailTemplates || []).map((el) => ({
                      ...el,
                      fId: `${el.name}--${el.id}`,
                    }))}
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
                        wizardEditMode: parsedQuery?.wizardEditMode,
                      });

                      const path = dynamicMap.superUser.surveySettings();
                      history.push(`${path}${params}`);
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

EmailSettings.propTypes = {
  fetchEmailSettings: PropTypes.func.isRequired,
  setEmailSettings: PropTypes.func.isRequired,
  setEmailSettingsData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  emailSettings: PropTypes.shape({
    emailSettings: PropTypes.arrayOf(PropTypes.object),
    emailTemplates: PropTypes.arrayOf(PropTypes.object),
  }),
};

EmailSettings.defaultProps = {
  emailSettings: {
    emailSettings: [],
    emailTemplates: [],
  },
};

export default EmailSettings;
