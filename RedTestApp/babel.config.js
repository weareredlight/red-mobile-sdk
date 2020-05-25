const path = require('path')

module.exports = api => {
  api.cache(true)
  // TODO fix this
  const isMetro = typeof api.caller === 'function'

  return {
    ...(isMetro ? { presets: [
      ['module:metro-react-native-babel-preset'],
    ]} : {}),
  }
}
