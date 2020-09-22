import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../Common/Logo';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-blue-100 relative flex flex-row items-center justify-center">
      <div className=" absolute top-0 left-0 flex flex-row pl-8 md:pl-20 lg:pl-40 pt-6 lg:pt-8">
        <Logo />
      </div>

      <div className="bg-white justify-center flex flex-col rounded-lg p-32">{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {};

export default Layout;
