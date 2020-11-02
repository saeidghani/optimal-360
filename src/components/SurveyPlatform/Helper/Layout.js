import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import {
  MailOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  LeftOutlined,
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import Logo from '../../Common/Logo';
import BudgetLogo from './BudgetLogo';

import budgetLogo from '../../../assets/images/budget-logo.svg';

const Layout = ({ children, className, wrapperClassName, title }) => (
  <div
    className={`min-h-screen relative bg-primary-200 flex flex-col
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
      className={`flex flex-col py-6 px-4 mb-40
       sm:py-4 sm:px-10 sm:mb-28 lg:pt-5 lg:pb-16 mt-8 sm:mt-5 lg:mt-0 lg:px-28 ${className}`}
    >
      {children}
    </div>
    <div className="absolute bottom-0 bg-antgray-100 bg-opacity-25 grid grid-cols-12 items-center gap-y-3 px-8 py-6 lg:px-32 lg:py-10">
      <Logo />
      <p className="text-antgray-100 text-sm text-center row-start-2 col-start-1 col-span-12 md:row-start-1 md:col-start-3 md:col-span-8 md:px-6">
        Copyright 2020. Optimal 360 Ltd is registered in England and Wales with company number
        06740379
      </p>
      <div className="flex justify-between items-center col-start-8 col-span-5 md:col-start-11 md:col-span-2 lg:px-8">
        <TwitterOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
        <InstagramOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
        <FacebookOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
      </div>
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
