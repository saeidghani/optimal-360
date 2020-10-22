import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { useQuery } from '../../hooks/useQuery';

import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';

import MainLayout from '../Common/Layout';
import Loading from '../Common/Loading';
import Menu from './Helper/Menu';
import Steps from '../Common/Steps';
import Button from '../Common/Button';
import TextEditor from '../Common/TextEditor';
import UploadAvatar from '../Common/UploadAvatar';

const SurveyIntro = ({
  surveyIntro,
  fetchSurveyIntro,
  fetchSurveyGroups,
  setSurveyIntro,
  loading,
  surveyGroups,
}) => {
  const history = useHistory();
  const { search } = history?.location;

  const formRef = React.useRef();
  const schema = yup.object({
    clientWelcomeMessage: yup.string().required('client welcome message is required'),
    clientPicture: yup.string().required('client picture is required'),
    surveyMessage: yup.string().required('survey message is required'),
  });

  const [parsedQuery, , setQuery] = useQuery();
  const { projectId, surveyGroupId } = parsedQuery;

  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [isFormDone, setIsFormDone] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');

  React.useEffect(() => {
    fetchSurveyGroups(projectId);
  }, [projectId, surveyGroupId, fetchSurveyGroups]);

  React.useEffect(() => {
    if (surveyGroupId) fetchSurveyIntro(surveyGroupId);
  }, [projectId, surveyGroupId, fetchSurveyIntro]);

  React.useEffect(() => {
    const sortedArr = surveyGroups?.data?.sort((el1, el2) => el1.id - el2.id) || [];

    const firstSurveyGroupId = sortedArr?.length > 0 ? sortedArr[0].id : '';

    const isURLSurveyGroupValid = !!sortedArr.find(
      (el) => el.id?.toString() === parsedQuery?.surveyGroupId?.toString(),
    );

    if (
      !isURLSurveyGroupValid &&
      firstSurveyGroupId &&
      firstSurveyGroupId !== parsedQuery?.surveyGroupId
    ) {
      setQuery({ surveyGroupId: firstSurveyGroupId });
    }
    // eslint-disable-next-line
  }, [JSON.stringify(surveyGroups.data)]);

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

  const currentSurveyGroupName =
    surveyGroups?.data?.find((el) => el.id.toString() === parsedQuery?.surveyGroupId?.toString())
      ?.name || '';

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
                history.push(`/super-user/new-project/survey-intro${search}`);
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

                  <div className="pt-23.5 pb-22 flex justify-end pr-33">
                    <Button type="link" text="Back" />
                    <Button onClick={handleSubmit} text="Next" />
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
  fetchSurveyGroups: PropTypes.func.isRequired,
  fetchSurveyIntro: PropTypes.func.isRequired,
  setSurveyIntro: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveyGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    timeStamp: PropTypes.number,
  }),
  surveyIntro: PropTypes.shape({
    clientPicture: PropTypes.string,
    clientWelcomeMessage: PropTypes.string,
    surveyMessage: PropTypes.string,
  }),
};

SurveyIntro.defaultProps = {
  surveyGroups: {
    data: [],
  },
  surveyIntro: { clientPicture: '', clientWelcomeMessage: '', surveyMessage: '' },
};

export default SurveyIntro;
