import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import { useQuery, parse, stringify } from '../../../hooks/useQuery';
import { dynamicMap } from '../../../routes/RouteMap';

import MainLayout from '../../Common/Layout';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Tag from '../../Common/Tag';
import AutoComplete from '../../Common/AutoComplete';

const ProjectInfo = ({
  loading,
  project,
  surveyGroups,
  fetchSingleProject,
  fetchSurveyGroups,
  fetchProjectSurveyGroups,
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
    fetchSingleProject(projectId);
  }, [projectId]);

  React.useEffect(() => {
    const surveyQuery = stringify(parse({ q: parsedQuery.sq }));
    fetchSurveyGroups(surveyQuery);
  }, [query, fetchSurveyGroups, parsedQuery.oq, parsedQuery.sq]);

  const SurveyGroupRef = [
    ...(surveyGroups?.data || []).map(({ name, id }) => ({
      label: `B-${name}-${id}`,
      value: `B-${name}`,
      id,
      key: `B-${id}`,
    })),
    ...(project?.data?.projectSurveyGroups || []).map(({ name, id }) => ({
      label: `P-${name}-${id}`,
      value: `P-${name}`,
      id,
      key: `P-${id}`,
    })),
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
            organization: project?.data?.organization || {},
            name: project?.data?.name || '',
            projectSurveyGroups: (project?.data?.projectSurveyGroups || []).map(({ name, id }) => ({
              label: `P-${name}-${id}`,
              value: `P-${name}`,
              id,
              key: `P-${id}`,
            })),
          }}
          validationSchema={schema}
          onSubmit={async ({ organization, name, projectSurveyGroups }) => {
            const projectSurveyGroupIds = project.data.projectSurveyGroups.map((el) => el.id * 1);
            const removeProjectSurveyGroupIds = [];
            const bankSurveyGroupIds = [];

            projectSurveyGroups.forEach((el) => {
              if (el.label.startsWith('B-')) {
                bankSurveyGroupIds.push(el.id);
              }
            });

            project.data.projectSurveyGroups.forEach((el) => {
              const foundInInitialData = projectSurveyGroups.find(
                (el2) => el2.id * 1 === el.id * 1,
              );

              if (!foundInInitialData) {
                removeProjectSurveyGroupIds.push(el.id * 1);
              }
            });

            const isSurveyGroupEditable = (el) =>
              !el.stepsStatus || !moment(el.startDate).isBefore();

            try {
              const existingProjectSurveyGroups = (
                await fetchProjectSurveyGroups(project?.data?.id)
              )?.data?.data;

              const res = await editProject({
                projectId,
                organizationId: organization.id,
                projectName: name,
                removeProjectSurveyGroupIds,
                projectSurveyGroupIds,
                bankSurveyGroupIds,
              });

              const newProjectSurveyGroups = (await fetchProjectSurveyGroups(res.data.data.id))
                ?.data?.data;

              const newlyAddedSurveyGroups = newProjectSurveyGroups.filter(
                (nSG) => !existingProjectSurveyGroups.find((eSG) => eSG.id * 1 === nSG.id * 1),
              );
              const editableSurveyGroup = [
                ...newlyAddedSurveyGroups,
                ...newProjectSurveyGroups,
              ].find(isSurveyGroupEditable);

              if (editableSurveyGroup) {
                const params = stringify({
                  projectId,
                  surveyGroupId: editableSurveyGroup.id,
                  wizardEditMode: true,
                });

                const path = dynamicMap.superUser.surveySettings();

                history.replace(`${path}${params}`);
              } else {
                const path = dynamicMap.superUser.surveyGroupsList({
                  projectId,
                });

                history.replace(path);
              }
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

                  setQuery({ projectId });
                }}
                extrainfoLink={dynamicMap.superUser.bankSurveyGroups()}
                placeholder="Search"
                options={SurveyGroupRef}
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
                // loading={loading}
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
  fetchSingleProject: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  fetchProjectSurveyGroups: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  project: PropTypes.shape({
    data: PropTypes.shape({
      projectSurveyGroups: PropTypes.arrayOf(PropTypes.object),
    }),
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
  project: {
    data: {
      projectSurveyGroups: [],
    },
  },
};

export default ProjectInfo;
