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
    if (clusters[clusterIndex].newAddedItem) {
      clusters.splice(clusterIndex, 1);
    } else {
      clusters[clusterIndex].deleted = true;
    }
  }

  // if we're updating competencies
  if (isIndexValid(competencyIndex) && !isIndexValid(questionIndex)) {
    if (clusters[clusterIndex].competencies[competencyIndex].newAddedItem) {
      clusters[clusterIndex].competencies.splice(competencyIndex, 1);
    } else {
      clusters[clusterIndex].competencies[competencyIndex].deleted = true;
    }
  }

  // if we're updating questions
  if (isIndexValid(competencyIndex) && isIndexValid(questionIndex)) {
    if (
      clusters[clusterIndex].competencies[competencyIndex].questions[questionIndex].newAddedItem
    ) {
      clusters[clusterIndex].competencies[competencyIndex].questions.splice(questionIndex, 1);
    } else {
      clusters[clusterIndex].competencies[competencyIndex].questions[questionIndex].deleted = true;
    }
  }

  return clusters;
};

const clusterSortRefactor = (parsedQuery, oldClusters, oldIndex, newIndex) => {
  const { clusterId, competencyId } = parsedQuery;

  const arrSwitch = (arr, options) =>
    arrayMove([].concat(arr), oldIndex, newIndex)
      .filter((el) => !!el)
      .map((el, i) => ({
        ...el,
        ...(options?.useSurveyPlatformShowOrder && { surveyPlatformShowOrder: i + 1 }),
        showOrder: i + 1,
        name: el.name || el.label,
      }));

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

  const switchedArr = arrSwitch(questions, { useSurveyPlatformShowOrder: true });
  const newClusters = [...oldClusters];
  newClusters[updatedClusterIndex].competencies[updatedCompetencyIndex].questions = switchedArr;

  return newClusters;
};

const getTableData = (parsedQuery, values) => {
  const format = (arr) =>
    arr
      // .filter((el) => !el.deleted)
      .sort((a, b) => a.showOrder - b.showOrder)
      .map((el) => ({ ...el, index: el.showOrder, name: el.name || el.label }));

  const { clusterId, competencyId } = parsedQuery;

  const clusters = values.clusters ? values.clusters : [];

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

const formatQuestionOrder = (arr) => {
  return arr
    .map((el, i) => ({
      ...el,
      surveyPlatformShowOrder: i + 1,
    }))
    .sort((a, b) => a.surveyPlatformShowOrder - b.surveyPlatformShowOrder);
};

const getQuestions = (clusters, options) => {
  const { noFormat = false } = options || {};
  const questions = [];

  clusters.forEach((cluster) => {
    cluster.competencies.forEach((competency) => {
      questions.push(
        ...competency.questions.map((q) => {
          return {
            ...q,
            deleted: q.deleted || competency.deleted || cluster.deleted,
            parentClusterId: cluster.id,
            parentCompetencyId: competency.id,
          };
        }),
      );
    });
  });

  return noFormat
    ? questions.sort((a, b) => a.surveyPlatformShowOrder - b.surveyPlatformShowOrder)
    : formatQuestionOrder(questions);
};

const deepSort = (arr) => {
  const sort = (arr1) => arr1.sort((a, b) => a.showOrder - b.showOrder);

  let counter = 0;

  const clusters = sort(arr).map((cluster) => ({
    ...cluster,
    competencies: sort(cluster.competencies).map((competency) => ({
      ...competency,
      questions: competency.questions
        .map(({ surveyPlatformShowOrder, ...q }) => {
          counter++;

          return { ...q, surveyPlatformShowOrder: surveyPlatformShowOrder || counter };
        })
        .sort((a, b) => a.surveyPlatformShowOrder - b.surveyPlatformShowOrder),
    })),
  }));

  const questions = getQuestions(clusters, { noFormat: true });

  const sortedClusters = sort(clusters).map((cluster) => ({
    ...cluster,
    competencies: sort(cluster.competencies).map((competency) => ({
      ...competency,
      questions: competency.questions
        .map(({ originalSurveyPlatformShowOrder, ...q }) => ({
          ...q,
          originalSurveyPlatformShowOrder:
            originalSurveyPlatformShowOrder ||
            questions.find(({ id }) => id * 1 === q.id * 1).surveyPlatformShowOrder,
        }))
        .sort((a, b) => a.surveyPlatformShowOrder - b.surveyPlatformShowOrder),
    })),
  }));

  return sortedClusters;
};

const addItem = (oldClusters, ids, newItem, parsedQuery) => {
  const clusters = deepSort(oldClusters);

  const generateNewItemProperties = (refArr) => {
    const index = refArr.length;
    const showOrder =
      refArr?.length > 0 ? Math.max(...refArr.map((el) => el.showOrder * 1)) + 1 : 1;

    // creating a unique id
    const refArrIds = refArr?.length > 0 ? refArr.map((el) => el.id * 1) : [1];
    const id = refArrIds.reduce((prevValue, currentValue) => prevValue + currentValue) + 1;

    return {
      index,
      id,
      showOrder,
      newAddedItem: true,
    };
  };

  const [clusterIndex, competencyIndex] = fetchIndex(parsedQuery, oldClusters, ids);

  if (!ids.clusterId && !isIndexValid(competencyIndex) && !isIndexValid(clusterIndex)) {
    // means that we're adding a cluster

    const { id, index, showOrder, newAddedItem } = generateNewItemProperties(clusters);

    const newCluster = {
      // name: `Cluster ${index + 1}`,
      ...newItem,
      competencies: [],
      showOrder,
      index,
      id,
      newAddedItem,
    };

    clusters.push(newCluster);

    return { clusters, id };
  }

  if (isIndexValid(clusterIndex) && !isIndexValid(competencyIndex)) {
    // means that we're adding a competency

    const { id, index, showOrder, newAddedItem } = generateNewItemProperties(
      clusters[clusterIndex].competencies,
    );
    const newCompetency = {
      ...newItem,
      questions: [],
      id,
      index,
      showOrder,
      newAddedItem,
    };

    clusters[clusterIndex].competencies.push(newCompetency);

    return { clusters, id };
  }

  if (isIndexValid(clusterIndex) && isIndexValid(competencyIndex)) {
    // means that we're adding a question

    const { id, index, showOrder, newAddedItem } = generateNewItemProperties(
      clusters[clusterIndex].competencies[competencyIndex].questions,
    );

    const newQuestion = {
      ...newItem,
      id,
      index,
      showOrder,
      newAddedItem,
    };

    const getSurveyPlatformShowOrder = () => {
      const lastQuestions = getQuestions(clusters.slice(0, clusterIndex + 1));

      if (lastQuestions.length > 0) {
        return lastQuestions[lastQuestions.length - 1]?.surveyPlatformShowOrder + 1;
      }

      const NextQuestions = getQuestions(clusters.slice(clusterIndex + 1));

      if (lastQuestions.length > 0) {
        return NextQuestions[NextQuestions.length - 1]?.surveyPlatformShowOrder - 1;
      }

      return 1;
    };

    const surveyPlatformShowOrder = getSurveyPlatformShowOrder();

    clusters[clusterIndex].competencies[competencyIndex].questions.push({
      ...newQuestion,
      surveyPlatformShowOrder,
      originalSurveyPlatformShowOrder: surveyPlatformShowOrder,
    });

    return { clusters, id };
  }

  return { clusters };
};

export {
  deepSort,
  updateItem,
  deleteItem,
  clusterSortRefactor,
  getTableData,
  addItem,
  formatQuestionOrder,
  getQuestions,
};
