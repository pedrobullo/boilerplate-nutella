const path = require('path');
const ExternalsPlugin = require('webpack-externals-plugin');
const webpack = require('webpack');

const rootPath = path.resolve(__dirname, '..');
const srcPath = path.resolve(rootPath, 'src');

module.exports = {
  entry: path.resolve(srcPath, 'server/server.js'),
  output: {
    path: path.resolve(rootPath, 'public/dist'),
    filename: 'server.bundle.js',
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
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
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        FACEBOOK_API_KEY: JSON.stringify(process.env.FACEBOOK_API_KEY), // TODO
        HOST_NAME: JSON.stringify(process.env.HOST_NAME),
      },
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),

    new ExternalsPlugin({
      type: 'commonjs',
      include: path.resolve(srcPath, 'node_modules'),
    }),
  ],
};
