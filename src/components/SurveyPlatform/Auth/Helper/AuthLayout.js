import React from 'react';
import PropTypes from 'prop-types';
import { HomeOutlined, MailOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import ProfileDropdown from '../../../Common/ProfileDropdown';

import { dynamicMap } from '../../../../routes/RouteMap';

import optimal360Logo from '../../../../assets/images/optimal-360-logo.svg';

const Layout = ({ children, className, wrapperClassName, isLogin }) => {
  const profileDropdownOptions = [
    { key: 2, title: 'Home', icon: <HomeOutlined />, href: dynamicMap.surveyPlatform.dashboard() },
    {
      key: 3,
      title: 'Customer Support',
      icon: <MailOutlined />,
      href: '#',
      // eslint-disable-next-line no-undef
      onClick: () => alert('coming soon'),
    },
    {
      key: 4,
      title: 'Guides',
      icon: <QuestionCircleOutlined />,
      href: dynamicMap.surveyPlatform.referenceGuide(),
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isLogin ? 'bg-white' : 'bg-primary-200'
      } ${wrapperClassName}`}
    >
      <div className="w-full flex flex-row justify-between items-center px-8 py-6 md:px-20 lg:px-32 lg:py-10">
        <img src={optimal360Logo} className="w-40" alt="" />
        {isLogin && (
          <div className="flex justify-between items-center">
            <div className="hidden sm:flex justify-between items-center text-gray-500 text-base">
              <MailOutlined />
              <span className="ml-2">
                <a href="mailto:e360support@optimalconsulting.com.sg">Customer Support</a>
              </span>
            </div>
            <div className="md:hidden">
              <ProfileDropdown title="" options={profileDropdownOptions} />
            </div>
          </div>
        )}
      </div>

      <div className={`flex flex-col justify-center items-center  ${className}`}>{children}</div>
      <div className="grid grid-cols-12 gap-x-4 mt-6 md:mt-0">
        <div className="col-start-2 col-span-10">
          <p className="mt-4 mb-4" style={{ color: '#224086' }}>
            &#169; 2020 Optimal Consulting Group Pte. Ltd. All Rights Reserved
          </p>
        </div>
      </div>
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
