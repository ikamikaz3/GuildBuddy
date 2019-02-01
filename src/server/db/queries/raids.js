const knex = require ('../connection');

function getAllRaids () {
  return knex ('raids').select ('*');
}

function getSingleRaid (id) {
  return knex ('raids').select ('*').where ({id: parseInt (id, 10)});
}

function addRaid (raid) {
  return knex ('raids')
    .insert ({
      name: raid.name,
    })
    .returning ('*');
}

function updateRaid (id, raid) {
  return knex ('raids')
    .update (raid)
    .where ({id: parseInt (id, 10)})
    .returning ('*');
}

module.exports = {
  getAllRaids,
  getSingleRaid,
  addRaid,
  updateRaid,
};
