// Based on: https://gist.github.com/jaredpalmer/0a91a7bd354b875b913c74f4b16125f7
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

module.exports = {
  modify: (baseConfig, { target, dev }, webpack) => {
    const appConfig = Object.assign({}, baseConfig);

    if (target === 'web') {
      appConfig.plugins = [
        ...appConfig.plugins,
        new ReactLoadablePlugin({
          filename: './build/react-loadable.json',
        }),
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: Infinity,
        })
      ];
    }

    return appConfig
  }
}
