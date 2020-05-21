const path = require('path')

module.exports = api => {
  const isDev = api.env() === 'development'
  const RedTestAppPath = path.join(__dirname, 'RedTestApp/node_modules/axe-prop-types')

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ],
    ...(isDev ? { plugins: [
      ['module-resolver',
        {
          alias: {
            'prop-types': RedTestAppPath,
          },
        },
      ],
    ]} : {})
  }
}
