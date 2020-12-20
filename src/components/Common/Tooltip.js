import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

const _Tooltip = ({ title, children }) => {
  return (
    <Tooltip title={title}>
      <span>{children}</span>
    </Tooltip>
  );
};

_Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

_Tooltip.defaultProps = {};

export default _Tooltip;
