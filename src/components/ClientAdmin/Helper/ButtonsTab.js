import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/Button';
import { dynamicMap } from '../../../routes/RouteMap';

const ButtonsTab = ({ activeButtonKey, wrapperClassName, buttonClassName }) => {
  const viewButtons = [
    { key: '1', title: 'View Ratee Summary', href: dynamicMap.clientAdmin.participantSummary() },
    { key: '2', title: 'View Ratee Details', href: dynamicMap.clientAdmin.participantDetails() },
    { key: '3', title: 'View Rater Details', href: dynamicMap.clientAdmin.raterDetails() },
  ];

  return (
    <div className={`flex items-center overflow-auto mt-4 ${wrapperClassName}`}>
      {viewButtons.map((button) => (
        <Button
          key={button.key}
          className={`mr-4 border-list-border shadow-none px-2 md:px-4
            ${button.key === activeButtonKey ? 'bg-primary' : 'bg-white'} ${buttonClassName}`}
          textClassName={`pt-2 ${button.key === activeButtonKey ? 'text-white' : 'text-heading'}`}
          textSize="sm"
          text={button.title}
          href={button.href}
        />
      ))}
    </div>
  );
};

ButtonsTab.propTypes = {
  activeButtonKey: PropTypes.string,
  wrapperClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
};

ButtonsTab.defaultProps = {
  activeButtonKey: '',
  wrapperClassName: '',
  buttonClassName: '',
};

export default ButtonsTab;
