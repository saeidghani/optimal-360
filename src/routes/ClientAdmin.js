import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';

import Login from '../containers/ClientAdmin/Auth/Login';
import ForgotPassword from '../containers/ClientAdmin/Auth/ForgotPassword';
import Dashboard from '../containers/ClientAdmin/Dashboard';
import ParticipantSummary from '../containers/ClientAdmin/ParticipantSummary';
import ParticipantDetails from '../containers/ClientAdmin/ParticipantDetails';
import RaterDetails from '../containers/ClientAdmin/RaterDetails';
import ReferenceGuide from '../containers/ClientAdmin/ReferenceGuide';

import NotFound from '../components/404';

const Routes = () => (
  <Switch>
    <CustomRoute path="/client-admin/login" exact component={Login} />
    <CustomRoute path="/client-admin/forgot-password" exact component={ForgotPassword} />
    <PrivateRoute path="/client-admin/dashboard" exact component={Dashboard} />
    <PrivateRoute path="/client-admin/participant-summary" exact component={ParticipantSummary} />
    <PrivateRoute path="/client-admin/participant-details" exact component={ParticipantDetails} />
    <PrivateRoute path="/client-admin/rater-details" exact component={RaterDetails} />
    <PrivateRoute path="/client-admin/reference-guide" exact component={ReferenceGuide} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
