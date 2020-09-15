import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import CustomRoute from './Route';
// import PrivateRoute from './PrivateRoute';

import Auth from '../containers/Auth/Auth';

/**
 * All of the routes
 */
const Index = () => (
  <Switch>
    <Route path="/" exact component={Auth} />
  </Switch>
);

export default Index;
