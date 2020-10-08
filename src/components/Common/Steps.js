import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';

const { Step } = Steps;

const _Steps = ({ className, currentPosition, size }) => (
  <Steps current={currentPosition} className={`c-step w-full ${className}`} size={size}>
    {['Survey Setting', 'Email Sttings', 'Survay Intro', 'Survey Questions', 'Reports'].map(
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
};

_Steps.defaultProps = {
  className: '',
  currentPosition: 0,
  size: 'default', // also small available
};

export default _Steps;
