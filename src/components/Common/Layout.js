import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import BreadCrumb from './BreadCrumb';

const Layout = ({
  wizardLayout,
  title,
  children,
  breadCrumbItems,
  contentClass,
  headerClassName,
  titleClass,
}) => (
  <div className="bg-primary-200 min-h-screen">
    <Sidebar wizardLayout={wizardLayout} />

    <div className={`w-full ${contentClass}`}>
      {breadCrumbItems?.length > 0 ? (
        <BreadCrumb content={breadCrumbItems} className={` ${headerClassName}`} />
      ) : null}

      {title === '' ? null : (
        <h3 className={`font-medium text-primary-500 text-xl ${titleClass} ${headerClassName}`}>
          {title}
        </h3>
      )}

      {children}
    </div>
  </div>
);

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  breadCrumbItems: PropTypes.arrayOf(PropTypes.string),
  contentClass: PropTypes.string,
  titleClass: PropTypes.string,
  headerClassName: PropTypes.string,
  wizardLayout: PropTypes.bool,
};

Layout.defaultProps = {
  title: '',
  breadCrumbItems: [],
  contentClass: '',
  titleClass: '',
  headerClassName: '',
  wizardLayout: false,
};

export default Layout;
