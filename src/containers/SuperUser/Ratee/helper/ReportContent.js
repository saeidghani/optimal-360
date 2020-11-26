import React from 'react';
import PropTypes from "prop-types";
import { useQuery } from "../../../../hooks";
import { Checkbox } from "antd";

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
};
const data = {
  individual: {
    INTRODUCTION: {
      contentPage: true,
      competencyResults: false,
    },
    RESULTSOVERVIEW: {
      clientCompetencyModel: false,
      behaviorResults: true,
    },
  },
  group: {
    title_11: {
      ratersInformation: true,
      developmentFeedbackComment: false,
    },
    title_12: {
      missionCriticalCompetencies: false,
      generalFeedbackComment: true,
    },
  },
};
const ReportContent = (loading) => {
  const [parsedQuery, query, setQuery] = useQuery();
  const [selectedRows, setSelectedRows] = React.useState([]);

  const surveyGroupId = parsedQuery?.surveyGroupId;
  const projectId = parsedQuery?.projectId;

  const columns = React.useMemo(() => [
    {
      key: 'individual',
      title: 'Rater Email',
    },
    {
      key: 'group',
      title: 'gro',
    },
  ]);

  return (
    <>
      <div>
        <div
          className="col-span-12 flex flex-row items-center bg-antgray-600 py-5 px-8.3 border-b border-t border-antgray-900">
          <div className="w-full">
            <Checkbox
              className="flex flex-row items-center text-antgray-100"
              onChange={() => {
              }}
              checked={false}
            >
              Report content: Individual
            </Checkbox>
          </div>
          <div className="w-full">
            <Checkbox
              className="flex flex-row items-center text-antgray-100"
              onChange={() => {
              }}
              checked={false}
            >
              Report content: Group
            </Checkbox>
          </div>
        </div>


        <div className="flex">
          {Object.entries(data).map(([title, fields], index) => (
            <div className="flex flex-col w-1/2">
              {Object.entries(data[title]).map(([title, fields]) => {
                  if (LABELS[title]) {
                    return (
                      <div key={title} className={`checkbox-group-wrapper ${index === 1 && 'ml-0'}`}>
                        <Checkbox
                          className="text-heading text-base"
                          indeterminate={() => {
                          }}
                          onChange={() => {
                          }}
                          checked={() => {
                          }}
                        >
                          {LABELS[title]}
                        </Checkbox>

                        <CheckboxGroup
                          className="checkbox-group-container text-heading text-sm"
                          options={(Object.entries(fields).filter(([label, value]) => LABELS[label])).map(([label]) => {
                            return ({
                              label: LABELS[label],
                              value: label,
                            });
                          })}
                          value={Object.entries(fields).filter(([_, value]) => (value === true)).map(([aa, _]) => aa)}
                          onChange={(a) => {
                            console.log(a);
                          }}
                        />
                      </div>
                    );
                  }
                },
              )}

            </div>
          ))}


        </div>
      </div>
    </>
  );
};

ReportContent.propTypes = {
  loading: PropTypes.bool.isRequired
};

ReportContent.defaultProps = {};

export default ReportContent;
