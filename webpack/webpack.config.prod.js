// Webpack config for development
require('dotenv').config();

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
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: './dist/',
    path: path.resolve(__dirname, '../public/dist'), // assets path
  },
  devtool: 'source-map',
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
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
    }),
  ],
};
