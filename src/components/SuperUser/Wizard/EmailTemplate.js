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
          <div className="inline-flex flex-row flex-wrap">
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
