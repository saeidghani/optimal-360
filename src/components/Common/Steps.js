import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Steps } from 'antd';

import { dynamicMap } from '../../routes/RouteMap';

import { useQuery } from '../../hooks/useQuery';

const { Step } = Steps;

const PATHS = [
  dynamicMap.superUser.surveySettings(),
  dynamicMap.superUser.emailSettings(),
  dynamicMap.superUser.surveyIntro(),
  dynamicMap.superUser.surveyQuestions(),
];

const _Steps = ({ wizardSteps, className, currentPosition, size, steps, onChange }) => {
  const history = useHistory();
  const [parsedQuery] = useQuery();

  const handleWizardStepChange = (step) => {
    const params = history?.location?.search;

    const path = PATHS[step];

    history.push(`${path}${params}`);
  };

  return (
    <Steps
      onChange={
        onChange || (wizardSteps && parsedQuery.wizardEditMode)
          ? (step) => {
              if (wizardSteps) {
                handleWizardStepChange(step);
              } else if (onChange && typeof onChange === 'function') {
                onChange(step);
              }
            }
          : undefined
      }
      current={currentPosition}
      className={`c-step w-full ${className}`}
      size={size}
    >
      {steps.map((el, i) => (
        <Step
          // disabled={!parsedQuery.wizardEditMode}
          key={i}
          icon={<span>{i + 1}</span>}
          title={el}
        />
      ))}
    </Steps>
  );
};

_Steps.propTypes = {
  className: PropTypes.string,
  currentPosition: PropTypes.number,
  onChange: PropTypes.func,
  size: PropTypes.string,
  wizardSteps: PropTypes.bool,
  steps: PropTypes.arrayOf(PropTypes.string),
};

_Steps.defaultProps = {
  onChange: false,
  wizardSteps: false,
  className: '',
  currentPosition: 0,
  size: 'default', // also small available
  steps: ['Survey Setting', 'Email Settings', 'Survey Intro', 'Survey Questions'],
};

export default _Steps;
