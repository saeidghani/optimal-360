import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';

import {
  MailOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  LeftOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';
import BreadCrumb from './BreadCrumb';
import Tooltip from './Tooltip';
import Button from './Button';
import optimal360Logo from '../../assets/images/optimal-360-logo.svg';
import { dynamicMap } from '../../routes/RouteMap';
import { fetchFullURL } from '../../lib/utils';
import exportIcon from '../../assets/images/export-icon.svg';
import printIcon from '../../assets/images/print-icon.svg';
import { stringify, useQuery } from '../../hooks/useQuery';

const ClientAdminLayout = ({
  children,
  className,
  wrapperClassName,
  title,
  hasBreadCrumb,
  headerClassName,
  heading,
  profileName,
  organizationSrc,
  isReferenceGuide,
  surveyGroupId,
}) => {
  const history = useHistory();
  const [parsedQuery, , setQuery] = useQuery();
  const { logo } = parsedQuery || {};
  const dispatch = useDispatch();
  const generateReportsLoading = useSelector(
    (state) => state.loading.effects.clientAdmin.generateReports,
  );

  const profileDropdownOptions = [
    {
      key: 1,
      title: 'Logout',
      // eslint-disable-next-line no-undef
      onClick: () => {
        Cookie.remove('token');
        history.push(dynamicMap.clientAdmin.login());
      },
    },
  ];

  const handleExport = async (sgId) => {
    await dispatch?.clientAdmin?.generateReports(sgId);
  };

  return (
    <div
      className={`min-h-screen relative bg-primary-200 flex flex-col
       ${wrapperClassName}`}
    >
      <div
        className="bg-white w-full hidden md:flex justify-between items-center header
      px-4 py-6 lg:px-20 lg:py-10"
      >
        <img src={optimal360Logo} className="w-40" alt="" />
        <div className="lg:ml-16">
          <img
            src={organizationSrc ? fetchFullURL(organizationSrc) : fetchFullURL(logo)}
            className="w-24 lg:w-32"
            alt=""
          />
        </div>
        <Link to={dynamicMap.clientAdmin.dashboard()}>
          <div className="flex justify-between items-center text-base">
            <HomeOutlined />
            <span className="ml-2 text-xs lg:text-base">Home</span>
          </div>
        </Link>
        <div className="flex justify-between items-center text-gray-500 text-base">
          <MailOutlined />
          <span className="ml-2 text-xs lg:text-base">
            <a href="mailto:e360support@optimalconsulting.com.sg">Customer Support</a>
          </span>
        </div>
        <Link
          to={`${dynamicMap.clientAdmin.referenceGuide()}${stringify({ log: organizationSrc })}`}
        >
          <div className="flex justify-between items-center text-gray-500 text-base">
            <QuestionCircleOutlined />
            <span className="ml-2 text-xs lg:text-base">Guides</span>
          </div>
        </Link>
        <div className="flex items-center">
          {!isReferenceGuide && (
            <Fragment>
              <Tooltip title="export">
                <Button
                  onClick={() => handleExport(surveyGroupId)}
                  loading={generateReportsLoading}
                  type="link"
                >
                  <img className="mr-5 cursor-pointer" src={exportIcon} alt="" />
                </Button>
              </Tooltip>
              <Tooltip title="print">
                <img
                  className="cursor-pointer"
                  src={printIcon}
                  alt=""
                  onClick={() => window.print()}
                />
              </Tooltip>
            </Fragment>
          )}
        </div>
        <ProfileDropdown
          title={profileName}
          options={profileDropdownOptions}
          iconClassName="pb-1"
        />
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
       sm:py-4 sm:px-4 sm:mb-28 lg:pt-5 lg:pb-16 lg:mt-0 lg:px-24 ${className}`}
      >
        {hasBreadCrumb ? (
          <BreadCrumb className={`mt-2 hidden md:block ${headerClassName}`} />
        ) : null}
        <div className="text-left text-heading">{heading}</div>
        {children}
      </div>
      <div
        className="absolute footer bottom-0 w-full bg-antgray-100 bg-opacity-25 grid grid-cols-12 items-center
      gap-y-3 px-8 py-6 lg:px-32 lg:py-4 w-full	"
      >
        <img src={optimal360Logo} alt="" />
        <p
          className="text-antgray-100 text-sm text-center row-start-2 col-start-1 col-span-12 md:row-start-1
         md:col-start-3 md:col-span-8 md:px-6"
        >
          Copyright 2020. Optimal 360 Ltd is registered in England and Wales with company number
          06740379
        </p>
        <div className="flex justify-between items-center col-start-8 col-span-5 md:col-start-11 md:col-span-2 lg:px-8 social">
          <LinkedinOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
          <InstagramOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
          <FacebookOutlined style={{ fontSize: '24px', color: '#8D98BA' }} />
        </div>
      </div>
    </div>
  );
};

ClientAdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  title: PropTypes.string,
  hasBreadCrumb: PropTypes.bool,
  isReferenceGuide: PropTypes.bool,
  headerClassName: PropTypes.string,
  heading: PropTypes.string,
  profileName: PropTypes.string,
  organizationSrc: PropTypes.string,
};

ClientAdminLayout.defaultProps = {
  className: '',
  wrapperClassName: '',
  title: '',
  hasBreadCrumb: false,
  isReferenceGuide: false,
  headerClassName: '',
  profileName: '',
  organizationSrc: '',
  heading: 'Dashboard',
};

export default ClientAdminLayout;
