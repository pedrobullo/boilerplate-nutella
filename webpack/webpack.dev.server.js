const Express = require('express');
const webpack = require('webpack');

const config = {};
const webpackConfig = require('./webpack.config.dev');

const compiler = webpack(webpackConfig);

const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

const serverOptions = {
  contentBase: 'http://' + host + ':' + port, // eslint-disable-line
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

const app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions)); // eslint-disable-line
app.use(require('webpack-hot-middleware')(compiler)); // eslint-disable-line

app.listen(port, function onAppListening(err) {  // eslint-disable-line
  if (err) {
    console.error(err);
  } else {
    /* eslint-disable */
    console.info('==> 🚧  Webpack development server listening on port %s', port);
    /* eslint-enable */
  }
});
