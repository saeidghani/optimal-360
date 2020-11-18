import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import arrayMove from 'array-move';
import { useHistory } from 'react-router-dom';

import { dynamicMap } from '../../../routes/RouteMap';

import { useQuery } from '../../../hooks';

import * as ClusterUtils from '../../../lib/Wizard/clusterUtils';

import ClusterEditSection from '../Wizard/Helper/ClusterEditSection';
import CompetencyEditSection from '../Wizard/Helper/CompetencyEditSection';
import QuestionEditSection from '../Wizard/Helper/QuestionEditSection';
import SortableFeedbacks from '../Wizard/Helper/SortableFeedbacks';

import AddClusterModal from '../Wizard/Helper/AddClusterModal';
import AddCompetencyModal from '../Wizard/Helper/AddCompetencyModal';
import AddQuestionModal from '../Wizard/Helper/AddQuestionModal';

import MainLayout from '../../Common/Layout';
import Input from '../../Common/Input';
import SecondaryMenu from '../../Common/Menu';
import Button from '../../Common/Button';
import DraggableTable from '../../Common/DataTable';
import Loading from '../../Common/Loading';

const SurveyQuestionsList = ({
  surveyGroupInfo,
  fetchSurveyGroupInfo,
  setSurveyGroupInfo,
  addSurveyGroup,
  loading,
}) => {
  const formRef = React.useRef();

  const schema = yup.object({
    name: yup.string().nullable().required('Survey group name is required'),
    clusters: yup.array(yup.object({})).min(1, 'You must specify at least one cluster item'),
    feedbacks: yup
      .array(
        yup.object({
          label: yup.string().nullable().required('label is required'),
          statement: yup.string().nullable().required('statement is required'),
          required: yup.bool().required('required is required'),
        }),
      )
      .min(1, 'You must specify at least one feedback item'),
  });

  const history = useHistory();
  const [parsedQuery, query, setQuery] = useQuery();

  React.useEffect(() => {
    fetchSurveyGroupInfo(parsedQuery.surveyGroupId);
  }, [fetchSurveyGroupInfo, parsedQuery.surveyGroupId]);

  const [addClusterModal, setAddClusterModal] = React.useState(false);
  const [addCompetencyModal, setAddCompetencyModal] = React.useState(false);
  const [addQuestionModal, setAddQuestionModal] = React.useState(false);

  const [selectedCluster, setSelectedCluster] = React.useState('');
  const [selectedCompetency, setSelectedCompetency] = React.useState('');
  const [selectedQuestion, setSelectedQuestion] = React.useState('');

  const firstClusterItem = surveyGroupInfo?.clusters?.length > 0 ? surveyGroupInfo.clusters[0] : {};
  const _selectedCluster =
    surveyGroupInfo?.clusters?.length > 0
      ? surveyGroupInfo.clusters.find((el) => el.id * 1 === parsedQuery.clusterId * 1)
      : {};
  const _selectedCompetency =
    _selectedCluster?.competencies?.length > 0
      ? _selectedCluster.competencies.find((el) => el.id * 1 === parsedQuery.competencyId * 1)
      : {};

  const handleFormChange = (newVal, row, key, subKey) => {
    const newValues = formRef.current.values[key].map((el) => {
      if (el.id === row.id) {
        return { ...el, [subKey]: newVal };
      }
      return el;
    });

    formRef.current.setValues({ ...formRef.current.values, [key]: newValues });
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

    // creating a unique id
    const feedbackIds = feedbacks?.length > 0 ? feedbacks.map((el) => el.id * 1) : [1];
    const id = feedbackIds.reduce((prevValue, currentValue) => prevValue + currentValue);
    const index = feedbacks.length;
    const showOrder =
      feedbacks?.length > 0 ? Math.max(...feedbacks.map((el) => el.showOrder * 1)) + 1 : 1;

    const newClusters = {
      label: '',
      statement: '',
      required: false,
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
    const clusters = surveyGroupInfo.clusters || [];
    return {
      name: surveyGroupInfo?.name,
      clusters: clusters.map((el) => ({ ...el, index: el.showOrder, name: el.name || el.label })),
      feedbacks: surveyGroupInfo?.feedbacks?.length > 0 ? surveyGroupInfo.feedbacks : [],
    };
    // eslint-disable-next-line
  }, [query, JSON.stringify(surveyGroupInfo)]);

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
              // addItemToClusters();
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
      title="Super User"
      hasBreadCrumb
      titleClass="mb-2"
      contentClass="py-4"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <Loading visible={loading} />

      <AddClusterModal
        visible={addClusterModal}
        onCancel={() => setAddClusterModal(false)}
        onSave={(vals) => {
          addItemToClusters(vals);
          setAddClusterModal(false);
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

      <AddQuestionModal
        visible={addQuestionModal}
        onCancel={() => setAddQuestionModal(false)}
        onSave={(vals) => {
          addItemToClusters(vals);
          setAddQuestionModal(false);
        }}
      />

      <div className="bg-white grid grid-cols-12 pl-15">
        <div className="px-6 py-5 col-start-2 col-span-11">
          <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values) => {
              try {
                if (parsedQuery.surveyGroupId) {
                  await setSurveyGroupInfo({
                    surveyGroupId: parsedQuery.surveyGroupId,
                    ...values,
                  });
                } else {
                  await addSurveyGroup(values);
                }

                history.push(dynamicMap.superUser.organizationsList());
              } catch (err) {}
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form className="pr-28" onSubmit={handleSubmit}>
                <h4 className="text-secondary text-lg mb-8 mt-17">Survey Group</h4>

                <Input
                  placeholder="Survey Group"
                  wrapperClassName="w-40"
                  inputClass="bg-antgray-100 bg-opacity-10 border-0 border-transparent text-antgray-100 hover:border-transparent"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  errorMessage={touched.name && errors.name}
                />

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
                    items={values.feedbacks}
                    onSortEnd={onFeedbackSortEnd}
                    handleFormChange={handleFormChange}
                    deleteFeedback={(feedback) => deleteFeedback(values.feedbacks, feedback)}
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
                    onClick={() => history.push(dynamicMap.superUser.bankModels())}
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
  fetchSurveyGroupInfo: PropTypes.func.isRequired,
  addSurveyGroup: PropTypes.func.isRequired,
  setSurveyGroupInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  surveyGroupInfo: PropTypes.shape({
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
  surveyGroupInfo: {},
};

export default SurveyQuestionsList;
