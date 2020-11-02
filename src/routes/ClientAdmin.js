import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from '../components/404';

const Routes = () => (
  <Switch>
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
