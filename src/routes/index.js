import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';

import Login from '../containers/Auth/Login';
import ForgotPassword from '../containers/Auth/ForgotPassword';
import SurveyGroupSetting from '../containers/SurveyGroups/Setting';
import RatersStatusOverview from '../containers/SurveyGroups/RatersStatusOverview';

import ActiveProjects from '../components/Projects/Active';

import NotFound from '../components/404';

import TestingArea from '../components/TestingArea';

const Index = () => (
  <Switch>
    <CustomRoute path="/" exact component={TestingArea} />

    <CustomRoute path="/login" exact component={Login} />
    <CustomRoute path="/forgot-password" exact component={ForgotPassword} />

    <PrivateRoute path="/super-user/projects" exact component={ActiveProjects} />
    <PrivateRoute path="/super-user/surveygroup-setting" exact component={SurveyGroupSetting} />
    <PrivateRoute
      path="/super-user/Participants/StatusOverview"
      exact
      component={RatersStatusOverview}
    />

    <Route component={NotFound} />
  </Switch>
);

export default Index;
