import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import Button from './Button';

const _Pagination = ({
  pageNumber,
  totalNumberPages,
  defaultPageSize,
  hideOnSinglePage,
  onChange,
}) => {
  function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <Button icon="LeftOutlined" type="pagination" className="px-6p" />;
    }
    if (type === 'next') {
      return <Button icon="RightOutlined" type="pagination" className="px-6p" />;
    }
    return originalElement;
  }

  return (
    <Pagination
      defaultCurrent={pageNumber}
      total={totalNumberPages}
      defaultPageSize={defaultPageSize}
      hideOnSinglePage={hideOnSinglePage}
      onChange={onChange}
      itemRender={itemRender}
    />
  );
};

_Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  totalNumberPages: PropTypes.number.isRequired,
  defaultPageSize: PropTypes.number,
  hideOnSinglePage: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

_Pagination.defaultProps = {
  defaultPageSize: 10,
  hideOnSinglePage: true,
};

export default _Pagination;
