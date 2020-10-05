import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';

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
  createProjectForOrganization,
}) => {
  const schema = yup.object({
    organization: yup.object({ value: yup.string().required('Organization Name Cannot Be Empty') }),
    project: yup.string().required('Project Name Cannot Be Empty'),
    surveyGroup: yup.string().required('You Must Specify At least 1 Survey Category'),
  });
  const [selectedSurveyGroups, setSelectedSurveyGroups] = React.useState([]);
  const [parsedQuery, query, setQuery] = useQuery();

  const onTagClose = (label) => {
    const newSurveyGroups = [];
    selectedSurveyGroups.forEach((item) => {
      if (item.label.toLowerCase() !== label.toLowerCase()) {
        newSurveyGroups.push(item);
      }
    });

    setSelectedSurveyGroups(newSurveyGroups);
  };

  React.useEffect(() => {
    const organizationQuery = stringify(parse({ q: parsedQuery.oq }));
    fetchOrganizations(organizationQuery);

    const surveyQuery = stringify(parse({ q: parsedQuery.sq }));
    fetchSurveyGroups(surveyQuery);
  }, [query, fetchSurveyGroups, fetchOrganizations, parsedQuery.oq, parsedQuery.sq]);

  return (
    <MainLayout
      hasBreadCrumb={false}
      contentClass="flex flex-row min-h-screen items-center justify-around p-0"
    >
      <div className="bg-white rounded-7px  sm:px-16 sm:pb-18 sm:pt-22 px-4 py-6">
        <Formik
          initialValues={{
            organization: {},
            project: '',
            surveyGroup: [],
          }}
          validationSchema={schema}
          onSubmit={({ organization, project, surveyGroup }) => {
            const surveyGroupIds = surveyGroup?.map((el) => el.id);

            createProjectForOrganization({
              organizationId: organization.id,
              name: project,
              surveyGroupIds,
            });
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
                wrapperClassName="c-min-w-form-input mb-6"
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
                wrapperClassName="c-min-w-form-input mb-6"
                labelText="Survay Group"
                extrainfoText="Create New"
                onSelect={(val) => {
                  setFieldValue('surveyGroup', [...values.surveyGroup, val]);
                  setQuery(null);
                }}
                extrainfoLink="#"
                placeholder="Search"
                options={surveyGroups.map(({ name, id }) => ({
                  label: name,
                  value: name,
                  id,
                }))}
                onChange={(txt) => setQuery({ sq: txt })}
                value={parsedQuery.sq}
                errorMessage={touched.surveyGroup && errors.surveyGroup}
                loading={loading}
              />

              {values.surveyGroup?.length > 0 ? (
                <div className="flex flex-row align-center">
                  {values.surveyGroup.map((el, i) => (
                    <Tag key={i} closable onClose={onTagClose} color="gray" text={el.label} />
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
  fetchOrganizations: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  createProjectForOrganization: PropTypes.func.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  surveyGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProjectInfo;
