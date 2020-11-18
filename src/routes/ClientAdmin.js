import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';
import { map } from './RouteMap';

import Login from '../containers/ClientAdmin/Auth/Login';
import ForgotPassword from '../containers/ClientAdmin/Auth/ForgotPassword';
import Dashboard from '../containers/ClientAdmin/Dashboard/Dashboard';
import ParticipantSummary from '../containers/ClientAdmin/Dashboard/ParticipantSummary';
import ParticipantDetails from '../containers/ClientAdmin/Dashboard/ParticipantDetails';
import RaterDetails from '../containers/ClientAdmin/Dashboard/RaterDetails';
import ReferenceGuide from '../containers/ClientAdmin/ReferenceGuide';

import NotFound from '../components/404';

const Routes = () => (
  <Switch>
    <CustomRoute path={map.clientAdmin.login} exact component={Login} />
    <CustomRoute path={map.clientAdmin.forgotPassword} exact component={ForgotPassword} />
    <PrivateRoute path={map.clientAdmin.dashboard} exact component={Dashboard} />
    <PrivateRoute path={map.clientAdmin.participantSummary} exact component={ParticipantSummary} />
    <PrivateRoute path={map.clientAdmin.participantDetails} exact component={ParticipantDetails} />
    <PrivateRoute path={map.clientAdmin.raterDetails} exact component={RaterDetails} />
    <PrivateRoute path={map.clientAdmin.referenceGuide} exact component={ReferenceGuide} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
