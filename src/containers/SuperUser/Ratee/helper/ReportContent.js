import React from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '../../../../hooks';

import { Form, Formik } from 'formik';
import { Checkbox, Spin } from 'antd';

const CheckboxGroup = Checkbox.Group;
const LABELS = {
  introduction: 'INTRODUCTION',
  aboutTheOptimalReport: 'About the Optimal360 Report',
  theCompetencyModel: 'The Competency Model',
  resultsOverview: 'RESULTS OVERVIEW',
  yourRaters: 'Your Raters',
  yourCompetencyResults: 'Your Competency Results',
  yourCompetencyRating: 'Your Competency Rating',
  yourMissionCriticalSummary: 'Your Mission Critical Summary',
  yourSelfAwarenessMatrix: 'Your Self-awareness Matrix',
  detailedCompetencyResults: 'DETAILED COMPETENCY RESULTS',
  individualCompetencies: 'Individual Competencies',
  ratersWrittenFeedback: 'RATER’s WRITTEN FEEDBACK',
  competencyFeedback: 'Competency Feedback',
  developFeedback: 'Development Feedback',
  generalFeedback: 'General Feedback',
  responseDistribution: 'RESPONSE DISTRIBUTION',
  howToReadThisSection: 'How to Read this Section',
  overviewForAllCompetencies: 'Overview for all Competencies',
  distributionByIndividualCompetencies: 'Distribution by Individual Competencies',
  developmentPlan: 'DEVELOPMENT PLAN',
  developmentGuidelines: 'Development Guidelines',
  planningYourDevelopment: 'Planning Your Development',
  appendix: 'APPENDIX',
  competencyModelDefinitions: 'Competency Model – Competency Definitions',

  ratersAndCompletionRate: 'RATERS AND COMPLETION RATE',
  surveyCompletionStatus: 'Survey Completion Status',
  missionCriticalCompteneciesResults: 'MISSION CRITICAL COMPETENCIES RESULTS',
  missionCriticalCompetenciesOverview: 'Mission Critical Competencies Overview',
  missionCriticalCompetenciesByParticipants: 'Mission Critical Competencies by Participants',
  competenciesResults: 'COMPETENCIES RESULTS',
  groupResultsOverviewByCluster: 'Group Results Overview by Cluster (Optional)',
  rateeRankingByOverallCompetencyScore: 'Ratee Ranking by Overall Competency Score',
  groupResultsOverviewByCompetency: 'Group Results Overview by Competency',
  competencyScoresByParticipant: 'Competency Scores by Participant',
  gapAnalysis: 'GAP ANALYSES',
  gapAnalysisOverview: 'Gap Analysis Overview',
  gapAnalysisByCompetency: 'Gap Analysis by Competency',
  responseDistributionOverview: 'Response Distribution Overview',
  responseDistributionByCompetency: 'Response Distribution by Competency',

};
const ReportContent = ({
                         loading,
                         reportSetting,
                         fetchReportSetting,
                         setReportSetting,
                       }) => {
  const [parsedQuery, query, setQuery] = useQuery();

  const surveyGroupId = parsedQuery?.surveyGroupId;

  const formRef = React.useRef();

  React.useEffect(() => {
    fetchReportSetting({ surveyGroupId });
  }, [
    fetchReportSetting,
    surveyGroupId,
  ]);

  const isLevel1Selected = (category) => {
    let selectedAll = true;
    Object.entries(formRef?.current?.values?.[category] || []).forEach(([key, value]) => {
      if (Object.values(value).includes(false)) {
        selectedAll = false;
      }
    });
    return selectedAll;
  };

  const data = React.useMemo(() => {
    const newObj = { ...reportSetting };
    Object.entries(newObj).forEach(([key, value]) => {
      Object.entries(value).forEach(([key2, value2]) => {
        if (LABELS[key2]) {
          Object.entries(value2).forEach(([key3, value3]) => {
            if (!LABELS[key3]) {
              delete newObj?.[key]?.[key2]?.[key3];
            }
          });
        } else {
          delete newObj?.[key]?.[key2];
        }
      });
    });
    return newObj;
  }, [reportSetting]);

  return (
    <>
      <Formik
        innerRef={formRef}
        enableReinitialize
        initialValues={data}
        onSubmit={async (values) => {
        }}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {values?.individualReport ? (
              <>
                <div
                  className="col-span-12 flex flex-row items-center bg-antgray-600 py-5 px-8.3 border-b border-t border-antgray-900"
                >
                  {['individualReport', 'groupReport'].map((category) => (
                    <div className="w-full" key={category}>
                      <Checkbox
                        className="flex flex-row items-center text-antgray-100"
                        onChange={() => {
                          const stack = [];
                          Object.entries(values?.[category]).forEach(([key, value]) => {
                            stack.push(...Object.values(value));
                          });
                          const selectTo = stack.includes(false);
                          const newValues = { ...values };
                          Object.entries(values?.[category]).forEach(([key, value]) => {
                            Object.entries(value).forEach(([key3, value3]) => {
                              newValues[category][key][key3] = selectTo;
                            });
                          });
                          formRef.current.setValues({ ...newValues });
                        }}
                        checked={isLevel1Selected(category)}
                      >
                        Report content: Individual
                      </Checkbox>
                    </div>
                  ))}
                </div>

                <div className="flex">
                  {['individualReport', 'groupReport'].map((category) => (
                    <div className="flex flex-col w-1/2" key={category}>
                      {Object.entries(values[category]).map(([_title, fields]) => (
                        <div key={_title} className={`checkbox-group-wrapper ${category === 'group' && 'ml-0'}`}>
                          <Checkbox
                            className="text-heading text-base"
                            indeterminate={!Object.values(values[category][_title]).every((a) => a === Object.values(values[category][_title])[0])}
                            onChange={() => {
                                const newValue = { ...values };
                                const changeTo = !Object.values(values[category][_title]).every((a) => a === true);
                                Object.entries(values[category][_title]).forEach(([key]) => {
                                  newValue[category][_title][key] = changeTo;
                                });
                                formRef.current.setValues({ ...values, ...newValue });
                              }}
                            checked={Object.values(values[category][_title]).every((a) => a === true)}
                          >
                            {LABELS[_title]}
                          </Checkbox>

                          <CheckboxGroup
                            className="checkbox-group-container text-heading text-sm"
                            options={(Object.entries(fields).filter(([label]) => LABELS[label])).map(([label]) => ({
                                label: LABELS[label],
                                value: label,
                              }))}
                            value={Object.entries(fields).filter(([_, value]) => (value === true)).map(([aa, _]) => aa)}
                            onChange={(selectedArray) => {
                                const newValue = { ...values };
                                Object.entries(values[category][_title]).forEach(([property]) => {
                                  newValue[category][_title][property] = selectedArray.includes(property);
                                });
                                formRef.current.setValues({ ...newValue });
                              }}
                          />
                        </div>
                        ),
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : <Spin className="block m-auto" />}
          </Form>
        )}
      </Formik>
    </>
  );
};

ReportContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  reportSetting: PropTypes.shape({}),
  fetchReportSetting: PropTypes.func.isRequired,
  setReportSetting: PropTypes.func.isRequired,

};

ReportContent.defaultProps = {
  reportSetting: {},
};

export default ReportContent;
