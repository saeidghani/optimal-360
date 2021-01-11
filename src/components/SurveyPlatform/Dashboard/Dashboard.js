import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FileTextOutlined, CheckOutlined } from '@ant-design/icons';

import Layout from '../../Common/SurveyPlatformLayout';
import Modal from '../../Common/Modal';
import Button from '../../Common/Button';
import Dropdown from '../../Common/Dropdown';
import { useQuery } from '../../../hooks';
import { stringify } from '../../../hooks/useQuery';
import { dynamicMap } from '../../../routes/RouteMap';

import SurveyGroup from './Helper/SurveyGroup';
import Welcome from './Helper/Welcome';

const Dashboard = ({
  loading,
  fetchProjects,
  fetchInfo,
  fetchRelations,
  organization,
  submitResponses,
  projects,
  info,
  relations,
  profileName,
  resetQuestions,
}) => {
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [thankYouModalVisible, setThankYouModalVisible] = useState(false);
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(false);
  const [visitedSurveyGroups, setVisitedSurveyGroups] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const history = useHistory();
  const [parsedQuery, , setQuery] = useQuery();
  const { projectId, surveyGroupId, surveyMode } = parsedQuery || {};

  const { TabPane } = Tabs;

  const findFirstSurveyGroup = (surveyGroups) => {
    // eslint-disable-next-line no-unused-expressions
    surveyGroups?.forEach((group) => {
      if (!group?.surveyGroupSubmited) {
        return group;
      }
    });
  };

  const visitedGroupHandler = (prjId, sgId) => {
    const currentGroupInVisited = visitedSurveyGroups?.find(
      (g) => g?.projectId === prjId && g?.surveyGroupId === sgId,
    );
    if (!currentGroupInVisited) {
      setVisitedSurveyGroups([...visitedSurveyGroups, { projectId, surveyGroupId }]);
    }
  };

  const projectsList = React.useMemo(
    () =>
      (projects?.data || []).map((el) => ({
        title: el.projectName,
        value: el.projectId,
        label: el.projectName,
      })),
    [projects.timeStamp],
  );

  const surveyGroups = React.useMemo(
    () =>
      projects?.data?.find((project) => project?.projectId?.toString() === projectId?.toString())
        ?.surveyGroups || [],
    [projects.timeStamp, projectId],
  );

  const projectName = React.useMemo(
    () =>
      projectsList?.find((project) => project.value?.toString() === projectId?.toString())?.title ||
      '',
    [projects.timeStamp, projectId],
  );

  useEffect(() => {
    fetchProjects('');
  }, [fetchProjects]);

  useEffect(() => {
    if (!projectId && projects?.data?.length > 0) {
      const activeProjects = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const project of projects?.data) {
        // eslint-disable-next-line no-restricted-syntax
        for (const group of project.surveyGroups) {
          if (!group.surveyGroupSubmited) {
            activeProjects.push(project);
          }
        }
      }
      const activeProjectId =
        activeProjects?.length > 0 ? activeProjects[0]?.projectId : projects?.data[0]?.projectId;
      setQuery({ projectId: activeProjectId });
    }
  }, [projectId, projects.timeStamp]);

  useEffect(() => {
    const visitedGroups = localStorage.getItem('visitedSurveyGroups');
    if (projectId && surveyGroupId) {
      if (visitedGroups) {
        const parsedVisitedGroups = JSON.parse(visitedGroups);
        const visitedGroup = parsedVisitedGroups?.find(
          (g) => g?.projectId === projectId && g?.surveyGroupId === surveyGroupId,
        );
        if (!visitedGroup) {
          setVisitedSurveyGroups([...parsedVisitedGroups, { projectId, surveyGroupId }]);
        } else {
          setVisitedSurveyGroups([...parsedVisitedGroups]);
        }
      } else {
        visitedGroupHandler(projectId, surveyGroupId);
      }
    }
  }, [projectId, surveyGroupId]);

  useEffect(() => {
    const visitedGroups = localStorage.getItem('visitedSurveyGroups');
    const parsedVisitedGroups = JSON.parse(visitedGroups);
    if (projectId && surveyGroupId) {
      const currentGroup = parsedVisitedGroups?.find(
        (g) => g?.projectId === projectId && g?.surveyGroupId === surveyGroupId,
      );
      if (!currentGroup) {
        setWelcomeModalVisible(true);
      }
    }
  }, [visitedSurveyGroups, projectId, surveyGroupId]);

  useEffect(() => {
    const currentSurveyGroup = findFirstSurveyGroup(surveyGroups) || surveyGroups[0];
    if (!surveyGroupId && surveyGroups?.length > 0) {
      const newSurveyGroupId = currentSurveyGroup?.surveyGroupId?.toString();
      setQuery({ surveyGroupId: newSurveyGroupId });
      visitedGroupHandler(projectId, newSurveyGroupId);
    }
  }, [surveyGroups]);

  useEffect(() => {
    if (surveyGroupId) {
      const currentSurveyGroup = surveyGroups?.find(
        (g) => g?.surveyGroupId?.toString() === surveyGroupId?.toString(),
      );
      if (currentSurveyGroup?.surveyGroupSubmited) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(false);
      }
      if (currentSurveyGroup?.canSubmit) {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }
    }
  }, [surveyGroups, surveyGroupId]);

  const onSurveyGroupTabChange = (key) => {
    setQuery({ surveyGroupId: key, viewBy: '', page_number: '', page_size: '' });
    fetchInfo({ surveyGroupId: key });
    visitedGroupHandler(projectId, key);
  };

  const handleContinue = () => {
    localStorage.setItem('visitedSurveyGroups', JSON?.stringify(visitedSurveyGroups));
    if (!isSubmitted) {
      resetQuestions();
      history.push(
        `${dynamicMap.surveyPlatform.allRateesQuestions({
          surveyGroupId,
          questionNumber: 1,
        })}${stringify({ projectId })}`,
      );
    }
  };

  const handleSubmit = () => {
    setSubmitModalVisible(true);
  };

  const handleSubmitModalOk = async () => {
    setSubmitModalVisible(false);
    try {
      await submitResponses({ surveyGroupId });
      await fetchProjects('');
      setThankYouModalVisible(true);
    } catch {}
  };

  const handleThankYouModalOk = () => {
    setThankYouModalVisible(false);
  };

  const handleWelcomeModalOk = () => {
    setWelcomeModalVisible(false);
  };

  return (
    <Layout
      profileName={profileName}
      organizationSrc={organization?.data?.organizationLogo}
      visitedSurveyGroups={visitedSurveyGroups}
    >
      <Modal
        visible={submitModalVisible}
        handleOk={handleSubmitModalOk}
        handleCancel={() => setSubmitModalVisible(false)}
        width={588}
        okText="Yes"
        cancelText="Cancel"
        okButtonProps={{ textClassName: 'px-4' }}
      >
        <div className="flex flex-col items-center">
          <FileTextOutlined className="text-4xl text-primary-500 mb-4" />
          <p>Are you sure to submit this survey?</p>
        </div>
      </Modal>
      <Modal
        visible={thankYouModalVisible}
        handleOk={handleThankYouModalOk}
        handleCancel={() => {}}
        width={588}
        okText="Ok"
        cancelText=""
        okButtonProps={{ className: 'bg-antteal hover:bg-antteal', textClassName: 'px-4' }}
      >
        <div className="flex flex-col items-center">
          <CheckOutlined className="w-10 h-10 bg-antteal rounded-full text-white text-2xl pt-2 mb-4" />
          <p>Thank you for completing the survey. Your response has been submitted.</p>
        </div>
      </Modal>
      <Modal
        visible={!isSubmitted && welcomeModalVisible}
        handleCancel={() => setWelcomeModalVisible(false)}
        handleOk={handleWelcomeModalOk}
        okText=""
        width={1220}
        closable
        className="relative"
        footer={<span />}
        okButtonProps={{ className: 'px-6' }}
      >
        <Welcome loading={loading} {...info?.data?.surveyIntro} />
      </Modal>
      <div className="grid grid-cols-12 mb-10 mt-8">
        <div className="col-start-1 col-span-6 text-base text-body mb-3">Select Project</div>
        <Dropdown
          className="c-autocomplete col-start-1 col-span-12
          md:col-start-1 md:col-span-4 lg:col-start-1 lg:col-span-3 w-full"
          type="gray"
          showSearch={false}
          value={projectName}
          handleChange={(val) => {
            setQuery({ projectId: val, surveyGroupId: '' });
          }}
          options={projectsList}
        />
      </div>
      <Tabs
        className="survey-group-tabs"
        defaultActiveKey={surveyGroupId}
        activeKey={surveyGroupId}
        onChange={onSurveyGroupTabChange}
      >
        {surveyGroups?.map((group) => (
          <TabPane
            key={group?.surveyGroupId?.toString()}
            tab={group?.surveyGroupName}
            // disabled={isSubmitted}
          >
            <SurveyGroup
              loading={loading}
              fetchInfo={fetchInfo}
              fetchRelations={fetchRelations}
              info={info}
              relations={relations}
              isSubmitted={isSubmitted}
              visitedSurveyGroups={visitedSurveyGroups}
              resetQuestions={resetQuestions}
            />
          </TabPane>
        ))}
      </Tabs>
      {!loading && surveyGroups?.length > 0 && (
        <div className="md:flex justify-end">
          {surveyMode === 'all' && !isSubmitted && (
            <Button
              onClick={handleContinue}
              className="mt-6 mr-3 w-full md:w-auto"
              text="Continue Rating"
            />
          )}
          <Button
            onClick={handleSubmit}
            className="mt-6 bg-transparent text-primary-500 outline-none border-primary-500 shadow-none
          w-full md:w-auto md:border-none"
            text="Submit All"
            disabled={isSubmitted || !canSubmit}
          />
        </div>
      )}
    </Layout>
  );
};

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchInfo: PropTypes.func.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  submitResponses: PropTypes.func.isRequired,
  resetQuestions: PropTypes.func.isRequired,
  projects: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({ projectId: PropTypes.number })),
    timeStamp: PropTypes.number,
  }),
  organization: PropTypes.shape({
    data: PropTypes.shape({ organizationLogo: PropTypes.string }),
  }),
  info: PropTypes.shape({
    data: PropTypes.shape({
      surveyIntro: PropTypes.shape({}),
    }),
  }),
  relations: PropTypes.shape({}),
  profileName: PropTypes.string.isRequired,
};

Dashboard.defaultProps = {
  projects: {},
  info: {},
  relations: {},
  organization: {},
};

export default Dashboard;
