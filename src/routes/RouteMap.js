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

  addRatee: 'participants/ratee/add/',
  editRatee: 'participants/ratee/add/edit',
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

  participantSummary: 'participant-summary',
  participantDetails: 'participant-details',

  ratersDetails: 'rater-details',

  referenceGuide: 'reference-guide',
};

const surveyPlatform = {
  login: 'login',
  forgotPassword: 'forgot-password',

  welcome: 'welcome',
  information: 'information',
  referenceGuide: 'reference-guide',

  mangars: 'managers',

  ratersDetails: 'rater-details',
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
