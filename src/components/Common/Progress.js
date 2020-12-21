import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';

const _Progress = ({
  percentage,
  className,
  subClassName,
  percentageClassName,
  status,
  type,
  showPercent,
  width,
}) => {
  let strokeColor = '';
  if (percentage < 50) {
    strokeColor = '#fa4d4d'; // red under 50
  } else {
    strokeColor = '#fec456'; // orenge above 50
  }
  if (status === 'sub' || percentage === 100) {
    strokeColor = '#00D6A2'; // teal color on 100
  }

  return (
    <div>
      <Progress
        // flex-row-reverse so the percentage stands behinde the bar
        className={`flex flex-row-reverse items-center w-full ${className}`}
        percent={status === 'sub' ? 100 : percentage}
        status={status}
        type={type}
        strokeColor={strokeColor}
        width={width}
        format={
          status === 'sub'
            ? () => (
                <div className="flex justify-center items-center">
                  <span className={`text-base text-antteal ${subClassName}`}>SUB</span>
                </div>
              )
            : showPercent
            ? () => (
                <div className="flex justify-center items-center">
                  <span className={`text-base text-heading2 ${subClassName}`}>{percentage}%</span>
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
  percentageClassName: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
  showPercent: PropTypes.bool,
};

_Progress.defaultProps = {
  percentage: 0,
  className: '',
  subClassName: '',
  percentageClassName: '',
  status: 'normal', // sub also available
  type: 'circle', // line also available
  showPercent: true,
};

export default _Progress;
