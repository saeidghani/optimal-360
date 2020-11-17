import React from 'react';
import * as yup from 'yup';
import { useParams, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';

import { dynamicMap } from '../../../routes/RouteMap';

import { generateNewPassword } from '../../../lib/utils';

import MainLayout from '../../Common/Layout';
import RadioGroup from '../../Common/RadioGroup';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

const SetAdmin = ({ loading, setAdmin, fetchAdmin, clientAdmin }) => {
  const schema = yup.object({
    email: yup.string().email('email is not valid').required('email field is required'),
    password: yup
      .string()
      .min(8, 'password must  be at least 8 characters long')
      .required('password field is required'),
    status: yup.string().required('set admin activity status'),
  });
  const { projectId } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    if (projectId) fetchAdmin(projectId);
  }, [projectId, fetchAdmin]);

  return (
    <MainLayout
      hasBreadCrumb={false}
      contentClass="flex flex-row min-h-screen items-center justify-around p-0"
    >
      <div className="bg-white rounded-7px  sm:px-16 sm:pb-18 sm:pt-22 px-4 py-6">
        <Formik
          initialValues={{
            email: clientAdmin?.data?.email,
            password: clientAdmin?.data?.password,
            status: clientAdmin?.data?.active ? 'active' : 'inactive',
          }}
          validationSchema={schema}
          onSubmit={async ({ email, password, status }) => {
            await setAdmin({ email, password, active: status === 'active', projectId });

            const path = dynamicMap.superUser.projectsList();
            history.replace(`${path}?status=active&page_size=10&page_number=1`);
          }}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form>
              <Input
                disabled={isSubmitting}
                onChange={handleChange}
                value={values.email}
                name="email"
                type="email"
                labelText="Client Dashboard Login ID"
                placeholder="Client@gmail.com"
                errorMessage={touched.email && errors.email}
                wrapperClassName="c-min-w-form-input mb-6"
              />

              <Input
                value={values.password}
                disabled={isSubmitting}
                onChange={handleChange}
                name="password"
                // type="password"
                labelText="Client Dashboard Password"
                placeholder="8 Character"
                extrainfoText="Generate Password"
                extrainfoLink="#"
                errorMessage={touched.password && errors.password}
                wrapperClassName="c-min-w-form-input mb-6"
                onExtraInfoLinkClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const newPassword = generateNewPassword();
                  setFieldValue('password', newPassword);
                }}
              />

              <RadioGroup
                value={values.status}
                items={[
                  { title: 'Active', value: 'active' },
                  { title: 'In-Active', value: 'inactive' },
                ]}
                onChange={(e) => setFieldValue('status', e.target.value)}
              />
              {touched.status && errors.status ? (
                <p className="text-red-500 mt-2">{errors.status}</p>
              ) : null}

              <Button
                loading={loading}
                onClick={handleSubmit}
                text="Save"
                textSize="base"
                className="ml-auto c-force-padding-y-px px-8 mt-14"
              />
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
};

SetAdmin.propTypes = {
  loading: PropTypes.bool.isRequired,
  setAdmin: PropTypes.func.isRequired,
  fetchAdmin: PropTypes.func.isRequired,
  clientAdmin: PropTypes.shape({
    data: PropTypes.shape({
      active: PropTypes.bool,
      email: PropTypes.string,
      password: PropTypes.string,
    }),
  }),
};

SetAdmin.defaultProps = {
  clientAdmin: {},
};

export default SetAdmin;
