import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined, UserOutlined, MoreOutlined } from '@ant-design/icons';

const ProfileDropdown = ({ title, options, src, iconClassName }) => {
  const _Menu = (
    <Menu>
      {options?.length > 0
        ? options.map((option) => (
            // eslint-disable-next-line react/jsx-indent
            <Menu.Item
              key={option.key}
              className={`flex items-center ${option.itemClassName ? option.itemClassName : ''}`}
            >
              {option.icon && <div className={`mr-2 ${iconClassName}`}>{option.icon}</div>}
              <Link to={option.href}>
                <span className={`${option.titleClassName ? option.titleClassName : ''}`}>
                  {option.title}
                </span>
              </Link>
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
      key: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.node,
      itemClassName: PropTypes.string,
      href: PropTypes.string,
    }),
  ).isRequired,
  src: PropTypes.string,
  iconClassName: PropTypes.string,
};

ProfileDropdown.defaultProps = {
  title: '',
  src: '',
  iconClassName: '',
};

export default ProfileDropdown;
