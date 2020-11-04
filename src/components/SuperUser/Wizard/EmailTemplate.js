import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
// import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '../../../hooks/useQuery';

import * as TEMPLATES from './Helper/EmailTemplates';

import pascalize from '../../../lib/pascalize';

import MainLayout from '../../Common/Layout';
import Button from '../../Common/Button';
import Loading from '../../Common/Loading';
import TextEditor from '../../Common/TextEditor';

const EmailTemplate = ({ loading, fetchSingleProject, singleProject, selectedTemplate }) => {
  const [parsedQuery] = useQuery();
  const { projectId, surveyGroupId } = parsedQuery;
  const { data: projectData = {} } = singleProject || {};

  const { template } = useParams();

  const chosenTemplate = pascalize(template, { splitBy: '-' });

  if (!TEMPLATES[chosenTemplate]) {
    console.warn(`Template ${template} does not exist`);
  }

  React.useEffect(() => {
    fetchSingleProject(projectId);
  }, [projectId, fetchSingleProject]);

  const [emailTemplate, setEmailTemplate] = React.useState(selectedTemplate);

  const pageTitle = (template.charAt(0).toUpperCase() + template.slice(1)).replaceAll('-', ' ');

  return (
    <MainLayout
      hasBreadCrumb
      title="Super User"
      titleClass="mb-4.5"
      contentClass="py-4"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <Loading visible={loading} />

      <div className="bg-white pl-21 pr-6 py-12">
        <p className="text-body text-xl mb-6">{pageTitle}</p>

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row">
            <Button size="middle" text="Project Name" textSize="base" className="px-3  mr-3" />
            <Button size="middle" text="Rater" textSize="base" className=" mr-3" />
            <Button size="middle" text="Sender" textSize="base" className="" />
          </div>

          <div className="flex flex-row">
            <Button
              className="w-24.5 h-9.5"
              size="middle"
              type="link"
              textSize="base"
              text="Cancel"
            />
            <Button
              className="w-24.5 h-9.5"
              size="middle"
              text="Save"
              onClick={() => {
                const templateKey = `${projectId}-${surveyGroupId}`;
                localStorage.setItem(
                  templateKey,
                  JSON.stringify({ [chosenTemplate]: emailTemplate }),
                );
              }}
              textSize="base"
            />
          </div>
        </div>

        <TextEditor
          wrapperClassName="my-12"
          value={emailTemplate}
          onChange={setEmailTemplate}
          data={{
            PROJECT_NAME: projectData.name,
            SENDER: 'guy 1',
            RATER: 'guy 2',
            table: {
              header: ['Name', 'Relationship', 'Start Date', 'End Date'],
              body: [
                ['X1', 'Y1', '12', '34'],
                ['X2', 'Y2', '56', '78'],
              ],
            },
          }}
          options={{ minHeight: '500px' }}
        />
      </div>
    </MainLayout>
  );
};

EmailTemplate.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchSingleProject: PropTypes.func.isRequired,
  singleProject: PropTypes.shape({
    data: PropTypes.shape({}),
  }),
};

EmailTemplate.defaultProps = {
  singleProject: {
    data: {},
  },
};

export default EmailTemplate;