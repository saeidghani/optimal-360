import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';
import { map } from './RouteMap';

import SurveyPlatformLogin from '../containers/SurveyPlatform/Auth/Login';
import SurveyPlatformForgotPassword from '../containers/SurveyPlatform/Auth/ForgotPassword';
import SurveyPlatformWelcome from '../containers/SurveyPlatform/Welcome';
import Information from '../containers/SurveyPlatform/Information';
import AllRatees from '../containers/SurveyPlatform/Managers/AllRatees';
import Individual from '../containers/SurveyPlatform/Managers/Individual';
import RateeGroup from '../containers/SurveyPlatform/Managers/RateeGroup';
import AllRateesQuestions from '../containers/SurveyPlatform/Managers/AllRateesQuestions';
import IndividualQuestions from '../containers/SurveyPlatform/Managers/IndividualQuestions';
import RateeGroupQuestions from '../containers/SurveyPlatform/Managers/RateeGroupQuestions';
import RateeGroupQuestions2 from '../containers/SurveyPlatform/Managers/RateeGroupQuestions2';
import ReferenceGuide from '../containers/SurveyPlatform/ReferenceGuide';

import NotFound from '../components/404';

const Routes = () => (
  <Switch>
    <CustomRoute path={map.surveyPlatform.login} exact component={SurveyPlatformLogin} />
    <CustomRoute
      path={map.surveyPlatform.forgotPassword}
      exact
      component={SurveyPlatformForgotPassword}
    />

    <PrivateRoute path={map.surveyPlatform.welcome} exact component={SurveyPlatformWelcome} />
    <PrivateRoute path={map.surveyPlatform.information} exact component={Information} />
    <PrivateRoute path={map.surveyPlatform.referenceGuide} exact component={ReferenceGuide} />
    <PrivateRoute path={map.surveyPlatform.allRateesList} exact component={AllRatees} />
    <PrivateRoute path={map.surveyPlatform.individualList} exact component={Individual} />
    <PrivateRoute path={map.surveyPlatform.rateeGroupList} exact component={RateeGroup} />
    <PrivateRoute
      path={map.surveyPlatform.allRateesQuestions}
      exact
      component={AllRateesQuestions}
    />
    <PrivateRoute
      path={map.surveyPlatform.individualQuestions}
      exact
      component={IndividualQuestions}
    />
    <PrivateRoute
      path={map.surveyPlatform.rateeGroupQuestions}
      exact
      component={RateeGroupQuestions}
    />
    <PrivateRoute
      path={map.surveyPlatform.rateeGroupQuestions2}
      exact
      component={RateeGroupQuestions2}
    />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
