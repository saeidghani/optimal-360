import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UserOutlined, DatabaseOutlined, FileAddOutlined, HomeOutlined } from '@ant-design/icons';

import logo from '../../assets/images/360-icon.svg';

const Sidebar = () => (
  <div className="bg-primary-900  h-screen flex flex-col justify-between items-center">
    <div>
      <Link to="/">
        <img className="w-full p-2 hover:opacity-75" alt="" src={logo} />
      </Link>
    </div>
    <div>
      <ul>
        <li className="pb-10 text-antgray-100 text-xl">
          <Link to="/">
            <FileAddOutlined />
          </Link>
        </li>
        <li className="pb-10 text-antgray-100 text-xl ">
          <Link to="/about">
            <HomeOutlined />
          </Link>
        </li>
        <li className="pb-10 text-antgray-100 text-xl active ">
          <Link to="/">
            <DatabaseOutlined />
          </Link>
        </li>
      </ul>
    </div>
    <div className="c-user-icon-sidebar flex justify-center items-center rounded-full p-3 mb-4 bg-primary-500 text-xl text-white">
      <UserOutlined />
    </div>
  </div>
);

Sidebar.propTypes = {};

Sidebar.defaultProps = {};

export default Sidebar;
