import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';

const { Step } = Steps;
const _Steps = ({ handleChange, className, currentPosition, size }) => (
  <Steps current={currentPosition} className={`c-step w-full ${className}`} size={size}>
    <Step icon={<span>1</span>} title="Finished" subTitle="" description="" />
    <Step icon={<span>2</span>} title="In Progress" subTitle="" description="" />
    <Step icon={<span>3</span>} title="Waiting" subTitle="" description="" />
    <Step icon={<span>4</span>} title="Waiting" subTitle="" description="" />
  </Steps>
);

_Steps.propTypes = {
  handleChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  currentPosition: PropTypes.number,
  size: PropTypes.string,
};

_Steps.defaultProps = {
  className: '',
  currentPosition: 0,
  size: 'default', // also small available
};

export default _Steps;
