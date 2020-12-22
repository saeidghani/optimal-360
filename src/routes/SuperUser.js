import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';

import { map } from './RouteMap';

import Login from '../containers/SuperUser/Auth/Login';
import ForgotPassword from '../containers/SuperUser/Auth/ForgotPassword';

import ProjectsList from '../containers/SuperUser/Projects/List';
import SetAdmin from '../containers/SuperUser/Projects/SetAdmin';

import SurveyGroupList from '../containers/SuperUser/SurveyGroups/List';
import Organizations from '../containers/SuperUser/Organizations/Organizations';
import OrganizationsStaff from '../containers/SuperUser/Organizations/OrganizationsStaff';
import OrganizationsNewStaff from '../containers/SuperUser/Organizations/OrganizationsNewStaff';
import NewOrganizations from '../containers/SuperUser/Organizations/NewOrganizations';
import Rates from '../containers/SuperUser/Ratee/Ratee';
import OrganizationsUpdateStaff from '../containers/SuperUser/Organizations/UpdateStaff';

import GroupReports from '../containers/SuperUser/SurveyGroups/GroupReports';

import EditProject from '../containers/SuperUser/Wizard/EditProject';
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
import EditRatee from '../containers/SuperUser/Ratee/EditRatee';
import RaterSelection from '../containers/SuperUser/Ratee/RaterSelection';

const Routes = () => (
  <Switch>
    {/* authentication */}
    <CustomRoute path={map.superUser.login} exact component={Login} />
    <CustomRoute path={map.superUser.forgotPassword} exact component={ForgotPassword} />

    {/* projects */}
    <PrivateRoute path={map.superUser.projectsList} exact component={ProjectsList} />
    <PrivateRoute path={map.superUser.setAdmin} exact component={SetAdmin} />
    <PrivateRoute path={map.superUser.surveyGroupsList} exact component={SurveyGroupList} />

    {/* wizard */}
    <PrivateRoute path={map.superUser.editProject} exact scrollToTop component={EditProject} />

    <PrivateRoute path={map.superUser.projectInfo} exact scrollToTop component={ProjectInfo} />
    <PrivateRoute path={map.superUser.surveySettings} exact scrollToTop component={SurveySetting} />
    <PrivateRoute path={map.superUser.emailSettings} exact scrollToTop component={EmailSettings} />
    <PrivateRoute
      path={map.superUser.emailSettingsTemplate}
      exact
      scrollToTop
      component={EmailTemplate}
    />
    <PrivateRoute path={map.superUser.surveyIntro} exact scrollToTop component={SurveyIntro} />
    <PrivateRoute
      path={map.superUser.surveyQuestions}
      exact
      scrollToTop
      component={SurveyQuestions}
    />
    <PrivateRoute path={map.superUser.report} exact scrollToTop component={Report} />
    <PrivateRoute path={map.superUser.groupReports} exact scrollToTop component={GroupReports} />

    <PrivateRoute path={map.superUser.addRatee} exact component={AddRatee} />
    {/* TODO: change routes below to better routes */}
    <PrivateRoute path={map.superUser.editRatee} exact component={EditRatee} />

    <PrivateRoute path={map.superUser.raterSelection} exact component={RaterSelection} />
    <PrivateRoute
      path={map.superUser.ratersList}
      // tab: 'status-overview'||'status-details'||'raters-email'||'result'
      exact
      component={Rates}
    />
    <PrivateRoute path={map.superUser.organizationsList} exact component={Organizations} />
    <PrivateRoute
      path={map.superUser.addOrganizationStaff}
      exact
      component={OrganizationsNewStaff}
    />
    <PrivateRoute path={map.superUser.addOrganization} exact component={NewOrganizations} />
    <PrivateRoute path={map.superUser.organizationStaffList} exact component={OrganizationsStaff} />
    <PrivateRoute
      path={map.superUser.organizationStaffEdit}
      exact
      component={OrganizationsUpdateStaff}
    />

    {/* bank */}
    <PrivateRoute path={map.superUser.bankModels} exact component={BankModels} />
    <PrivateRoute path={map.superUser.bankSurveyGroups} exact component={BankSurveyGroups} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
