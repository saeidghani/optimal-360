import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { useQuery } from '../../../hooks/useQuery';
import { useSurveyGroup } from '../../../hooks';
import { dynamicMap } from '../../../routes/RouteMap';

import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';

import MainLayout from '../../Common/Layout';
import Loading from '../../Common/Loading';
import Menu from './Helper/Menu';
import Steps from '../../Common/Steps';
import Button from '../../Common/Button';
import TextEditor from '../../Common/TextEditor';
import Checkbox from '../../Common/Checkbox';

const LABELS = {
  contentPage: 'Content Page',
  competencyResults: 'Competency Results',
  clientCompetencyModel: 'Client Competency Model',
  behaviorResults: 'Behavior Results',
  ratersInformation: 'Rates Information',
  developmentFeedbackComment: 'Feedback/Comments (Development Areas)',
  missionCriticalCompetencies: 'Mission Critical Competencies',
  generalFeedbackComment: 'Feedback/Comments (General)',
  resultsOverview: 'Results Overview',
  developmentPlan: 'Development Plan',
  competencyLevelAndAwareness: 'Competency Level and Awareness',
  notesPage: 'Notes Page',
  addResponseDistribution: 'Add Response Distribution',

  averageScoreByCompetency: 'Average Score by Competency',
  missionCriticalCompetenciesByParticipants: 'Mission Critical Competencies by Participants',
  surveyCompletionStatus: 'Survey Completion Status',
  participantGapAnalysis: 'Participant Gap Analysis',
  groupResultsOverview: 'Group Results Overview',
  participantOverviewByCompetency: 'Participant Overview by Competency',
  averageScoreByCluster: 'Average Score by Cluster',
  participantOverviewByBehaviors: 'Participant Overview by Behaviors',
};

const Report = ({ reports, fetchReports, setReports, loading }) => {
  const formRef = React.useRef();
  const history = useHistory();

  const [parsedQuery, query, setQuery] = useQuery();
  const { projectId } = parsedQuery;

  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();

  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [isFormDone, setIsFormDone] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');

  React.useEffect(() => {
    if (!parsedQuery?.reportType) {
      setQuery({
        reportType: 'individualReport',
      });
    }

    // eslint-disable-next-line
  }, [query]);

  React.useEffect(() => {
    if (surveyGroupId) fetchReports(surveyGroupId);
  }, [projectId, surveyGroupId, fetchReports]);

  React.useEffect(() => {
    const resetForm = async () => {
      await fetchReports(surveyGroupId);

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
  }, [fetchReports, surveyGroupId]);

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

  const { reportType = '' } = parsedQuery || {};

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
          <Steps currentPosition={4} />

          <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={reports}
            onSubmit={async (values) => {
              try {
                await setReports({ surveyGroupId, ...values });

                const path = dynamicMap.superUser.addRatee();

                history.push(path);
              } catch (error) {
              }
            }}
          >
            {({ values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="flex mt-12 mb-3">
                  <Button
                    size="middle"
                    textSize="xs"
                    text="Individual Report"
                    className="mr-3"
                    onClick={() => setQuery({ reportType: 'individualReport' })}
                    light={parsedQuery?.reportType !== 'individualReport'}
                  />
                  <Button
                    size="middle"
                    textSize="xs"
                    text="Group Report"
                    onClick={() => setQuery({ reportType: 'groupReport' })}
                    light={parsedQuery?.reportType === 'individualReport'}
                  />
                </div>

                <div className="grid grid-cols-12 mt-3">
                  <div
                    className="col-span-12 flex flex-row items-center bg-antgray-600 py-5 px-8.3 border-b border-antgray-900">
                    <Checkbox
                      className="flex flex-row items-center"
                      onChange={(value) => {
                        const newValues = { ...values };

                        Object.keys(newValues[reportType]).forEach((key) => {
                          if (LABELS[key]) {
                            newValues[reportType][key] = value;
                          }
                        });

                        formRef.current.setValues({ ...newValues });
                      }}
                      checked={
                        !Object.entries(values[reportType] || {}).find(
                          ([key, value]) =>
                            !!(LABELS[key] && typeof value === 'boolean' && value === false),
                        )
                      }
                      textNode={
                        <p className="text-antgray-100 text-xs leading-4 ml-8 whitespace-no-wrap">
                          Report content:
                        </p>
                      }
                    />
                  </div>

                  {Object.entries(values[reportType] || {}).map(([key, value], i) => {
                    return LABELS[key] ? (
                      // eslint-disable-next-line react/jsx-indent
                      <div
                        key={key}
                        className={`col-span-6 py-5 px-8.3 flex flex-row items-center ${
                          i > 0 && 'border-b border-antgray-900'
                        }`}
                      >
                        <Checkbox
                          className="flex flex-row items-center"
                          onChange={(newVal) => {
                            const newValues = { ...values };

                            newValues[reportType][key] = newVal;

                            formRef.current.setValues({ ...newValues });
                          }}
                          checked={value}
                          textNode={
                            <p className="text-body text-xs leading-4 ml-8 whitespace-no-wrap">
                              {LABELS[key]}
                            </p>
                          }
                        />
                      </div>
                    ) : null;
                  })}
                </div>

                <div className="flex flex-col pl-8 pr-10">
                  <TextEditor
                    wrapperClassName="w-full mt-16"
                    value={values[reportType]?.competencyModelTemplate}
                    onChange={(val) => {
                      const newValues = { ...(formRef.current?.values || {}) };

                      if (newValues[reportType] && formRef?.current) {
                        newValues[reportType].competencyModelTemplate = val;

                        formRef.current.setValues({ ...newValues });
                      }
                    }}
                    placeholder="Client Competency Model"
                    label="Client Competency Model:"
                    labelClass="font-normal text-base leading-snug mb-3.5   font-medium text-heading"
                  />

                  <p className="w-full mt-12 text-base font-medium">Additional Report Setting:</p>

                  <div className="flex flex-row items-center">
                    <Checkbox
                      className="flex flex-row items-center py-5"
                      checked={!!values[reportType]?.includePreviousResults}
                      onChange={(val) => {
                        const newValues = { ...values };

                        newValues[reportType].includePreviousResults = val;

                        formRef.current.setValues({ ...newValues });
                      }}
                      textNode={
                        <p
                          className={`text-heading font-medium ${
                            !values[reportType]?.includePreviousResults && 'opacity-30'
                          }`}
                        >
                          Include Previous Results Data
                        </p>
                      }
                    />

                    <Checkbox
                      className="flex flex-row items-center py-5"
                      checked={!!values[reportType]?.includeMissionCriticalData}
                      onChange={(val) => {
                        const newValues = { ...values };

                        newValues[reportType].includeMissionCriticalData = val;

                        formRef.current.setValues({ ...newValues });
                      }}
                      textNode={
                        <p
                          className={`text-heading font-medium ${
                            !values[reportType]?.includeMissionCriticalData && 'opacity-30'
                          }`}
                        >
                          Include Mission Critical Data
                        </p>
                      }
                    />
                  </div>

                  <div className="pt-23.5 pb-22 flex justify-end">
                    <Button className="w-24.5 h-9.5" onClick={handleSubmit} text="Submit" />
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

Report.propTypes = {
  fetchReports: PropTypes.func.isRequired,
  setReports: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reports: PropTypes.shape({
    clientPicture: PropTypes.string,
    clientWelcomeMessage: PropTypes.string,
    surveyMessage: PropTypes.string,
  }),
};

Report.defaultProps = {
  reports: { clientPicture: '', clientWelcomeMessage: '', surveyMessage: '' },
};

export default Report;
