import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';

const _Progress = ({ percentage, className, subClassName, status, type, showPercent }) => {
  let strokeColor = '';
  if (percentage < 50) {
    strokeColor = '#fa4d4d'; // red under 50
  } else {
    strokeColor = '#fec456'; // orenge above 50
  }
  if (percentage === 100) {
    strokeColor = '#00D6A2'; // teal color on 100
  }

  return (
    <div>
      <Progress
        // flex-row-reverse so the percentage stands behinde the bar
        className={`flex flex-row-reverse items-center w-full ${className}`}
        percent={percentage}
        status={status}
        type={type}
        strokeColor={strokeColor}
        format={
          status === 'sub'
            ? () => (
              <div className="flex justify-center items-center text-antteal">
                <span className={`text-base ${subClassName}`}>SUB</span>
              </div>
            )
            : showPercent
            ? () => (
              <div className="flex justify-center items-center text-antteal">
                <span className={`text-base ${subClassName}`}>{percentage}%</span>
              </div>
            )
            : () => <span />
        }
      />
    </div>
  );
};

_Progress.propTypes = {
  percentage: PropTypes.number,
  className: PropTypes.string,
  subClassName: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
  showPercent: PropTypes.bool,
};

_Progress.defaultProps = {
  percentage: 0,
  className: '',
  subClassName: '',
  status: 'normal', // sub also available
  type: 'circle', // line also available
  showPercent: true,
};

export default _Progress;
