import express from 'express';
import dotenv from 'dotenv';

import server from './server/server';
import * as clientConfig from './common/config';

dotenv.config();

/* GLOBALS */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';

if (module.hot) {
  module.hot.accept('./server/server', () => {
    console.log('🔁  HMR Reloading `./server/server`...');
  });
  console.info('✅  Server-side HMR Enabled!');
};

const PORT = clientConfig.application.port || 3000;

export default express()
  .use((req, res) => server.handle(req, res))
  .listen(PORT, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`🤰 Running at: http://localhost:/${PORT}.`);
  });
