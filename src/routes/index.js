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

import ProjectInfo from '../containers/Wizard/ProjectInfo';
import SurveySetting from '../containers/Wizard/SurveySetting';
import EmailSetting from '../containers/Wizard/EmailSetting';
import RaterVerificationEmail from '../containers/Wizard/RaterVerificationEmail';
import SurveyIntro from '../containers/Wizard/SurveyIntro';
import SurveyQuestionsList from '../containers/Wizard/SurveyQuestionsList';

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

    <PrivateRoute
      path="/super-user/new-project/project-info/:projectId?"
      exact
      component={ProjectInfo}
    />
    <PrivateRoute
      path="/super-user/new-project/survey-setting/:projectId/:surveyGroupId?"
      exact
      component={SurveySetting}
    />
    <PrivateRoute
      path="/super-user/new-project/email-setting/:projectId?"
      exact
      component={EmailSetting}
    />
    <PrivateRoute
      path="/super-user/new-project/rater-verification-email/:projectId?"
      exact
      component={RaterVerificationEmail}
    />
    <PrivateRoute
      path="/super-user/new-project/survey-intro/:projectId?"
      exact
      component={SurveyIntro}
    />
    <PrivateRoute
      path="/super-user/new-project/survey-questions/:projectId?"
      exact
      component={SurveyQuestionsList}
    />

    <CustomRoute path="/" exact component={TestingArea} />
    <Route component={NotFound} />
  </Switch>
);

export default Index;
