import React from 'react';
// import { Switch, Route } from 'react-router-dom';
// use react-router-dom 'route' for 404 pages and such
import { Switch } from 'react-router-dom';
import CustomRoute from './Route';
// import PrivateRoute from './PrivateRoute';

import Login from '../containers/Auth/Login';
import ForgotPassword from '../containers/Auth/ForgotPassword';

import TestingArea from '../components/TestingArea';

/**
 * All of the routes
 */
const Index = () => (
  <Switch>
    <CustomRoute path="/" exact component={TestingArea} />

    <CustomRoute path="/login" exact component={Login} />
    <CustomRoute path="/forgot-password" exact component={ForgotPassword} />
  </Switch>
);

export default Index;
