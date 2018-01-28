// Webpack config for development
require('dotenv').config();

const CleanPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicPackage = require('./webpack.isomorphic.tools');

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
        test: /\.(sass|scss|css)$/,
        use: [
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
    new CleanPlugin([
      path.resolve(rootPath, 'public/dist'),
      path.resolve(rootPath, './dist/'),
    ], { root: rootPath }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.ENVIRONMENT),
        REDIRECTS_BASE_URL: JSON.stringify(process.env.REDIRECTS_BASE_URL),
        ZED_AUTH_SECRET: JSON.stringify(process.env.ZED_AUTH_SECRET),
        FACEBOOK_API_KEY: JSON.stringify(process.env.FACEBOOK_API_KEY),
        HOST_NAME: JSON.stringify(process.env.HOST_NAME),
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true,
      },
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 500,
    }),

    new WebpackIsomorphicToolsPlugin(webpackIsomorphicPackage),
  ],
  devtool: 'source-map',
};
