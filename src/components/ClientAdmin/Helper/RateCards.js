import React from 'react';

import Progress from '../../Common/Progress';

const RateCards = () => {
  const rateOptions = [
    { key: '1', title: 'View Ratee Summary', raters: '20', submission: '6/20', progress: 30 },
    { key: '2', title: 'View Ratee Details', raters: '20', submission: '6/20', progress: 60 },
    { key: '3', title: 'View Rater Details', raters: '20', submission: '6/20', progress: 30 },
    { key: '4', title: 'View Rater Details', raters: '20', submission: '6/20', progress: 100 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {rateOptions.map((rate) => (
        <div className="bg-white rounded-md flex flex-col py-8 px-4 lg:px-6 xl:px-10">
          <div className="mb-3">
            <span className="text-xs">Total Raters: </span>
            <span className="text-base text-heading">{rate.raters}</span>
          </div>
          <div className="mb-14">
            <span className="text-xs">Total No. Submission: </span>
            <span className="text-base text-heading">{rate.submission}</span>
          </div>
          <div className="mb-6 flex justify-center">
            <Progress percentage={rate.progress} />
          </div>
          <div>
            <h2 className="text-center">{rate.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

RateCards.propTypes = {};

RateCards.defaultProps = {};

export default RateCards;
