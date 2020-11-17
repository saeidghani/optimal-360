import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import { map } from './RouteMap';

import { stringify } from '../hooks/useQuery';

const PrivateRoute = ({ scrollToTop, ...props }) => {
  const token = Cookies.get('token');

  const { pathname, search } = useLocation();
  const prevPath = stringify({ prevPath: `${pathname}${search}` });

  // set page scroll to top of the page in specified pages
  React.useEffect(() => {
    if (scrollToTop) window.scrollTo(0, 0);
  }, [scrollToTop, pathname]);

  // Not logged in - redirect to (map.superUser.login) with previous path (/prevPath)
  if (!token) {
    let platform = map.superUser.login;
    if (pathname.includes('client-admin')) platform = map.clientAdmin.login;
    if (pathname.includes('survey-platform')) platform = map.surveyPlatform.login;
    return <Redirect to={`${platform}${prevPath}`} />;
  }

  // Logged in and verified
  return <Route {...props} />;
};

PrivateRoute.propTypes = {
  scrollToTop: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  scrollToTop: false,
};

export default PrivateRoute;
