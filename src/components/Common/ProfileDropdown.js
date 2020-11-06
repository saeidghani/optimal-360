import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined, UserOutlined, MoreOutlined } from '@ant-design/icons';

const ProfileDropdown = ({ title, options, src }) => {
  const _Menu = (
    <Menu>
      {options?.length > 0
        ? options.map((option) => (
            // eslint-disable-next-line react/jsx-indent
            <Menu.Item key={option.key}>
              <Link to={option.href}>{option.title}</Link>
            </Menu.Item>
          ))
        : null}
    </Menu>
  );

  return (
    <Dropdown overlay={_Menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <div className="hidden md:block">
          <Avatar src={src} className="bg-primary-500" icon={<UserOutlined />} />
          <span className="mx-2 text-xs lg:text-base">{title}</span>
          <DownOutlined className="text-xs" />
        </div>
        <MoreOutlined className="md:hidden text-xl" />
      </a>
    </Dropdown>
  );
};

ProfileDropdown.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
      key: PropTypes.number,
    }),
  ).isRequired,
  src: PropTypes.string,
};

ProfileDropdown.defaultProps = {
  title: '',
  src: '',
};

export default ProfileDropdown;
