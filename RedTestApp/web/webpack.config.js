const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rootDir = path.resolve(__dirname, '../')
const webpackEnv = process.env.NODE_ENV || 'development'

module.exports = {
  mode: webpackEnv,
  entry: {
    app: path.join(rootDir, './index.web.js'),
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'app-[hash].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(rootDir, 'index.js'),
          path.resolve(rootDir, 'src'),
          path.resolve(rootDir, 'node_modules/react-native-uncompiled'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['react-native'],
            plugins: [['react-native-web']],
          },
        },
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.web.jsx', '.web.js', '.jsx', '.js'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-native$': path.resolve(rootDir, 'node_modules/react-native-web'),
      'prop-types$': path.resolve(rootDir, 'node_modules/axe-prop-types'),
      '@redlightsoftware/components': path.resolve(rootDir, '../packages/components'),
    },
  },
  devServer: {
    index: 'index.html',
    contentBase: path.join(rootDir, 'dist'),
    host: '0.0.0.0',
    port: 3000,
    hot: true,
  },
}
