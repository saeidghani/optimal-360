import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';

import SurveyPlatformLogin from '../containers/SurveyPlatform/Login';
import SurveyPlatformForgotPassword from '../containers/SurveyPlatform/ForgotPassword';
import SurveyPlatformWelcome from '../containers/SurveyPlatform/Welcome';
import Information from '../containers/SurveyPlatform/Information';
import AllRatees from '../containers/SurveyPlatform/AllRatees';
import Individual from '../containers/SurveyPlatform/Individual';

import NotFound from '../components/404';

const Routes = ({ match }) => (
  <Switch>
    <CustomRoute path={`${match.path}/login`} exact component={SurveyPlatformLogin} />
    <CustomRoute
      path={`${match.path}/forgot-password`}
      exact
      component={SurveyPlatformForgotPassword}
    />

    <PrivateRoute path={`${match.path}/welcome`} exact component={SurveyPlatformWelcome} />
    <PrivateRoute path={`${match.path}/information`} exact component={Information} />
    <PrivateRoute path={`${match.path}/managers/all-ratees`} exact component={AllRatees} />
    <PrivateRoute path={`${match.path}/managers/individual`} exact component={Individual} />

    <Route component={NotFound} />
  </Switch>
);

Routes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
};

Routes.defaultProps = {
  match: {
    path: '',
  },
};

export default Routes;
