const superUser = {
  login: 'login',
  forgotPassword: 'forgot-password',

  projectsList: 'projects',
  setAdmin: 'projects/:projectId/set-admin',
  surveyGroupsList: 'projects/:projectId/survey-groups',

  editProject: 'new-project/edit',

  projectInfo: 'new-project/project-info',
  surveySettings: 'new-project/survey-settings',
  emailSettings: 'new-project/email-settings',
  emailSettingsTemplate: 'new-project/email-settings/:template',
  surveyIntro: 'new-project/survey-intro',
  surveyQuestions: 'new-project/survey-questions',
  report: 'new-project/report',

  groupReports: 'new-project/reports/group-reports',

  addRatee: 'participants/ratee/add',
  editRatee: 'participants/ratee/add/edit',
  raterSelection: 'participants/ratee/raterSelection',
  rateesList: 'participants/ratee/add/step2',

  ratersList: 'participants/ratee',

  organizationsList: 'organizations',
  addOrganizationStaff: 'organizations/:organizationId/new-staff',
  addOrganization: 'organizations/new',
  organizationStaffList: 'organizations/:organizationId/staff',
  // organizationStaffList: 'organizations/new',
  organizationStaffEdit: 'organizations/:organizationId/staff/:staffId/update',

  bankModels: 'pre-defined-data',
  bankSurveyGroups: 'pre-defined-data/add',
};

const clientAdmin = {
  login: 'login',
  forgotPassword: 'forgot-password',

  dashboard: 'dashboard',

  referenceGuide: 'reference-guide',
};

const surveyPlatform = {
  login: 'login',
  forgotPassword: 'forgot-password',

  information: 'information',
  referenceGuide: 'reference-guide',
  dashboard: 'dashboard',

  allRateesQuestions: 'all-ratees/surveyGroup/:surveyGroupId/questions/:questionNumber',
  individualQuestions: 'individual/surveyGroup/:surveyGroupId/questions/:questionNumber',
  rateeGroupQuestions: 'ratee-group/surveyGroup/:surveyGroupId/questions/:questionNumber',

  allRateesFeedbacks: 'allRatees/surveyGroup/:surveyGroupId/feedbacks/:feedbackNumber',
  individualFeedbacks: 'individual/surveyGroup/:surveyGroupId/feedbacks/:feedbackNumber',
  rateeGroupFeedbacks: 'rateeGroup/surveyGroup/:surveyGroupId/feedbacks/:feedbackNumber',
};

const ref = { ...{ superUser }, ...{ clientAdmin }, ...{ surveyPlatform } };

const map = {};
const dynamicMap = {};

const prefixes = {
  superUser: '/super-user',
  clientAdmin: '/client-admin',
  surveyPlatform: '/survey-platform',
};

Object.entries(ref).forEach(([key, value]) => {
  const prefix = prefixes[key];

  Object.entries(value).forEach(([key1, value1]) => {
    const path = `${prefix}/${value1}`;

    map[key] = {
      ...map[key],
      [key1]: path,
    };

    const generatePathFunc = (args) => {
      let newPath = path;

      if (!args || Object.values(args).length < 1) return newPath;

      Object.entries(args).forEach(([key3, value3]) => {
        newPath = newPath.includes(`/:${key3}?`)
          ? newPath.replaceAll(`/:${key3}?`, `/${value3}`)
          : newPath.replaceAll(`/:${key3}`, `/${value3}`);
      });

      return newPath;
    };

    dynamicMap[key] = {
      ...dynamicMap[key],
      [key1]: (args) => generatePathFunc(args),
    };
  });
});

export { prefixes, map, dynamicMap };
