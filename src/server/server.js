import Express from 'express';
import bodyParser from 'body-parser';

import appRouting from './lib/appRouting';
import appLog from './lib/appLogs';

// Initialize the Express App
const app = new Express();

// Winston Logging - must set process.env logger (bool)
process.on('uncaughtException', (err) => {
  const parsedError = {};

  Object.getOwnPropertyNames(err).forEach((key) => {
    parsedError[key] = err[key];
  });

  appLog.error(JSON.stringify({
    message: 'uncaughtException',
    trace: parsedError,
  }));
});

// Apply body Parser and server public assets and routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Cache-Control', 'no-cache, private');
  next();
});
app.use(Express.static(process.env.RAZZLE_PUBLIC_DIR || 'public'));
app.use(appRouting);

export default app;
