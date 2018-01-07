// Webpack config for development
require('dotenv').config();

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicPackage = require('./webpack.isomorphic.tools');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

const rootPath = path.resolve(__dirname, '..');
const srcPath = path.resolve(rootPath, 'src');

module.exports = {
  context: rootPath,
  entry: {
    main: [
      path.resolve(srcPath, 'client/index.js'),
    ],
  },
  output: {
    path: path.resolve(rootPath, 'public/dist'),
    publicPath: path.resolve(rootPath, 'public/dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
    loaders: [
      { test: /\.json$/, loader: 'json' },
    ],
  },
  plugins: [
    new ExtractTextPlugin('main.[contenthash:20].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
      warnings: false,
    }),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicPackage).development(false),
  ],
  devtool: 'source-map',
};
