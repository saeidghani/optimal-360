import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../Common/Logo';

const Layout = ({ children, className, wrapperClassName }) => (
  <div
    className={`min-h-screen bg-primary-200 relative flex flex-row items-center justify-center
       ${wrapperClassName}`}
  >
    <div className="absolute top-0 left-0 flex flex-row pl-8 md:pl-20 lg:pl-40 pt-6 lg:pt-8">
      <Logo />
    </div>

    <div
      className={`bg-white justify-center flex flex-col rounded-lg 
        lg:px-24 px-12 lg:py-32 py-16 lg:w-6/12 xl:w-5/12 md:w-8/12 w-10/12 ${className}`}
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
