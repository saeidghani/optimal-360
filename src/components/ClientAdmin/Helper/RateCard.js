import React from 'react';

import PropTypes from 'prop-types';
import Progress from '../../Common/Progress';

const RateCard = ({
  totalRaters,
  totalSubmissions,
  totalQuestions,
  totalAnswered,
  raterGroupName,
}) => {
  const avg = parseInt((totalAnswered / totalQuestions) * 100, 10) || 0;

  return (
    <div className="bg-white rounded-md flex flex-col py-8 px-4 lg:px-6 xl:px-10">
      <div className="mb-3">
        <span className="text-xs">Total Raters: </span>
        <span className="text-base text-heading">{totalRaters}</span>
      </div>
      <div className="mb-14">
        <span className="text-xs">Total No. Submission: </span>
        <span className="text-base text-heading">
          {totalSubmissions}/{totalRaters}
        </span>
      </div>
      <div className="mb-6 flex justify-center">
        <Progress subClassName="text-black text-xl" percentage={avg} />
      </div>
      <div>
        <h2 className="text-center">{raterGroupName}</h2>
      </div>
    </div>
  );
};

RateCard.propTypes = {
  totalRaters: PropTypes.string.isRequired,
  totalSubmissions: PropTypes.string.isRequired,
  totalQuestions: PropTypes.string.isRequired,
  totalAnswered: PropTypes.string.isRequired,
  raterGroupName: PropTypes.string.isRequired,
};

RateCard.defaultProps = {};

export default RateCard;
