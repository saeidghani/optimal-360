import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import Logo from '../../Common/Logo';
import BudgetLogo from './BudgetLogo';

const Layout = ({ children, className, wrapperClassName }) => (
  <div
    className={`min-h-screen bg-primary-200 flex flex-col
       ${wrapperClassName}`}
  >
    <div className="bg-white w-full flex justify-between items-center px-8 py-6 md:px-20 lg:px-32 lg:py-10">
      <Logo />
      <div className="flex justify-between items-center">
        <Link to="#">
          <div className="flex justify-between items-center text-gray-500 text-base">
            <MailOutlined />
            <span className="ml-2">Customer Support</span>
          </div>
        </Link>
        <div className="ml-16">
          <BudgetLogo />
        </div>
      </div>
    </div>

    <div
      className={`flex flex-col justify-center items-center py-6 px-4
       sm:py-4 sm:px-12 lg:pt-5 lg:pb-28 mt-8 sm:mt-5 lg:mt-0 lg:px-28 ${className}`}
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
