import React from 'react';
// import { Switch, Route } from 'react-router-dom';
// use react-router-dom 'route' for 404 pages and such
import { Switch } from 'react-router-dom';
import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';

import Login from '../containers/Auth/Login';
import ForgotPassword from '../containers/Auth/ForgotPassword';

import ActiveProjects from '../components/Projects/Active';

import TestingArea from '../components/TestingArea';

/**
 * All of the routes
 */
const Index = () => (
  <Switch>
    <CustomRoute path="/" exact component={TestingArea} />

    <CustomRoute path="/login" exact component={Login} />
    <CustomRoute path="/forgot-password" exact component={ForgotPassword} />

    <PrivateRoute path="/super-user/projects/active-projects" exact component={ActiveProjects} />
  </Switch>
);

export default Index;
