const express = require('express');
const configureMiddleware = require('../config/configureMiddleware');
const configureRoutes = require('../config/configureRoutes');

const server = express();

configureMiddleware(server);
configureRoutes(server);

module.exports = server;
