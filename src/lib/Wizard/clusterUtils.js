import arrayMove from 'array-move';

const isIndexValid = (index) => Number.isInteger(index) && index >= 0;

const fetchIndex = (parsedQuery, oldClusters, ids) => {
  const {
    clusterId = parsedQuery?.clusterId,
    competencyId = parsedQuery?.competencyId,
    questionId = parsedQuery?.questionId,
  } = ids;

  const clusters = [...oldClusters];
  const clusterIndex = clusters.findIndex((cluster) => cluster.id * 1 === clusterId * 1);
  // const foundClusterIndex = clusters.findIndex((cluster) => cluster.id * 1 === clusterId * 1);
  // const clusterIndex = foundClusterIndex !== -1 ? foundClusterIndex : 0;

  const competencyIndex = (clusters[clusterIndex]?.competencies || []).findIndex(
    (competency) => competency.id * 1 === competencyId * 1,
  );

  const questionIndex = (
    clusters[clusterIndex]?.competencies?.[competencyIndex]?.questions || []
  ).findIndex((question) => question.id * 1 === questionId * 1);

  return [clusterIndex, competencyIndex, questionIndex];
};

const updateItem = (parsedQuery, oldClusters, newValues, ids) => {
  const clusters = [...oldClusters];

  const [clusterIndex, competencyIndex, questionIndex] = fetchIndex(parsedQuery, oldClusters, ids);

  // if  we're updating clusters
  if (!isIndexValid(competencyIndex) && !isIndexValid(questionIndex)) {
    clusters[clusterIndex] = { ...clusters[clusterIndex], ...newValues };

    return clusters;
  }

  // if we're updating competencies
  if (isIndexValid(competencyIndex) && !isIndexValid(questionIndex)) {
    clusters[clusterIndex].competencies[competencyIndex] = {
      ...clusters[clusterIndex].competencies[competencyIndex],
      ...newValues,
    };

    return clusters;
  }

  // if we're updating questions
  if (isIndexValid(competencyIndex) && isIndexValid(questionIndex)) {
    clusters[clusterIndex].competencies[competencyIndex].questions[questionIndex] = {
      ...clusters[clusterIndex].competencies[competencyIndex].questions[questionIndex],
      ...newValues,
    };

    return clusters;
  }

  return clusters;
};

const deleteItem = (parsedQuery, oldClusters, ids) => {
  const clusters = [...oldClusters];

  const [clusterIndex, competencyIndex, questionIndex] = fetchIndex(parsedQuery, oldClusters, ids);

  if (!isIndexValid(competencyIndex) && !isIndexValid(questionIndex)) {
    clusters.splice(clusterIndex, 1);
  }

  // if we're updating competencies
  if (isIndexValid(competencyIndex) && !isIndexValid(questionIndex)) {
    clusters[clusterIndex].competencies.splice(competencyIndex, 1);
  }

  // if we're updating questions
  if (isIndexValid(competencyIndex) && isIndexValid(questionIndex)) {
    clusters[clusterIndex].competencies[competencyIndex].questions.splice(questionIndex, 1);
  }

  return clusters;
};

const clusterSortRefactor = (parsedQuery, oldClusters, oldIndex, newIndex) => {
  const { clusterId, competencyId } = parsedQuery;

  const arrSwitch = (arr) =>
    arrayMove([].concat(arr), oldIndex, newIndex)
      .filter((el) => !!el)
      .map((el, i) => ({ ...el, showOrder: i + 1, name: el.name || el.label }));

  const index = oldClusters.findIndex((cluster) => cluster.id * 1 === clusterId * 1);
  const updatedClusterIndex = index === -1 ? 0 : index;

  if (!clusterId) {
    const switchedArr = arrSwitch(oldClusters);
    return switchedArr;
  }

  const { competencies } = oldClusters[updatedClusterIndex];

  if (!competencyId) {
    const switchedArr = arrSwitch(competencies);
    const newClusters = [...oldClusters];
    newClusters[updatedClusterIndex].competencies = switchedArr;

    return newClusters;
  }

  const updatedCompetencyIndex = competencies.findIndex(
    (competency) => competency.id * 1 === competencyId * 1,
  );
  const { questions } = oldClusters?.[updatedClusterIndex]?.competencies?.[updatedCompetencyIndex];

  const switchedArr = arrSwitch(questions);
  const newClusters = [...oldClusters];
  newClusters[updatedClusterIndex].competencies[updatedCompetencyIndex].questions = switchedArr;

  return newClusters;
};

const getTableData = (parsedQuery, values) => {
  const format = (arr) =>
    arr.map((el) => ({ ...el, index: el.showOrder, name: el.name || el.label }));

  const { clusterId, competencyId } = parsedQuery;

  const { clusters = [] } = values || {};

  const { competencies = [] } =
    clusters.find((el) => el.id * 1 === parsedQuery?.clusterId * 1) || {};

  const { questions = [] } =
    competencies.find((el) => el.id * 1 === parsedQuery?.competencyId * 1) || {};

  if (competencyId) {
    return format(questions);
  }

  if (clusterId) {
    return format(competencies);
  }

  return format(clusters);
};

const addItem = (oldClusters, ids, newItem, parsedQuery) => {
  const clusters = [...oldClusters];

  const generateNewItemProperties = (refArr) => {
    const lastItem = refArr?.length > 0 ? refArr[refArr.length - 1] : { index: -1 };
    const index = lastItem.index + 1;
    const showOrder = index + 1;

    // creating a unique id
    const refArrIds = refArr?.length > 0 ? refArr.map((el) => el.id * 1) : [1];
    const id = refArrIds.reduce((prevValue, currentValue) => prevValue + currentValue);

    return {
      index,
      id,
      showOrder,
    };
  };

  if (!newItem && !ids.clusterId) {
    // means that we're adding a cluster

    const { id, index, showOrder } = generateNewItemProperties(clusters);

    const newClusters = {
      name: `Cluster ${index}`,
      competencies: [],
      showOrder,
      index,
      id,
    };

    clusters.push(newClusters);

    return clusters;
  }

  const [clusterIndex, competencyIndex] = fetchIndex(parsedQuery, oldClusters, ids);

  if (isIndexValid(clusterIndex) && !isIndexValid(competencyIndex)) {
    // means that we're adding a competency

    const { id, index, showOrder } = generateNewItemProperties(clusters[clusterIndex].competencies);
    const newCompetency = {
      ...newItem,
      questions: [],
      id,
      index,
      showOrder,
    };

    clusters[clusterIndex].competencies.push(newCompetency);

    return clusters;
  }

  if (isIndexValid(competencyIndex) && isIndexValid(clusterIndex)) {
    // means that we're adding a question

    const { id, index, showOrder } = generateNewItemProperties(
      clusters[clusterIndex].competencies[competencyIndex].questions,
    );

    const newQuestion = { ...newItem, id, index, showOrder };
    clusters[clusterIndex].competencies[competencyIndex].questions.push(newQuestion);

    return clusters;
  }

  return clusters;
};

export { updateItem, deleteItem, clusterSortRefactor, getTableData, addItem };