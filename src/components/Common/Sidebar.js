import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UserOutlined, DatabaseOutlined, FileAddOutlined, HomeOutlined } from '@ant-design/icons';

import logo from '../../assets/images/360-icon.svg';

const Sidebar = () => (
  <div className="c-sidebar h-screen flex flex-col justify-between items-center">
    <div>
      <img className="w-full p-2" alt="" src={logo} />
    </div>
    <div>
      <ul>
        <li className="c-navigation-icon">
          <Link to="/">
            <FileAddOutlined />
          </Link>
        </li>
        <li className="c-navigation-icon">
          <Link to="/about">
            <HomeOutlined />
          </Link>
        </li>
        <li className="c-navigation-icon active">
          <Link to="/">
            <DatabaseOutlined />
          </Link>
        </li>
      </ul>
    </div>
    <div className="c-user-icon-sidebar flex justify-center items-center">
      <UserOutlined />
    </div>
  </div>
);

Sidebar.propTypes = {};

Sidebar.defaultProps = {};

export default Sidebar;
