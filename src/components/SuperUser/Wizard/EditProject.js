import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { useQuery, parse, stringify } from '../../../hooks/useQuery';

import MainLayout from '../../Common/Layout';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Tag from '../../Common/Tag';
import AutoComplete from '../../Common/AutoComplete';

const ProjectInfo = ({
  loading,
  project,
  surveyGroups,
  fetchProject,
  fetchSurveyGroups,
  editProject,
}) => {
  const history = useHistory();
  const schema = yup.object({
    name: yup.string().required('Project Name Cannot Be Empty'),
    projectSurveyGroups: yup.array().required('You Must Specify At least 1 Survey Category'),
  });
  const [parsedQuery, query, setQuery] = useQuery();

  const { projectId } = parsedQuery;

  React.useEffect(() => {
    if (projectId) fetchProject(projectId);
  }, [projectId]);

  React.useEffect(() => {
    const surveyQuery = stringify(parse({ q: parsedQuery.sq }));
    fetchSurveyGroups(surveyQuery);
  }, [query, fetchSurveyGroups, parsedQuery.oq, parsedQuery.sq]);

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
          enableReinitialize
          initialValues={project}
          validationSchema={schema}
          onSubmit={async ({ organization, name, projectSurveyGroups }) => {
            const projectSurveyGroupIds = projectSurveyGroups.map((el) => el.id * 1);

            const removeProjectSurveyGroupIds = [];

            project.projectSurveyGroups.forEach((el) => {
              const foundInInitialData = projectSurveyGroups.find(
                (el2) => el2.id * 1 === el.id * 1,
              );

              if (!foundInInitialData) {
                removeProjectSurveyGroupIds.push(el.id * 1);
              }
            });

            // TODO api errors

            try {
              const res = await editProject({
                projectId,
                organizationId: organization.id,
                projectName: name,
                removeProjectSurveyGroupIds,
                projectSurveyGroupIds: [],
                bankSurveyGroupIds: projectSurveyGroupIds,
              });

              console.log({ res });

              // const params = stringify({
              //   projectId,
              // });

              // history.replace(`/super-user/new-project/survey-settings${params}`);
            } catch (error) {}
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
              <p className="text-heading text-sm mb-3">Organization</p>
              <p className="text-antgray-100 h-5 mb-8">{values.organization?.name}</p>

              <Input
                value={values.name}
                disabled={isSubmitting}
                onChange={handleChange}
                name="name"
                labelText="Project Name"
                placeholder="Name"
                errorMessage={touched.name && errors.name}
                wrapperClassName="mb-6"
              />

              <AutoComplete
                disabled={values.projectSurveyGroups?.length > 4}
                wrapperClassName="mb-6"
                labelText="Survey Group"
                extrainfoText="Create New"
                onSelect={(val) => {
                  setFieldValue('projectSurveyGroups', [...values.projectSurveyGroups, val]);
                  setQuery(null);
                }}
                extrainfoLink="#"
                placeholder="Search"
                options={
                  surveyGroups?.data?.length > 0
                    ? surveyGroups.data.map(({ name, id }) => ({
                        label: name,
                        value: name,
                        id,
                        key: id,
                      }))
                    : []
                }
                onChange={(txt) => setQuery({ sq: txt })}
                value={parsedQuery.sq}
                errorMessage={touched.projectSurveyGroups && errors.projectSurveyGroups}
                loading={loading}
              />

              {values.projectSurveyGroups?.length > 0 ? (
                <div>
                  {values.projectSurveyGroups.map((el, i) => (
                    <Tag
                      className="mb-3"
                      key={i}
                      closable
                      onClose={() => {
                        const newSurveyGroups = [...values.projectSurveyGroups];
                        newSurveyGroups.splice(i, 1);

                        setFieldValue('projectSurveyGroups', newSurveyGroups);
                      }}
                      color="gray"
                      text={el.name || el.label}
                    />
                  ))}
                </div>
              ) : null}

              <Button
                loading={loading}
                onClick={handleSubmit}
                text="Next"
                textSize="base"
                className="ml-auto c-force-padding-y-px px-8 mt-10 w-24.5 h-9.5"
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
  fetchProject: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  project: PropTypes.shape({
    projectSurveyGroups: PropTypes.arrayOf(PropTypes.object),
  }),
  surveyGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        totalRecords: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
    }),
  }),
};

ProjectInfo.defaultProps = {
  surveyGroups: {
    data: [],
    metaData: {
      pagination: {
        totalRecords: 10,
      },
    },
  },
  project: {},
};

export default ProjectInfo;
