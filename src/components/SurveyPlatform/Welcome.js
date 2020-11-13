import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import comma from '../../assets/images/comma.svg';
import person from '../../assets/images/surveyPlatformWelcome.png';

import Layout from './Helper/Layout';
import GuideCarousel from './Helper/GuideCarousel';

import Dropdown from '../Common/Dropdown';
import Button from '../Common/Button';
import Modal from '../Common/Modal';

const Welcome = ({ loading }) => {
  const [project, setProject] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const history = useHistory();

  const dropdownOptions = [
    { title: 'Leadership Development1', value: 1 },
    { title: 'Leadership Development2', value: 2 },
    { title: 'Leadership Development3', value: 3 },
  ];

  const handleNextClick = () => {
    history.push('/survey-platform/information');
  };

  return (
    <Layout title="Welcome">
      <Modal
        visible={visible}
        handleCancel={() => setVisible(false)}
        handleOk={handleNextClick}
        okText="Next"
        width={580}
        closable
        className="relative c-modal-sm-padding"
        footerClassName="absolute top-0 right-0 pt-48"
        okButtonProps={{ className: 'px-6' }}
      >
        <GuideCarousel>
          <div>
            OK, let’s enter your information. By hitting this button you will get to introduction
            form.
          </div>
          <div>
            OK, let’s enter your information. By hitting this button you will get to introduction
            form.
          </div>
          <div>
            OK, let’s enter your information. By hitting this button you will get to introduction
            form.
          </div>
          <div>
            OK, let’s enter your information. By hitting this button you will get to introduction
            form.
          </div>
          <div>
            OK, let’s enter your information. By hitting this button you will get to introduction
            form.
          </div>
        </GuideCarousel>
      </Modal>
      <div className="text-left text-heading">Welcome</div>
      <div className="grid grid-cols-12 mb-10 mt-8">
        <div className="col-start-1 col-span-6 text-base text-body mb-3">Select Project</div>
        <Dropdown
          className="c-autocomplete col-start-1 col-span-12
          md:col-start-1 md:col-span-4 lg:col-start-1 lg:col-span-3 w-full"
          showSearch={false}
          type="gray"
          placeholder="Leadership Development"
          value={project}
          handleChange={(val) => setProject(val)}
          options={dropdownOptions}
        />
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-medium">Welcome to e360 Survey for Sime Darby Group!</h1>
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
      <div className="bg-white mt-5 p-6 md:p-10 grid grid-cols-12 gap-x-2">
        <img
          src={person}
          className="col-start-1 col-span-6 md:col-start-11 md:row-start-1 md:ml-auto rounded-full mr-auto"
          alt=""
        />
        <div className="inline-flex col-start-11 col-span-2 md:row-start-1 md:col-start-1 mb-auto">
          <img src={comma} className="mr-2" alt="" />
          <img src={comma} alt="" />
        </div>
        <p className="col-start-1 col-span-12 md:col-start-1 md:row-start-1 md:col-span-10 mt-8">
          Dear raters. I would like to thank each and every one of you for your time and
          participation in our human resource endeavors. Your contribution will enable us to work
          better towards bettering this organization for our future growth and sustainability.
        </p>
        <div className="col-start-1 col-span-12 flex flex-col mt-5 md:flex-row">
          <span className="text-body mr-8 mb-4">Roselaini Faiz</span>
          <span className="text-antgray-100">CHRO Sime Darby Group</span>
        </div>
      </div>
      <Button className="ml-auto mt-6 px-6" text="Next" onClick={() => setVisible(true)} />
    </Layout>
  );
};

Welcome.propTypes = {
  loading: PropTypes.bool.isRequired,
};

Welcome.defaultProps = {};

export default Welcome;
