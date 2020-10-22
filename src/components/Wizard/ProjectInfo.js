import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { useQuery, parse, stringify } from '../../hooks/useQuery';

import MainLayout from '../Common/Layout';

import Input from '../Common/Input';
import Button from '../Common/Button';
import Tag from '../Common/Tag';
import AutoComplete from '../Common/AutoComplete';

const ProjectInfo = ({
  loading,
  organizations,
  surveyGroups,
  fetchOrganizations,
  fetchSurveyGroups,
  createProject,
}) => {
  const history = useHistory();
  const schema = yup.object({
    organization: yup.object({ value: yup.string().required('Organization Name Cannot Be Empty') }),
    projectName: yup.string().required('Project Name Cannot Be Empty'),
    surveyGroup: yup.array().required('You Must Specify At least 1 Survey Category'),
  });
  const [parsedQuery, query, setQuery] = useQuery();

  React.useEffect(() => {
    const organizationQuery = stringify(parse({ q: parsedQuery.oq }));
    fetchOrganizations(organizationQuery);

    const surveyQuery = stringify(parse({ q: parsedQuery.sq }));
    fetchSurveyGroups(surveyQuery);
  }, [query, fetchSurveyGroups, fetchOrganizations, parsedQuery.oq, parsedQuery.sq]);

  return (
    <MainLayout
      hasBreadCrumb={false}
      contentClass="grid grid-cols-12 items-center justify-center min-h-screen"
    >
      <div
        className="col-span-10 col-start-1 md:col-span-8 md:col-start-3
        lg:col-start-4 lg:col-span-6 xl:col-start-5 xl:col-span-4
        rounded-lg sm:px-16 px-4 sm:pb-10 sm:pt-12 py-6 bg-white"
      >
        <Formik
          initialValues={{
            organization: {},
            projectName: '',
            surveyGroup: [],
          }}
          validationSchema={schema}
          onSubmit={async ({ organization, projectName, surveyGroup }) => {
            const projectSurveyGroupIds = surveyGroup?.map((el) => el.id);

            try {
              const { projectId } = await createProject({
                organizationId: organization.id,
                projectName,
                projectSurveyGroupIds: [],
                bankSurveyGroupIds: projectSurveyGroupIds,
              });

              const params = stringify({
                // organizationId: organization.id, // incase we want to come back to this page
                projectId,
              });

              history.push(`/super-user/new-project/survey-setting${params}`);
            } catch (_) {}
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
              <AutoComplete
                wrapperClassName="mb-6"
                labelText="Organization"
                extrainfoText="Create New"
                onSelect={(el) => {
                  setFieldValue('organization', el);
                  setQuery(null);
                }}
                extrainfoLink="#"
                placeholder="Name of Organization"
                options={organizations.map(({ name, id }) => ({
                  label: name,
                  value: name,
                  id,
                }))}
                onChange={(txt) => {
                  setFieldValue('organization', txt);
                  setQuery({ oq: txt });
                }}
                value={values.organization?.value || parsedQuery.oq}
                errorMessage={touched.organization && errors.organization?.value}
                loading={loading}
              />

              <Input
                value={values.projectName}
                disabled={isSubmitting}
                onChange={handleChange}
                name="projectName"
                labelText="Project Name"
                placeholder="Name"
                errorMessage={touched.projectName && errors.projectName}
                wrapperClassName="mb-6"
              />

              <AutoComplete
                disabled={values.surveyGroup.length > 4}
                wrapperClassName="mb-6"
                labelText="Survey Group"
                extrainfoText="Create New"
                onSelect={(val) => {
                  // const surveyGroup = [...values.surveyGroup];

                  // if (!surveyGroup.find((el) => el.label === val.label)) {
                  //   surveyGroup.push(val);
                  // }

                  setFieldValue('surveyGroup', [...values.surveyGroup, val]);
                  setQuery(null);
                }}
                extrainfoLink="#"
                placeholder="Search"
                options={surveyGroups.map(({ name, id }) => ({
                  label: name,
                  value: name,
                  id,
                  key: id,
                }))}
                onChange={(txt) => setQuery({ sq: txt })}
                value={parsedQuery.sq}
                errorMessage={touched.surveyGroup && errors.surveyGroup}
                loading={loading}
              />

              {values.surveyGroup?.length > 0 ? (
                <div>
                  {values.surveyGroup.map((el, i) => (
                    <Tag
                      className="mb-3"
                      key={i}
                      closable
                      onClose={(label) => {
                        const newSurveyGroups = [];

                        values.surveyGroup.forEach((item) => {
                          if (item.label.toLowerCase() !== label.toLowerCase()) {
                            newSurveyGroups.push(item);
                          }
                        });

                        setFieldValue('surveyGroup', newSurveyGroups);
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
                textSize="base"
                className="ml-auto c-force-padding-y-px px-8 mt-10"
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
  fetchOrganizations: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  surveyGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProjectInfo;
