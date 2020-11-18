import React from 'react';
import PropTypes from 'prop-types';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { LineOutlined } from '@ant-design/icons';

import Button from '../../../Common/Button';
import Input from '../../../Common/Input';
import Checkbox from '../../../Common/Checkbox';

const SortableItem = SortableElement(
  ({ value, touched, errors, handleFormChange, deleteFeedback, i }) => (
    <div className="grid grid-cols-12 gap-x-6 flex flex-row items-start my-6">
      <Button
        className="col-span-1 h-10"
        type="link"
        icon={
          <div className="flex flex-col justify-center items-center">
            <LineOutlined className="text-antgray-100 text-lg" />
            <LineOutlined className="text-antgray-100 text-lg -mt-2" />
          </div>
        }
      />

      <Input
        placeholder="General"
        value={value.label}
        name={`feedbacks[${i}].label`}
        wrapperClassName="col-span-3"
        onChange={(e) => handleFormChange(e.target.value, value, 'feedbacks', 'label')}
        errorMessage={touched?.feedbacks?.[i]?.label && errors?.feedbacks?.[i]?.label}
      />

      <Input
        name={`feedbacks[${i}].statement`}
        placeholder="Statement"
        value={value.statement}
        wrapperClassName="col-span-8"
        onChange={(e) => handleFormChange(e.target.value, value, 'feedbacks', 'statement')}
        errorMessage={touched?.feedbacks?.[i]?.statement && errors?.feedbacks?.[i]?.statement}
        suffix={
          <Button
            type="link"
            onClick={() => deleteFeedback(value)}
            icon="DeleteOutlined"
            className="text-lg text-antgray-200 h-6 py-3"
          />
        }
      />

      <div className="col-span-12 ml-auto mt-2">
        <Checkbox
          checked={value.required}
          onChange={(val) => handleFormChange(val, value, 'feedbacks', 'required')}
          labelClass="text-secondary"
          textNode="This question is required to answer"
        />
      </div>
    </div>
  ),
);

const SortableList = SortableContainer(({ items, ...containerProps }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <SortableItem
          key={`item-${item.id}`}
          i={index}
          index={index}
          value={item}
          {...containerProps}
        />
      ))}
    </ul>
  );
});

const SortableFeedbacks = ({
  items,
  touched,
  errors,
  handleFormChange,
  deleteFeedback,
  onSortEnd,
}) => (
  <SortableList
    items={items}
    onSortEnd={onSortEnd}
    touched={touched}
    errors={errors}
    handleFormChange={handleFormChange}
    deleteFeedback={deleteFeedback}
  />
);

SortableFeedbacks.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  touched: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  handleFormChange: PropTypes.func.isRequired,
  deleteFeedback: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
};

SortableFeedbacks.defaultProps = {
  items: [],
  touched: {},
  errors: {},
};

export default SortableFeedbacks;
