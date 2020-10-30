import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import Logo from '../../Common/Logo';
import BudgetLogo from './BudgetLogo';

const Layout = ({ children, className, wrapperClassName, isLogin }) => (
  <div
    className={`min-h-screen flex flex-col ${
      isLogin ? 'bg-white' : 'bg-primary-200'
    } ${wrapperClassName}`}
  >
    <div className="w-full flex flex-row justify-between items-center px-8 py-6 md:px-20 lg:px-32 lg:py-10">
      <Logo className="hidden md:block" />
      {isLogin && (
        <div className="flex justify-between items-center">
          <Link to="#">
            <div className="hidden sm:flex justify-between items-center text-gray-500 text-base">
              <MailOutlined />
              <span className="ml-2">Customer Support</span>
            </div>
          </Link>
          <BudgetLogo className="ml-6 lg:ml-16" />
        </div>
      )}
    </div>

    <div className={`flex flex-col justify-center items-center  ${className}`}>{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  isLogin: PropTypes.bool,
};

Layout.defaultProps = {
  className: '',
  wrapperClassName: '',
  isLogin: false,
};

export default Layout;
