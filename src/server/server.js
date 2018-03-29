import Express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import socketIO from 'socket.io';

import * as clientConfig from '../common/config';
import * as serverConfig from './config';

import appRouting from './lib/appRouting';
import appLog from './lib/appLogs';

// Initialize the Express App
const app = new Express();

app.get('/favicon.ico', (req, res) => {
  res.status(204);
});

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
app.use(Express.static(path.join(__dirname, '../../public')));
app.use(appRouting);

const PORT = clientConfig.application.port;

const server = app.listen(PORT, () => {
  console.log(`Running at: ${PORT}. 🤰`); // eslint-disable-line
});

const socketServer = socketIO();
socketServer.attach(server);
socketServer.on('connection', (socket) => {
  console.log('Socket connection', socket.id);
  socket.on('action', (action) => {
    console.log('action', action);
    socket.emit('action', { type: 'message', data: 'received msg' });
  });
});

// exports app and server regularly
module.exports = {
  app,
  server,
};
