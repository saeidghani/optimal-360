import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/Button';

const ButtonsTab = ({ activeButtonKey, wrapperClassName, buttonClassName, disabled }) => {
  const viewButtons = [
    { key: '1', title: 'View Ratee Summary' },
    { key: '2', title: 'View Ratee Details' },
    { key: '3', title: 'View Rater Details' },
  ];

  return (
    <div className={`flex items-center overflow-auto mt-4 ${wrapperClassName}`}>
      {viewButtons.map((button) => (
        <Button
          key={button.key}
          className={`mr-4 border-list-border shadow-none px-2 md:px-4 w-full
            ${button.key === activeButtonKey ? 'bg-primary' : 'bg-white'} ${buttonClassName}`}
          textClassName={`${button.key === activeButtonKey ? 'text-white' : 'text-heading'}`}
          textSize="sm"
          text={button.title}
          disabled={disabled}
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
