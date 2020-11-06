import React from 'react';
import Cookies from 'js-cookie';
import { Switch, Route, Redirect } from 'react-router-dom';

import SuperUserRoutes from './SuperUser';
import SurveyPlatformRoutes from './SurveyPlatform';
import ClientAdminRoutes from './ClientAdmin';

import NotFound from '../components/404';

const Routes = () => {
  const token = Cookies.get('token');

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect
            to={
              token
                ? '/super-user/projects?status=active&page_size=10&page_number=1'
                : '/super-user/login'
            }
          />
        )}
      />

      <Route path="/super-user" component={SuperUserRoutes} />
      <Route path="/survey-platform" component={SurveyPlatformRoutes} />
      <Route path="/client-admin" component={ClientAdminRoutes} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
