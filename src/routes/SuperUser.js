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
import Organizations from '../containers/SuperUser/Organizations/Organizations';
import OrganizationsStaff from '../containers/SuperUser/Organizations/OrganizationsStaff';
import OrganizationsNewStaff from '../containers/SuperUser/Organizations/OrganizationsNewStaff';
import NewOrganizations from '../containers/SuperUser/Organizations/NewOrganizations';
import GroupReports from '../containers/SuperUser/SurveyGroups/GroupReports';
import Rates from '../containers/SuperUser/Ratee/Ratee';
import OrganizationsUpdateStaff from '../containers/SuperUser/Organizations/UpdateStaff';

import ProjectInfo from '../containers/SuperUser/Wizard/ProjectInfo';
import SurveySetting from '../containers/SuperUser/Wizard/SurveySetting';
import EmailSettings from '../containers/SuperUser/Wizard/EmailSettings';
import EmailTemplate from '../containers/SuperUser/Wizard/EmailTemplate';
import SurveyIntro from '../containers/SuperUser/Wizard/SurveyIntro';
import SurveyQuestions from '../containers/SuperUser/Wizard/SurveyQuestions';
import Report from '../containers/SuperUser/Wizard/Report';

import BankModels from '../containers/SuperUser/Bank/Models';
import BankSurveyGroups from '../containers/SuperUser/Bank/SurveyGroups';

import NotFound from '../components/404';
import AddRatee from '../containers/SuperUser/Ratee/AddRatee';
import AddRateeStep2 from '../containers/SuperUser/Ratee/AddRateeStep2';

const Routes = ({ match }) => (
  <Switch>
    {/* authentication */}
    <CustomRoute path={`${match.path}/login`} exact component={Login} />
    <CustomRoute path={`${match.path}/forgot-password`} exact component={ForgotPassword} />

    {/* projects */}
    <PrivateRoute path={`${match.path}/projects`} exact component={ProjectsList} />
    <PrivateRoute path={`${match.path}/projects/:projectId/set-admin`} exact component={SetAdmin} />
    <PrivateRoute
      path={`${match.path}/projects/:projectId/survey-groups`}
      exact
      component={SurveyGroupList}
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

    {/* participants */}
    <PrivateRoute path={`${match.path}/participants/ratee/add/`} exact component={AddRatee} />
    {/* TODO: change routes below to better routes */}
    <PrivateRoute path={`${match.path}/participants/ratee/add/edit`} exact component={AddRatee} />
    {/* TODO: change url */}
    <PrivateRoute
      path={`${match.path}/participants/ratee/add/step2`}
      exact
      component={AddRateeStep2}
    />
    {/* TODO: change url */}
    <PrivateRoute
      path={`${match.path}/participants/ratee/add/step2/edit`}
      exact
      component={AddRateeStep2}
    />
    {/* TODO: change url */}
    <PrivateRoute
      path={`${match.path}/participants/ratee`}
      // tab: 'status-overview'||'status-details'||'raters-email'||'result'
      exact
      component={Rates}
    />
    <PrivateRoute path={`${match.path}/organizations`} exact component={Organizations} />
    <PrivateRoute
      path={`${match.path}/organizations/:organizationId/new-staff`}
      exact
      component={OrganizationsNewStaff}
    />
    <PrivateRoute path={`${match.path}/organizations/new`} exact component={NewOrganizations} />
    <PrivateRoute
      path={`${match.path}/organizations/:organizationId`}
      exact
      component={OrganizationsStaff}
    />
    <PrivateRoute
      path={`${match.path}/organizations/:organizationId/staff/:staffId/update`}
      exact
      component={OrganizationsUpdateStaff}
    />

    {/* other */}
    <PrivateRoute path={`${match.path}/pre-defined-data`} exact component={BankModels} />
    <PrivateRoute path={`${match.path}/pre-defined-data/add`} exact component={BankSurveyGroups} />

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
