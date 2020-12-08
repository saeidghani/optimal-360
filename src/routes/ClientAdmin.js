import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';
import { map } from './RouteMap';

import Login from '../containers/ClientAdmin/Auth/Login';
import ForgotPassword from '../containers/ClientAdmin/Auth/ForgotPassword';
import Dashboard from '../containers/ClientAdmin/Dashboard';
import ReferenceGuide from '../containers/ClientAdmin/ReferenceGuide';

import NotFound from '../components/404';

const Routes = () => (
  <Switch>
    <CustomRoute path={map.clientAdmin.login} exact component={Login} />
    <CustomRoute path={map.clientAdmin.forgotPassword} exact component={ForgotPassword} />
    <PrivateRoute path={map.clientAdmin.dashboard} exact component={Dashboard} />
    <PrivateRoute path={map.clientAdmin.referenceGuide} exact component={ReferenceGuide} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
