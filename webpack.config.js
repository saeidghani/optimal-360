const theme = require('./antd.theme');

module.exports = {
  rules: [
    {
      test: /\.less$/,
      use: [
        {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            lessOptions: {
              modifyVars: theme,
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
  ],
};
