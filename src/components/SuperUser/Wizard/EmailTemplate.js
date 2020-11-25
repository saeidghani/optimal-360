import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { notification } from 'antd';
import moment from 'moment';

import { useQuery } from '../../../hooks/useQuery';
import * as TEMPLATES from './Helper/EmailTemplates';
import { dynamicMap } from '../../../routes/RouteMap';

import pascalize from '../../../lib/pascalize';

import MainLayout from '../../Common/Layout';
import Button from '../../Common/Button';
import Loading from '../../Common/Loading';
import TextEditor from '../../Common/TextEditor';

const TAGS = {
  raterVerificationEmail: [
    {
      title: 'Project Name',
      value: 'PROJECT_NAME',
    },
    {
      title: 'Rater',
      value: 'RATER',
    },
    {
      title: 'Sender',
      value: 'SENDER',
    },
  ],
  loginEmailSelf: [
    {
      title: 'Project Name',
      value: 'PROJECT_NAME',
    },
    {
      title: 'Rater',
      value: 'RATER',
    },
    {
      title: 'Sender',
      value: 'SENDER',
    },
  ],
  loginEmailOthers: [
    {
      title: 'Project Name',
      value: 'PROJECT_NAME',
    },
    {
      title: 'Rater',
      value: 'RATER',
    },
    {
      title: 'Sender',
      value: 'SENDER',
    },
  ],
  resetPasswordEmail: [
    {
      title: 'Project Name',
      value: 'PROJECT_NAME',
    },
    {
      title: 'Rater',
      value: 'RATER',
    },
    {
      title: 'Sender',
      value: 'SENDER',
    },
  ],
  reminderEmails: [
    {
      title: 'Project Name',
      value: 'PROJECT_NAME',
    },
    {
      title: 'Rater',
      value: 'RATER',
    },
    {
      title: 'Sender',
      value: 'SENDER',
    },
    {
      title: 'End Date',
      value: 'END_DATE',
    },
    {
      title: 'Rater Login Id',
      value: 'RATER_LOGIN_ID',
    },
    {
      title: 'password',
      value: 'PASSWORD',
    },
    {
      title: 'Survey Link',
      value: 'SURVEY_LINK',
    },
    {
      title: 'Relation Table Include Self',
      value: 'RELATION_TABLE_INCLUDE_SELF',
    },
    {
      title: 'Relation Table Exclude Self',
      value: 'RELATION_TABLE_EXCLUDE_SELF',
    },
  ],
};

const EmailTemplate = ({ loading }) => {
  const [parsedQuery] = useQuery();
  const { projectId, surveyGroupId } = parsedQuery;
  const { template } = useParams();
  const history = useHistory();
  const { search } = history?.location;

  const [error, setError] = React.useState(false);
  const [emailTemplate, setEmailTemplate] = React.useState();

  const chosenTemplate = pascalize(template, { splitBy: '-' });
  const templateKey = `${chosenTemplate}-${projectId}-${surveyGroupId}`;
  const pageTitle = (template.charAt(0).toUpperCase() + template.slice(1)).replaceAll('-', ' ');

  React.useEffect(() => {
    const val = localStorage.getItem(templateKey);

    setEmailTemplate(val || TEMPLATES[chosenTemplate] || TEMPLATES.reminderEmails);
  }, [templateKey, chosenTemplate]);

  const addTag = (title) => {
    document.execCommand('insertText', false, `<% ${title} %>`);
  };

  const validateTableData = () => {
    const table = document.querySelector('#text-editor-table');

    if (!table) return false;

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

      if (
        cell.classList.contains('date-td') &&
        !moment(cell.innerText.trim().replaceAll(' ', ''), 'DD/MM/YYYY', true).isValid()
      ) {
        return errors.push(`${cell.innerText} is not a valid date format`);
      }
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
          <div className="inline-flex flex-row flex-wrap">
            {(TAGS[chosenTemplate] || TAGS.reminderEmails).map(({ title, value }) => (
              <Button
                key={value}
                onClick={() => addTag(value)}
                size="middle"
                text={title}
                textSize="base"
                className="my-2 mr-3"
              />
            ))}
          </div>

          <div className="flex flex-row">
            <Button
              onClick={() => {
                const path = dynamicMap.superUser.emailSettings();

                history.replace(`${path}${search}`);
              }}
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

                  const path = dynamicMap.superUser.emailSettings();

                  history.replace(`${path}${search}`);
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
          labelClass="font-normal text-body text-base leading-snug mb-3.5"
        />
      </div>
    </MainLayout>
  );
};

EmailTemplate.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default EmailTemplate;
