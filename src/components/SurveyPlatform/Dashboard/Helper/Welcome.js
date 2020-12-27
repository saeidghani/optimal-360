import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../../../Common/Loading';

import comma from '../../../../assets/images/comma.svg';
import { fetchFullURL } from '../../../../lib/utils';

const Welcome = ({ loading, clientWelcomeMessage, clientPicture, surveyMessage }) => {
  return (
    <div>
      <Loading visible={loading} />
      <p>welcome message</p>
      <div className="">
        <div
          className="text-xl font-medium"
          dangerouslySetInnerHTML={{ __html: clientWelcomeMessage }}
        />
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
          dangerouslySetInnerHTML={{ __html: surveyMessage }}
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
