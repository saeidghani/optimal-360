// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

// const colors = {
//   'primary-color': '#1DA57A'
// }

module.exports = {
  'primary-color': '#1BB7D9',
  'component-background': '#fff',
  // 'primary-color': '#1BB7D9',
  // 'link-color': '#1DA57A',
  // 'border-radius-base': '2px',
  'font-size-base': '14',

  'link-color': '#1BB7D9',
  'text-color': '#303854',
  'heading-color': '#131627',
  'heading-color-secondary': 'fade(@heading-color, 50%)',

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
};
