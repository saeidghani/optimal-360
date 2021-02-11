import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  MailOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  LeftOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  FacebookOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import Cookie from 'js-cookie';

import ProfileDropdown from './ProfileDropdown';
import { dynamicMap } from '../../routes/RouteMap';
import logo from '../../assets/images/optimal-360-logo.svg';
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
  visitedSurveyGroups,
  onSetExitModalVisible,
  onSetExitPath,
}) => {
  const history = useHistory();

  const handleNavItemClick = (path) => {
    if (history.location.pathname.includes('questions')) {
      onSetExitModalVisible(true);
      onSetExitPath(path);
    } else {
      history.push(path);
    }
  };

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
    {
      key: 2,
      title: 'Edit Demographic',
      // eslint-disable-next-line no-undef
      onClick: () => {
        if (visitedSurveyGroups) {
          localStorage.setItem('visitedSurveyGroups', JSON?.stringify(visitedSurveyGroups));
        }
        handleNavItemClick(dynamicMap.surveyPlatform.information());
      },
    },
  ];

  const handleGuidesClick = () => {
    if (visitedSurveyGroups) {
      localStorage.setItem('visitedSurveyGroups', JSON?.stringify(visitedSurveyGroups));
    }
    handleNavItemClick(dynamicMap.surveyPlatform.referenceGuide());
  };

  return (
    <div
      className={`min-h-screen relative bg-primary-200 flex flex-col
       ${wrapperClassName}`}
    >
      <div
        className="bg-white w-full hidden md:flex justify-between items-center
      px-4 py-6 lg:px-20 lg:py-10"
      >
        <img src={logo} className="w-40" alt="" />
        <div className="lg:ml-16">
          <img src={fetchFullURL(organizationSrc)} className="w-10 md:w-24" alt="" />
        </div>
        <div
          className="flex justify-between items-center text-base cursor-pointer"
          onClick={() => handleNavItemClick(dynamicMap.surveyPlatform.dashboard())}
        >
          <HomeOutlined />
          <span className="ml-2 text-xs lg:text-base">Home</span>
        </div>
        <div className="hidden sm:flex justify-between items-center text-gray-500 text-base">
          <MailOutlined />
          <span className="ml-2">
            <a href="mailto:e360support@optimalconsulting.com.sg">Customer Support</a>
          </span>
        </div>
        <div
          className="flex justify-between items-center text-gray-500 text-base"
          onClick={handleGuidesClick}
        >
          <QuestionCircleOutlined />
          <span className="ml-2 text-xs cursor-pointer hover:text-primary-500 lg:text-base">
            Guides
          </span>
        </div>
        <ProfileDropdown title={profileName} options={profileDropdownOptions} />
      </div>
      <div className="flex items-center md:hidden px-6 pt-6">
        <div className="flex items-center">
          <LeftOutlined />
          <span className="ml-3">{title}</span>
        </div>
        <img src={fetchFullURL(organizationSrc)} className="ml-auto pr-2 w-20" alt="" />
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
          className="flex justify-between space-x-2 items-center col-start-8 col-span-5
        md:col-start-11 md:col-span-2 lg:px-8"
        >
          <a href="https://www.facebook.com/optimalconsultants" target="_blank" rel="noreferrer">
            <LinkedinOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
          </a>
          <a
            href="https://www.instagram.com/optimalasia/?ref=badge"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
          </a>
          <a
            href="https://www.linkedin.com/company/optimal-consulting-group-pte-ltd"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
          </a>
          <a
            href="https://www.optimalconsulting.com.sg/FileStore/product/160_optimal-wechat.jpg"
            target="_blank"
            rel="noreferrer"
          >
            <WechatOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
          </a>
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
  visitedSurveyGroups: PropTypes.arrayOf(PropTypes.shape({})),
  onSetExitModalVisible: PropTypes.func,
  onSetExitPath: PropTypes.func,
};

SurveyPlatformLayout.defaultProps = {
  className: '',
  wrapperClassName: '',
  title: '',
  hasBreadCrumb: false,
  headerClassName: '',
  profileName: '',
  organizationSrc: '',
  visitedSurveyGroups: null,
  onSetExitModalVisible: () => {},
  onSetExitPath: () => {},
};

export default SurveyPlatformLayout;
