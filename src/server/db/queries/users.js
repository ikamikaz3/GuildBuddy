const knex = require('../connection');

function addUser(user) {
    return knex('users')
    .insert({
        username: user.username,
        password: user.password
    })
    .returning('*');
}

function getUser(name) {
    return knex('users')
    .select('*')
    .where({username: name});
}

module.exports = {
    addUser,
    getUser
};