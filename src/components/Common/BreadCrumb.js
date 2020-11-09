import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const _BreadCrumb = ({ className }) => {
  const { pathname } = useLocation();

  const paths = pathname.split('/').slice(1) || [];

  const links = paths.map((el) => {
    if (Number.isInteger(el * 1)) return '';

    return el;
  });

  return (
    <Breadcrumb separator="\" className={`capitalize ${className}`}>
      {/* eslint-disable-next-line no-unused-vars */}
      {links.map((el, i, arr) => {
        if (!el) return null;

        const name = el.replace(/-/g, ' ');
        const to = i === 0 ? '#' : i + 1 === arr.length ? '#' : `/${arr.slice(0, i + 1).join('/')}`;

        return (
          <Breadcrumb.Item key={i}>
            <span>{name}</span>
          </Breadcrumb.Item>
        );

        // return (
        //   <Breadcrumb.Item key={i}>
        //     {to ? (
        //       <Link
        //         to={to}
        //       >
        //         {name}
        //       </Link>
        //     ) : (
        //       <span>{name}</span>
        //     )}
        //   </Breadcrumb.Item>
        // );
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
