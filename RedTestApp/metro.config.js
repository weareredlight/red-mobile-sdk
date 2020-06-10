const path = require('path')

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  watchFolders: [path.resolve(__dirname, '../packages')],
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          if (target.hasOwnProperty(name)) {
            return target[name]
          }
          if (name.startsWith('prop-types')) {
            return path.join(process.cwd(), 'node_modules/axe-prop-types')
          }
          return path.join(process.cwd(), `node_modules/${name}`)
        },
      },
    ),
  },
}
