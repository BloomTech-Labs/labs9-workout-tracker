require('dotenv').config();
const dbEngine = process.env.DB_ENGINE || 'development'
console.log('dbEngine', dbEngine);
const knex = require('knex');
const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig[dbEngine]);
