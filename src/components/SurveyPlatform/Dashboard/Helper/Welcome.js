import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../../Common/Loading';

import comma from '../../../../assets/images/comma.svg';
import { fetchFullURL } from '../../../../lib/utils';

const Welcome = ({ loading, clientWelcomeMessage, clientPicture, surveyMessage }) => {
  return (
    <div>
      <Loading visible={loading} />
      <div className="">
        <div
          className="text-xl font-medium"
          dangerouslySetInnerHTML={{ __html: clientWelcomeMessage }}
        />
        <p className="text-gray-500 mt-5 text-base text-body opacity-75 font-normal leading-6">
          You have been nominated in the multi-rater feedback project: 360-feedback survey. You have
          until 26th February 2020 to complete the survey. Please complete the survey within the
          stipulated time period. All your feedback is private and confidential. All your responses
          will remain anonymous and a group report will be shared with the Management team and the
          ratee. This data also will be used for normative and research purposes only in a
          de-identified manner. Thank you for investing your invaluable time to provide your
          feedback and contributing towards the growth of the team and organization!
        </p>
      </div>
      <div className="bg-white mt-5 grid grid-cols-12 gap-x-2">
        <img
          src={fetchFullURL(clientPicture)}
          className="col-start-1 col-span-6 md:col-start-11 md:row-start-1 md:ml-auto rounded-full mr-auto"
          alt=""
        />
        <div className="inline-flex col-start-11 col-span-2 md:row-start-1 md:col-start-1 mb-auto pt-8">
          <img src={comma} className="mr-2" alt="" />
          <img src={comma} alt="" />
        </div>
        <div
          className="col-start-1 col-span-12 md:col-start-1 md:row-start-1 md:col-span-10 mt-10 pt-8"
          dangerouslySetInnerHTML={{ __html: clientWelcomeMessage }}
        />
        <div className="col-start-1 col-span-12 flex flex-col mt-5 md:flex-row">
          <span className="text-body mr-8 mb-4">Roselaini Faiz</span>
          <span className="text-antgray-100">CHRO Sime Darby Group</span>
        </div>
      </div>
    </div>
  );
};

Welcome.propTypes = {
  loading: PropTypes.bool.isRequired,
  clientWelcomeMessage: PropTypes.string,
  clientPicture: PropTypes.string,
  surveyMessage: PropTypes.string,
};

Welcome.defaultProps = {
  clientWelcomeMessage: '',
  clientPicture: '',
  surveyMessage: '',
};

export default Welcome;
