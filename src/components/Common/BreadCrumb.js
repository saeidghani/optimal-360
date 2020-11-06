import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const _BreadCrumb = ({ className }) => {
  const { pathname } = useLocation();

  const paths = pathname.split('/').slice(1) || [];

  // const links = paths.map((el, i, arr) => {
  //   if (i === 0) return '#';

  //   if (Number.isInteger(el * 1)) return '#';

  //   const link = `/${arr.slice(0, i + 1).join('/')}`;

  //   return link;
  // });

  // console.log({ links, paths });

  return (
    <Breadcrumb separator="\" className={`capitalize ${className}`}>
      {/* eslint-disable-next-line no-unused-vars */}
      {paths.map((el, i, arr) => {
        const name = el.replace(/-/g, ' ');

        return (
          <Breadcrumb.Item key={i}>
            <Link
              to="#"
              // to={to}
            >
              {name}
            </Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

_BreadCrumb.propTypes = {
  className: PropTypes.string,
};

_BreadCrumb.defaultProps = {
  className: '',
};

export default _BreadCrumb;
