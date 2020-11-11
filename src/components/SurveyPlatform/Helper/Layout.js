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
  UserOutlined,
} from '@ant-design/icons';

import { Avatar } from 'antd';
import ProfileDropdown from '../../Common/ProfileDropdown';

import budgetLogo from '../../../assets/images/budgetLogo.png';
import logo from '../../../assets/images/optimal360Logo.png';
import BreadCrumb from '../../Common/BreadCrumb';

const Layout = ({
  children,
  className,
  wrapperClassName,
  title,
  hasBreadCrumb,
  headerClassName,
}) => {
  const dropdownOptions = [
    {
      key: 1,
      title: 'Anthony Hardy',
      titleClassName: 'md:hidden',
      icon: <Avatar className="bg-primary-500" icon={<UserOutlined />} />,
      itemClassName: 'md:hidden',
      href: '',
    },
    { key: 2, title: 'Home', icon: <HomeOutlined />, href: '/client-admin/dashboard' },
    {
      key: 3,
      title: 'Customer Support',
      icon: <MailOutlined />,
      href: '/client-admin/customer-support',
    },
    {
      key: 4,
      title: 'Guides',
      icon: <QuestionCircleOutlined />,
      href: '/client-admin/reference-guide',
    },
  ];

  return (
    <div
      className={`min-h-screen relative bg-primary-200 flex flex-col
       ${wrapperClassName}`}
    >
      <div
        className="bg-white w-full hidden md:flex justify-between items-center
      px-4 py-6 lg:px-20 lg:py-10"
      >
        <img src={logo} alt="" />
        <div className="lg:ml-16">
          <img src={budgetLogo} className="w-24 lg:w-32" alt="" />
        </div>
        <Link to="#">
          <div className="flex justify-between items-center text-base">
            <HomeOutlined />
            <span className="ml-2 text-xs lg:text-base">Home</span>
          </div>
        </Link>
        <Link to="#">
          <div className="flex justify-between items-center text-gray-500 text-base">
            <MailOutlined />
            <span className="ml-2 text-xs lg:text-base">Customer Support</span>
          </div>
        </Link>
        <Link to="#">
          <div className="flex justify-between items-center text-gray-500 text-base">
            <QuestionCircleOutlined />
            <span className="ml-2 text-xs lg:text-base">Guides</span>
          </div>
        </Link>
        <ProfileDropdown title="Anthony Hardy" options={dropdownOptions} />
      </div>
      <div className="flex items-center md:hidden px-6 pt-6">
        <div className="flex items-center">
          <LeftOutlined />
          <span className="ml-3">{title}</span>
        </div>
        <img src={budgetLogo} className="ml-auto pr-2" alt="" />
        <ProfileDropdown title="Anthony Hardy" options={dropdownOptions} />
      </div>
      <div
        className={`flex flex-col py-6 px-4 mt-8 mb-40 sm:mt-5
       sm:py-4 sm:px-4 sm:mb-28 lg:pt-5 lg:pb-16 lg:mt-0 lg:px-24 ${className}`}
      >
        {hasBreadCrumb ? (
          <BreadCrumb className={`mt-2 hidden md:block ${headerClassName}`} />
        ) : null}
        {children}
      </div>
      <div
        className="absolute bottom-0 bg-antgray-100 bg-opacity-25 grid grid-cols-12 items-center
      gap-y-3 px-8 py-4 lg:px-32"
      >
        <img src={logo} alt="" />
        <p
          className="text-antgray-100 text-sm text-center row-start-2 col-start-1 col-span-12 md:row-start-1
         md:col-start-3 md:col-span-8 md:px-6"
        >
          Copyright 2020. Optimal 360 Ltd is registered in England and Wales with company number
          06740379
        </p>
        <div
          className="flex justify-between items-center col-start-8 col-span-5
        md:col-start-11 md:col-span-2 lg:px-8"
        >
          <TwitterOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
          <InstagramOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
          <FacebookOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  title: PropTypes.string,
  hasBreadCrumb: PropTypes.bool,
  headerClassName: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
  wrapperClassName: '',
  title: '',
  hasBreadCrumb: false,
  headerClassName: '',
};

export default Layout;
