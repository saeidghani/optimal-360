import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { useQuery, stringify } from '../../../hooks/useQuery';
import { useSurveyGroup } from '../../../hooks';
import { dynamicMap } from '../../../routes/RouteMap';

import pascalize from '../../../lib/pascalize';

import * as TEMPLATES from './Helper/EmailTemplates';
import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';

import MainLayout from '../../Common/Layout';
import Checkbox from '../../Common/Checkbox';
import Menu from './Helper/Menu';
import Steps from '../../Common/Steps';
import Calendar from '../../Common/Calendar';
import Button from '../../Common/Button';
import Loading from '../../Common/Loading';
import Table from '../../Common/Table';

const EmailSettings = ({ emailSettings, fetchEmailSettings, setEmailSettings, loading }) => {
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
        .test(
          'emailSettings',
          'Date cannot be empty',
          ({ selected, date }) => !(selected && !date),
        ),
      // .test(
      //   'emailSettings',
      //   'Date cannot be in the past',
      //   ({ selected, date }) => !(selected && date && moment(date).isBefore(moment(), 'day')),
      // ),
    ),
  });
  const history = useHistory();

  const [parsedQuery] = useQuery();
  const { search } = history?.location;

  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();

  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');

  const { projectId } = parsedQuery;
  const initialValues = [
    {
      id: '1',
      name: 'Rater verification email',
      date: '',
      copyToAdmin: false,
    },
    {
      id: '2',
      name: 'Login email (self)',
      date: '',
      copyToAdmin: false,
    },
    {
      id: '3',
      name: 'Login email (others)',
      date: '',
      copyToAdmin: false,
    },
    {
      id: '4',
      name: 'Reset password email',
      date: '',
      copyToAdmin: false,
    },
    {
      id: '5',
      name: 'Reminder email (1)',
      date: '',
      copyToAdmin: false,
    },
  ];

  React.useEffect(() => {
    if (surveyGroupId) fetchEmailSettings(surveyGroupId);
  }, [surveyGroupId, fetchEmailSettings]);

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
      render: (_, { name }) => (
        <Button
          onClick={() => {
            const path = dynamicMap.superUser.emailSettingsTemplate({
              template: `${name.toLowerCase().replaceAll(' ', '-')}${search}`,
            });

            history.push(path);
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
      });
    });

    return settings;

    // eslint-disable-next-line
  }, [emailSettingsStringified]);

  const updateForm = (id, key, newVal) => {
    const newValues = { ...formRef?.current?.values };

    const updateIndex = newValues.emailSettings.findIndex((el) => el.id * 1 === id * 1);
    newValues.emailSettings[updateIndex][key] = newVal;

    formRef.current.setValues({ ...newValues });
    localStorage.setItem(`emailSettings-${surveyGroupId}`, JSON.stringify(newValues.emailSettings));
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
            initialValues={{
              emailSettings: localStorage.getItem(`emailSettings-${surveyGroupId}`)
                ? JSON.parse(localStorage.getItem(`emailSettings-${surveyGroupId}`))
                : _emailSettings,
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
                    template:
                      localStorage.getItem(`${pascalize(el.name)}-${projectId}-${surveyGroupId}`) ||
                      TEMPLATES[pascalize(el.name)],
                  });
                }
              });

              const params = stringify({
                projectId: parsedQuery?.projectId,
                surveyGroupId: parsedQuery?.surveyGroupId,
                wizardEditMode: parsedQuery?.wizardEditMode,
              });

              if (chosenTemplates.length > 0) {
                try {
                  await setEmailSettings({ emailSettings: chosenTemplates, surveyGroupId });
                  localStorage.clear();

                  const path = dynamicMap.superUser.surveyIntro();
                  history.push(`${path}${params}`);
                } catch (error) {}
              } else {
                localStorage.clear();

                const path = dynamicMap.superUser.surveyIntro();
                history.push(`${path}${params}`);
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
                          className="flex flex-row items-center"
                          onChange={(val) => {
                            formRef.current.setTouched({ emailSettings: true });

                            updateForm(id, 'selected', val);
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
                          onChange={(val) => updateForm(id, 'date', val || '')}
                          value={date}
                          disabled={!selected}
                          icon={!date}
                          placeholder="Date"
                        />
                      </div>

                      <div className="col-span-2 flex flex-row items-center">
                        <Checkbox
                          checked={!!copyToAdmin}
                          className="flex flex-row items-center"
                          onChange={(val) => updateForm(id, 'copyToAdmin', val)}
                          disabled={!selected}
                          textNode={
                            <p
                              style={{ opacity: selected ? '1' : '0.3' }}
                              className=" whitespace-no-wrap ml-3 text-sm text-secondary"
                            >
                              Send copy to Admin
                            </p>
                          }
                        />
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
                        name: `Reminder email (${values.emailSettings.length - 3})`,
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
  loading: PropTypes.bool.isRequired,
  emailSettings: PropTypes.arrayOf(PropTypes.object),
};

EmailSettings.defaultProps = {
  emailSettings: [],
};

export default EmailSettings;
