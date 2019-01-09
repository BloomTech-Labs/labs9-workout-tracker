require('dotenv').config();
const dbEngine = process.env.DB_ENGINE || 'development'
const knex = require('knex');
const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig[dbEngine]);
