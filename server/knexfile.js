require('dotenv').config();
const localPgConnection = {
  host: 'localhost',
  database: 'keep',
  user:     'username',
  password: 'password'
}

const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: { directory: './database/migrations'},
    seeds: { directory: './database/seeds'},
  },
  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: { directory: './database/migrations'},
    seeds: { directory: './database/seeds'},
  }
};
