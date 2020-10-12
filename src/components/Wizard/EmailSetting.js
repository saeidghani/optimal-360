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
import Calender from '../Common/Calender';
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

  React.useEffect(() => {
    fetchSurveyGroups(projectId);
  }, [projectId, surveyGroupId, fetchSurveyGroups]);

  const array = [1, 2, 3, 4];
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '',
      dataIndex: 'button',
      key: 'button ',
      render: (text) => (
        <button className="border border-primary-500 text-primary-500 text-12px w-19 h-10 flex items-center justify-center rounded-2px float-right mr-6">
          {text}
        </button>
      ),
    },
  ];
  const data = [
    { key: '1', email: 's@mail.com', button: 'View/Edit' },
    { key: '1', email: 's@mail.com', button: 'View/Edit' },
    { key: '1', email: 's@mail.com', button: 'View/Edit' },
    { key: '1', email: 's@mail.com', button: 'View/Edit' },
  ];

  console.log({ emailSettings });

  const initialValues = [
    { id: '1', name: 'Rater verification email', date: '', copyToAdmin: false, template: '' },
    { id: '2', name: 'Login email (self)', date: '', copyToAdmin: false, template: '' },
    { id: '3', name: 'Login email (others)', date: '', copyToAdmin: false, template: '' },
    { id: '4', name: 'Reminder email (1)', date: '', copyToAdmin: false, template: '' },
    { id: '5', name: 'Reminder email (2)', date: '', copyToAdmin: false, template: '' },
  ];

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
              emailSettings:
                emailSettings && Object.values(emailSettings).length > 0
                  ? emailSettings
                  : initialValues,
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

                  {values.emailSettings.map(({ name, id }) => (
                    <div className="grid grid-cols-12 my-3" key={id}>
                      <div className="col-span-3 flex flex-row items-center">
                        <Checkbox />

                        <p className=" whitespace-no-wrap ml-3 text-sm text-secondary">{name}</p>
                      </div>

                      <div className="col-span-2">
                        <Calender />
                      </div>

                      <div className="col-span-2 flex flex-row items-center">
                        <Checkbox />

                        <p className=" whitespace-no-wrap ml-3 text-sm text-secondary">
                          Send copy to Admin
                        </p>
                      </div>
                    </div>
                  ))}

                  <button className="mt-3 self-start text-12 text-gray-8 border w-19 border-dashed border-antgray-300 rounded-2px">
                    <span className="text-12px px-1 pb-2"> + Add Email</span>
                  </button>
                </div>

                <div className="mt-6 flex flex-col  pr-33">
                  <span className="text-secondary text-20px mb-10 ">Email Templates</span>
                  <Table columns={columns} dataSource={data} pagination={false} />
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
  emailSettings: PropTypes.shape({
    raterGroups: PropTypes.arrayOf(PropTypes.object),
    surveyModeInUserDashboard: PropTypes.shape({}),
    surveySetting: PropTypes.shape({}),
  }),
};

EmailSetting.defaultProps = {
  surveyGroups: {
    data: [],
  },
  emailSettings: {
    raterGroups: [],
    surveyModeInUserDashboard: {},
    surveySetting: {},
  },
};

export default EmailSetting;
