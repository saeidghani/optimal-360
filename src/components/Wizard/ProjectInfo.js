import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';

import MainLayout from '../Common/Layout';

import Input from '../Common/Input';
import Button from '../Common/Button';
import Tag from '../Common/Tag';
import AutoComplete from '../Common/AutoComplete';

const ProjectInfo = ({ loading }) => {
  const schema = yup.object({
    organization: yup.string().required('organization feild is required'),
    project: yup.string().required('project feild is required'),
  });
  const [surveyGroups, setSurveyGroups] = React.useState('');

  console.log({ surveyGroups });

  return (
    <MainLayout
      hasBreadCrumb={false}
      contentClass="flex flex-row min-h-screen items-center justify-around p-0"
    >
      <div className="bg-white rounded-7px  sm:px-16 sm:pb-18 sm:pt-22 px-4 py-6">
        <Formik
          initialValues={{
            organization: '',
            project: '',
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            console.log(values);
          }}
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
                value={values.organization}
                name="organization"
                type="organization"
                labelText="Organization"
                placeholder="Name of Organization"
                errorMessage={touched.organization && errors.organization}
                wrapperClassName="c-min-w-form-input mb-6"
                extrainfoText="Create New"
                extrainfoLink="#"
              />

              <Input
                value={values.project}
                disabled={isSubmitting}
                onChange={handleChange}
                name="project"
                labelText="Project Name"
                placeholder="Name"
                errorMessage={touched.project && errors.project}
                wrapperClassName="c-min-w-form-input mb-6"
              />

              <AutoComplete
                labelText="Survay Group"
                extrainfoText="Create New"
                onSelect={setSurveyGroups}
                extrainfoLink="#"
                placeholder="Search"
                options={[
                  { label: 'aTest', value: 'atest' },
                  { label: 'bTest', value: 'btest' },
                  { label: 'cTest', value: 'ctest' },
                ]}
              />

              {surveyGroups?.length > 0 ? (
                <div className="flex flex-row align-center mt-6">
                  {surveyGroups.map((el, i) => (
                    <Tag
                      key={i}
                      closable
                      onClose={(label) => {
                        const newSurveyGroups = [];
                        surveyGroups.forEach((item) => {
                          if (item.label.toLowerCase() === label.toLowerCase()) {
                            newSurveyGroups.push(item);
                          }
                        });

                        setSurveyGroups(newSurveyGroups);
                      }}
                      color="gray"
                      text={el.label}
                    />
                  ))}
                </div>
              ) : null}

              <Button
                loading={loading}
                onClick={handleSubmit}
                text="Next"
                className="ml-auto c-force-padding-y-px px-8 mt-14"
              />
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
};

ProjectInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default ProjectInfo;
