import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import arrayMove from 'array-move';

import { useHistory } from 'react-router-dom';

import { useQuery, useSurveyGroup, usePersist, useClusters } from '../../hooks';
import { stringify } from '../../hooks/useQuery';

import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';
import Menu from './Helper/Menu';

import * as ClusterUtils from '../../lib/Wizard/clusterUtils';

import ClusterEditSection from './Helper/ClusterEditSection';
import CompetencyEditSection from './Helper/CompetencyEditSection';
import QuestionEditSection from './Helper/QuestionEditSection';
import SortableFeedbacks from './Helper/SortableFeedbacks';

import AddQuestionModal from './Helper/AddQuestionModal';
import AddCompetencyModal from './Helper/AddCompetencyModal';

import MainLayout from '../Common/Layout';
import Steps from '../Common/Steps';
import Input from '../Common/Input';
import SecondaryMenu from '../Common/Menu';
import Button from '../Common/Button';
import DraggableTable from '../Common/DataTable';
import Loading from '../Common/Loading';

const _ratingScales = [
  { id: '1', score: 0, description: '', label: '' },
  { id: '2', score: 0, description: '', label: '' },
  { id: '3', score: 0, description: '', label: '' },
  { id: '4', score: 0, description: '', label: '' },
  { id: '5', score: 0, description: '', label: '' },
];

const SurveyQuestionsList = ({ fetchSurveyQuestions, setSurveyQuestions, loading }) => {
  const formRef = React.useRef();

  const schema = yup.object({
    ratingScales: yup.array(
      yup.object({
        score: yup.number().required('score is required'),
        description: yup.string().required('description is required'),
        label: yup.string().required('label is required'),
      }),
    ),
    feedbacks: yup
      .array(
        yup.object({
          label: yup.string().required('label is required'),
          statement: yup.string().required('statement is required'),
          required: yup.bool().required('required is required'),
        }),
      )
      .min(1, 'You must specify at least one feedback item'),
  });

  const history = useHistory();

  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();
  const [persistedData, setPersistData] = usePersist();
  const [surveyQuestions, firstClusterItem, _selectedCluster, _selectedCompetency] = useClusters();
  const [parsedQuery, query, setQuery] = useQuery();

  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [addCompetencyModal, setAddCompetencyModal] = React.useState(false);
  const [addQuestionModal, setAddQuestionModal] = React.useState(false);

  const [isFormDone, setIsFormDone] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');

  const [selectedCluster, setSelectedCluster] = React.useState('');
  const [selectedCompetency, setSelectedCompetency] = React.useState('');
  const [selectedQuestion, setSelectedQuestion] = React.useState('');

  const surveyQuestionsStringified = JSON.stringify(surveyQuestions);

  const handleFormChange = (newVal, row, key, subKey) => {
    const newValues = formRef.current.values[key].map((el) => {
      if (el.id === row.id) {
        return { ...el, [subKey]: newVal };
      }

      return el;
    });

    formRef.current.setValues({ ...formRef.current.values, [key]: newValues });
  };

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

  React.useEffect(() => {
    if (surveyGroupId) {
      fetchSurveyQuestions(surveyGroupId);
    }

    if (formRef?.current) {
      // reset form state when surveyGroup changes
      // happens when user decides to discard current settings and changes currentSurveyGroup
      formRef.current.setTouched({});
      formRef.current.setErrors({});
    }
    // eslint-disable-next-line
  }, [fetchSurveyQuestions, surveyGroupId]);

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
    formRef.current.setValues({ ...formRef.current.values, clusters });
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
    const lastFeedback = feedbacks[feedbacks.length - 1];
    const newIndex = lastFeedback.showOrder + 1;
    const newId = lastFeedback.id + 100;

    const newClusters = {
      label: '',
      statement: '',
      required: false,
      showOrder: newIndex,
      index: newIndex,
      id: newId,
    };

    feedbacks.push(newClusters);

    formRef.current.setValues({ ...formRef.current.values, feedbacks });
  };

  const addItemToClusters = (newItem) => {
    const currentClusterId = _selectedCluster?.id;

    const oldClusters = [...formRef.current?.values?.clusters];
    const newClusters = ClusterUtils.addItem(
      oldClusters,
      {
        clusterId: currentClusterId,
        competencyId: parsedQuery?.competencyId,
        questionId: parsedQuery?.questionId,
      },
      newItem,
      parsedQuery,
    );

    setClusters(newClusters);
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
    newFeedbacks.splice(removeIndex, 1);

    formRef.current.setValues({ ...formRef.current.values, feedbacks: newFeedbacks });
  };

  const initialValues = React.useMemo(() => {
    const clusters =
      persistedData?.data?.length > 0 ? persistedData.data : surveyQuestions.clusters || [];

    return {
      ratingScales:
        surveyQuestions?.ratingScales?.length > 0 ? surveyQuestions.ratingScales : _ratingScales,
      feedbacks: surveyQuestions?.feedbacks?.length > 0 ? surveyQuestions.feedbacks : [],
      clusters: clusters.map((el) => ({ ...el, index: el.showOrder, name: el.name || el.label })),
    };

    // eslint-disable-next-line
  }, [query, surveyQuestionsStringified]);

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
          className="mr-3 text-base"
          onClick={() => {
            if (parsedQuery?.competencyId) {
              setAddQuestionModal(true);
            } else if (parsedQuery?.clusterId) {
              setAddCompetencyModal(true);
            } else {
              addItemToClusters();
            }
          }}
          icon="PlusCircleOutlined"
          iconPosition="right"
        />

        <Button
          size="middle"
          type="gray"
          textSize="xs"
          textClassName="mr-2"
          text="Export Exel File"
          icon="PlusCircleOutlined"
          iconPosition="right"
          className="text-base"
          // onClick={() => setQuery()}
        />
      </div>
    </div>
  );

  return (
    <MainLayout
      title="Super User"
      hasBreadCrumb
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

      <AddQuestionModal
        visible={addQuestionModal}
        onCancel={() => setAddQuestionModal(false)}
        onSave={(vals) => {
          addItemToClusters(vals);
          setAddQuestionModal(false);
        }}
      />

      <AddCompetencyModal
        visible={addCompetencyModal}
        onCancel={() => setAddCompetencyModal(false)}
        onSave={(vals) => {
          addItemToClusters(vals);
          setAddCompetencyModal(false);
        }}
      />

      <div className="bg-white grid grid-cols-12 pl-15">
        <Menu
          onClick={(key) => setSelectedSurveyGroupKey(key)}
          isFormDone={isFormDone}
          items={surveyGroups?.data}
          className="col-span-2"
        />

        <div className="px-6 py-5 col-start-3 col-span-10  ">
          <Steps currentPosition={3} />

          <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values) => {
              try {
                const { projectId } = parsedQuery;
                const params = stringify({ projectId, surveyGroupId });

                await setSurveyQuestions({ ...values, surveyGroupId });
                setPersistData('');

                history.push(`/super-user/new-project/report${params}`);
              } catch (error) {}
            }}
          >
            {({ values, errors, touched, handleSubmit }) => (
              <Form className="pr-28" onSubmit={handleSubmit}>
                <h4 className="text-secondary text-lg mb-8 mt-17">Rating Scale</h4>

                {values.ratingScales.map((row, i) => (
                  <div key={row.id || i} className="grid grid-cols-12">
                    <p className="col-span-12 text-heading mb-3">{i + 1}</p>

                    <Input
                      placeholder="Label"
                      value={row.label}
                      name={`ratingScales[${i}].label`}
                      wrapperClassName="col-span-3 mr-6"
                      onChange={(e) =>
                        handleFormChange(e.target.value, row, 'ratingScales', 'label')
                      }
                      errorMessage={
                        touched?.ratingScales?.[i]?.label && errors?.ratingScales?.[i]?.label
                      }
                    />

                    <Input
                      value={row.description}
                      name={`ratingScales[${i}].description`}
                      onChange={(e) =>
                        handleFormChange(e.target.value, row, 'ratingScales', 'description')
                      }
                      placeholder="Does not describe the person at all"
                      wrapperClassName="col-span-9"
                      errorMessage={
                        touched?.ratingScales?.[i]?.description &&
                        errors?.ratingScales?.[i]?.description
                      }
                    />
                  </div>
                ))}

                <h4 className="text-secondary text-lg mt-8.5">Data Model</h4>

                <div className="grid grid-cols-12 gap-x-8">
                  <SecondaryMenu
                    title="ALL"
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
                    items={values.feedbacks}
                    onSortEnd={onFeedbackSortEnd}
                    handleFormChange={handleFormChange}
                    deleteFeedback={(feedback) => deleteFeedback(values.feedbacks, feedback)}
                  />
                </div>

                <div className="mt-16 pb-22 flex justify-end">
                  <Button type="link" text="Back" textSize="base" onClick={() => {}} />
                  <Button text="Next" onClick={handleSubmit} textSize="base" />
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
