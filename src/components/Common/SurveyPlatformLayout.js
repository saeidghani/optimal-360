import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import {
  MailOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  LeftOutlined,
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import Cookie from 'js-cookie';

import ProfileDropdown from './ProfileDropdown';
import { dynamicMap } from '../../routes/RouteMap';
import logo from '../../assets/images/optimal360Logo.png';
import BreadCrumb from './BreadCrumb';
import { fetchFullURL } from '../../lib/utils';

const SurveyPlatformLayout = ({
  children,
  className,
  wrapperClassName,
  title,
  hasBreadCrumb,
  headerClassName,
  profileName,
  organizationSrc,
}) => {
  const history = useHistory();

  const profileDropdownOptions = [
    {
      key: 1,
      title: 'Logout',
      // eslint-disable-next-line no-undef
      onClick: () => {
        Cookie.remove('token');
        history.push(dynamicMap.surveyPlatform.login());
      },
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
          <img src={fetchFullURL(organizationSrc)} className="w-24" alt="" />
        </div>
        <Link to={dynamicMap.surveyPlatform.dashboard()}>
          <div className="flex justify-between items-center text-base">
            <HomeOutlined />
            <span className="ml-2 text-xs lg:text-base">Home</span>
          </div>
        </Link>
        <div className="hidden sm:flex justify-between items-center text-gray-500 text-base">
          <MailOutlined />
          <span className="ml-2">
            <a href="mailto:e360support@optimalconsulting.com.sg">Customer Support</a>
          </span>
        </div>
        <Link to={dynamicMap.surveyPlatform.referenceGuide()}>
          <div className="flex justify-between items-center text-gray-500 text-base">
            <QuestionCircleOutlined />
            <span className="ml-2 text-xs lg:text-base">Guides</span>
          </div>
        </Link>
        <ProfileDropdown title={profileName} options={profileDropdownOptions} />
      </div>
      <div className="flex items-center md:hidden px-6 pt-6">
        <div className="flex items-center">
          <LeftOutlined />
          <span className="ml-3">{title}</span>
        </div>
        <img src={fetchFullURL(organizationSrc)} className="ml-auto pr-2" alt="" />
        <ProfileDropdown title={profileName} options={profileDropdownOptions} />
      </div>
      <div
        className={`flex flex-col py-6 px-4 mt-8 mb-40 sm:mt-5
       sm:py-4 sm:px-4 sm:mb-20 lg:pt-5 lg:pb-16 lg:mt-0 lg:px-24 ${className}`}
      >
        {hasBreadCrumb ? (
          <BreadCrumb className={`mt-2 hidden md:block ${headerClassName}`} />
        ) : null}
        {children}
      </div>
      <div
        className="absolute bottom-0 w-full bg-antgray-100 bg-opacity-25 grid grid-cols-12 items-center
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

SurveyPlatformLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  title: PropTypes.string,
  hasBreadCrumb: PropTypes.bool,
  headerClassName: PropTypes.string,
  profileName: PropTypes.string,
  organizationSrc: PropTypes.string,
};

SurveyPlatformLayout.defaultProps = {
  className: '',
  wrapperClassName: '',
  title: '',
  hasBreadCrumb: false,
  headerClassName: '',
  profileName: '',
  organizationSrc: '',
};

export default SurveyPlatformLayout;
