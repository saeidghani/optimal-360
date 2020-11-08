import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HomeOutlined, MailOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import BudgetLogo from './BudgetLogo';
import ProfileDropdown from '../../Common/ProfileDropdown';

import optimal360Logo from '../../../assets/images/optimal360Logo.png';
import optimal360MiniLogo from '../../../assets/images/optimal360MiniLogo.png';

const Layout = ({ children, className, wrapperClassName, isLogin }) => {
  const dropdownOptions = [
    { key: 2, title: 'Home', icon: <HomeOutlined />, href: 'survey-platform/welcome' },
    {
      key: 3,
      title: 'Customer Support',
      icon: <MailOutlined />,
      href: 'survey-platform/customer-support',
    },
    {
      key: 4,
      title: 'Guides',
      icon: <QuestionCircleOutlined />,
      href: 'survey-platform/reference-guide',
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isLogin ? 'bg-white' : 'bg-primary-200'
      } ${wrapperClassName}`}
    >
      <div className="w-full flex flex-row justify-between items-center px-8 py-6 md:px-20 lg:px-32 lg:py-10">
        <img src={optimal360Logo} className="hidden md:block" alt="" />
        <img src={optimal360MiniLogo} className="block md:hidden" alt="" />
        {isLogin && (
          <div className="flex justify-between items-center">
            <Link to="#">
              <div className="hidden sm:flex justify-between items-center text-gray-500 text-base">
                <MailOutlined />
                <span className="ml-2">Customer Support</span>
              </div>
            </Link>
            <BudgetLogo className="ml-6 lg:ml-16" />
            <div className="md:hidden">
              <ProfileDropdown title="Anthony Hardy" options={dropdownOptions} />
            </div>
          </div>
        )}
      </div>

      <div className={`flex flex-col justify-center items-center  ${className}`}>{children}</div>
    </div>
  );
};

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
