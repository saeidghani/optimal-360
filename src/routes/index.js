import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './Route';
// import PrivateRoute from './PrivateRoute';

// use react-router-dom 'route' for 404 pages and such

import Auth from '../containers/Auth/Auth';
import TestingArea from '../components/TestingArea';

/**
 * All of the routes
 */
const Index = () => (
  <Switch>
    <CustomRoute path="/" exact component={TestingArea} />

    <CustomRoute path="/auth" exact component={Auth} />
  </Switch>
);

export default Index;
