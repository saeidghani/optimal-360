import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';

const { Step } = Steps;

const _Steps = ({ className, currentPosition, size, steps }) => (
  <Steps current={currentPosition} className={`c-step w-full ${className}`} size={size}>
    {steps.map(
      (el, i) => (
        <Step key={i} icon={<span>{i + 1}</span>} title={el} />
      ),
    )}
  </Steps>
);

_Steps.propTypes = {
  className: PropTypes.string,
  currentPosition: PropTypes.number,
  size: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.string),
};

_Steps.defaultProps = {
  className: '',
  currentPosition: 0,
  size: 'default', // also small available
  steps: ['Survey Setting', 'Email Sttings', 'Survey Intro', 'Survey Questions', 'Reports']
};

export default _Steps;
