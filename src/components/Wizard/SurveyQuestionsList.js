import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import arrayMove from 'array-move';
import { LineOutlined } from '@ant-design/icons';

import { useQuery } from '../../hooks/useQuery';
import { useSurveyGroup } from '../../hooks';
import ChangeSurveyGroupModal from './Helper/ChangeSurveyGroupModal';
import Menu from './Helper/Menu';
// import AddQuestionModal from './Helper/AddQuestionModal';
// import AddFeedbackModal from './Helper/AddFeedbackModal';

import MainLayout from '../Common/Layout';
import Steps from '../Common/Steps';
import Input from '../Common/Input';
import SecondaryMenu from '../Common/Menu';
import Button from '../Common/Button';
import Checkbox from '../Common/Checkbox';
import DraggableTable from '../Common/DataTable';
import Loading from '../Common/Loading';

const _ratingScales = [
  { id: '1', score: 0, description: '', label: '' },
  { id: '2', score: 0, description: '', label: '' },
  { id: '3', score: 0, description: '', label: '' },
  { id: '4', score: 0, description: '', label: '' },
  { id: '5', score: 0, description: '', label: '' },
];

const SurveyQuestionsList = ({
  surveyQuestions,
  fetchSurveyQuestions,
  setSurveyQuestions,
  loading,
  // surveyGroups,
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
    clusters: yup.array(
      yup.object({
        name: yup.string().required('name is required'),
        showOrder: yup.number().required('showOrder is required'),
        definition: yup.string().required('definition is required'),
        lowScores: yup.array(yup.string()).required('lowScores is required'),
        highScores: yup.array(yup.string()).required('highScores is required'),
        questions: yup.array(
          yup.object({
            label: yup.string().required('label is required'),
            statement: yup.string().required('statement is required'),
            statementType: yup.string().required('statementType is required'),
            required: yup.bool().required('required is required'),
            showOrder: yup.number().required('showOrder is required'),
          }),
        ),
      }),
    ),
    feedbacks: yup.array(
      yup.object({
        label: yup.string().required('label is required'),
        statement: yup.string().required('statement is required'),
        required: yup.bool().required('required is required'),
        showOrder: yup.number().required('showOrder is required'),
      }),
    ),
  });

  const [surveyGroups, currentSurveyGroupName, surveyGroupId] = useSurveyGroup();

  // console.log({ surveyQuestions });
  const [surveyGroupModal, setSurveyGroupModal] = React.useState(false);
  const [isFormDone, setIsFormDone] = React.useState(false);
  const [selectedSurveyGroupKey, setSelectedSurveyGroupKey] = React.useState('');

  const [clusterEditMode, setClusterEditMode] = React.useState(false);
  const [competencyEditMode, setCompetencyEditMode] = React.useState(false);
  const [QuestionEditMode, setQuestionEditMode] = React.useState(false);

  const [parsedQuery, , setQuery] = useQuery();
  // const { search } = history?.location;

  React.useEffect(() => {
    if (surveyGroupId) fetchSurveyQuestions(surveyGroupId);
  }, [surveyGroupId, fetchSurveyQuestions]);

  // console.log(formRef?.current?.values?.clusters);

  const handleSortEnd = ({ oldIndex, newIndex }, items) => {
    // console.log(formRef?.current?.values?.clusters);
    console.log({ oldIndex, newIndex }, items);

    if (oldIndex !== newIndex && formRef?.current?.values?.clusters) {
      const clusters = arrayMove([].concat(items), oldIndex, newIndex).filter((el) => !!el);

      console.log({ oldIndex, newIndex }, clusters);

      formRef.current.setValues({ ...formRef.current.values, clusters });
    }
  };
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
      // formRef.current.setValues({ emailSettings: _emailSettings });
    }
    // eslint-disable-next-line
  }, [fetchSurveyQuestions, surveyGroupId]);

  const selectedCluster =
    formRef?.current?.values?.clusters?.length > 0
      ? formRef.current.values.clusters.find((el) => el.id * 1 === parsedQuery.clusterId * 1)
      : {};

  const selectedCompetency =
    selectedCluster?.competencies?.length > 0
      ? selectedCluster.competencies.find((el) => el.id * 1 === parsedQuery.competencyId * 1)
      : {};

  const selectedQuestion =
    selectedCompetency?.questions?.length > 0
      ? selectedCompetency.questions.find((el) => el.id * 1 === parsedQuery.questionId * 1)
      : {};

  const renderHeader = () => {
    return (clusterEditMode && selectedCluster) ||
      (competencyEditMode && selectedCompetency) ||
      (QuestionEditMode && selectedQuestion) ? (
      <div
        className="flex flex-row justify-between bg-antgray-600 p-4
        items-center border-b border-list-border"
      >
        <p className="text-body">
          All{' > '}
          {selectedCluster?.name} {' > '}
          {selectedCompetency?.name ? `${selectedCompetency.name} > ` : ''}
          {selectedQuestion?.name ? `${selectedQuestion.name}` : ''}
          Edit
        </p>

        <div className="flex flex-row items-center">
          <Button
            onClick={() => setQuery({ clusterId: null })}
            text="Cancel"
            type="link"
            size="small"
            textSize="base"
          />
          <Button text="Save" ghost size="small" textSize="base" />
        </div>
      </div>
    ) : (
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
            text="Add Cluster"
            className="mr-3 text-base"
            // onClick={() => setquestionModal(true)}
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
            onClick={() => setQuery()}
          />
        </div>
      </div>
    );
  };

  const renderBodyWrapper = () => {
    return clusterEditMode && selectedCluster ? (
      <div className="flex flex-col">
        <h1 className="text-secondary mb-3">Cluster</h1>

        <Input placeholder="Cluster Name" value={selectedCluster.name} />
      </div>
    ) : (
      false
    );
  };

  const stringRef = formRef?.current?.values ? JSON.stringify(formRef.current.values) : '';
  const getData = React.useCallback((initialize) => {
    const clusters =
      formRef?.current?.values?.clusters?.length > 0 ? formRef.current.values.clusters : [];
    // const clusters =
    //   formRef?.current?.values?.clusters?.length > 0
    //     ? formRef.current.values.clusters
    //     : surveyQuestions.clusters || [];

    const { competencies = [] } =
      clusters.find((el) => el.id * 1 === parsedQuery?.clusterId * 1) || {};
    const { questions = [] } =
      competencies.find((el) => el.id * 1 === parsedQuery?.competencyId * 1) || {};

    let ref =
      parsedQuery?.competencyId && questions
        ? questions
        : parsedQuery?.clusterId && competencies
        ? competencies
        : clusters;

    ref = ref.map((el) => ({
      ...el,
      index: el.showOrder,
      name: el.name || el.label,
      key: el.id.toString(),
    }));

    console.log({ clusters, competencies, questions, parsedQuery, ref });

    return initialize
      ? (surveyQuestions.clusters || []).map((el) => ({
          ...el,
          index: el.showOrder,
          name: el.name || el.label,
          key: el.id.toString(),
        }))
      : formRef?.current && formRef.current.setValues({ ...formRef.current.values, clusters: ref });
  }, []);

  const onMenuClick = ({ clusterId, competencyId, questionId }) => {
    setClusterEditMode(false);
    setCompetencyEditMode(false);
    setQuestionEditMode(false);

    const Q = {};

    if (clusterId) {
      Q.clusterId = clusterId * 1 === parsedQuery?.clusterId * 1 ? null : clusterId;
      Q.competencyId = null;
      Q.questionId = null;
    }

    if (competencyId) {
      Q.competencyId = competencyId * 1 === parsedQuery?.competencyId * 1 ? null : competencyId;
      Q.questionId = null;
    }

    if (questionId) {
      Q.questionId = questionId * 1 === parsedQuery?.questionId * 1 ? null : questionId;
    }

    setQuery(Q);
  };

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

      {/* <AddQuestionModal visible={questionModal} action={setquestionModal} />
              <AddFeedbackModal visible={feedbackModal} action={setfeedbackModal} /> */}

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
            initialValues={{
              ratingScales:
                surveyQuestions?.ratingScales?.length > 0
                  ? surveyQuestions.ratingScales
                  : _ratingScales,
              feedbacks: surveyQuestions?.feedbacks?.length > 0 ? surveyQuestions.feedbacks : [],
              // clusters:
              //   surveyQuestions?.clusters?.length > 0
              //     ? surveyQuestions.clusters.map((el) => ({ ...el, index: el.showOrder }))
              //     : [],
              clusters: getData(true),
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              console.log({ values });
              // setSurveyQuestions()
            }}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <Form className="pr-28" onSubmit={handleSubmit}>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                {/* <pre>{JSON.stringify(touched, null, 2)}</pre> */}
                {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}

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

                <div
                  className="grid grid-cols-12 gap-x-8"
                  //  className="flex flex-row mt-8 mb-7.5 w-full"
                >
                  <SecondaryMenu
                    title="ALL"
                    // titleClassName="pt-2.3 pb-5.5 pl-7.5 text-body font-medium font-sans"
                    className="py-3 col-span-3"
                    items={surveyQuestions?.clusters}
                    onClusterClick={(clusterId) => onMenuClick({ clusterId })}
                    onCompetencyClick={(competencyId) => onMenuClick({ competencyId })}
                    onQuestionClick={(questionId) => onMenuClick({ questionId })}
                  />

                  <div className="col-span-9 p-6 rounded-7px border border-antgray-500 w-full">
                    <DraggableTable
                      renderHeader={renderHeader}
                      renderBodyWrapper={renderBodyWrapper}
                      onClusterEdit={() => setClusterEditMode(true)}
                      onClusterDelete={() => {}}
                      onCompetencyEdit={() => setClusterEditMode(true)}
                      onCompetencyDelete={() => {}}
                      onQuestionEdit={() => setClusterEditMode(true)}
                      onQuestionDelete={() => {}}
                      // data={values.clusters}
                      data={values.clusters}
                      onSortEnd={handleSortEnd}
                    />
                  </div>
                </div>

                <div className="bg-antgray-600 rounded-lg p-6">
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
                      // onClick={() => setfeedbackModal(true)}
                    />
                  </div>

                  {values.feedbacks.map((row, i) => (
                    <div
                      key={row.id || i}
                      className="grid grid-cols-12 gap-x-6 flex flex-row items-start my-6"
                    >
                      <Button
                        className="col-span-1 h-10"
                        type="link"
                        icon={
                          <div className="flex flex-col justify-center items-center">
                            <LineOutlined className="text-antgray-100 text-lg" />
                            <LineOutlined className="text-antgray-100 text-lg -mt-2" />
                          </div>
                        }
                      />

                      <Input
                        placeholder="General"
                        value={row.label}
                        name={`feedbacks[${i}].label`}
                        wrapperClassName="col-span-3"
                        onChange={(e) =>
                          handleFormChange(e.target.value, row, 'feedbacks', 'label')
                        }
                        errorMessage={
                          touched?.feedbacks?.[i]?.label && errors?.feedbacks?.[i]?.label
                        }
                      />

                      <Input
                        name={`feedbacks[${i}].statement`}
                        placeholder="Statement"
                        value={row.statement}
                        wrapperClassName="col-span-8"
                        onChange={(e) =>
                          handleFormChange(e.target.value, row, 'feedbacks', 'statement')
                        }
                        errorMessage={
                          touched?.feedbacks?.[i]?.statement && errors?.feedbacks?.[i]?.statement
                        }
                      />

                      <div className="col-span-12 ml-auto mt-2">
                        <Checkbox
                          checked={row.required}
                          onChange={(val) => handleFormChange(val, row, 'feedbacks', 'required')}
                          labelClass="text-secondary"
                        >
                          This question is required to answer
                        </Checkbox>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16 pb-22 flex justify-end">
                  <Button
                    type="link"
                    text="Back"
                    className="text-base w-24.5 h-9.5 flex items-center justify-center"
                  />
                  <Button
                    text="Next"
                    onClick={handleSubmit}
                    className="text-base w-24.5 h-9.5 flex items-center justify-center"
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
        showOrder: PropTypes.number,
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
