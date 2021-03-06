// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

// const colors = {
//   'primary-color': '#1DA57A'
// }

module.exports = {
  'primary-color': '#1BB7D9',
  'component-background': '#fff',
  'border-radius-base': '2px',
  'font-size-base': '14px',
  'link-color': '#1BB7D9',
  'text-color': '#303854',
  'heading-color': '#131621',
  'heading-color-secondary': 'fade(@heading-color, 50%)',
  'border-color-base': '#c4c4c4',
  'border-color-split': '#c4c4c4',

  // Disabled States
  'disabled-color': '#B8B8B8',
  'disabled-bg': '#F5F5F5',
  'disabled-border': '#D9D9D9',

  // BREAD CUMBER
  'breadcrumb-base-color': '@heading-color-secondary',
  'breadcrumb-last-item-color': '@heading-color',
  'breadcrumb-link-color': '@heading-color-secondary',
  'breadcrumb-link-color-hover': '@heading-color',
  'breadcrumb-separator-color': '@heading-color-secondary',

  // Button Default
  'btn-default-color': '@disabled-color',
  'btn-default-bg': '@disabled-bg',
  'btn-default-border': '@disabled-border',

  // Select
  'select-border-color': '@border-color-base',
  'select-item-selected-color': '@text-color',
  'select-item-selected-font-weight': '400',
  'select-dropdown-bg': '@component-background',
  'select-item-selected-bg': '@primary-1',
  'select-item-active-bg': '@item-hover-bg',
  'select-dropdown-vertical-padding': '@dropdown-vertical-padding',
  'select-dropdown-font-size': '12px',
  'select-dropdown-line-height': '@dropdown-line-height',
  'select-dropdown-height': '32px',
  'select-background': '@component-background',
  'select-clear-background': '@select-background',
  // 'select-selection-item-bg': '@background-color-base',
  // 'select-selection-item-border-color': '@border-color-split',
  'select-single-item-height-lg': '40px',
  'select-multiple-item-height': '@input-height-base - @input-padding-vertical-base * 2', // Normal 24p
  'select-multiple-item-height-lg': '32px',
  'select-multiple-item-spacing-half': 'ceil(@input-padding-vertical-base / 2)',
  'select-multiple-disabled-background': '@input-disabled-bg',
  'select-multiple-item-disabled-color': '#bfbfbf',
  'select-multiple-item-disabled-border-color': '@select-border-color',

  // Steps
  'process-tail-color': '#f0f0f0',

  // Tabs
  'tabs-card-tab-active-border-top': '2px solid transparent',

  // Progress
  'processing-color': '#00d6a2',
  'progress-default-color': '@processing-color',
  'progress-remaining-color': '@background-color-base',
  'progress-text-color': '#262626',

  // Menu
  'menu-item-active-bg': '#fff',

  // modal
  'modal-mask-bg': 'fade(#131621, 80%)',
  'modal-footer-border-width': '0px',

  // input field
  'input-placeholder-color': '#8d98ba',
  'input-color': '#303854',

  // select
  'select-selection-item-bg': 'rgba(141, 159, 186, 0.1)',
  'select-selection-item-border-color': '#8d98ba',
  // table
  'table-padding-vertical': '16px',
  'table-padding-horizontal': '16px',
  'table-padding-vertical-md': '@table-padding-vertical * 3 / 4',
  'table-padding-horizontal-md': '@table-padding-horizontal / 2',
  'table-padding-vertical-sm': '@table-padding-vertical / 2',
  'table-padding-horizontal-sm': '@table-padding-horizontal / 2',
};
