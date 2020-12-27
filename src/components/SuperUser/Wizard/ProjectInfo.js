import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { useQuery, parse, stringify } from '../../../hooks/useQuery';
import { dynamicMap } from '../../../routes/RouteMap';

import MainLayout from '../../Common/Layout';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Tag from '../../Common/Tag';
import AutoComplete from '../../Common/AutoComplete';

const ProjectInfo = ({
  loading,
  organizations,
  surveyGroups,
  project,
  fetchSingleProject,
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

  React.useEffect(() => {
    fetchSingleProject(parsedQuery.projectId);
  }, [parsedQuery.projectId]);

  const SurveyGroupRef = [
    ...(surveyGroups?.data || []).map(({ name, id }) => ({
      label: `B-${name}-${id}`,
      value: `B-${name}`,
      id,
      key: `B-${id}`,
    })),
    // ...(project?.data?.projectSurveyGroups || []).map(({ name, id }) => ({
    //   label: `P-${name}-${id}`,
    //   value: `P-${name}`,
    //   id,
    //   key: `P-${id}`,
    // })),
  ];

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
          initialValues={{
            organization: project?.data?.organization
              ? { id: project.data.organization.id, value: project.data.organization.name }
              : {},
            projectName: project?.data?.name || '',
            surveyGroup: (project?.data?.projectSurveyGroups || []).map(({ name, id }) => ({
              label: `P-${name}`,
              value: `P-${name}`,
              id,
              key: `P-${id}`,
            })),
          }}
          validationSchema={schema}
          onSubmit={async ({ organization, projectName, surveyGroup }) => {
            const projectSurveyGroupIds = [];
            const bankSurveyGroupIds = [];

            surveyGroup.forEach((el) => {
              if (el.label.startsWith('B-')) {
                bankSurveyGroupIds.push(el.id);
              } else {
                projectSurveyGroupIds.push(el.id);
              }
            });

            try {
              const { projectId = parsedQuery.projectId } = await createProject({
                organizationId: organization.id,
                projectName,
                projectSurveyGroupIds,
                bankSurveyGroupIds,
              });

              const params = stringify({
                projectId,
              });

              const path = dynamicMap.superUser.surveySettings();

              history.replace(`${path}${params}`);
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
              <AutoComplete
                wrapperClassName="mb-6"
                labelText="Organization"
                extrainfoText="Create New"
                onSelect={(el) => {
                  setFieldValue('organization', el);
                  setQuery({ projectId: parsedQuery.projectId });
                }}
                extrainfoLink={`${dynamicMap.superUser.addOrganization()}?prevUrl=${
                  history?.location?.pathname
                }`}
                placeholder="Name of Organization"
                options={
                  organizations?.data?.length > 0
                    ? organizations.data.map(({ name, id }) => ({
                        label: name,
                        value: name,
                        id,
                      }))
                    : []
                }
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
                  setFieldValue('surveyGroup', [...values.surveyGroup, val]);
                  setQuery({ projectId: parsedQuery.projectId });
                }}
                extrainfoLink={`${dynamicMap.superUser.bankSurveyGroups()}?prevUrl=${
                  history?.location?.pathname
                }`}
                placeholder="Search"
                options={SurveyGroupRef}
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
                      onClose={() => {
                        const newSurveyGroups = [...values.surveyGroup];
                        newSurveyGroups.splice(i, 1);

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
  fetchOrganizations: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  fetchSingleProject: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  project: PropTypes.shape({
    data: PropTypes.shape(),
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
  organizations: {
    data: [],
  },
  project: {
    data: {},
  },
  surveyGroups: {
    data: [],
    metaData: {
      pagination: {
        totalRecords: 10,
      },
    },
  },
};

export default ProjectInfo;
