import React from 'react';
import PropTypes from 'prop-types';

import optimal360Logo from '../../../../assets/images/optimal-360-logo.svg';

const Layout = ({ children, className, wrapperClassName }) => (
  <div
    className={`min-h-screen bg-primary-200 relative flex flex-row items-center justify-center
       ${wrapperClassName}`}
  >
    <div className="absolute top-0 left-0 flex flex-row pl-8 pt-6 md:pl-20 lg:pl-32 lg:pt-12">
      <img src={optimal360Logo} className="w-40" alt="" />
    </div>

    <div
      className={`bg-white shadow justify-center flex flex-col rounded-lg py-6 px-4
       sm:py-16 sm:px-12 mt-8 sm:mt-5 lg:mt-0 lg:px-28 lg:pt-24 lg:pb-28 lg:w-6/12
        w-10/12 md:w-8/12 xl:w-5/12 ${className}`}
    >
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
  wrapperClassName: '',
};

export default Layout;
