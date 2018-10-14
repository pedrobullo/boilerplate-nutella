// Based on: https://gist.github.com/jaredpalmer/0a91a7bd354b875b913c74f4b16125f7

const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

module.exports = {
  modify: (baseConfig, { target, dev }, webpack) => {
    const appConfig = Object.assign({}, baseConfig);
    const isServer = target !== 'web';

    const cssLoader = {
      loader: 'css-loader',
      options: {
        minimize: !dev,
        sourceMap: dev,
        importLoaders: 1,
        sourceMap: true,
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      },
    };

    const sassLoader = {
      loader: 'sass-loader',
      options: {
        sourceMap: dev,
      },
    };

    const postCssLoader = {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
        sourceMap: dev,
        plugins: () => [
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9' // React doesn't support IE8 anyway
            ]
          })
        ]
      }
    };

    console.log(appConfig.module.rules)
    appConfig.module.rules.push({
      test: /\.(sa|sc)ss$/,
      use:
        // Handle scss imports on the server
        isServer ? [cssLoader, postCssLoader, sassLoader] :
        // For development, include source map
        dev ? [
          'style-loader',
          cssLoader,
          postCssLoader,
          sassLoader
        ]
        // For production, extract CSS
        : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            cssLoader,
            postCssLoader,
            sassLoader
          ],
        })
    });

    if (!isServer && !dev) {
      appConfig.plugins.push(
        new ExtractTextPlugin('static/css/[name].[contenthash:8].css')
      )
    }

    if (isServer) {
      appConfig.plugins = [
        ...appConfig.plugins,
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        })
      ];
    }

    return appConfig
  }
}