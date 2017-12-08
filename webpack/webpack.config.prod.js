// Webpack config for development
require('dotenv').config();

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicPackage = require('./webpack.isomorphic.tools');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      './client/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../public/dist'), // assets path
    publicPath: './dist/',
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
        test: /\.(sass|scss|css)$/, // Check for sass or scss file names
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
