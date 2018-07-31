var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')

var serverConfig = {
  entry: ['babel-polyfill','./src/server/index.js'],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  node: {
  fs: "empty"
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}

module.exports = [serverConfig]
