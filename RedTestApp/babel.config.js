const path = require('path')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver',
      {
        alias: {
          'red-mobile-sdk/components': path.join(__dirname, '../packages/components'),
        },
      },
    ],
  ],
};
