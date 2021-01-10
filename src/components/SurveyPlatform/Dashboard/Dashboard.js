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

  useEffect(() => {
    const visitedGroups = localStorage.getItem('visitedSurveyGroups');
    if (visitedGroups) {
      const parsedVisitedGroups = JSON.parse(visitedGroups);
      const visitedGroup = parsedVisitedGroups?.find(
        (g) => g?.projectId === projectId && g?.surveyGroupId === surveyGroupId,
      );
      if (!visitedGroup) {
        setVisitedSurveyGroups([...parsedVisitedGroups, { projectId, surveyGroupId }]);
        setWelcomeModalVisible(true);
      } else {
        setVisitedSurveyGroups([...parsedVisitedGroups]);
      }
    } else {
      const visitedGroup = visitedSurveyGroups?.find(
        (g) => g?.projectId === projectId && g?.surveyGroupId === surveyGroupId,
      );
      if (!visitedGroup) {
        const surveyGroups = projects?.data?.find(
          (project) => project?.projectId?.toString() === projectId?.toString(),
        )?.surveyGroups;

        if (surveyGroupId) {
          const currentSurveyGroup = surveyGroups?.find(
            (g) => g?.surveyGroupId?.toString() === surveyGroupId?.toString(),
          );
          if (currentSurveyGroup?.surveyGroupSubmited) {
            setIsSubmitted(true);
            setWelcomeModalVisible(false);
          } else {
            setIsSubmitted(false);
            setWelcomeModalVisible(true);
          }
          if (currentSurveyGroup?.canSubmit) {
            setCanSubmit(true);
          } else {
            setCanSubmit(false);
          }
        }
        setVisitedSurveyGroups([{ projectId, surveyGroupId }]);
      }
    }
  }, []);

  useEffect(() => {
    fetchProjects('');
  }, [fetchProjects]);

  const projectsList = React.useMemo(
    () =>
      (projects?.data || []).map((el) => ({
        title: el.projectName,
        value: el.projectId,
        label: el.projectName,
      })),
    [projects.timeStamp],
  );

  const findFirstSurveyGroup = (surveyGroups) => {
    // eslint-disable-next-line no-unused-expressions
    surveyGroups?.forEach((group) => {
      if (!group?.surveyGroupSubmited) {
        return group;
      }
    });
  };

  useEffect(() => {
    if (!projectId && projectsList?.length > 0) {
      setQuery({ projectId: projectsList[0]?.value });
    }
  }, [projectId, projectsList]);

  const surveyGroups = React.useMemo(
    () =>
      projects?.data?.find((project) => project?.projectId?.toString() === projectId?.toString())
        ?.surveyGroups || [],
    [projects.timeStamp, projectId],
  );

  useEffect(() => {
    if (!surveyGroupId && surveyGroups?.length > 0) {
      const currentSurveyGroup = findFirstSurveyGroup(surveyGroups) || surveyGroups[0];
      const newSurveyGroupId = currentSurveyGroup?.surveyGroupId?.toString();
      setQuery({ surveyGroupId: newSurveyGroupId });
      const visitedGroup = visitedSurveyGroups?.find(
        (g) => g?.projectId === projectId && g?.surveyGroupId === newSurveyGroupId,
      );
      if (!visitedGroup) {
        setVisitedSurveyGroups([
          ...visitedSurveyGroups,
          { projectId, surveyGroupId: newSurveyGroupId },
        ]);
        if (surveyGroupId) {
          if (currentSurveyGroup?.surveyGroupSubmited) {
            setIsSubmitted(true);
            setWelcomeModalVisible(false);
          } else {
            setIsSubmitted(false);
            setWelcomeModalVisible(true);
          }
          if (currentSurveyGroup?.canSubmit) {
            setCanSubmit(true);
          } else {
            setCanSubmit(false);
          }
        }
      }
    }
  }, [surveyGroups]);

  useEffect(() => {
    if (surveyGroupId) {
      const currentSurveyGroup = surveyGroups?.find(
        (g) => g?.surveyGroupId?.toString() === surveyGroupId?.toString(),
      );
      if (currentSurveyGroup?.surveyGroupSubmited) {
        setIsSubmitted(true);
        setWelcomeModalVisible(false);
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

  const projectName = React.useMemo(
    () =>
      projectsList?.find((project) => project.value?.toString() === projectId?.toString())?.title ||
      '',
    [projects.timeStamp, projectId],
  );

  const onSurveyGroupTabChange = (key) => {
    setQuery({ surveyGroupId: key, viewBy: '', page_number: '', page_size: '' });
    const currentSurveyGroup = surveyGroups?.find(
      (g) => g?.surveyGroupId?.toString() === surveyGroupId?.toString(),
    );
    if (currentSurveyGroup?.surveyGroupSubmited) {
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
      fetchInfo({ surveyGroupId: key });
    }
    if (currentSurveyGroup?.canSubmit) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
    const visitedGroup = visitedSurveyGroups?.find(
      (g) => g?.projectId === projectId && g?.surveyGroupId === key,
    );
    if (!visitedGroup) {
      setVisitedSurveyGroups([...visitedSurveyGroups, { projectId, surveyGroupId: key }]);
      setWelcomeModalVisible(true);
    }
  };

  const handleContinue = () => {
    localStorage.setItem('visitedSurveyGroups', JSON?.stringify(visitedSurveyGroups));
    const currentSurveyGroup = surveyGroups?.find(
      (surveyGroup) => surveyGroup?.surveyGroupId?.toString() === surveyGroupId?.toString(),
    );
    if (!currentSurveyGroup?.surveyGroupSubmited) {
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
      setIsSubmitted(true);
      setCanSubmit(false);
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
    <Layout profileName={profileName} organizationSrc={organization?.data?.organizationLogo}>
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
            disabled={isSubmitted}
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
    data: PropTypes.arrayOf(PropTypes.shape({})),
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
