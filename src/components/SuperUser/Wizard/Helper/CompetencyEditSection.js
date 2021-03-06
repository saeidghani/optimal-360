import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import Button from '../../../Common/Button';
import Input from '../../../Common/Input';
import TextArea from '../../../Common/TextArea';

const CompetencyEditSection = ({ data, onSave, onCancel, clusterName }) => {
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    definition: yup.string().required('Definition is required'),
    lowScores: yup
      .array(yup.string().required('low score title is required'))
      .min(1, 'You must specify at least one low score title'),
    highScores: yup
      .array(yup.string().required('high score title is required'))
      .min(1, 'You must specify at least one high score title'),
  });

  const formRef = React.useRef();
  const competencyName = data?.name;

  return (
    <Formik
      innerRef={formRef}
      enableReinitialize
      initialValues={data}
      validationSchema={schema}
      onSubmit={(values) => {
        onSave(values);
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => (
        <>
          <div
            className="flex flex-row justify-between bg-antgray-600 p-4
        items-center border-b border-list-border"
          >
            <p className="text-body">
              All {' > '} {clusterName} {' > '} {competencyName} {' > '} Edit
            </p>

            <div className="flex flex-row items-center">
              <Button onClick={onCancel} text="Cancel" type="link" size="small" textSize="base" />
              <Button onClick={handleSubmit} text="Save" ghost size="small" textSize="base" />
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <Input
              name="name"
              labelText="Competency Label"
              placeholder="Competency Label"
              value={values.name}
              onChange={handleChange}
              errorMessage={touched.name && errors.name}
            />

            <TextArea
              className="bg-antgray-200 bg-opacity-25 hover:bg-antgray-200 hover:bg-opacity-25 text-body"
              name="definition"
              value={values.definition}
              onChange={(e) => setFieldValue('definition', e.target.value)}
              label="Definition"
              placeholder="Definition"
              errorMessage={touched.definition && errors.definition}
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

            <div className="flex">
              <p className="mt-2 text-red-500">
                {errors.lowScores && typeof errors.lowScores === 'string' ? errors.lowScores : ''}
              </p>

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
            </div>

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

            <div className="flex">
              <p className="mt-2 text-red-500">
                {errors.highScores && typeof errors.highScores === 'string'
                  ? errors.highScores
                  : ''}
              </p>

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
          </div>
        </>
      )}
    </Formik>
  );
};

CompetencyEditSection.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  clusterName: PropTypes.string,
};

CompetencyEditSection.defaultProps = {
  data: {
    name: '',
  },
  clusterName: '',
};

export default CompetencyEditSection;
