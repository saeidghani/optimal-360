import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import BreadCrumb from './BreadCrumb';

const Layout = ({ title, children, hasBreadCrumb, contentClass }) => {
  return (
    <div className="flex flex-row bg-primary-200">
      <Sidebar />

      <div className={`flex flex-col w-full  ${contentClass}`}>
        {hasBreadCrumb ? <BreadCrumb /> : null}

        {title === '' ? null : (
          <h3 className="font-medium text-primary-500 text-xl mb-6">{title}</h3>
        )}

        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  hasBreadCrumb: PropTypes.string,
  contentClass: PropTypes.string,
};

Layout.defaultProps = {
  title: '',
  hasBreadCrumb: 'true',
  contentClass: '',
};

export default Layout;
