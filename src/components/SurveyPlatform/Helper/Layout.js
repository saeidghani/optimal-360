import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import {
  MailOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import Logo from '../../Common/Logo';
import BudgetLogo from './BudgetLogo';
import budgetLogo from '../../../assets/images/budget-logo.svg';

const Layout = ({ children, className, wrapperClassName, title }) => (
  <div
    className={`min-h-screen bg-primary-200 flex flex-col
       ${wrapperClassName}`}
  >
    <div className="bg-white w-full hidden md:flex justify-between items-center px-8 py-6 md:px-20 lg:px-32 lg:py-10">
      <Logo />
      <div className="ml-16">
        <BudgetLogo />
      </div>
      <Link to="#">
        <div className="flex justify-between items-center text-base">
          <HomeOutlined />
          <span className="ml-2">Home</span>
        </div>
      </Link>
      <Link to="#">
        <div className="flex justify-between items-center text-gray-500 text-base">
          <MailOutlined />
          <span className="ml-2">Customer Support</span>
        </div>
      </Link>
      <Link to="#">
        <div className="flex justify-between items-center text-gray-500 text-base">
          <QuestionCircleOutlined />
          <span className="ml-2">Guides</span>
        </div>
      </Link>
    </div>
    <div className="grid grid-cols-8 items-center md:hidden px-6 pt-6">
      <LeftOutlined className="col-start-1" />
      <span className="col-start-2">{title}</span>
      <img src={budgetLogo} className="col-start-6 col-span-3" alt="" />
    </div>

    <div
      className={`flex flex-col py-6 px-4
       sm:py-4 sm:px-10 lg:pt-5 lg:pb-28 mt-8 sm:mt-5 lg:mt-0 lg:px-28 ${className}`}
    >
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  title: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
  wrapperClassName: '',
  title: '',
};

export default Layout;
