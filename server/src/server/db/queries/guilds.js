const knex = require('../connection');

function getAllGuilds() {
  return knex('guilds')
  .select('*');
}

module.exports = {
  getAllGuilds
};