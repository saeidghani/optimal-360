import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import moment from 'moment';
import * as yup from 'yup';
import arrayMove from 'array-move';

import { useHistory } from 'react-router-dom';

import { useQuery, useSurveyGroup, usePersist, useClusters } from '../../../hooks';
import { stringify } from '../../../hooks/useQuery';
import { dynamicMap } from '../../../routes/RouteMap';

import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';
import Menu from './Helper/Menu';

import * as ClusterUtils from '../../../lib/Wizard/clusterUtils';

import ClusterEditSection from './Helper/ClusterEditSection';
import CompetencyEditSection from './Helper/CompetencyEditSection';
import QuestionEditSection from './Helper/QuestionEditSection';
import SortableFeedbacks from './Helper/SortableFeedbacks';

import AddClusterModal from './Helper/AddClusterModal';
import AddCompetencyModal from './Helper/AddCompetencyModal';
import AddQuestionModal from './Helper/AddQuestionModal';

import MainLayout from '../../Common/Layout';
import Steps from '../../Common/Steps';
import Input from '../../Common/Input';
import SecondaryMenu from '../../Common/Menu';
import Button from '../../Common/Button';
import DraggableTable from '../../Common/DataTable';
import Loading from '../../Common/Loading';
import SortableQuestions from './Helper/SortableQuestions';

const SurveyQuestionsList = ({
  fetchSurveyGroups,
  fetchSurveyQuestions,
  setSurveyQuestions,
  loading,
}) => {
  const _ratingScales = [
    { score: 0, description: '', label: '' },
    { score: 1, description: '', label: '' },
    { score: 2, description: '', label: '' },
    { score: 3, description: '', label: '' },
    { score: 4, description: '', label: '' },
  ];

  const formRef = React.useRef();

  const schema = yup.object({
    ratingScales: yup.array(
      yup.object({
        score: yup.number().nullable().required('score is required'),
        description: yup.string().nullable().required('description is required'),
        label: yup.string().nullable().required('label is required'),
      }),
    ),
    clusters: yup.array(yup.object({})).min(1, 'You must specify at least one cluster item'),
    feedbacks: yup.array(
      yup.object({
        label: yup.string().nullable().required('label is required'),
        statement: yup.string().nullable().required('statement is required'),
        required: yup.bool().required('required is required'),
      }),
    ),
  });

  const history = useHistory();

  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();
  const [persistedData, setPersistData] = usePersist();
  const [surveyQuestions, firstClusterItem, _selectedCluster, _selectedCompetency] = useClusters();
  const [parsedQuery, , setQuery] = useQuery();

  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [addClusterModal, setAddClusterModal] = React.useState(false);
  const [addCompetencyModal, setAddCompetencyModal] = React.useState(false);
  const [addQuestionModal, setAddQuestionModal] = React.useState(false);

  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');
  const [selectedCluster, setSelectedCluster] = React.useState('');
  const [selectedCompetency, setSelectedCompetency] = React.useState('');
  const [selectedQuestion, setSelectedQuestion] = React.useState('');

  const surveyQuestionsStringified = JSON.stringify(surveyQuestions);

  const deepSort = (arr) => {
    const sort = (arr1) => arr1.sort((a, b) => a.showOrder - b.showOrder);

    const clusters = sort(arr).map((cluster) => ({
      ...cluster,
      competencies: sort(cluster.competencies).map((competency) => ({
        ...competency,
        questions: competency.questions.sort(
          (a, b) => a.surveyPlatformShowOrder - b.surveyPlatformShowOrder,
        ),
      })),
    }));

    return clusters;
  };

  const handleFeedbackChange = (newVal, row, key, subKey) => {
    const newValues = formRef.current.values[key].map((el) => {
      if (el.id === row.id) {
        return { ...el, [subKey]: newVal };
      }

      return el;
    });

    formRef.current.setValues({ ...formRef.current.values, [key]: newValues });
  };

  const handleRatingScalesChange = (newVal, index, subKey) => {
    const newValues = { ...formRef.current.values };

    newValues.ratingScales[index][subKey] = newVal;

    formRef.current.setValues({ ...newValues });
  };

  React.useEffect(() => {
    if (surveyGroupId) fetchSurveyQuestions(surveyGroupId);
  }, [surveyGroupId, fetchSurveyQuestions]);

  const _handleSubmit = async (values) => {
    try {
      const { projectId } = parsedQuery;

      await setSurveyQuestions({ ...values, surveyGroupId, projectId });
      const newSurveyGroups = await fetchSurveyGroups(projectId);
      setPersistData('');

      const isEverySurveyGroupSubmitted = (newSurveyGroups?.data?.data || []).every(
        ({ stepsStatus }) => !!stepsStatus,
      );

      const editableSurveyGroup = (newSurveyGroups?.data?.data || []).find(
        ({ id, stepsStatus, startDate }) =>
          id * 1 !== parsedQuery?.surveyGroupId * 1 &&
          !stepsStatus &&
          !moment(startDate).isBefore(),
      );

      if (parsedQuery?.wizardEditMode) {
        const path = dynamicMap.superUser.surveyGroupsList({ projectId });

        history.push(`${path}`);
      } else if (isEverySurveyGroupSubmitted) {
        const path = dynamicMap.superUser.ratersList();
        const params = stringify({
          projectId,
          surveyGroupId,
        });

        history.push(`${path}${params}`);
      } else if (editableSurveyGroup) {
        const path = dynamicMap.superUser.surveySettings();
        const params = stringify({
          projectId,
          surveyGroupId: editableSurveyGroup.id,
        });

        history.push(`${path}${params}`);
      }
    } catch (error) {}
  };

  const onMenuClick = ({ clusterId, competencyId, questionId }) => {
    setSelectedCluster('');
    setSelectedCompetency('');
    setSelectedQuestion('');

    const Q = {};

    const isIdValid = (id) => Number.isInteger(id) && id >= 0;

    if (isIdValid(clusterId)) {
      Q.clusterId = clusterId * 1 === parsedQuery?.clusterId * 1 ? null : clusterId.toString();
      Q.competencyId = null;
      Q.questionId = null;
    }

    if (isIdValid(competencyId)) {
      Q.competencyId =
        competencyId * 1 === parsedQuery?.competencyId * 1 ? null : competencyId.toString();
      Q.questionId = null;
    }

    if (isIdValid(questionId)) {
      Q.questionId = questionId * 1 === parsedQuery?.questionId * 1 ? null : questionId.toString();
    }

    setQuery(Q);
  };

  const setClusters = (clusters) => {
    setPersistData(clusters);
    const questions = ClusterUtils.getQuestions(clusters);

    formRef.current.setValues({
      ...formRef.current.values,
      clusters: deepSort(clusters),
      questions,
    });
  };

  const updateCluster = (newVals, ids) => {
    const oldClusters = [...formRef.current?.values?.clusters];
    const newClusters = ClusterUtils.updateItem(parsedQuery, oldClusters, newVals, ids);

    setClusters(newClusters);
  };

  const deleteCluster = (ids) => {
    const oldClusters = [...formRef.current?.values?.clusters];
    const newClusters = ClusterUtils.deleteItem(parsedQuery, oldClusters, ids);

    setClusters(newClusters);
  };

  const onClusterSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex && formRef?.current) {
      const oldValues = formRef.current.values || {};

      const clusters = ClusterUtils.clusterSortRefactor(
        parsedQuery,
        oldValues.clusters,
        oldIndex,
        newIndex,
      );

      setClusters(clusters);
    }
  };

  const addFeedback = (oldFeedbacks) => {
    const feedbacks = [...oldFeedbacks];

    // creating a unique id
    const feedbackIds = feedbacks?.length > 0 ? feedbacks.map((el) => el.id * 1) : [1];
    const id = feedbackIds.reduce((prevValue, currentValue) => prevValue + currentValue) + 1;

    const index = feedbacks.length;
    const showOrder =
      feedbacks?.length > 0 ? Math.max(...feedbacks.map((el) => el.showOrder * 1)) + 1 : 1;

    const newClusters = {
      label: '',
      statement: '',
      required: true,
      showOrder,
      index,
      id,
      newAddedItem: true,
    };

    feedbacks.push(newClusters);

    formRef.current.setValues({ ...formRef.current.values, feedbacks });
  };

  const addItemToClusters = (newItem) => {
    const currentClusterId = _selectedCluster?.id;

    const oldClusters = [...formRef.current?.values?.clusters];
    const { clusters, id } = ClusterUtils.addItem(
      oldClusters,
      {
        clusterId: currentClusterId,
        competencyId: parsedQuery?.competencyId,
        questionId: parsedQuery?.questionId,
      },
      newItem,
      parsedQuery,
    );

    setClusters(clusters);

    return id;
  };

  const onFeedbackSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex && formRef?.current) {
      const oldValues = formRef.current.values || {};

      const arrSwitch = (arr) =>
        arrayMove([].concat(arr), oldIndex, newIndex)
          .filter((el) => !!el)
          .map((el, i) => ({ ...el, index: i, showOrder: i + 1, name: el.name || el.label }));

      const feedbacks = arrSwitch(oldValues.feedbacks);

      formRef.current.setValues({ ...oldValues, feedbacks });
    }
  };

  const deleteFeedback = (oldFeedbacks, removableFeedback) => {
    const newFeedbacks = [...oldFeedbacks];
    const removeIndex = newFeedbacks.findIndex(
      (feedback) => feedback.id * 1 === removableFeedback.id * 1,
    );

    if (newFeedbacks[removeIndex].newAddedItem) {
      newFeedbacks.splice(removeIndex, 1);
    } else {
      newFeedbacks[removeIndex].deleted = true;
    }

    formRef.current.setValues({ ...formRef.current.values, feedbacks: newFeedbacks });
  };

  const onQuestionSortEnd = ({ oldIndex, newIndex }, originalData) => {
    if (oldIndex !== newIndex && formRef?.current) {
      const oldValues = formRef?.current?.values || {};

      const arrSwitch = (arr) => arrayMove([].concat(arr), oldIndex, newIndex);

      const questions = ClusterUtils.formatQuestionOrder(arrSwitch(originalData));

      formRef.current.setValues({ ...oldValues, questions });
    }
  };

  const randomizeQuestions = () => {
    const oldValues = { ...formRef.current.values };

    const questions = [...(oldValues?.questions || [])];

    const shuffledQuestions = questions
      .map((value) => ({ sort: Math.random(), value }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    formRef.current.setValues({
      ...oldValues,
      questions: ClusterUtils.formatQuestionOrder(shuffledQuestions),
    });
  };

  const initialValues = React.useMemo(() => {
    const clusters =
      persistedData?.data?.length > 0 ? persistedData.data : surveyQuestions.clusters || [];

    const questions = ClusterUtils.getQuestions(clusters);

    return {
      ratingScales:
        surveyQuestions?.ratingScales?.length > 0 ? surveyQuestions.ratingScales : _ratingScales,
      feedbacks: surveyQuestions?.feedbacks?.length > 0 ? surveyQuestions.feedbacks : [],
      clusters: clusters?.length > 0 ? deepSort(clusters) : [],
      questions,
    };

    // eslint-disable-next-line
  }, [parsedQuery?.surveyGroupId, surveyQuestionsStringified]);

  const renderHeader = () => (
    <div
      className="flex flex-row justify-between bg-antgray-600 p-4
        items-center border-b border-list-border"
    >
      <span>All</span>

      <div className="flex items-center">
        <Button
          size="middle"
          type="gray"
          textSize="xs"
          textClassName="mr-2"
          text={
            parsedQuery?.competencyId
              ? 'Add Question'
              : parsedQuery?.clusterId
              ? 'Add Competency'
              : 'Add Cluster'
          }
          className="text-base"
          onClick={() => {
            if (parsedQuery?.competencyId) {
              setAddQuestionModal(true);
            } else if (parsedQuery?.clusterId) {
              setAddCompetencyModal(true);
            } else {
              setAddClusterModal(true);
            }
          }}
          icon="PlusCircleOutlined"
          iconPosition="right"
        />
      </div>
    </div>
  );

  return (
    <MainLayout
      wizardLayout
      title="Super User"
      breadCrumbItems={['New Project', 'Survey SelectQuestions']}
      titleClass="mb-2"
      contentClass="py-4"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <Loading visible={loading} />

      <ChangeSurveyGroupModal
        handleOk={() => {
          const path = dynamicMap.superUser.surveySettings();
          const params = stringify({
            projectId: parsedQuery.projectId,
            surveyGroupId: selectedSurveyGroupKey,
            wizardEditMode: parsedQuery?.wizardEditMode,
          });

          history.push(`${path}${params}`);
        }}
        handleCancel={() => {
          setSelectedSurveyGroupKey('');
          setSurveyGroupModal(false);
        }}
        currentSurveyGroup={currentSurveyGroupName}
        visible={surveyGroupModal}
      />

      <AddClusterModal
        visible={addClusterModal}
        onCancel={() => setAddClusterModal(false)}
        onSave={(vals) => {
          const clusterId = addItemToClusters(vals);
          setAddClusterModal(false);

          setQuery({ clusterId });
        }}
      />

      <AddCompetencyModal
        visible={addCompetencyModal}
        onCancel={() => setAddCompetencyModal(false)}
        onSave={(vals) => {
          const competencyId = addItemToClusters(vals);
          setAddCompetencyModal(false);

          setQuery({ competencyId });
        }}
      />

      <AddQuestionModal
        visible={addQuestionModal}
        onCancel={() => setAddQuestionModal(false)}
        onSave={(vals) => {
          const questionId = addItemToClusters(vals);
          setAddQuestionModal(false);

          setQuery({ questionId });
        }}
      />

      <div className="bg-white grid grid-cols-12 pl-15">
        {!parsedQuery?.wizardEditMode ? (
          <Menu
            onClick={(key) => {
              setSurveyGroupModal(true);
              setSelectedSurveyGroupKey(key);
            }}
            items={surveyGroups?.data}
            className="col-span-2"
          />
        ) : null}

        <div
          className={`px-6 py-5 col-span-10 ${
            parsedQuery?.wizardEditMode ? 'col-start-2' : 'col-start-3'
          } `}
        >
          <Steps wizardSteps currentPosition={3} />

          <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={_handleSubmit}
          >
            {({ values, errors, touched, handleSubmit }) => (
              <Form className="pr-28" onSubmit={handleSubmit}>
                <h4 className="text-secondary text-lg mb-8 mt-17">Rating Scale</h4>

                {values.ratingScales.map((row, i) => (
                  <div key={i} className="grid grid-cols-12">
                    <p className="col-span-12 text-heading mb-3">{i}</p>

                    <Input
                      placeholder="Label"
                      value={row.label}
                      name={`ratingScales[${i}].label`}
                      wrapperClassName="col-span-3 mr-6"
                      onChange={(e) => handleRatingScalesChange(e.target.value, i, 'label')}
                      errorMessage={
                        touched?.ratingScales?.[i]?.label && errors?.ratingScales?.[i]?.label
                      }
                    />

                    <Input
                      value={row.description}
                      name={`ratingScales[${i}].description`}
                      onChange={(e) => handleRatingScalesChange(e.target.value, i, 'description')}
                      placeholder="Description"
                      wrapperClassName="col-span-9"
                      errorMessage={
                        touched?.ratingScales?.[i]?.description &&
                        errors?.ratingScales?.[i]?.description
                      }
                    />
                  </div>
                ))}

                <h4 className="text-secondary text-lg mt-8.5">Data Model</h4>

                <div className="grid grid-cols-12 gap-x-8 mt-8">
                  <SecondaryMenu
                    title="ALL"
                    titleClassName="text-body"
                    className="py-3 col-span-3 h-94 overflow-x-hidden overflow-y-auto"
                    items={values.clusters}
                    defaultClusterId={firstClusterItem.id}
                    onClusterClick={(clusterId) => onMenuClick({ clusterId })}
                    onCompetencyClick={(competencyId) => onMenuClick({ competencyId })}
                    onQuestionClick={(questionId) => onMenuClick({ questionId })}
                  />

                  <div
                    className="col-span-9 p-6 rounded-7px border border-antgray-500 w-full
                  h-94 overflow-y-auto"
                  >
                    {selectedQuestion ? (
                      <QuestionEditSection
                        onCancel={() => setSelectedQuestion('')}
                        onSave={(vals) => {
                          updateCluster(
                            { ...vals, label: vals.name },
                            {
                              questionId: selectedQuestion.id,
                            },
                          );
                          setSelectedQuestion('');
                        }}
                        data={selectedQuestion}
                        clusterName={_selectedCluster?.name}
                        competencyName={_selectedCompetency?.name}
                      />
                    ) : selectedCompetency ? (
                      <CompetencyEditSection
                        onCancel={() => setSelectedCompetency('')}
                        onSave={(vals) => {
                          updateCluster(vals, {
                            competencyId: selectedCompetency.id,
                          });
                          setSelectedCompetency('');
                        }}
                        data={selectedCompetency}
                        clusterName={_selectedCluster?.name}
                      />
                    ) : selectedCluster ? (
                      <ClusterEditSection
                        selectedCluster={selectedCluster}
                        onSave={({ clusterName }) => {
                          updateCluster(
                            { name: clusterName },
                            {
                              clusterId: selectedCluster.id,
                            },
                          );
                          setSelectedCluster('');
                        }}
                        onCancel={() => setSelectedCluster('')}
                      />
                    ) : (
                      <DraggableTable
                        tableClassName="clusters-table"
                        renderHeader={renderHeader}
                        onClusterEdit={(cluster) => setSelectedCluster(cluster)}
                        onClusterDelete={(cluster) => deleteCluster({ clusterId: cluster.id })}
                        onCompetencyEdit={(competency) => setSelectedCompetency(competency)}
                        onCompetencyDelete={(competency) =>
                          deleteCluster({ competencyId: competency.id })
                        }
                        onQuestionEdit={(question) => setSelectedQuestion(question)}
                        onQuestionDelete={(question) => deleteCluster({ questionId: question.id })}
                        data={ClusterUtils.getTableData(parsedQuery, values)}
                        onSortEnd={onClusterSortEnd}
                      />
                    )}
                  </div>

                  <div className="col-span-8">
                    <p className="text-red-500 h-5">
                      {touched.clusters && typeof errors.clusters === 'string' && errors.clusters}
                    </p>
                  </div>
                </div>

                <div className="bg-antgray-600 rounded-lg p-6 mt-12">
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-secondary text-lg ml-2.3">Feedbacks</p>

                    <Button
                      size="middle"
                      text="Add Question"
                      icon="PlusCircleOutlined"
                      iconPosition="right"
                      textClassName="mr-2"
                      textSize="xs"
                      type="gray"
                      onClick={() => addFeedback(values.feedbacks)}
                    />
                  </div>

                  <SortableFeedbacks
                    errors={errors}
                    touched={touched}
                    items={values.feedbacks
                      .filter((el) => !el.deleted)
                      .sort((a, b) => a.showOrder - b.showOrder)}
                    onSortEnd={onFeedbackSortEnd}
                    handleFormChange={handleFeedbackChange}
                    deleteFeedback={(feedback) => deleteFeedback(values.feedbacks, feedback)}
                  />
                </div>

                <div className="rounded-lg py-6 mt-12">
                  <SortableQuestions
                    data={values.questions}
                    onQuestionSortEnd={onQuestionSortEnd}
                    onRandomize={randomizeQuestions}
                  />
                </div>

                <p className="text-red-500 h-5">
                  {touched.feedbacks && typeof errors.feedbacks === 'string' && errors.feedbacks}
                </p>

                <div className="mt-16 pb-22 flex justify-end">
                  <Button
                    className="w-24.5 h-9.5"
                    type="link"
                    text="Back"
                    textSize="base"
                    onClick={() => {
                      const params = stringify({
                        projectId: parsedQuery?.projectId,
                        surveyGroupId: parsedQuery?.surveyGroupId,
                        wizardEditMode: parsedQuery?.wizardEditMode,
                      });

                      const path = dynamicMap.superUser.surveyIntro();

                      history.push(`${path}${params}`);
                    }}
                  />

                  <Button
                    className="w-24.5 h-9.5"
                    text="Next"
                    textSize="base"
                    onClick={handleSubmit}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

SurveyQuestionsList.propTypes = {
  fetchSurveyGroups: PropTypes.func.isRequired,
  fetchSurveyQuestions: PropTypes.func.isRequired,
  setSurveyQuestions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveyGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  surveyQuestions: PropTypes.shape({
    ratingScales: PropTypes.arrayOf(
      PropTypes.shape({
        score: PropTypes.number,
        description: PropTypes.string,
        label: PropTypes.string,
      }),
    ),
    feedbacks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        statement: PropTypes.string,
        required: PropTypes.bool,
      }),
    ),
    clusters: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        showOrder: PropTypes.number,
        competencies: PropTypes.arrayOf(
          PropTypes.shape({
            definition: PropTypes.string,
            name: PropTypes.string,
            showOrder: PropTypes.number,
            highScores: PropTypes.arrayOf(PropTypes.string),
            lowScores: PropTypes.arrayOf(PropTypes.string),
          }),
        ),
      }),
    ),
  }),
};

SurveyQuestionsList.defaultProps = {
  surveyGroups: {
    data: [],
  },
  surveyQuestions: {
    ratingScales: [],
    feedbacks: [],
    clusters: [],
  },
};

export default SurveyQuestionsList;
