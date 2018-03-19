import path from 'path';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import dotenv from 'dotenv';
import webpackIsomorphicToolsConfig from './../../webpack/webpack.isomorphic.tools';
import * as server from './server';

dotenv.config();

/* GLOBALS */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

const rootPath = path.resolve(__dirname, '../..');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
  .server(rootPath, () => server);
