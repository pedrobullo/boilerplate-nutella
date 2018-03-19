// Webpack config for development
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const rootPath = path.resolve(__dirname, '..');
const srcPath = path.resolve(rootPath, 'src');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicPackage = require('./webpack.isomorphic.tools');

const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;

module.exports = {
  devtool: 'inline-source-map',
  context: rootPath,
  entry: {
    main: [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr', // eslint-disable-line
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      path.resolve(srcPath, 'client/index.js'),
      // the entry point of our app
    ],
  },
  resolve: {
    modules: [
      path.resolve(rootPath, 'node_modules'),
      path.resolve(srcPath, 'common'),
    ],
    alias: {
      client: path.resolve(srcPath, 'client'),
      server: path.resolve(srcPath, 'server'),
    },
    extensions: ['.js', '.jsx', '.json', '.scss'],
  },
  output: {
    path: path.resolve(rootPath, 'dist'),
    publicPath: 'http://' + host + ':' + port + '/dist/', // eslint-disable-line
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
        ],
        include: [
          path.resolve(srcPath, 'common'),
          path.resolve(srcPath, 'server'),
          path.resolve(srcPath, 'client'),
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
  plugins: [
    /* eslint-disable max-len */
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        HOST_NAME: JSON.stringify(process.env.HOST_NAME),
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true, // <-------- DISABLE redux-devtools HERE
    }),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicPackage).development(),
  ],
};
