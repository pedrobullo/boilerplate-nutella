// Webpack config for development
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const webpackIsomorphicPackage = require('./webpack.isomorphic-tools');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicPackage);
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      // activate HMR for React

      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr', // eslint-disable-line
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      './src/client/index.js',
      // the entry point of our app
    ],
  },
  output: {
    path: path.resolve(__dirname, '../public/dist'), // assets path
    publicPath: 'http://' + host + ':' + port + '/', // eslint-disable-line
    // /static/
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'babel-loader' }, // TODO: babelLoaderQuery
          { loader: 'eslint-loader' },
        ],
        exclude: [/node_modules/, /public/],
      },
      {
        // the module's CSS/SCSS files MUST be inlined using the raw-loader
        test: /\.(sass|scss|css)$/,
        loader: ['style-loader', 'sass-loader', 'css-loader'],
      },
      // {
      //   test: /\.scss$/,
      //   exclude: [/node_modules/],
      //   use: ExtractTextPlugin.extract({
      //     use: ['css-loader', 'sass-loader'],
      //     fallback: 'style-loader',
      //   }),
      // },
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.sass'],
    modules: ['common', 'node_modules'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

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
    webpackIsomorphicToolsPlugin.development(),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },
};
