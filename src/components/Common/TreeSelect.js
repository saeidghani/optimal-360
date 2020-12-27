import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { TreeNode } = TreeSelect;

const _TreeSelect = ({
  className,
  showSearch,
  value,
  onChange,
  dropdownStyle,
  placeholder,
  allowClear,
  treeDefaultExpandAll,
  size,
  switcherIcon,
}) => {
  return (
    <div className="w-full">
      <TreeSelect
        switcherIcon={switcherIcon}
        showSearch={showSearch}
        className={`w-full c-tree-select ${className}`}
        value={value}
        dropdownStyle={{ dropdownStyle }}
        placeholder={placeholder}
        allowClear={allowClear}
        treeDefaultExpandAll={treeDefaultExpandAll}
        onChange={onChange}
        size={size}
        suffixIcon={<DownOutlined style={{ color: '#808080', fontSize: '20px' }} />}
      >
        <TreeNode value="parent 1" title="parent 1">
          <TreeNode value="parent 1-0" title="parent 1-0">
            <TreeNode value="leaf1" title="my leaf" />
            <TreeNode value="leaf2" title="your leaf" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    </div>
  );
};

_TreeSelect.propTypes = {
  className: PropTypes.string,
  showSearch: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  dropdownStyle: PropTypes.string,
  placeholder: PropTypes.string,
  allowClear: PropTypes.string,
  treeDefaultExpandAll: PropTypes.string,
  size: PropTypes.string,
  switcherIcon: PropTypes.node,
};

_TreeSelect.defaultProps = {
  className: '',
  showSearch: '',
  value: '',
  onChange: () => {},
  dropdownStyle: '',
  placeholder: '',
  allowClear: '',
  treeDefaultExpandAll: '',
  size: 'large',
  switcherIcon: null,
};

export default _TreeSelect;
