import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { Checkbox, Spin, Divider } from 'antd';

import { useQuery } from '../../../../hooks';

import Button from '../../../Common/Button';
import ImportExcelButton from '../../../Common/ImportExcelButton';

const CheckboxGroup = Checkbox.Group;

const LABELS = {
  individualReport: 'Report content: Individual',
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

  // individualCompetencies: 'Individual Competencies',
  mainCompetencyScore: 'Main Competency Score',
  breakdownOfBehaviorsScores: 'Breakdown of Behaviors Scores',

  ratersWrittenFeedback: 'RATER’s WRITTEN FEEDBACK',
  // competencyFeedback: 'Competency Feedback',
  // developFeedback: 'Development Feedback',
  // generalFeedback: 'General Feedback',
  verbatimFeedback: 'Verbatim Feedback',

  responseDistribution: 'RESPONSE DISTRIBUTION',
  howToReadThisSection: 'How to Read this Section',
  overviewForAllCompetencies: 'Overview for all Competencies',
  distributionByIndividualCompetencies: 'Distribution by Individual Competencies',
  developmentPlan: 'DEVELOPMENT PLAN',
  developmentGuidelines: 'Development Guidelines',
  planningYourDevelopment: 'Planning Your Development',
  appendix: 'APPENDIX',
  competencyModelDefinitions: 'Competency Model – Competency Definitions',

  groupReport: 'Report content: Group',
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
  importClientCompetencyModel,
}) => {
  const [parsedQuery] = useQuery();

  const surveyGroupId = parsedQuery?.surveyGroupId;

  const formRef = React.useRef();

  React.useEffect(() => {
    fetchReportSetting({ surveyGroupId });
  }, [fetchReportSetting, surveyGroupId]);

  const isLevel1Selected = (category) => {
    const { values } = formRef.current || [];

    let selectedAll = true;
    Object.entries(values[category] || []).forEach(([key, value]) => {
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

  const handleChangeLevel1 = (category) => {
    const stack = [];
    const { values, setValues } = formRef.current;

    Object.entries(values?.[category]).forEach(([key, value]) => {
      stack.push(...Object.values(value));
    });

    const changeTo = stack.includes(false);
    const newValues = { ...values };

    Object.entries(values?.[category]).forEach(([key, value]) => {
      Object.entries(value).forEach(([key3, value3]) => {
        newValues[category][key][key3] = changeTo;
      });
    });

    setValues({ ...newValues });
  };

  const handleChangeLevel2 = (category, _title) => {
    const { values, setValues } = formRef.current;
    const newValue = { ...values };

    const changeTo = !Object.values(values[category][_title]).every((a) => a === true);

    Object.entries(values[category][_title]).forEach(([key]) => {
      newValue[category][_title][key] = changeTo;
    });

    setValues({ ...values, ...newValue });
  };

  const handleChangeLevel3 = (selectedArray, category, _title) => {
    const { values, setValues } = formRef.current;
    const newValue = { ...values };

    Object.entries(values[category][_title]).forEach(([property]) => {
      newValue[category][_title][property] = selectedArray.includes(property);
    });

    setValues({ ...newValue });
  };

  return (
    <Formik
      innerRef={formRef}
      enableReinitialize
      initialValues={data}
      onSubmit={(values) => {
        const newObj = { individualReport: {}, groupReport: {} };
        Object.entries(values).forEach(([key, val]) => {
          Object.entries(val).forEach(([key2, val2]) => {
            newObj[key] = { ...newObj[key], ...val2 };
          });
        });

        setReportSetting({
          reports: values,
          surveyGroupId,
        });
      }}
    >
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div
            className="grid grid-flow-col grid-cols-2 md:grid-rows-1"
            style={{ gridTemplateRows: 'auto auto' }}
          >
            {values?.individualReport ? (
              Object.entries(values)
                .reverse()
                .map(([category, val], index) => (
                  <>
                    <div className="items-center bg-antgray-600 py-4 px-8.3 border-b border-t border-antgray-900 mt-1">
                      <div className="w-full" key={category}>
                        <Checkbox
                          className="flex flex-row items-center text-antgray-100"
                          onChange={() => {
                            handleChangeLevel1(category);
                          }}
                          checked={isLevel1Selected(category)}
                        >
                          {LABELS[category]}
                        </Checkbox>
                      </div>
                    </div>

                    <div
                      className={`flex ${index === 0 && 'border-r border-solid border-gray-50'}`}
                    >
                      <div className="flex flex-col" key={category}>
                        {Object.entries(values[category]).map(([_title, fields]) => (
                          <div
                            key={_title}
                            className={`checkbox-group-wrapper ${
                              category === 'groupReport' && 'ml-0'
                            }`}
                          >
                            <Checkbox
                              className="text-heading text-base"
                              indeterminate={
                                !Object.values(values[category][_title]).every(
                                  (a) => a === Object.values(values[category][_title])[0],
                                )
                              }
                              onChange={() => {
                                handleChangeLevel2(category, _title);
                              }}
                              checked={Object.values(values[category][_title]).every(
                                (a) => a === true,
                              )}
                            >
                              {LABELS[_title]}
                            </Checkbox>

                            <CheckboxGroup
                              className="text-heading text-sm"
                              options={Object.entries(fields)
                                .filter(([label]) => LABELS[label])
                                .map(([label]) => ({
                                  label: LABELS[label],
                                  value: label,
                                }))}
                              value={Object.entries(fields)
                                .filter(([_, value]) => value === true)
                                .map(([aa, _]) => aa)}
                              onChange={(selectedArray) => {
                                handleChangeLevel3(selectedArray, category, _title);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ))
            ) : (
              <Spin className="block m-auto" />
            )}
          </div>

          <Divider className="mt-0" />

          <div className="flex justify-end">
            <ImportExcelButton
              type="primary"
              textClassName="font-normal text-md leading-6"
              className="mr-5 flex justify-center items-center"
              size="large"
              textSize="md"
              ghost
              icon=""
              loading={loading}
              buttonText="Import Excel Client Competency Model"
              beforeUpload={(file) => {
                importClientCompetencyModel({ file, surveyGroupId });
                return false;
              }}
            />
            <Button
              loading={loading}
              className=""
              text="Submit"
              onClick={handleSubmit}
              htmlType="submit"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

ReportContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  reportSetting: PropTypes.shape({}),
  fetchReportSetting: PropTypes.func.isRequired,
  setReportSetting: PropTypes.func.isRequired,
  importClientCompetencyModel: PropTypes.func.isRequired,
};

ReportContent.defaultProps = {
  reportSetting: {},
};

export default ReportContent;
