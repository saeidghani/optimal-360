import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';

import Login from '../containers/Auth/Login';
import ForgotPassword from '../containers/Auth/ForgotPassword';

import ProjectsList from '../containers/Projects/List';
import SetAdmin from '../containers/Projects/SetAdmin';

import SurveyGroupList from '../containers/SurveyGroups/List';
import RatersStatusOverview from '../containers/SurveyGroups/RatersStatusOverview';
import OrganizationsUsers from '../containers/SurveyGroups/OrganizationsUsers';

import ProjectInfo from '../containers/Wizard/ProjectInfo';
import SurveySetting from '../containers/Wizard/SurveySetting';
import EmailSetting from '../containers/Wizard/EmailSetting';
import EmailTemplate from '../containers/Wizard/EmailTemplate';
import SurveyIntro from '../containers/Wizard/SurveyIntro';
import SurveyQuestionsList from '../containers/Wizard/SurveyQuestionsList';
import Report from '../containers/Wizard/Report';

import NotFound from '../components/404';
import TestingArea from '../components/TestingArea';

const Index = () => (
  <Switch>
    <CustomRoute path="/login" exact component={Login} />
    <CustomRoute path="/forgot-password" exact component={ForgotPassword} />

    <PrivateRoute path="/super-user/projects" exact component={ProjectsList} />
    <PrivateRoute path="/super-user/projects/:projectId/set-admin" exact component={SetAdmin} />

    <PrivateRoute
      path="/super-user/projects/:projectId/survey-groups"
      exact
      component={SurveyGroupList}
    />

    <PrivateRoute
      path="/super-user/Participants/StatusOverview"
      exact
      component={RatersStatusOverview}
    />

    <PrivateRoute path="/super-user/new-project/project-info" exact component={ProjectInfo} />
    <PrivateRoute path="/super-user/new-project/survey-setting" exact component={SurveySetting} />
    <PrivateRoute path="/super-user/new-project/email-setting" exact component={EmailSetting} />
    <PrivateRoute
      path="/super-user/new-project/email-setting/:template"
      exact
      component={EmailTemplate}
    />
    <PrivateRoute path="/super-user/new-project/survey-intro" exact component={SurveyIntro} />
    <PrivateRoute
      path="/super-user/new-project/survey-questions"
      exact
      component={SurveyQuestionsList}
    />
    <PrivateRoute
      path="/super-user/new-project/report"
      exact
      component={Report}
    />
    <PrivateRoute
      path="/organizations/users"
      exact
      component={OrganizationsUsers}
    />
    <CustomRoute path="/" exact component={TestingArea} />
    <Route component={NotFound} />
  </Switch>
);

export default Index;
