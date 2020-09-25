import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import BreadCrumb from './BreadCrumb';

const Layout = ({ title, children }) => {
  return (
    <div className="flex flex-row bg-primary-200">
      <Sidebar />

      <div className="flex flex-col w-full p-6">
        <BreadCrumb />

        <h3 className="font-medium text-primary-500 text-xl my-3 mb-6">{title}</h3>

        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  title: 'Super User',
};

export default Layout;
