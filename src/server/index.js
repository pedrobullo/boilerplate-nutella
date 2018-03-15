import path from 'path';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import dotenv from 'dotenv';

import WebpackIsomorphicToolsConfig from './../../webpack/webpack.isomorphic.tools';
import * as server from './server';

dotenv.config();

/* GLOBALS */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';

// if (module.hot) {
//   module.hot.accept('./server', () => {
//     console.log('🔁  HMR Reloading `./server`...');
//   });
//   console.info('✅  Server-side HMR Enabled!');
// }

const rootPath = path.resolve(__dirname, '../..');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(WebpackIsomorphicToolsConfig)
  .server(rootPath, () => server);
