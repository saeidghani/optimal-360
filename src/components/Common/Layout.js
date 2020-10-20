import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import BreadCrumb from './BreadCrumb';

const Layout = ({ title, children, hasBreadCrumb, contentClass, titleClass }) => {
  return (
    <div className="bg-primary-200 overflow-y-hidden min-h-screen">
      <Sidebar />

      <div
        style={{
          paddingLeft: '84px',
        }}
        className={`w-full ${contentClass}`}
      >
        {hasBreadCrumb ? <BreadCrumb className="mb-2" /> : null}

        {title === '' ? null : (
          <h3 className={`font-medium text-primary-500 text-xl mb-6 ${titleClass}`}>{title}</h3>
        )}

        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  hasBreadCrumb: PropTypes.bool,
  contentClass: PropTypes.string,
};

Layout.defaultProps = {
  title: '',
  hasBreadCrumb: false,
  contentClass: '',
};

export default Layout;
