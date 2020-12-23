import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import { useQuery, stringify } from '../../../hooks/useQuery';
import { dynamicMap } from '../../../routes/RouteMap';

import MainLayout from '../../Common/Layout';
import Button from '../../Common/Button';
import Loading from '../../Common/Loading';
import TextEditor from '../../Common/TextEditor';
import TextArea from '../../Common/TextArea';

const EmailTemplate = ({ loading, emailSettings, setEmailSettingsData }) => {
  const [parsedQuery] = useQuery();
  const { projectId, surveyGroupId } = parsedQuery;

  const params = useParams();
  const history = useHistory();

  const selectedEmailTemplateIndex = emailSettings?.emailTemplates?.findIndex(
    (el) => el.id * 1 === params?.id * 1 && el.name === params?.name,
  );
  const selectedEmailTemplate = emailSettings?.emailTemplates?.[selectedEmailTemplateIndex];

  const [emailSettingsCopy, setEmailSettingsCopy] = React.useState(emailSettings);

  React.useEffect(() => {
    setEmailSettingsCopy({ ...emailSettings });
  }, [JSON.stringify(emailSettings)]);

  const addTag = (title) => {
    document.execCommand('insertText', false, `<% ${title} %>`);
  };

  const updateTemplate = (key, value) => {
    const newValues = { ...emailSettings };
    newValues.emailTemplates[selectedEmailTemplateIndex][key] = value;

    setEmailSettingsCopy({ ...newValues });
  };

  return (
    <MainLayout
      wizardLayout
      breadCrumbItems={['New Project', params?.name]}
      title="Super User"
      titleClass="mb-4.5"
      contentClass="py-4"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <Loading visible={loading} />

      <div className="bg-white pl-21 pr-6 py-12">
        <p className="text-body text-xl mb-6">{selectedEmailTemplate?.name}</p>

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            {[
              [
                { tag: 'PROJECT_NAME', label: 'Project Name' },
                { tag: 'RATER', label: 'Rater' },
                { tag: 'SENDER', label: 'Sender' },
                { tag: 'SURVEY_LINK', label: 'Survey Link' },
                { tag: 'RELATION_TABLE_EXCLUDE_SELF', label: 'Relation Table Exclude Self' },
              ],
              [
                { tag: 'RATER_LOGIN_ID', label: 'Rater Login Id' },
                { tag: 'PASSWORD', label: 'Password' },
                { tag: 'START_DATE', label: 'Start Date' },
                { tag: 'END_DATE', label: 'End Date' },
                { tag: 'RELATION_TABLE_INCLUDE_SELF', label: 'Relation Table Include Self' },
              ],
            ].map((rowArr) => (
              <div className="inline-flex flex-row flex-wrap">
                {rowArr.map(({ tag, label }) => (
                  <Button
                    onClick={() => addTag(tag)}
                    size="middle"
                    text={label}
                    textSize="base"
                    textClassName="text-primary-500"
                    className="mr-3 my-2 border-0 bg-primary-500 bg-opacity-15
                    hover:bg-primary-500 hover:bg-opacity-15 focus:bg-primary-500 focus:bg-opacity-15"
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-row">
            <Button
              onClick={() => {
                const path = dynamicMap.superUser.emailSettings();
                const newParams = stringify({ projectId, surveyGroupId });

                history.replace(`${path}${newParams}`);
              }}
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
              onClick={async () => {
                const path = dynamicMap.superUser.emailSettings();
                const newParams = stringify({
                  projectId,
                  surveyGroupId,
                  wizardEditMode: parsedQuery?.wizardEditMode,
                });

                await setEmailSettingsData({ ...emailSettingsCopy });

                history.replace(`${path}${newParams}`);
              }}
              textSize="base"
            />
          </div>
        </div>

        <TextArea
          name="Email Subject"
          value={selectedEmailTemplate?.subject}
          onChange={(e) => updateTemplate('subject', e.target.value)}
          label="Email Subject"
          placeholder="Email Subject"
          errorMessage={selectedEmailTemplate?.subject ? '' : 'Email Subject Cannot be Empty'}
          wrapperClassName="my-6"
          labelClassName="text-base"
        />

        <TextEditor
          label="Email Body"
          wrapperClassName="my-12"
          value={selectedEmailTemplate?.template}
          onChange={(val) => updateTemplate('template', val)}
          options={{ minHeight: '500px' }}
          labelClass="font-normal text-body text-base leading-snug mb-3.5"
        />
      </div>
    </MainLayout>
  );
};

EmailTemplate.propTypes = {
  loading: PropTypes.bool.isRequired,
  setEmailSettingsData: PropTypes.func.isRequired,
  emailSettings: PropTypes.shape({
    emailSettings: PropTypes.arrayOf(PropTypes.object),
    emailTemplates: PropTypes.arrayOf(PropTypes.object),
  }),
};

EmailTemplate.defaultProps = {
  emailSettings: {
    emailSettings: [],
    emailTemplates: [],
  },
};

export default EmailTemplate;
