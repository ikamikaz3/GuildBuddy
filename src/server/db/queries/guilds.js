const knex = require('../connection');

function getAllGuilds() {
  return knex('guilds')
  .select('*');
}

function getSingleGuild(id) {
  return knex('guilds')
  .select('*')
  .where({ id: parseInt(id) });
}

function addGuild(guild) {
  return knex('guilds')
  .insert(guild)
  .returning('*');
}

function updateGuild(id, guild) {
  return knex('guilds')
  .update(guild)
  .where({ id: parseInt(id) })
  .returning('*');
}

function deleteGuild(id) {
  return knex('guilds')
  .del()
  .where({ id: parseInt(id) })
  .returning('*');
}

module.exports = {
  getAllGuilds,
  getSingleGuild,
  addGuild,
  updateGuild,
  deleteGuild
};
