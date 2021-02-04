import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';

import Cookie from 'js-cookie';
import { stringify } from '../../hooks/useQuery';
import { dynamicMap } from '../../routes/RouteMap';

import Button from './Button';
import Modal from './Modal';
import Tooltip from './Tooltip';

import logo from '../../assets/images/360-icon.svg';
import ProfileDropdown from './ProfileDropdown';

const Sidebar = ({ wizardLayout }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const [selectedPath, setSelectedPath] = React.useState('');

  const activeClassNames =
    'hover:bg-primary-500 bg-primary-500 hover:bg-opacity-10 bg-opacity-10 focus:text-primary-500 text-primary-500';

  const DiscardModal = () => (
    <Modal
      okText="Discard These Settings"
      cancelText="Continue"
      visible={!!selectedPath}
      cancelButtonText="Continue"
      okButtonText="Discard These Settings"
      handleOk={() => history.push(selectedPath)}
      handleCancel={() => setSelectedPath('')}
    >
      <h3 className="text-lg text-body mb-3">Attention!</h3>

      <p className="text-sm text-secondary">
        Moving to another Section would discard all data you have entered here! Are you sure to
        move?
      </p>
    </Modal>
  );

  const profileDropdownOptions = [
    {
      key: 1,
      title: 'Logout',
      // eslint-disable-next-line no-undef
      onClick: () => {
        Cookie.remove('token');
        history.push(dynamicMap.superUser.login());
      },
    },
  ];

  return (
    <div
      style={{ width: '60px' }}
      className="bg-primary-900 min-h-screen h-screen max-h-screen
      flex flex-col justify-between items-center fixed"
    >
      <DiscardModal />

      <div className="h-10">
        <img className="w-full h-10 p-2" alt="Logo" src={logo} />
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <Tooltip title="Projects">
          <Button
            onClick={() => {
              const path = dynamicMap.superUser.projectsList();
              const params = stringify({
                page_size: 10,
                page_number: 1,
                status: 'active',
              });

              const fullUrl = `${path}${params}`;

              if (wizardLayout) {
                setSelectedPath(fullUrl);
              } else {
                history.push(fullUrl);
              }
            }}
            type="text"
            size="middle"
            className={`border-0 py-8 w-full flex flex-row justify-center items-center
           text-center text-2xl hover:text-primary-500 bg-transparent ${
             pathname === dynamicMap.superUser.projectsList()
               ? activeClassNames
               : 'focus:text-antgray-100 hover:text-antgray-100 text-antgray-100'
           } `}
          >
            <svg className="fill-current" width="1em" height="1em" fill="none">
              <path
                d="M16 20H8a3 3 0 01-3-3V7a1 1 0 00-2 0v10a5 5 0 005 5h8a1 1 0 000-2zm-6-7a1
              1 0 001 1h5a1 1 0 000-2h-5a1 1 0 00-1 1zm11-4.06a1.307 1.307 0 00-.06-.27v-.09a1.07
              1.07 0 00-.19-.28l-6-6a1.071 1.071 0 00-.28-.19.32.32 0 00-.09 0 .88.88 0 00-.33-.11H10a3
              3 0 00-3 3v10a3 3 0 003 3h8a3 3 0 003-3V8.94zm-6-3.53L17.59 8H16a1 1 0 01-1-1V5.41zM19
              15a1 1 0 01-1 1h-8a1 1 0 01-1-1V5a1 1 0 011-1h3v3a3 3 0 00.18 1H11a1 1 0 100 2h8v5z"
              />
            </svg>
          </Button>
        </Tooltip>

        <Tooltip title="Organizations">
          <Button
            onClick={() => {
              const path = dynamicMap.superUser.organizationsList();
              const params = stringify({
                page_size: 10,
                page_number: 1,
              });

              const fullUrl = `${path}${params}`;

              if (wizardLayout) {
                setSelectedPath(fullUrl);
              } else {
                history.push(fullUrl);
              }
            }}
            type="text"
            size="middle"
            className={`border-0 py-8 w-full flex flex-row justify-center items-center
           text-center text-2xl  hover:text-primary-500 bg-transparent ${
             pathname === dynamicMap.superUser.organizationsList()
               ? activeClassNames
               : 'focus:text-antgray-100 hover:text-antgray-100 text-antgray-100'
           } `}
          >
            <svg className="fill-current" width="1em" height="1em" fill="none">
              <path
                d="M14 8h1a1 1 0 100-2h-1a1 1 0 100 2zm0 4h1a1 1 0 000-2h-1a1 1 0 000 2zM9 8h1a1
              1 0 100-2H9a1 1 0 000 2zm0 4h1a1 1 0 000-2H9a1 1 0 000 2zm12 8h-1V3a1 1 0 00-1-1H5a1
              1 0 00-1 1v17H3a1 1 0 000 2h18a1 1 0 000-2zm-8 0h-2v-4h2v4zm5 0h-3v-5a1 1 0 00-1-1h-4a1
              1 0 00-1 1v5H6V4h12v16z"
              />
            </svg>
          </Button>
        </Tooltip>

        <Tooltip title="Bank">
          <Button
            onClick={() => {
              const path = dynamicMap.superUser.bankModels();
              const params = stringify({
                page_size: 10,
                page_number: 1,
              });

              const fullUrl = `${path}${params}`;

              if (wizardLayout) {
                setSelectedPath(fullUrl);
              } else {
                history.push(fullUrl);
              }
            }}
            type="text"
            size="middle"
            className={`border-0 py-8 w-full flex flex-row justify-center items-center
           text-center text-2xl hover:text-primary-500 bg-transparent ${
             pathname === dynamicMap.superUser.bankModels()
               ? activeClassNames
               : 'focus:text-antgray-100 hover:text-antgray-100 text-antgray-100'
           } `}
          >
            <svg className="fill-current" width="1em" height="1em" fill="none">
              <path
                d="M8 16.5C7.80222 16.5 7.60888 16.5586 7.44443 16.6685C7.27998 16.7784
              7.15181 16.9346 7.07612 17.1173C7.00043 17.3 6.98063 17.5011 7.01921
              17.6951C7.0578 17.8891 7.15304 18.0673 7.29289 18.2071C7.43275 18.347
              7.61093 18.4422 7.80491 18.4808C7.99889 18.5194 8.19996 18.4996 8.38268
              18.4239C8.56541 18.3482 8.72159 18.22 8.83147 18.0556C8.94135 17.8911
              9 17.6978 9 17.5C9 17.2348 8.89464 16.9804 8.70711 16.7929C8.51957
              16.6054 8.26522 16.5 8 16.5ZM12 2C8 2 4 3.37 4 6V18C4 20.63 8 22 12
              22C16 22 20 20.63 20 18V6C20 3.37 16 2 12 2ZM18 18C18 18.71 15.72 20
              12 20C8.28 20 6 18.71 6 18V14.73C7.87207 15.62 9.92789 16.0551 12
              16C14.0721 16.0551 16.1279 15.62 18 14.73V18ZM18 12C18 12.71 15.72
              14 12 14C8.28 14 6 12.71 6 12V8.73C7.87207 9.61996 9.92789 10.0551
              12 10C14.0721 10.0551 16.1279 9.61996 18 8.73V12ZM12 8C8.28 8 6
              6.71 6 6C6 5.29 8.28 4 12 4C15.72 4 18 5.29 18 6C18 6.71 15.72 8
              12 8ZM8 10.5C7.80222 10.5 7.60888 10.5586 7.44443 10.6685C7.27998
              10.7784 7.15181 10.9346 7.07612 11.1173C7.00043 11.3 6.98063 11.5011
              7.01921 11.6951C7.0578 11.8891 7.15304 12.0673 7.29289 12.2071C7.43275
              12.347 7.61093 12.4422 7.80491 12.4808C7.99889 12.5194 8.19996 12.4996
              8.38268 12.4239C8.56541 12.3482 8.72159 12.22 8.83147 12.0556C8.94135
              11.8911 9 11.6978 9 11.5C9 11.2348 8.89464 10.9804 8.70711
              10.7929C8.51957 10.6054 8.26522 10.5 8 10.5Z"
              />
            </svg>
          </Button>
        </Tooltip>

        {/* <Link
          className={`py-5 w-full flex flex-row justify-center items-center text-center text-2xl
          hover:text-primary-500 ${
            pathname === dynamicMap.superUser.organizationsList()
              ? activeClassNames
              : 'text-antgray-100'
          } `}
          to={`${dynamicMap.superUser.organizationsList()}${stringify({
            page_size: 10,
            page_number: 1,
          })}`}
        >
          <svg className="fill-current" width="1em" height="1em" fill="none">
            <path
              d="M14 8h1a1 1 0 100-2h-1a1 1 0 100 2zm0 4h1a1 1 0 000-2h-1a1 1 0 000 2zM9 8h1a1
              1 0 100-2H9a1 1 0 000 2zm0 4h1a1 1 0 000-2H9a1 1 0 000 2zm12 8h-1V3a1 1 0 00-1-1H5a1
              1 0 00-1 1v17H3a1 1 0 000 2h18a1 1 0 000-2zm-8 0h-2v-4h2v4zm5 0h-3v-5a1 1 0 00-1-1h-4a1
              1 0 00-1 1v5H6V4h12v16z"
            />
          </svg>
        </Link> */}
      </div>

      <div
        className="c-user-icon-sidebar flex justify-center mb-4 ml-2
      items-center rounded-full text-xl text-white"
      >
        <ProfileDropdown options={profileDropdownOptions} justUserOutline />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  wizardLayout: PropTypes.bool,
};

Sidebar.defaultProps = {
  wizardLayout: false,
};

export default Sidebar;
