const  winston = require('winston');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const error = require('./middleware/error');

const app = express();

require('./startup/logger')();

app.use(error);

mongoose.connect(config.get('db'))
    .then( () => winston.info('Connected to Database...'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
module.exports = server;