const bodyParser = require('body-parser');
const { debug } = require('./utils');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 8000;

const app = express();

require('./config/database');
app
  .use(function(request, __, next) {
    debug('server request detected');
    debug(request.headers);

    next();
  })
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(logger('dev'))
  .use(require('./routes'));

const server = app.listen(port, () =>
  debug(`Express server listening on port ${port}`)
);

process
  .on('close', () => {
    debug('Express server closing...');
    server.close();
  })
  .on('SIGINT', () => {
    debug('Express server closing on interrupt...');
    server.close();
  });
