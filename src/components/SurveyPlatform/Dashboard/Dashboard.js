import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FileTextOutlined, CheckOutlined } from '@ant-design/icons';

import Layout from '../../Common/SurveyPlatformLayout';
import Modal from '../../Common/Modal';
import Button from '../../Common/Button';
import Dropdown from '../../Common/Dropdown';
import { useQuery } from '../../../hooks';
import { dynamicMap } from '../../../routes/RouteMap';

import SurveyGroup from './SurveyGroup';
import Welcome from './Helper/Welcome';

const Dashboard = ({
  loading,
  fetchProjects,
  fetchInfo,
  fetchRelations,
  submitResponses,
  projects,
  info,
  relations,
}) => {
  const [submitModalVisible, setSubmitModalVisible] = React.useState(false);
  const [thankYouModalVisible, setThankYouModalVisible] = React.useState(false);
  const [welcomeModalVisible, setWelcomeModalVisible] = React.useState(false);

  const history = useHistory();
  const [parsedQuery, , setQuery] = useQuery();
  const { projectId, surveyGroupId, surveyMode } = parsedQuery || {};

  const { TabPane } = Tabs;

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

  React.useEffect(() => {
    if (!projectId && projectsList?.length > 0) {
      setQuery({ projectId: projectsList[0]?.value });
      setWelcomeModalVisible(true);
    }
  }, [projectId, projectsList]);

  const surveyGroups = React.useMemo(
    () =>
      projects?.data?.find((project) => project?.projectId?.toString() === projectId?.toString())
        ?.surveyGroups || [],
    [projects.timeStamp, projectId],
  );

  React.useEffect(() => {
    if (!surveyGroupId && surveyGroups?.length > 0) {
      setQuery({ surveyGroupId: surveyGroups[0]?.surveyGroupId });
    }
  }, [surveyGroups]);

  const projectName = React.useMemo(
    () =>
      projectsList?.find((project) => project.value?.toString() === projectId?.toString())?.title ||
      '',
    [projects.timeStamp, projectId],
  );

  const onTabChange = (key) => {
    setQuery({ surveyGroupId: key, viewBy: '', page_number: '', page_size: '' });
    fetchInfo({ surveyGroupId: key });
    setWelcomeModalVisible(true);
  };

  const handleContinue = () => {
    history.push(
      dynamicMap.surveyPlatform.allRateesQuestions({
        surveyGroupId,
        questionNumber: 1,
      }),
    );
  };

  const handleSubmit = () => {
    setSubmitModalVisible(true);
  };

  const handleSubmitModalOk = async () => {
    setSubmitModalVisible(false);
    try {
      await submitResponses({ surveyGroupId });
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
    <Layout>
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
        visible={welcomeModalVisible}
        handleCancel={() => setWelcomeModalVisible(false)}
        handleOk={handleWelcomeModalOk}
        okText="Next"
        width={1220}
        closable={false}
        className="welcome-modal relative"
        footerClassName=""
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
          handleChange={(val) => setQuery({ projectId: val })}
          options={projectsList}
        />
      </div>
      <Tabs className="survey-group-tabs" defaultActiveKey={surveyGroupId} onChange={onTabChange}>
        {surveyGroups?.map((group) => (
          <TabPane key={group.surveyGroupId?.toString()} tab={group.surveyGroupName}>
            <SurveyGroup
              loading={loading}
              fetchInfo={fetchInfo}
              fetchRelations={fetchRelations}
              info={info}
              relations={relations}
            />
          </TabPane>
        ))}
      </Tabs>
      {!loading && surveyGroups?.length > 0 && (
        <div className="md:flex justify-end">
          {surveyMode === 'all' && (
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
  projects: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    timeStamp: PropTypes.number,
  }),
  info: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        surveyIntro: PropTypes.string,
      }),
    ),
  }),
  relations: PropTypes.shape({}),
};

Dashboard.defaultProps = {
  projects: {},
  info: {},
  relations: {},
};

export default Dashboard;
