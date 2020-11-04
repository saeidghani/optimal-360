import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { UserOutlined, DatabaseOutlined, FileAddOutlined, HomeOutlined } from '@ant-design/icons';

import logo from '../../assets/images/360-icon.svg';

const Sidebar = () => {
  const { pathname } = useLocation();

  const activeClassNames = 'bg-primary-500 bg-opacity-10 text-primary-500';

  return (
    <div
      style={{ width: '60px' }}
      className="bg-primary-900 min-h-screen h-screen max-h-screen
    flex flex-col justify-between items-center fixed"
    >
      <div className="h-10">
        <img className="w-full h-10 p-2" alt="Logo" src={logo} />
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <Link
          className={`py-5 w-full flex flex-row justify-center items-center text-center text-xl
            hover:text-primary-500 ${
              pathname === '/super-user/projects' ? activeClassNames : 'text-antgray-100'
            } `}
          to="/super-user/projects?status=active&page_size=10&page_number=1"
        >
          <FileAddOutlined />
        </Link>

        <Link
          className={`py-5 w-full flex flex-row justify-center items-center text-center text-xl
          hover:text-primary-500 ${
            pathname === '/super-user/projects/survey-groups'
              ? activeClassNames
              : 'text-antgray-100'
          } `}
          to="/super-user/projects/survey-groups"
        >
          <HomeOutlined />
        </Link>

        <Link
          className={`py-5 w-full flex flex-row justify-center items-center text-center text-xl
          hover:text-primary-500 ${
            pathname === '/super-user/bank/models' ? activeClassNames : 'text-antgray-100'
          } `}
          to="/super-user/bank/models"
        >
          <DatabaseOutlined />
        </Link>
      </div>

      <div
        className="c-user-icon-sidebar flex justify-center p-3 mb-4 
      items-center rounded-full bg-primary-500 text-xl text-white"
      >
        <UserOutlined />
      </div>
    </div>
  );
};

export default Sidebar;
