const knex = require ('../connection');

function getAllUsers () {
  return knex ('users').select ('*');
}

function getSingleUser (id) {
  return knex ('users').select ('*').where ({id: parseInt (id, 10)});
}

function addUser (user) {
  return knex ('users')
    .insert ({
      username: user.username,
      password: user.password,
      role: user.role,
    })
    .returning ('*');
}

function updateUser (id, user) {
  return knex ('users')
    .update (user)
    .where ({id: parseInt (id, 10)})
    .returning ('*');
}

function getUser (name) {
  return knex ('users').select ('*').where ({username: name});
}

function deleteUser (id) {
  return knex ('users').del ().where ({id: parseInt (id, 10)}).returning ('*');
}

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
