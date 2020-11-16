import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { map, prefixes } from './RouteMap';

import SuperUserRoutes from './SuperUser';
import SurveyPlatformRoutes from './SurveyPlatform';
import ClientAdminRoutes from './ClientAdmin';

import NotFound from '../components/404';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to={map.superUser.login} />} />

      <Route path={prefixes.superUser} component={SuperUserRoutes} />
      <Route path={prefixes.surveyPlatform} component={SurveyPlatformRoutes} />
      <Route path={prefixes.clientAdmin} component={ClientAdminRoutes} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
