import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/Button';

const ButtonsTab = ({ activeButtonKey, wrapperClassName, buttonClassName, disabled }) => {
  const viewButtons = [
    { key: '1', title: 'View Ratee Summary', disabled: true },
    { key: '2', title: 'View Ratee Details', disabled: true },
    { key: '3', title: 'View Rater Details', disabled: false },
  ];

  return (
    <div className={`flex items-center overflow-auto mt-4 ${wrapperClassName}`}>
      {viewButtons.map((button) => (
        <Button
          key={button.key}
          className={`c-force-padding-y-px mr-4 border-list-border shadow-none px-2 md:px-4 w-full
            ${button.key === activeButtonKey ? 'bg-primary' : 'bg-white'}
            ${button.disabled ? '' : 'text-white bg-primary-500'} ${buttonClassName}`}
          textClassName={`pt-4 ${button.disabled ? '' : 'text-white'} ${buttonClassName}`}
          textSize="sm"
          text={button.title}
          disabled={button.disabled}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};

ButtonsTab.propTypes = {
  activeButtonKey: PropTypes.string,
  wrapperClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

ButtonsTab.defaultProps = {
  activeButtonKey: '',
  wrapperClassName: '',
  buttonClassName: '',
  disabled: false,
};

export default ButtonsTab;
