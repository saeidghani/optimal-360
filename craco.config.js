const CracoLessPlugin = require('craco-less');
const vars = require('./antd.theme.js');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: vars,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
