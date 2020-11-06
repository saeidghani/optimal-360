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
import RateeGroup from '../containers/SurveyPlatform/RateeGroup';
import AllRateesQuestions from '../containers/SurveyPlatform/AllRateesQuestions';
import IndividualQuestions from '../containers/SurveyPlatform/IndividualQuestions';
import RateeGroupQuestions from '../containers/SurveyPlatform/RateeGroupQuestions';
import RateeGroupQuestions2 from '../containers/SurveyPlatform/RateeGroupQuestions2';
import ReferenceGuide from '../containers/SurveyPlatform/ReferenceGuide';

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
    <PrivateRoute path={`${match.path}/managers/ratee-group`} exact component={RateeGroup} />
    <PrivateRoute
      path={`${match.path}/managers/all-ratees/questions`}
      exact
      component={AllRateesQuestions}
    />
    <PrivateRoute
      path={`${match.path}/managers/individual/questions`}
      exact
      component={IndividualQuestions}
    />
    <PrivateRoute
      path={`${match.path}/managers/ratee-group/questions`}
      exact
      component={RateeGroupQuestions}
    />
    <PrivateRoute path={`${match.path}/reference-guide`} exact component={ReferenceGuide} />
    <PrivateRoute
      path={`${match.path}/managers/ratee-group/questions/:id`}
      exact
      component={RateeGroupQuestions2}
    />
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
