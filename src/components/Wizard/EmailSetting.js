import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
// import { useHistory } from 'react-router-dom';

import { useQuery } from '../../hooks/useQuery';

import MainLayout from '../Common/Layout';
import Checkbox from '../Common/Checkbox';
import Menu from './Helper/Menu';
import Steps from '../Common/Steps';
import Calendar from '../Common/Calendar';
import Button from '../Common/Button';
import Loading from '../Common/Loading';

import Table from '../Common/Table';

const EmailSetting = ({
  emailSettings,
  fetchEmailSettings,
  fetchSurveyGroups,
  setEmailSettings,
  loading,
  surveyGroups,
}) => {
  const schema = yup.object({
    emailSettings: yup.array(
      yup.object({
        name: yup.string().required('Name cannot be empty'),
        date: yup.string().required('Date cannot be empty'),
        copyToAdmin: yup.bool(),
        template: yup.string().required('template cannot be empty'),
        id: yup.number(),
      }),
    ),
  });
  // const history = useHistory();

  const [parsedQuery] = useQuery();
  const { projectId, surveyGroupId } = parsedQuery;
  const initialValues = [
    { id: '1', name: 'Rater verification email', date: '', copyToAdmin: false, template: '' },
    { id: '2', name: 'Login email (self)', date: '', copyToAdmin: false, template: '' },
    { id: '3', name: 'Login email (others)', date: '', copyToAdmin: false, template: '' },
    { id: '4', name: 'Reminder email (1)', date: '', copyToAdmin: false, template: '' },
    { id: '5', name: 'Reminder email (2)', date: '', copyToAdmin: false, template: '' },
  ];

  React.useEffect(() => {
    fetchSurveyGroups(projectId);
  }, [projectId, surveyGroupId, fetchSurveyGroups]);

  React.useEffect(() => {
    fetchEmailSettings(surveyGroupId);
  }, [projectId, surveyGroupId, fetchEmailSettings]);

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
      render: () => <Button textSize="xs" ghost className="ml-auto" text="View/Edit" />,
    },
  ];
  const data = initialValues.map((el) => ({ key: el.id, ...el }));

  const _emailSettings = React.useMemo(() => {
    return emailSettings && Object.values(emailSettings).length > 0
      ? emailSettings.map((el) => ({ ...el, selected: false }))
      : initialValues.map((el) => ({ ...el, selected: false }));
  }, []);
  console.log({ emailSettings, _emailSettings });

  const updateArr = (refArray, id, key, newVal) => {
    return refArray.map((el) => {
      if (el.id === id) {
        return key === 'selected' && newVal === false
          ? { id, name: el.name, date: '', copyToAdmin: false, template: '' }
          : {
              ...el,
              [key]: newVal,
            };
      }

      return el;
    });
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

        <Menu items={surveyGroups?.data} className="col-span-2" />

        <div className="px-6 py-5 col-start-3 col-span-10">
          <Steps currentPosition={1} />

          <Formik
            enableReinitialize
            initialValues={{
              emailSettings: _emailSettings,
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              console.log({ values });
              // history.push('/super-user/Projects/rater-verification-email');
            }}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <Form>
                <div className="mt-16 flex flex-col">
                  <h1 className="text-xl text-secondary mb-12">Email Setting</h1>

                  {values.emailSettings.map(({ name, id, selected, date, copyToAdmin }) => (
                    <div className="grid grid-cols-12 my-3" key={id}>
                      <div className="col-span-3 flex flex-row items-center">
                        <Checkbox
                          checked={selected}
                          onChange={(val) =>
                            setFieldValue(
                              'emailSettings',
                              updateArr(values.emailSettings, id, 'selected', val),
                            )
                          }
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
                        />
                      </div>

                      <div className="col-span-2 flex flex-row items-center">
                        <Checkbox
                          checked={copyToAdmin}
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
                    </div>
                  ))}

                  <Button
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
                    dataSource={data}
                    rowSelection={false}
                    pagination={false}
                  />
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
