import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';

const { Step } = Steps;
const _Steps = ({ handleChange, className, currentPosition, size }) => (
  <Steps current={currentPosition} className={`c-step w-full ${className}`} size={size}>
    <Step icon={<span>1</span>} title="Survey Setting" subTitle="" description="" />
    <Step icon={<span>2</span>} title="Email Sttings " subTitle="" description="" />
    <Step icon={<span>3</span>} title="Survay Intro" subTitle="" description="" />
    <Step icon={<span>4</span>} title="Survey Questions" subTitle="" description="" />
    <Step icon={<span>5</span>} title="Reports" subTitle="" description="" />
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
