import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';

import Login from '../containers/Auth/Login';
import ForgotPassword from '../containers/Auth/ForgotPassword';

import SurveyGroupList from '../containers/SurveyGroups/List';
import SurveyGroupSetting from '../containers/SurveyGroups/Setting';
import RatersStatusOverview from '../containers/SurveyGroups/RatersStatusOverview';

import ProjectsList from '../containers/Projects/List';
import SurveySetting from '../containers/Projects/SurveySetting';

import NotFound from '../components/404';
import TestingArea from '../components/TestingArea';

const Index = () => (
  <Switch>
    <CustomRoute path="/" exact component={TestingArea} />

    <CustomRoute path="/login" exact component={Login} />
    <CustomRoute path="/forgot-password" exact component={ForgotPassword} />

    <PrivateRoute path="/super-user/projects" exact component={ProjectsList} />
    <PrivateRoute
      path="/super-user/projects/:projectId/survey-groups"
      exact
      component={SurveyGroupList}
    />

    <PrivateRoute path="/super-user/surveygroup-setting" exact component={SurveyGroupSetting} />
    <PrivateRoute
      path="/super-user/Participants/StatusOverview"
      exact
      component={RatersStatusOverview}
    />
    <PrivateRoute path="/super-user/Projects/survey-setting" exact component={SurveySetting} />

    <Route component={NotFound} />
  </Switch>
);

export default Index;
