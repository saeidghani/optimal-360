import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const _BreadCrumb = () => {
  const { pathname } = useLocation();

  const paths = pathname.split('/').slice(1) || [];

  return (
    <Breadcrumb separator="\" className="capitalize">
      {/* eslint-disable-next-line no-unused-vars */}
      {paths.map((el, i, arr) => {
        // const to = `/${arr.slice(0, i + 1).join('/')}`;
        const name = el.replace(/-/g, ' ');

        return (
          <Breadcrumb.Item key={i}>
            <Link
              // TODO
              // to={to}
              to="#"
            >
              {name}
            </Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default _BreadCrumb;
