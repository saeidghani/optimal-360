import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { useQuery, stringify } from '../../../hooks/useQuery';
import { useSurveyGroup } from '../../../hooks';
import { dynamicMap } from '../../../routes/RouteMap';

import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';

import MainLayout from '../../Common/Layout';
import Loading from '../../Common/Loading';
import Menu from './Helper/Menu';
import Steps from '../../Common/Steps';
import Button from '../../Common/Button';
import TextEditor from '../../Common/TextEditor';
import UploadAvatar from '../../Common/UploadAvatar';
import Input from '../../Common/Input';

const SurveyIntro = ({ surveyIntro, fetchSurveyIntro, setSurveyIntro, loading }) => {
  const history = useHistory();
  const { search } = history?.location;
  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();

  const formRef = React.useRef();
  const schema = yup.object({
    clientWelcomeMessage: yup.string().required('client welcome message is required'),
    clientPicture: yup.string().required('client picture is required'),
    surveyMessage: yup.string().required('survey message is required'),
    clientName: yup.string().required('client name is required'),
    clientJob: yup.string().required('client job position is required'),
  });

  const [parsedQuery] = useQuery();
  const { projectId } = parsedQuery;

  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');

  React.useEffect(() => {
    if (surveyGroupId) fetchSurveyIntro(surveyGroupId);
  }, [surveyGroupId, fetchSurveyIntro]);

  return (
    <MainLayout
      wizardLayout
      breadCrumbItems={['New Project', 'Survey Intro']}
      title="Super User"
      titleClass="mb-2"
      contentClass="pt-4"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <Loading visible={loading} />

      <ChangeSurveyGroupModal
        handleOk={() => {
          const path = dynamicMap.superUser.surveySettings();
          const params = stringify({
            projectId,
            surveyGroupId: selectedSurveyGroupKey,
            wizardEditMode: parsedQuery?.wizardEditMode,
          });

          history.push(`${path}${params}`);
        }}
        handleCancel={() => {
          setSelectedSurveyGroupKey('');
          setSurveyGroupModal(false);
        }}
        currentSurveyGroup={currentSurveyGroupName}
        visible={surveyGroupModal}
      />

      <div className="bg-white grid grid-cols-12 pl-15">
        {!parsedQuery?.wizardEditMode ? (
          <Menu
            onClick={(key) => {
              setSurveyGroupModal(true);
              setSelectedSurveyGroupKey(key);
            }}
            items={surveyGroups?.data}
            className="col-span-2"
          />
        ) : null}

        <div
          className={`px-6 py-5 col-span-10 ${parsedQuery?.wizardEditMode ? 'col-start-2' : 'col-start-3'
            } `}
        >
          <Steps wizardSteps currentPosition={2} />

          <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={surveyIntro}
            validationSchema={schema}
            onSubmit={async (values) => {
              try {
                await setSurveyIntro({ ...values, surveyGroupId });

                const path = dynamicMap.superUser.surveyQuestions();

                history.push(`${path}${search}`);
              } catch (error) { }
            }}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <UploadAvatar
                  wrapperClassName="mt-14 mb-3"
                  originalFile={surveyIntro?.clientPicture}
                  setFile={(file) => setFieldValue('clientPicture', file)}
                  file={values.clientPicture}
                  className="w-24.5 h-9.5"
                />
                {touched.clientPicture && errors.clientPicture && (
                  <p className="ml-2 text-red-500 py-2">{errors.clientPicture}</p>
                )}

                <div className=" mt-10 pr-28">
                  <TextEditor
                    placeholder="Client Welcome Message"
                    label="Client Welcome Message"
                    labelClass="font-normal text-body text-base leading-snug mb-3.5"
                    value={values.clientWelcomeMessage}
                    onChange={(val) => setFieldValue('clientWelcomeMessage', val)}
                  />
                  {touched.clientWelcomeMessage && errors.clientWelcomeMessage && (
                    <p className="text-red-500 py-2">{errors.clientWelcomeMessage}</p>
                  )}

                  <TextEditor
                    placeholder="Survey Message"
                    label="Survey Message"
                    labelClass="font-normal text-body text-base leading-snug mb-3.5"
                    value={values.surveyMessage}
                    onChange={(val) => setFieldValue('surveyMessage', val)}
                    wrapperClassName="mt-18"
                  />
                  {touched.surveyMessage && errors.surveyMessage && (
                    <p className="text-red-500 py-2">{errors.surveyMessage}</p>
                  )}

                  <div className="mt-18 flex flex-row justify-between">
                    <div className="flex items-baseline">
                      <span>Client Name:</span>
                      <Input
                        placeholder="Client Name"
                        inputClass="text-14px"
                        wrapperClassName="ml-6 w-64"
                        value={values.clientName}
                        onChange={(e) => setFieldValue('clientName', e.target.value)}
                        errorMessage={touched.clientName && errors.clientName && (
                          <p className="text-red-500 pt-2">{errors.clientName}</p>
                        )}
                      />
                    </div>
                    <div className="flex items-baseline">
                      <span>Client Job Position:</span>
                      <Input
                        placeholder="Client Job Position"
                        inputClass="text-14px"
                        wrapperClassName="ml-6 w-64"
                        value={values.clientJob}
                        onChange={(e) => setFieldValue('clientJob', e.target.value)}
                        errorMessage={touched.clientJob && errors.clientJob && (
                          <p className="text-red-500 pt-2">{errors.clientJob}</p>
                        )}
                      />
                    </div>
                  </div>
                  <div className="pt-8 pb-22 flex justify-end">
                    <Button
                      className="w-24.5 h-9.5"
                      type="link"
                      onClick={() => {
                        const params = stringify({
                          projectId: parsedQuery?.projectId,
                          surveyGroupId: parsedQuery?.surveyGroupId,
                          wizardEditMode: parsedQuery?.wizardEditMode,
                        });

                        const path = dynamicMap.superUser.emailSettings();

                        history.push(`${path}${params}`);
                      }}
                      text="Back"
                    />
                    <Button className="w-24.5 h-9.5" text="Next" onClick={handleSubmit} />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

SurveyIntro.propTypes = {
  fetchSurveyIntro: PropTypes.func.isRequired,
  setSurveyIntro: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveyIntro: PropTypes.shape({
    clientPicture: PropTypes.string,
    clientWelcomeMessage: PropTypes.string,
    surveyMessage: PropTypes.string,
    clientName: PropTypes.string,
    clientJob: PropTypes.string,
  }),
};

SurveyIntro.defaultProps = {
  surveyIntro: {
    clientPicture: '',
    clientWelcomeMessage: '',
    surveyMessage: '',
    clientName: '',
    clientJob: '',
  },
};

export default SurveyIntro;
