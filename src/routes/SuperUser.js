import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';

import Login from '../containers/SuperUser/Auth/Login';
import ForgotPassword from '../containers/SuperUser/Auth/ForgotPassword';

import ProjectsList from '../containers/SuperUser/Projects/List';
import SetAdmin from '../containers/SuperUser/Projects/SetAdmin';

import SurveyGroupList from '../containers/SuperUser/SurveyGroups/List';
import RatersStatusOverview from '../containers/SuperUser/SurveyGroups/RatersStatusOverview';
import RatersStatusDetails from '../containers/SuperUser/SurveyGroups/RatersStatusDetails';
import RatersStatusRaterEmail from '../containers/SuperUser/SurveyGroups/RatersStatusRaterEmail';
import Organizations from '../containers/SuperUser/SurveyGroups/Organizations';
import OrganizationsUsers from '../containers/SuperUser/SurveyGroups/OrganizationsUsers';
import OrganizationsNewStaff from '../containers/SuperUser/SurveyGroups/OrganizationsNewStaff';
import NewOrganizations from '../containers/SuperUser/SurveyGroups/NewOrganizations';
import RatersStatusIndividualReport from '../containers/SuperUser/SurveyGroups/RatersStatusIndividualReport';
import RatersStatusGroupReportReview from '../containers/SuperUser/SurveyGroups/RatersStatusGroupReportReview';
import GroupReports from '../containers/SuperUser/SurveyGroups/GroupReports';

import ProjectInfo from '../containers/SuperUser/Wizard/ProjectInfo';
import SurveySetting from '../containers/SuperUser/Wizard/SurveySetting';
import EmailSettings from '../containers/SuperUser/Wizard/EmailSettings';
import EmailTemplate from '../containers/SuperUser/Wizard/EmailTemplate';
import SurveyIntro from '../containers/SuperUser/Wizard/SurveyIntro';
import SurveyQuestions from '../containers/SuperUser/Wizard/SurveyQuestions';
import Report from '../containers/SuperUser/Wizard/Report';

import BankModels from '../containers/SuperUser/Bank/Models';

import NotFound from '../components/404';

const Routes = ({ match }) => (
  <Switch>
    <CustomRoute path={`${match.path}/login`} exact component={Login} />
    <CustomRoute path={`${match.path}/forgot-password`} exact component={ForgotPassword} />

    <PrivateRoute path={`${match.path}/projects`} exact component={ProjectsList} />
    <PrivateRoute path={`${match.path}/projects/:projectId/set-admin`} exact component={SetAdmin} />

    <PrivateRoute
      path={`${match.path}/projects/:projectId/survey-groups`}
      exact
      component={SurveyGroupList}
    />

    <PrivateRoute
      path={`${match.path}/participants/status-overview`}
      exact
      component={RatersStatusOverview}
    />
    <PrivateRoute
      path={`${match.path}/participants/status-details`}
      exact
      component={RatersStatusDetails}
    />
    <PrivateRoute
      path={`${match.path}/participants/rater-email`}
      exact
      component={RatersStatusRaterEmail}
    />
    <PrivateRoute
      path={`${match.path}/participants/individual-report`}
      exact
      component={RatersStatusIndividualReport}
    />
    <PrivateRoute
      path={`${match.path}/participants/group-report-review`}
      exact
      component={RatersStatusGroupReportReview}
    />

    <PrivateRoute
      path={`${match.path}/new-project/project-info`}
      exact
      scrollToTop
      component={ProjectInfo}
    />
    <PrivateRoute
      path={`${match.path}/new-project/survey-settings`}
      exact
      scrollToTop
      component={SurveySetting}
    />
    <PrivateRoute
      path={`${match.path}/new-project/email-settings`}
      exact
      scrollToTop
      component={EmailSettings}
    />
    <PrivateRoute
      path={`${match.path}/new-project/email-settings/:template`}
      exact
      scrollToTop
      component={EmailTemplate}
    />
    <PrivateRoute
      path={`${match.path}/new-project/survey-intro`}
      exact
      scrollToTop
      component={SurveyIntro}
    />
    <PrivateRoute
      path={`${match.path}/new-project/survey-questions`}
      exact
      scrollToTop
      component={SurveyQuestions}
    />
    <PrivateRoute path={`${match.path}/new-project/report`} exact scrollToTop component={Report} />
    <PrivateRoute
      path={`${match.path}/new-project/reports/group-reports`}
      exact
      scrollToTop
      component={GroupReports}
    />

    <PrivateRoute path={`${match.path}/projects/survey-groups`} exact component={Organizations} />
    <PrivateRoute path={`${match.path}/organizations/:organizationId/users`} exact component={OrganizationsUsers} />
    <PrivateRoute
      path={`${match.path}/organizations/:organizationId/new-staff`}
      exact
      component={OrganizationsNewStaff}
    />

    <PrivateRoute path={`${match.path}/bank/models`} exact component={BankModels} />

    <PrivateRoute
      path={`${match.path}/organizations/users/new`}
      exact
      component={NewOrganizations}
    />

    <Route component={NotFound} />
  </Switch>
);

Routes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
};

Routes.defaultProps = {
  match: {
    path: '',
  },
};

export default Routes;
