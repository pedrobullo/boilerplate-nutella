import dotenv from 'dotenv';
import server from './server/server';

dotenv.config();

/* GLOBALS */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';

if (module.hot) {
  module.hot.accept('./server/server', () => {
    console.log('🔁  HMR Reloading `./server`...');
  });
  console.info('✅  Server-side HMR Enabled!');
};

export default server;
