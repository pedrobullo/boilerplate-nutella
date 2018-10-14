// Based on: https://gist.github.com/jaredpalmer/0a91a7bd354b875b913c74f4b16125f7

const autoprefixer = require('autoprefixer')
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
        modules: false, // TODO: Css Modules :(
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
          filename: '[name]-[contenthash].css',
          chunkFilename: '[id].css',
          hot: true, // if you want HMR - we try to automatically inject hot reload
          orderWarning: true, // Disable to remove warnings about conflicting order between imports
          reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
          cssModules: false, // if you use cssModules, this can help.
        }),
      );
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