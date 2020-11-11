import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import arrayMove from 'array-move';

import { useHistory } from 'react-router-dom';

import { useQuery, useSurveyGroup, usePersist, useClusters } from '../../../hooks';
import { stringify } from '../../../hooks/useQuery';

import ChangeSurveyGroupModal from '../Wizard/Helper/ChangeSurveyGroupModal';

import * as ClusterUtils from '../../../lib/Wizard/clusterUtils';

import ClusterEditSection from '../Wizard/Helper/ClusterEditSection';
import CompetencyEditSection from '../Wizard/Helper/CompetencyEditSection';
import QuestionEditSection from '../Wizard/Helper/QuestionEditSection';
import SortableFeedbacks from '../Wizard/Helper/SortableFeedbacks';

import AddQuestionModal from '../Wizard/Helper/AddQuestionModal';
import AddCompetencyModal from '../Wizard/Helper/AddCompetencyModal';

import MainLayout from '../../Common/Layout';
import Input from '../../Common/Input';
import SecondaryMenu from '../../Common/Menu';
import Button from '../../Common/Button';
import DraggableTable from '../../Common/DataTable';
import Loading from '../../Common/Loading';

const SurveyQuestionsList = ({
  // surveyGroupInfo,
  // fetchSurveyGroupInfo,
  // setSurveyGroupInfo,
  loading,
}) => {
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
  const [surveyGroups, , surveyGroupId] = useSurveyGroup();
  const [persistedData, setPersistData] = usePersist();
  const [surveyQuestions, firstClusterItem, _selectedCluster, _selectedCompetency] = useClusters();
  const [parsedQuery, query, setQuery] = useQuery();

  // React.useEffect(() => {
  //   if (surveyGroupId) fetchSurveyGroupInfo(surveyGroupId);
  // }, [surveyGroupId]);

  const [addCompetencyModal, setAddCompetencyModal] = React.useState(false);
  const [addQuestionModal, setAddQuestionModal] = React.useState(false);

  const [selectedCluster, setSelectedCluster] = React.useState('');
  const [selectedCompetency, setSelectedCompetency] = React.useState('');
  const [selectedQuestion, setSelectedQuestion] = React.useState('');

  const surveyQuestionsStringified = JSON.stringify(surveyQuestions);

  const handleFormChange = (newVal, row, key, subKey) => {
    // const newValues = formRef.current.values[key].map((el) => {
    //   if (el.id === row.id) {
    //     return { ...el, [subKey]: newVal };
    //   }
    //   return el;
    // });
    // formRef.current.setValues({ ...formRef.current.values, [key]: newValues });
  };

  const onMenuClick = ({ clusterId, competencyId, questionId }) => {
    // setSelectedCluster('');
    // setSelectedCompetency('');
    // setSelectedQuestion('');
    // const Q = {};
    // const isIdValid = (id) => Number.isInteger(id) && id >= 0;
    // if (isIdValid(clusterId)) {
    //   Q.clusterId = clusterId * 1 === parsedQuery?.clusterId * 1 ? null : clusterId.toString();
    //   Q.competencyId = null;
    //   Q.questionId = null;
    // }
    // if (isIdValid(competencyId)) {
    //   Q.competencyId =
    //     competencyId * 1 === parsedQuery?.competencyId * 1 ? null : competencyId.toString();
    //   Q.questionId = null;
    // }
    // if (isIdValid(questionId)) {
    //   Q.questionId = questionId * 1 === parsedQuery?.questionId * 1 ? null : questionId.toString();
    // }
    // setQuery(Q);
  };

  const setClusters = (clusters) => {
    // setPersistData(clusters);
    // formRef.current.setValues({ ...formRef.current.values, clusters });
  };

  const updateCluster = (newVals, ids) => {
    // const oldClusters = [...formRef.current?.values?.clusters];
    // const newClusters = ClusterUtils.updateItem(parsedQuery, oldClusters, newVals, ids);
    // setClusters(newClusters);
  };

  const deleteCluster = (ids) => {
    // const oldClusters = [...formRef.current?.values?.clusters];
    // const newClusters = ClusterUtils.deleteItem(parsedQuery, oldClusters, ids);
    // setClusters(newClusters);
  };

  const onClusterSortEnd = ({ oldIndex, newIndex }) => {
    // if (oldIndex !== newIndex && formRef?.current) {
    //   const oldValues = formRef.current.values || {};
    //   const clusters = ClusterUtils.clusterSortRefactor(
    //     parsedQuery,
    //     oldValues.clusters,
    //     oldIndex,
    //     newIndex,
    //   );
    //   setClusters(clusters);
    // }
  };

  const addFeedback = (oldFeedbacks) => {
    // const feedbacks = [...oldFeedbacks];
    // // creating a unique id
    // const feedbackIds = feedbacks?.length > 0 ? feedbacks.map((el) => el.id * 1) : [1];
    // const id = feedbackIds.reduce((prevValue, currentValue) => prevValue + currentValue);
    // const index = feedbacks.length;
    // const showOrder =
    //   feedbacks?.length > 0 ? Math.max(...feedbacks.map((el) => el.showOrder * 1)) + 1 : 1;
    // const newClusters = {
    //   label: '',
    //   statement: '',
    //   required: false,
    //   showOrder,
    //   index,
    //   id,
    //   newAddedItem: true,
    // };
    // feedbacks.push(newClusters);
    // formRef.current.setValues({ ...formRef.current.values, feedbacks });
  };

  const addItemToClusters = (newItem) => {
    // const currentClusterId = _selectedCluster?.id;
    // const oldClusters = [...formRef.current?.values?.clusters];
    // const newClusters = ClusterUtils.addItem(
    //   oldClusters,
    //   {
    //     clusterId: currentClusterId,
    //     competencyId: parsedQuery?.competencyId,
    //     questionId: parsedQuery?.questionId,
    //   },
    //   newItem,
    //   parsedQuery,
    // );
    // setClusters(newClusters);
  };

  const onFeedbackSortEnd = ({ oldIndex, newIndex }) => {
    // if (oldIndex !== newIndex && formRef?.current) {
    //   const oldValues = formRef.current.values || {};
    //   const arrSwitch = (arr) =>
    //     arrayMove([].concat(arr), oldIndex, newIndex)
    //       .filter((el) => !!el)
    //       .map((el, i) => ({ ...el, index: i, showOrder: i + 1, name: el.name || el.label }));
    //   const feedbacks = arrSwitch(oldValues.feedbacks);
    //   formRef.current.setValues({ ...oldValues, feedbacks });
    // }
  };

  const deleteFeedback = (oldFeedbacks, removableFeedback) => {
    // const newFeedbacks = [...oldFeedbacks];
    // const removeIndex = newFeedbacks.findIndex(
    //   (feedback) => feedback.id * 1 === removableFeedback.id * 1,
    // );
    // newFeedbacks.splice(removeIndex, 1);
    // formRef.current.setValues({ ...formRef.current.values, feedbacks: newFeedbacks });
  };

  const initialValues = React.useMemo(() => {
    // const clusters =
    //   persistedData?.data?.length > 0 ? persistedData.data : surveyQuestions.clusters || [];
    // return {
    //   ratingScales:
    //     surveyQuestions?.ratingScales?.length > 0 ? surveyQuestions.ratingScales : _ratingScales,
    //   feedbacks: surveyQuestions?.feedbacks?.length > 0 ? surveyQuestions.feedbacks : [],
    //   clusters: clusters.map((el) => ({ ...el, index: el.showOrder, name: el.name || el.label })),
    // };
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
            setAddQuestionModal(true);
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

      <AddQuestionModal
        visible={false}
        onCancel={() => setAddQuestionModal(false)}
        onSave={(vals) => {
          addItemToClusters(vals);
          setAddQuestionModal(false);
        }}
      />

      <AddCompetencyModal
        visible={false}
        onCancel={() => setAddCompetencyModal(false)}
        onSave={(vals) => {
          addItemToClusters(vals);
          setAddCompetencyModal(false);
        }}
      />

      <div className="bg-white grid grid-cols-12 pl-15">
        <div className="px-6 py-5 col-start-2 col-span-11">
          <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={{
              cluster: [],
              feedbacks: [],
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              console.log({ values });
            }}
          >
            {({ values, errors, touched, handleSubmit }) => (
              <Form className="pr-28" onSubmit={handleSubmit}>
                <h4 className="text-secondary text-lg mb-8 mt-17">Survey Group</h4>

                <Input
                  placeholder="Survey Group"
                  wrapperClassName="col-span-3 mr-6"
                  inputClass="w-40"
                  value=""
                  onChange={(val) => {}}
                />

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
                        data={[]}
                        // data={ClusterUtils.getTableData(parsedQuery, values)}
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
                  <Button
                    className="w-24.5 h-9.5"
                    type="link"
                    text="Back"
                    textSize="base"
                    onClick={() => history.push('/super-user/pre-defined-data')}
                  />

                  <Button
                    className="w-24.5 h-9.5"
                    text="Next"
                    textSize="base"
                    // onClick={handleSubmit}
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
  setSurveyGroupInfo: PropTypes.func.isRequired,
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
