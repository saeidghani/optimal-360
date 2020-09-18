import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const _BreadCrumb = () => (
  <Breadcrumb separator="\" className="capitalize">
    <Breadcrumb.Item>
      <Link to="/">super user </Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <Link to="/">projects </Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <Link to="/">survay groups </Link>
    </Breadcrumb.Item>
  </Breadcrumb>
);

_BreadCrumb.propTypes = {};

_BreadCrumb.defaultProps = {};

export default _BreadCrumb;
