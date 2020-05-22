const path = require('path')

module.exports = api => {
  // TODO fix this
  const isMetro = typeof api.caller === 'function'

  return {
    ...(isMetro ? { presets: [
      ['module:metro-react-native-babel-preset'],
    ]} : {}),
    plugins: [
      ['module-resolver',
        {
          alias: {
            'red-mobile-sdk/components': path.join(__dirname, '../packages/components'),
          },
        },
      ],
    ],
  }
}
