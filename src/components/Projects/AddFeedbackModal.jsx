import React from 'react';
import { Modal } from 'antd';
import Input from '../Common/Input';
import Checkbox from '../Common/Checkbox';
import Button from '../Common/Button';

const AddFeedbackModal = ({ visible, action }) => {
  return (
    <Modal visible={visible} centered footer={false} closable={false} width={'50%'}>
      <div className="px-16 py-15">
        <h4 className="text-secondary text-20px">Add Question</h4>
        <div className="mt-6 grid grid-cols-2 gap-x-5.5 w-full gap-y-8  ">
          <Input labelText="Question Label" placeholder="Question Label" />
          <div className="col-span-1"></div>
          <Input
            labelText="Question Statement"
            placeholder="Question Statement"
            wrapperClassName="col-span-2"
          />
          <Checkbox className="col-span-2" labelClass="text-body">
            This question is required to answer
          </Checkbox>
        </div>
        <div className="mt-10 flex justify-end">
          <Button
            type="link"
            text="Cancel"
            className="text-base w-24.5 h-9.5 flex items-center justify-center"
            onClick={() => action(false)}
          />
          <Button text="Add" className="text-base w-24.5 h-9.5 flex items-center justify-center" />
        </div>
      </div>
    </Modal>
  );
};

export default AddFeedbackModal;
