import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { notification } from 'antd';

import { useQuery } from '../../../hooks/useQuery';
import * as TEMPLATES from './Helper/EmailTemplates';

import pascalize from '../../../lib/pascalize';

import MainLayout from '../../Common/Layout';
import Button from '../../Common/Button';
import Loading from '../../Common/Loading';
import TextEditor from '../../Common/TextEditor';

const EmailTemplate = ({ loading }) => {
  const [parsedQuery] = useQuery();
  const { projectId, surveyGroupId } = parsedQuery;
  const { template } = useParams();
  const history = useHistory();
  const { search } = history?.location;

  const [error, setError] = React.useState(false);

  const chosenTemplate = pascalize(template, { splitBy: '-' });

  const [emailTemplate, setEmailTemplate] = React.useState();

  const templateKey = `${chosenTemplate}-${projectId}-${surveyGroupId}`;

  React.useEffect(() => {
    const val = localStorage.getItem(templateKey);

    setEmailTemplate(val || TEMPLATES[chosenTemplate] || TEMPLATES.reminderEmails);
  }, [templateKey, chosenTemplate]);

  const pageTitle = (template.charAt(0).toUpperCase() + template.slice(1)).replaceAll('-', ' ');

  const addTag = (title) => {
    let temp = emailTemplate;

    temp = `${temp} <% ${title} %>`;

    setEmailTemplate(temp);
  };

  const validateTableData = () => {
    const table = document.querySelector('.text-editor-table');
    const cells = table.querySelectorAll('td');

    const notify = (description) => {
      notification.error({
        message: 'Invalid table data',
        description,
      });
    };

    const errors = [];

    cells.forEach((cell) => {
      if (
        !cell.innerText ||
        typeof cell.innerText !== 'string' ||
        cell.innerText.trim().length < 1
      ) {
        return errors.push('table cell cannot be empty');
      }

      ['John Doe', 'Your Peer', 'DD / MM / YYYY', 'DD / MM / YYYY'].forEach((val) => {
        if (cell.innerText === val) {
          return errors.push(`${val} is not valid for table cell data`);
        }
      });
    });

    if (errors.length > 0) {
      setError(true);

      errors.forEach((description) => notify(description));
      return true;
    }

    setError(false);
    return false;
  };

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
            <Button
              onClick={() => addTag('PROJECT_NAME')}
              size="middle"
              text="Project Name"
              textSize="base"
              className="px-3  mr-3"
            />
            <Button
              onClick={() => addTag('RATER')}
              size="middle"
              text="Rater"
              textSize="base"
              className="mr-3"
            />
            <Button onClick={() => addTag('SENDER')} size="middle" text="Sender" textSize="base" />
          </div>

          <div className="flex flex-row">
            <Button
              onClick={() => history.replace(`/super-user/new-project/email-settings${search}`)}
              className="w-24.5 h-9.5"
              size="middle"
              type="link"
              textSize="base"
              text="Cancel"
            />
            <Button
              disabled={!!error}
              className="w-24.5 h-9.5"
              size="middle"
              text="Save"
              onClick={() => {
                // validateTableData returns true if there aren't any errors
                if (!validateTableData(emailTemplate)) {
                  localStorage.setItem(templateKey, emailTemplate);
                  history.replace(`/super-user/new-project/email-settings${search}`);
                }
              }}
              textSize="base"
            />
          </div>
        </div>

        <TextEditor
          wrapperClassName="my-12"
          value={emailTemplate}
          onChange={(val) => {
            setError(false);

            setEmailTemplate(val);
          }}
          options={{ minHeight: '500px' }}
        />
      </div>
    </MainLayout>
  );
};

EmailTemplate.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default EmailTemplate;
