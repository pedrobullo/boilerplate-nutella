// Webpack config for development
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicPackage = require('./webpack.isomorphic.tools');

const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr', // eslint-disable-line
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'react-hot-loader/patch',
      // activate HMR for React

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      './src/client/index.js',
      // the entry point of our app
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.sass'],
    modules: ['common', 'node_modules'],
  },
  output: {
    path: path.resolve(__dirname, '../public/dist'), // assets path
    publicPath: 'http://' + host + ':' + port + '/', // eslint-disable-line
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
        ],
        exclude: [/node_modules/, /public/],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
  plugins: [
    /* eslint-disable max-len */
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    new webpack.NoEmitOnErrorsPlugin(), // do not emit compiled assets that include errors
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
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicPackage).development(true),
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: 3000,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },
};
