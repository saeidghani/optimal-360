import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import BreadCrumb from './BreadCrumb';

const Layout = ({ title, children, hasBreadCrumb, contentClass, headerClassName, titleClass }) => {
  return (
    <div className="bg-primary-200 overflow-y-hidden min-h-screen">
      <Sidebar />

      <div className={`w-full ${contentClass}`}>
        {hasBreadCrumb ? <BreadCrumb className={` ${headerClassName}`} /> : null}

        {title === '' ? null : (
          <h3 className={`font-medium text-primary-500 text-xl ${titleClass} ${headerClassName}`}>
            {title}
          </h3>
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
  titleClass: PropTypes.string,
  headerClassName: PropTypes.string,
};

Layout.defaultProps = {
  title: '',
  hasBreadCrumb: false,
  contentClass: '',
  titleClass: '',
  headerClassName: '',
};

export default Layout;
