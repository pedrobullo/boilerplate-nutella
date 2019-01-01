// Based on: https://gist.github.com/jaredpalmer/0a91a7bd354b875b913c74f4b16125f7
const LoadablePlugin = require('@loadable/webpack-plugin');
const LoadableBabelPlugin = require('@loadable/babel-plugin');
const babelPresetRazzle = require('razzle/babel');
const autoprefixer = require('autoprefixer');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const path = require('path');

module.exports = {
  modify: (baseConfig, { target, dev }, webpack) => {
    const appConfig = Object.assign({}, baseConfig);
    const isServer = target !== 'web';

    const cssLoader = {
      loader: isServer ? require.resolve('css-loader/locals') : 'css-loader',
      options: {
        minimize: !dev,
        sourceMap: dev,
        importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loade
        localIdentName: '[name]-[local]-[hash:base64:5]',
        modules: true,
      },
    };

    const sassLoader = {
      loader: 'sass-loader',
      options: {
        sourceMap: dev,
      },
    };

    const postCSSLoader = {
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

    appConfig.module.rules.push({
      test: /\.(sa|sc)ss$/,
      use:
        isServer ? [
          cssLoader,
          postCSSLoader,
          sassLoader,
        ] : [
          dev ? 'style-loader' : ExtractCssChunks.loader,
          cssLoader,
          postCSSLoader,
          sassLoader,
        ],
    });

    if (!isServer && !dev) {
      appConfig.plugins.push(
        new ExtractCssChunks({
          allChunks: true,
          filename: dev ? '[name].module.css' : '[name]-[hash].module.css',
          chunkFilename: dev ? '[id].css' : '[id]-[hash].css',
          hot: dev, // if you want HMR - we try to automatically inject hot reload
          orderWarning: true, // Disable to remove warnings about conflicting order between imports
          reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
          cssModules: true, // if you use cssModules, this can help.
        }),
      );
    }

    if (target === 'web') {
      const filename = path.resolve(__dirname, 'build/loadable-stats.json'); 

      appConfig.plugins = [
        ...appConfig.plugins,
        new LoadablePlugin({ writeToDisk: true, filename }),
      ];
    }

    return appConfig
  },
}
