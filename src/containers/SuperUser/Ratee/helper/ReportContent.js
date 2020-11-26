import React from 'react';
import PropTypes from "prop-types";
import { useQuery } from "../../../../hooks";
import { Checkbox } from "antd";
import { Form, Formik } from "formik";

const CheckboxGroup = Checkbox.Group;
const LABELS = {
  INTRODUCTION: 'INTRODUCTION',
  RESULTSOVERVIEW: 'RESULT SOVERVIEW',
  title_11: 'GROUP',
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
  bb: 'false by default',
};
const sample = {
  individual: {
    INTRODUCTION: {
      contentPage: true,
      competencyResults: false,
      aa: true,
      bb: false,
    },
    RESULTSOVERVIEW: {
      clientCompetencyModel: false,
      behaviorResults: true,
    },
  },
  group: {
    title_11: {
      ratersInformation: true,
      developmentFeedbackComment: true,
    },
    title_12: {
      missionCriticalCompetencies: false,
      generalFeedbackComment: true,
    },
  },
};
const ReportContent = (loading) => {
  const formRef = React.useRef();

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
    const newObj = { ...sample };
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
  }, [sample]);

  return (
    <>
      <div>
        <Formik
          innerRef={formRef}
          enableReinitialize
          initialValues={data}
          onSubmit={async (values) => {
          }}
        >
          {({ values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <>
                <div
                  className="col-span-12 flex flex-row items-center bg-antgray-600 py-5 px-8.3 border-b border-t border-antgray-900">
                  {['individual', 'group'].map((category) => (
                    <div className="w-full" key={category}>
                      <Checkbox
                        className="flex flex-row items-center text-antgray-100"
                        onChange={() => {
                          const stack = [];
                          Object.entries(values[category]).forEach(([key, value]) => {
                            stack.push(...Object.values(value));
                          });
                          const selectTo = stack.includes(false);
                          const newValues = { ...values };
                          Object.entries(values[category]).forEach(([key, value]) => {
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
                  {['individual', 'group'].map((category) => (
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
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

ReportContent.propTypes = {
  loading: PropTypes.bool.isRequired
};

ReportContent.defaultProps = {};

export default ReportContent;
