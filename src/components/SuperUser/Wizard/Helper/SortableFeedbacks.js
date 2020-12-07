import React from 'react';
import PropTypes from 'prop-types';

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import { LineOutlined } from '@ant-design/icons';

import Button from '../../../Common/Button';
import Input from '../../../Common/Input';
import Checkbox from '../../../Common/Checkbox';

const DragHandle = sortableHandle(() => (
  <Button
    onClick={() => {}}
    className="col-span-1 h-10"
    type="link"
    icon={
      <div className="flex flex-col justify-center items-center">
        <LineOutlined className="text-antgray-100 text-lg" />
        <LineOutlined className="text-antgray-100 text-lg -mt-2" />
      </div>
    }
  />
));

const SortableItem = sortableElement(
  ({ value, touched, errors, handleFormChange, deleteFeedback, i }) => (
    <li className="grid grid-cols-12 gap-x-6 flex flex-row items-start my-6">
      <DragHandle />

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
    </li>
  ),
);

const SortableContainer = sortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

const SortableFeedbacks = ({
  items,
  touched,
  errors,
  handleFormChange,
  deleteFeedback,
  onSortEnd,
}) => (
  <SortableContainer onSortEnd={onSortEnd} useDragHandle>
    {items?.length > 0
      ? items
          .sort((a, b) => a.showOrder - b.showOrder)
          .map((value, index) => (
            <SortableItem
              touched={touched}
              errors={errors}
              handleFormChange={handleFormChange}
              deleteFeedback={deleteFeedback}
              key={`item-${value.id}`}
              index={index}
              i={index}
              value={value}
            />
          ))
      : null}
  </SortableContainer>
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
