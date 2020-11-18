import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import Input from '../../../Common/Input';
import Button from '../../../Common/Button';
import TextArea from '../../../Common/TextArea';
import Modal from '../../../Common/Modal';

const AddQuestion = ({ visible, onSave, onCancel }) => {
  const formRef = React.useRef();
  const schema = yup.object({
    name: yup.string().required('Competency label is required'),
    definition: yup.string().required('Competency definition is required'),
    lowScores: yup
      .array(yup.string().required('low score title is required'))
      .min(1, 'You must specify at least one low score title'),
    highScores: yup
      .array(yup.string().required('high score title is required'))
      .min(1, 'You must specify at least one high score title'),
  });

  return (
    <Modal
      destroyOnClose
      wrapClassName="py-5"
      cancelText="Cancel"
      handleCancel={onCancel}
      okText="Add"
      handleOk={() => {
        if (formRef.current) formRef.current.submitForm();
      }}
      visible={visible}
    >
      <Formik
        innerRef={formRef}
        initialValues={{
          name: '',
          definition: '',
          lowScores: [''],
          highScores: [''],
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          onSave(values);
        }}
      >
        {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Input
                name="name"
                labelText="Competency Label"
                placeholder="Competency Label"
                value={values.name}
                onChange={handleChange}
                errorMessage={touched.name && errors.name}
              />

              <TextArea
                name="definition"
                value={values.definition}
                onChange={(e) => setFieldValue('definition', e.target.value)}
                label="Definition"
                placeholder="Definition"
                errorMessage={touched.definition && errors.definition}
                className="bg-gray-200 hover:bg-gray-200"
              />

              <h3 className="text-base text-body mb-2">Low Scores Tend to</h3>

              {(values.lowScores || []).map((item, i, originialArr) => (
                <Input
                  name={`lowScores[${i}]`}
                  key={i}
                  placeholder="low score title"
                  value={item}
                  onChange={handleChange}
                  errorMessage={touched.lowScores?.[i] && errors.lowScores?.[i]}
                  suffix={
                    <Button
                      type="link"
                      onClick={() => {
                        const newArr = [...originialArr];
                        newArr.splice(i, 1);

                        setFieldValue('lowScores', newArr);
                      }}
                      icon="DeleteOutlined"
                      className="text-lg text-antgray-200"
                    />
                  }
                />
              ))}

              {errors.lowScores && typeof errors.lowScores === 'string' ? (
                <p className="mt-3 text-red-500"> {errors.lowScores} </p>
              ) : null}

              <Button
                size="middle"
                type="gray"
                textSize="xs"
                textClassName="mr-2"
                text="Add"
                className="w-18 ml-auto text-base"
                onClick={() => setFieldValue('lowScores', [...values.lowScores, ''])}
                icon="PlusCircleOutlined"
                iconPosition="right"
              />

              <h3 className="text-base text-body mb-2">High Scores Tend to</h3>

              {(values.highScores || []).map((item, i, originialArr) => (
                <Input
                  name={`highScores[${i}]`}
                  key={i}
                  placeholder="high score title"
                  value={item}
                  onChange={handleChange}
                  errorMessage={touched.highScores?.[i] && errors.highScores?.[i]}
                  suffix={
                    <Button
                      type="link"
                      onClick={() => {
                        const newArr = [...originialArr];
                        newArr.splice(i, 1);

                        setFieldValue('highScores', newArr);
                      }}
                      icon="DeleteOutlined"
                      className="text-lg text-antgray-200"
                    />
                  }
                />
              ))}

              {errors.highScores && typeof errors.highScores === 'string' ? (
                <p className="mt-3 text-red-500"> {errors.highScores} </p>
              ) : null}

              <Button
                size="middle"
                type="gray"
                textSize="xs"
                textClassName="mr-2"
                text="Add"
                className="w-18 ml-auto text-base"
                onClick={() => setFieldValue('highScores', [...values.highScores, ''])}
                icon="PlusCircleOutlined"
                iconPosition="right"
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

AddQuestion.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

AddQuestion.defaultProps = {
  visible: false,
};

export default AddQuestion;
