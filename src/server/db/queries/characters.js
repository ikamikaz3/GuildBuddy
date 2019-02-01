const knex = require('../connection');

function getAllCharacters() {
  return knex('characters')
    .select('*');
}

function getSingleCharacter(id) {
  return knex('characters')
    .select('*')
    .where({ id: parseInt(id, 10) });
}

function addCharacter(character) {
  return knex('characters')
    .insert(character)
    .returning('*');
}

function updateCharacter(id, character) {
  return knex('characters')
    .update(character)
    .where({ id: parseInt(id, 10) })
    .returning('*');
}

function deleteCharacter(id) {
  return knex('characters')
    .del()
    .where({ id: parseInt(id, 10) })
    .returning('*');
}

module.exports = {
  getAllCharacters,
  getSingleCharacter,
  addCharacter,
  updateCharacter,
  deleteCharacter,
};
