import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { useQuery, stringify } from '../../hooks/useQuery';
import { useSurveyGroup } from '../../hooks';

import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';

import MainLayout from '../Common/Layout';
import Loading from '../Common/Loading';
import Menu from './Helper/Menu';
import Steps from '../Common/Steps';
import Button from '../Common/Button';
import TextEditor from '../Common/TextEditor';
import UploadAvatar from '../Common/UploadAvatar';

const SurveyIntro = ({ surveyIntro, fetchSurveyIntro, setSurveyIntro, loading }) => {
  const history = useHistory();
  const { search } = history?.location;

  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();

  const formRef = React.useRef();
  const schema = yup.object({
    clientWelcomeMessage: yup.string().required('client welcome message is required'),
    clientPicture: yup.string().required('client picture is required'),
    surveyMessage: yup.string().required('survey message is required'),
  });

  const [parsedQuery, , setQuery] = useQuery();
  const { projectId } = parsedQuery;

  React.useEffect(() => {
    const resetForm = async () => {
      await fetchSurveyIntro(surveyGroupId);

      if (formRef?.current) {
        // reset form state when surveyGroup changes
        // happens when user decides to discard current settings and changes currentSurveyGroup
        formRef.current.setTouched({});
        formRef.current.setErrors({});
        formRef.current.setValues({ ...formRef?.current?.values });
      }
    };

    if (surveyGroupId) {
      resetForm();
    }

    // eslint-disable-next-line
  }, [fetchSurveyIntro, surveyGroupId]);

  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [isFormDone, setIsFormDone] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');

  React.useEffect(() => {
    if (surveyGroupId) fetchSurveyIntro(surveyGroupId);
  }, [projectId, surveyGroupId, fetchSurveyIntro]);

  React.useEffect(() => {
    if (
      isFormDone &&
      selectedSurveyGroupKey &&
      selectedSurveyGroupKey !== parsedQuery?.surveyGroupId
    ) {
      setQuery({ surveyGroupId: selectedSurveyGroupKey });
      setIsFormDone(false);
      setSurveyGroupModal(false);
    }
  }, [isFormDone, selectedSurveyGroupKey, setQuery, parsedQuery.surveyGroupId]);

  React.useEffect(() => {
    const validateForm = async () => {
      try {
        const errorObj = await formRef.current.validateForm(formRef?.current?.values);

        if (errorObj && Object.values(errorObj).length > 0) {
          throw errorObj;
        } else {
          setIsFormDone(true);
        }
      } catch (errorObj) {
        formRef.current.setErrors(errorObj);
        formRef.current.setTouched(errorObj);

        if (selectedSurveyGroupKey !== parsedQuery?.surveyGroupId) setSurveyGroupModal(true);
      }
    };

    if (selectedSurveyGroupKey && formRef?.current) {
      validateForm(formRef?.current?.values);
    }

    // eslint-disable-next-line
  }, [selectedSurveyGroupKey]);

  return (
    <MainLayout
      hasBreadCrumb
      title="Super User"
      titleClass="mb-2"
      contentClass="py-4"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <Loading visible={loading} />

      <ChangeSurveyGroupModal
        handleOk={() => {
          setIsFormDone(true);
        }}
        handleCancel={() => {
          setSelectedSurveyGroupKey('');
          setSurveyGroupModal(false);
        }}
        currentSurveyGroup={currentSurveyGroupName}
        visible={surveyGroupModal}
      />

      <div className="bg-white grid grid-cols-12 pl-15">
        <Menu
          onClick={(key) => setSelectedSurveyGroupKey(key)}
          isFormDone={isFormDone}
          items={surveyGroups?.data}
          className="col-span-2"
        />

        <div className="px-6 py-5 col-start-3 col-span-10  ">
          <Steps currentPosition={2} />

          <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={surveyIntro}
            validationSchema={schema}
            onSubmit={async (values) => {
              try {
                await setSurveyIntro({ ...values, surveyGroupId });
                history.push(`/super-user/new-project/survey-questions${search}`);
              } catch (error) {}
            }}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <UploadAvatar
                  wrapperClassName="mt-14 mb-3"
                  onFileUpload={(file) => setFieldValue('clientPicture', file)}
                  image={values.clientPicture}
                />
                {touched.clientPicture && errors.clientPicture && (
                  <p className="ml-2 text-red-500 py-2">{errors.clientPicture}</p>
                )}

                <div className=" mt-10 pr-28">
                  <TextEditor
                    placeholder="Client Welcome Message"
                    label="Client Welcome Message"
                    value={values.clientWelcomeMessage}
                    onChange={(val) => setFieldValue('clientWelcomeMessage', val)}
                  />
                  {touched.clientWelcomeMessage && errors.clientWelcomeMessage && (
                    <p className="text-red-500 py-2">{errors.clientWelcomeMessage}</p>
                  )}

                  <TextEditor
                    placeholder="Survey Message"
                    label="Survey Message"
                    value={values.surveyMessage}
                    onChange={(val) => setFieldValue('surveyMessage', val)}
                    wrapperClassName="mt-18"
                  />
                  {touched.surveyMessage && errors.surveyMessage && (
                    <p className="text-red-500 py-2">{errors.surveyMessage}</p>
                  )}

                  <div className="pt-23.5 pb-22 flex justify-end">
                    <Button
                      className="w-24.5 h-9.5"
                      type="link"
                      onClick={() => {
                        const params = stringify({
                          projectId: parsedQuery?.projectId,
                          surveyGroupId: parsedQuery?.surveyGroupId,
                        });

                        history.push(`/super-user/new-project/email-settings${params}`);
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
  }),
};

SurveyIntro.defaultProps = {
  surveyIntro: { clientPicture: '', clientWelcomeMessage: '', surveyMessage: '' },
};

export default SurveyIntro;
