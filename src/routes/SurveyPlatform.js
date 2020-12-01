import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CustomRoute from './Route';
import PrivateRoute from './PrivateRoute';
import { map } from './RouteMap';

import Login from '../containers/SurveyPlatform/Auth/Login';
import ForgotPassword from '../containers/SurveyPlatform/Auth/ForgotPassword';
import Information from '../containers/SurveyPlatform/Information';
import Dashboard from '../containers/SurveyPlatform/Dashboard';
import AllQuestions from '../containers/SurveyPlatform/Questions/AllRateesQuestions';
import IndividualQuestions from '../containers/SurveyPlatform/Questions/IndividualQuestions';
import RateeGroupQuestions from '../containers/SurveyPlatform/Questions/RateeGroupQuestions';
import IndividualFeedbacks from '../containers/SurveyPlatform/Feedbacks/IndividualFeedbacks';
import AllRateesFeedbacks from '../containers/SurveyPlatform/Feedbacks/AllRateesFeedbacks';
import RateeGroupFeedbacks from '../containers/SurveyPlatform/Feedbacks/RateeGroupFeedbacks';
import ReferenceGuide from '../containers/SurveyPlatform/ReferenceGuide';

import NotFound from '../components/404';

const Routes = () => (
  <Switch>
    <CustomRoute path={map.surveyPlatform.login} exact component={Login} />
    <CustomRoute path={map.surveyPlatform.forgotPassword} exact component={ForgotPassword} />

    <CustomRoute path={map.surveyPlatform.information} exact component={Information} />
    <PrivateRoute path={map.surveyPlatform.referenceGuide} exact component={ReferenceGuide} />
    <PrivateRoute path={map.surveyPlatform.dashboard} exact component={Dashboard} />
    <PrivateRoute path={map.surveyPlatform.allRateesQuestions} exact component={AllQuestions} />
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
      path={map.surveyPlatform.individualFeedbacks}
      exact
      component={IndividualFeedbacks}
    />
    <PrivateRoute
      path={map.surveyPlatform.allRateesFeedbacks}
      exact
      component={AllRateesFeedbacks}
    />
    <PrivateRoute
      path={map.surveyPlatform.rateeGroupFeedbacks}
      exact
      component={RateeGroupFeedbacks}
    />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
