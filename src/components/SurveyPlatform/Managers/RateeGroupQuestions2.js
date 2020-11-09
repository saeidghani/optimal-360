import React from 'react';
import PropTypes from 'prop-types';
import { FileTextOutlined, CheckOutlined } from '@ant-design/icons';

import { useHistory } from 'react-router-dom';
import Layout from '../Helper/Layout';

import Button from '../../Common/Button';
import Progress from '../../Common/Progress';
import TextArea from '../../Common/TextArea';
import Modal from '../../Common/Modal';

const RateeGroupQuestions2 = ({ loading }) => {
  const [submitModalVisible, setSubmitModalVisible] = React.useState(false);
  const [thankYouModalVisible, setThankYouModalVisible] = React.useState(false);
  const [items, setItems] = React.useState({});

  const history = useHistory();

  const persons = [
    { id: 1, title: 'Katherine Kan', name: 'person1' },
    { id: 2, title: 'Katherine Kan', name: 'person2' },
  ];

  const handleNext = () => {
    setSubmitModalVisible(true);
  };

  const handleBack = () => {
    history.push('/survey-platform/managers/ratee-group/questions');
  };

  const handleSubmitModalOk = () => {
    setSubmitModalVisible(false);
    setThankYouModalVisible(true);
  };

  const handleThankYouModalOk = () => {
    setThankYouModalVisible(false);
  };

  return (
    <Layout hasBreadCrumb>
      <Modal
        visible={submitModalVisible}
        handleOk={handleSubmitModalOk}
        handleCancel={() => {}}
        width={588}
        okText="Yes"
        cancelText=""
        okButtonProps={{ textClassName: 'px-4' }}
      >
        <div className="flex flex-col items-center">
          <FileTextOutlined className="text-4xl text-primary-500 mb-4" />
          <p>Are you sure to submit this survey?</p>
        </div>
      </Modal>
      <Modal
        visible={thankYouModalVisible}
        handleOk={handleThankYouModalOk}
        handleCancel={() => {}}
        width={588}
        okText="Ok"
        cancelText=""
        okButtonProps={{ className: 'bg-antteal hover:bg-antteal', textClassName: 'px-4' }}
      >
        <div className="flex flex-col items-center">
          <CheckOutlined className="w-10 h-10 bg-antteal rounded-full text-white text-2xl pt-2 mb-4" />
          <p>Thank you for completing the survey. Your response has been submitted.</p>
        </div>
      </Modal>
      <div className="px-4 py-6 mt-16 flex flex-col justify-between md:bg-white md:rounded-lg md:shadow">
        <div>
          <p>
            1. This person effectively motivates his/her team members in meeting their work
            objectives.
          </p>
          <div className="flex justify-between md:border-b md:border-solid md:border-gray-200 mb-8 md:pb-4">
            <div className="inline-flex flex-col md:flex-row mt-5">
              <div className="w-40 -ml-12">
                <Progress showPercent={false} type="line" percentage={60} />
              </div>
              <div className="text-antgray-100 text-sm md:ml-4">Question 1 of 5</div>
            </div>
            <div className="flex items-center justify-end md:my-auto">
              <span className="mr-3">60%</span>
              <div className="w-12 h-12">
                <Progress showPercent={false} percentage={60} />
              </div>
            </div>
          </div>
        </div>
        {persons.map((person) => (
          <div className="grid grid-cols-12 w-full" key={person.id}>
            <span className="col-start-1 col-span-12 md:col-span-2 md:ml-3 lg:ml-5">
              {person.title}
            </span>
            <div className="w-full col-start-1 col-span-12 md:col-start-3 md:col-span-10">
              <TextArea
                wrapperClassName="-mt-2"
                className="border border-solid border-gray-500 rounded-md bg-white  md:bg-transparent"
                placeholder="(The verbatim can be left empty by clicking skip)"
                rows={2}
                value={items[person.name]}
                onChange={(e) => setItems({ ...items, [person.name]: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-4 mb-16 md:mb-10 md:flex-row-reverse md:ml-auto">
        <Button
          onClick={handleNext}
          text="Next"
          className="mt-6 outline-none border-primary-500 shadow-none w-full md:w-auto md:border-none"
          textSize="base"
        />
        <Button
          onClick={handleBack}
          text="Back"
          className="mt-6 bg-transparent text-primary-500 outline-none border-primary-500 shadow-none w-full
          md:mr-6 md:w-auto md:border-none"
          textSize="base"
        />
      </div>
    </Layout>
  );
};

RateeGroupQuestions2.propTypes = {
  loading: PropTypes.bool.isRequired,
};

RateeGroupQuestions2.defaultProps = {};

export default RateeGroupQuestions2;
