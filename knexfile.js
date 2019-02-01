const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://gbuddyuser:tia39sonrce@localhost:5432/koa_api_test',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
    pool: {
      min: 0,
      max: 7,
    },
  },
  development: {
    client: 'pg',
    connection: 'postgres://gbuddyuser:tia39sonrce@localhost:5432/koa_api',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};
